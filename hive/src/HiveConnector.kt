package io.tellery.connectors.contrib

import io.tellery.annotations.Config
import io.tellery.annotations.Config.ConfigType
import io.tellery.annotations.Connector
import io.tellery.annotations.HandleImport
import io.tellery.connectors.JDBCConnector
import io.tellery.entities.*
import io.tellery.utils.S3Storage
import io.tellery.utils.queryRemark
import java.sql.Connection
import java.sql.ResultSet
import java.sql.SQLException
import java.sql.Types


@Connector(
    type = "Hive/SparkSQL",
    configs = [
        Config(
            name = "Endpoint",
            type = ConfigType.STRING,
            description = "The endpoint of your hive / sparkSQL thrift server",
            hint = "localhost",
            required = true
        ),
        Config(
            name = "Port",
            type = ConfigType.NUMBER,
            description = "The port number",
            hint = "10001",
            required = true
        ),
        Config(
            name = "Username",
            type = ConfigType.STRING,
            description = "Your hadoop username",
            hint = "your_username",
        ),
        Config(
            name = "Password",
            type = ConfigType.STRING,
            description = "Your hadoop password",
            hint = "",
            secret = true,
        ),
        Config(
            name = "S3 Access Key",
            type = ConfigType.STRING,
            description = "S3 Access Key ID(for uploading csv)"
        ),
        Config(
            name = "S3 Secret Key",
            type = ConfigType.STRING,
            description = "S3 Secret Access Key (for uploading csv)",
            secret = true
        ),
        Config(
            name = "S3 Region",
            type = ConfigType.STRING,
            description = "S3 region (be the same as your Redshift cluster",
            hint = "us-east-1"
        ),
        Config(
            name = "S3 Bucket",
            type = ConfigType.STRING,
            description = "S3 bucket (where uploaded csv stores)",
            hint = "tellery"
        ),
        Config(
            name = "S3 Key Prefix",
            type = ConfigType.STRING,
            description = "S3 key prefix prepends to uploaded csv"
        ),
    ]
)
class HiveConnector : JDBCConnector() {

    override val driverClassName = "org.apache.hive.jdbc.HiveDriver"
    override val transactionIsolationLevel = Connection.TRANSACTION_READ_UNCOMMITTED

    override fun buildConnectionStr(profile: ProfileEntity): String {
        val endpoint = profile.configs["Endpoint"]
        val port = profile.configs["Port"]
        return "jdbc:hive2://${endpoint}:${port}"
    }

    private var s3Client: S3Storage? = null

    override fun initByProfile(profile: ProfileEntity) {
        super.initByProfile(profile)
        s3Client = S3Storage.buildFromConfigs(profile.configs)
        s3Client?.run {
            logger.info("workspace {}:{} has initialized s3 client", profile.id, profile.type)
        }
    }

    private fun getResultByNames(rs: ResultSet, candidates: Array<String>): String {
        for (name in candidates) {
            try {
                return rs.getString(name)
            } catch (ignored: SQLException) {
            }
        }
        throw CustomizedException("Failed to load databases, maybe caused by unsupported version of spark, please create an issue on Github!")
    }

    override suspend fun getDatabases(): List<String> {
        val remark = mapOf("queryType" to "getDatabase")
        val dbNameColCandidates = arrayOf(
            "databaseName",         // SparkSQL (<=3.0.0)
            "database_name",        // Hive
            "namespace"             // SparkSQL (>=3.0.0)
        )
        return dbConnection.use { conn ->
            conn.createStatement().use { stmt ->
                stmt.executeQuery(queryRemark(remark, "SHOW DATABASES")).use {
                    generateSequence {
                        if (it.next()) {
                            getResultByNames(it, dbNameColCandidates)
                        } else null
                    }.toList()
                }
            }
        }
    }

    override suspend fun getCollections(dbName: String): List<CollectionField> {
        val remark = mapOf("queryType" to "getCollection")
        return dbConnection.use { conn ->
            conn.createStatement().use { stmt ->
                try {
                    stmt.executeQuery(
                        queryRemark(
                            remark, "SHOW TABLES FROM `${
                                dbName.replace("`", "``")
                            }`"
                        )
                    ).use {
                        generateSequence {
                            if (it.next()) {
                                try {
                                    CollectionField(it.getString("tableName"), null)
                                } catch (ignored: SQLException) {
                                    CollectionField(it.getString("table_name"), null)
                                }
                            } else null
                        }.toList()
                    }
                } catch (e: SQLException) {
                    if (e.message != null && e.message.toString()
                            .startsWith("Error running query: org.apache.spark.sql.catalyst.analysis.NoSuchDatabaseException")
                    ) {
                        emptyList()
                    } else {
                        throw e
                    }
                }
            }
        }
    }

    override suspend fun getCollectionSchema(
        dbName: String,
        collectionName: String,
        schemaName: String?,
    ): List<TypeField> {
        val remark = mapOf("queryType" to "getCollectionSchema")
        return dbConnection.use { conn ->
            conn.createStatement().use { stmt ->
                try {
                    stmt.executeQuery(
                        queryRemark(
                            remark,
                            "DESC `${
                                dbName.replace("`", "``")
                            }`.`${
                                collectionName.replace("`", "``")
                            }`"
                        )
                    ).use {
                        generateSequence {
                            if (it.next()) {
                                val (colName, dataType) = arrayOf(
                                    1,
                                    2
                                ).map { colIndex -> it.getString(colIndex) }
                                if (colName.isNullOrBlank() && dataType.isNullOrBlank()) {
                                    null
                                } else {
                                    TypeField(colName, hiveTypeToSQLType(dataType))
                                }
                            } else null
                        }.toList()
                    }
                } catch (e: SQLException) {
                    if (e.message != null && e.message.toString()
                            .startsWith("Error running query: org.apache.spark.sql.AnalysisException: Table or view not found")
                    ) {
                        emptyList()
                    } else {
                        throw e
                    }
                }
            }
        }
    }

    private fun hiveTypeToSQLType(hiveType: String): Int {
        return when (hiveType) {
            "bigint" -> Types.BIGINT
            "boolean" -> Types.BOOLEAN
            "double" -> Types.DOUBLE
            "double precision" -> Types.DOUBLE
            "date" -> Types.DATE
            "float" -> Types.FLOAT
            "int" -> Types.INTEGER
            "real" -> Types.REAL
            "smallint" -> Types.SMALLINT
            "time" -> Types.TIME
            "timestamp" -> Types.TIMESTAMP
            "tinyint" -> Types.TINYINT
            else -> {
                when {
                    hiveType.startsWith("char") -> Types.CHAR
                    hiveType.startsWith("varchar") -> Types.VARCHAR
                    hiveType.startsWith("string") -> Types.VARCHAR
                    hiveType.startsWith("binary") -> Types.BINARY
                    hiveType.startsWith("decimal") -> Types.DECIMAL
                    hiveType.startsWith("struct") -> Types.STRUCT
                    hiveType.startsWith("array") -> Types.ARRAY
                    hiveType.startsWith("map") -> Types.STRUCT
                    else -> Types.OTHER
                }
            }
        }
    }

    override fun importSanityCheck(database: String, collection: String, schema: String?) {
        super.importSanityCheck(database, collection, schema)
        if (this.s3Client == null) {
            throw ImportFailureException("Hive Connector must be initialized with s3 config to support importing")
        }
    }

    @HandleImport("text/csv")
    suspend fun importFromCSV(
        database: String,
        collection: String,
        schema: String?,
        content: ByteArray
    ) {
        val filename = "$database/${if (schema != null) "$schema." else ""}$collection.csv"
        val s3Path =
            this.s3Client!!.uploadFile(filename, content, "text/csv")
        dbConnection.use { conn ->
            conn.createStatement().use { stmt ->
                try {
                    val sql = """
                       |CREATE TABLE $database.$collection
                       |USING CSV
                       |OPTIONS(
                       |    path "$s3Path",
                       |    header "true",
                       |    inferSchema "true",
                       |    encoding "UTF-8"
                       |)
                    """.trimMargin()
                    stmt.execute(sql)
                } catch (e: Exception) {
                    logger.error("Error when importing data from s3", e)
                    stmt.execute("DROP TABLE IF EXISTS $database.$collection")
                    throw e
                }
            }
        }
    }
}
