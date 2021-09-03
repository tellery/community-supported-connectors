/**
 * keywords / builtinFunctions come from documents of hive and spark 3.0.0
 * in the setting of SparkSQL, ` (backquote) will be considered as (delimited) identifers
 * and ' (single quote) / " (double quote) will be considered as literals
 */

export default {
  defaultToken: '',
  ignoreCase: true,
  brackets: [
    { open: '[', close: ']', token: 'delimiter.square' },
    { open: '(', close: ')', token: 'delimiter.parenthesis' }
  ],
  keywords: [
    // Reserved
    'ALL',
    'ALTER',
    'AND',
    'ARRAY',
    'AS',
    'AUTHORIZATION',
    'BETWEEN',
    'BIGINT',
    'BINARY',
    'BOOLEAN',
    'BOTH',
    'BY',
    'CASE',
    'CAST',
    'CHAR',
    'COLUMN',
    'CONF',
    'CREATE',
    'CROSS',
    'CUBE',
    'CURRENT',
    'CURRENT_DATE',
    'CURRENT_TIMESTAMP',
    'CURSOR',
    'DATABASE',
    'DATE',
    'DECIMAL',
    'DELETE',
    'DESCRIBE',
    'DISTINCT',
    'DOUBLE',
    'DROP',
    'ELSE',
    'END',
    'EXCHANGE',
    'EXISTS',
    'EXTENDED',
    'EXTERNAL',
    'FALSE',
    'FETCH',
    'FLOAT',
    'FOLLOWING',
    'FOR',
    'FROM',
    'FULL',
    'FUNCTION',
    'GRANT',
    'GROUP',
    'GROUPING',
    'HAVING',
    'IF',
    'IMPORT',
    'IN',
    'INNER',
    'INSERT',
    'INT',
    'INTERSECT',
    'INTERVAL',
    'INTO',
    'IS',
    'JOIN',
    'LATERAL',
    'LEFT',
    'LESS',
    'LIKE',
    'LOCAL',
    'MACRO',
    'MAP',
    'MORE',
    'NONE',
    'NOT',
    'NULL',
    'OF',
    'ON',
    'OR',
    'ORDER',
    'OUT',
    'OUTER',
    'OVER',
    'PARTIALSCAN',
    'PARTITION',
    'PERCENT',
    'PRECEDING',
    'PRESERVE',
    'PROCEDURE',
    'RANGE',
    'READS',
    'REDUCE',
    'REVOKE',
    'RIGHT',
    'ROLLUP',
    'ROW',
    'ROWS',
    'SELECT',
    'SET',
    'SMALLINT',
    'TABLE',
    'TABLESAMPLE',
    'THEN',
    'TIMESTAMP',
    'TO',
    'TRANSFORM',
    'TRIGGER',
    'TRUE',
    'TRUNCATE',
    'UNBOUNDED',
    'UNION',
    'UNIQUEJOIN',
    'UPDATE',
    'USER',
    'USING',
    'UTC_TMESTAMP',
    'VALUES',
    'VARCHAR',
    'WHEN',
    'WHERE',
    'WINDOW',
    'WITH',

    // added hive 2.0.0
    'COMMIT',
    'ONLY',
    'REGEXP',
    'RLIKE',
    'ROLLBACK',
    'START',

    // added hive 2.1.0
    'CACHE',
    'CONSTRAINT',
    'FOREIGN',
    'PRIMARY',
    'REFERENCES',

    // added hive 2.2.0
    'DAYOFWEEK',
    'EXTRACT',
    'FLOOR',
    'INTEGER',
    'PRECISION',
    'VIEWS',

    // added hive 3.0.0
    'TIME',
    'NUMERIC',
    'SYNC',

    // Non-reserved
    'ADD',
    'ADMIN',
    'AFTER',
    'ANALYZE',
    'ARCHIVE',
    'ASC',
    'BEFORE',
    'BUCKET',
    'BUCKETS',
    'CASCADE',
    'CHANGE',
    'CLUSTER',
    'CLUSTERED',
    'CLUSTERSTATUS',
    'COLLECTION',
    'COLUMNS',
    'COMMENT',
    'COMPACT',
    'COMPACTIONS',
    'COMPUTE',
    'CONCATENATE',
    'CONTINUE',
    'DATA',
    'DATABASES',
    'DATETIME',
    'DAY',
    'DBPROPERTIES',
    'DEFERRED',
    'DEFINED',
    'DELIMITED',
    'DEPENDENCY',
    'DESC',
    'DIRECTORIES',
    'DIRECTORY',
    'DISABLE',
    'DISTRIBUTE',
    'ELEM_TYPE',
    'ENABLE',
    'ESCAPED',
    'EXCLUSIVE',
    'EXPLAIN',
    'EXPORT',
    'FIELDS',
    'FILE',
    'FILEFORMAT',
    'FIRST',
    'FORMAT',
    'FORMATTED',
    'FUNCTIONS',
    'HOLD_DDLTIME',
    'HOUR',
    'IDXPROPERTIES',
    'IGNORE',
    'INDEX',
    'INDEXES',
    'INPATH',
    'INPUTDRIVER',
    'INPUTFORMAT',
    'ITEMS',
    'JAR',
    'KEYS',
    'KEY_TYPE',
    'LIMIT',
    'LINES',
    'LOAD',
    'LOCATION',
    'LOCK',
    'LOCKS',
    'LOGICAL',
    'LONG',
    'MAPJOIN',
    'MATERIALIZED',
    'METADATA',
    'MINUS',
    'MINUTE',
    'MONTH',
    'MSCK',
    'NOSCAN',
    'NO_DROP',
    'OFFLINE',
    'OPTION',
    'OUTPUTDRIVER',
    'OUTPUTFORMAT',
    'OVERWRITE',
    'OWNER',
    'PARTITIONED',
    'PARTITIONS',
    'PLUS',
    'PRETTY',
    'PRINCIPALS',
    'PROTECTION',
    'PURGE',
    'READ',
    'READONLY',
    'REBUILD',
    'RECORDREADER',
    'RECORDWRITER',
    'RELOAD',
    'RENAME',
    'REPAIR',
    'REPLACE',
    'REPLICATION',
    'RESTRICT',
    'REWRITE',
    'ROLE',
    'ROLES',
    'SCHEMA',
    'SCHEMAS',
    'SECOND',
    'SEMI',
    'SERDE',
    'SERDEPROPERTIES',
    'SERVER',
    'SETS',
    'SHARED',
    'SHOW',
    'SHOW_DATABASE',
    'SKEWED',
    'SORT',
    'SORTED',
    'SSL',
    'STATISTICS',
    'STORED',
    'STREAMTABLE',
    'STRING',
    'STRUCT',
    'TABLES',
    'TBLPROPERTIES',
    'TEMPORARY',
    'TERMINATED',
    'TINYINT',
    'TOUCH',
    'TRANSACTIONS',
    'UNARCHIVE',
    'UNDO',
    'UNIONTYPE',
    'UNLOCK',
    'UNSET',
    'UNSIGNED',
    'URI',
    'USE',
    'UTC',
    'UTCTIMESTAMP',
    'VALUE_TYPE',
    'VIEW',
    'WHILE',
    'YEAR',
    // added hive 2.0.0
    'AUTOCOMMIT',
    'ISOLATION',
    'LEVEL',
    'OFFSET',
    'SNAPSHOT',
    'TRANSACTION',
    'WORK',
    'WRITE',
    // added hive 2.1.0
    'ABORT',
    'KEY',
    'LAST',
    'NORELY',
    'NOVALIDATE',
    'NULLS',
    'RELY',
    'VALIDATE',
    // added hive 2.2.0
    'DETAIL',
    'DOW',
    'EXPRESSION',
    'OPERATOR',
    'QUARTER',
    'SUMMARY',
    'VECTORIZATION',
    'WEEK',
    'YEARS',
    'MONTHS',
    'WEEKS',
    'DAYS',
    'HOURS',
    'MINUTES',
    'SECONDS',
    // added hive 3.0.0
    'TIMESTAMPTZ',
    'ZONE'
  ],
  operators: [
    // Relational
    'BETWEEN',
    'IS',
    'NULL',
    'LIKE',
    'RLIKE',
    'REGEXP',
    // Arithmetic
    'DIV',
    // Logical
    'AND',
    'OR',
    'NOT',
    'IN',
    'EXISTS'
  ],
  builtinFunctions: [
    'any',
    'approx_count_distinct',
    'approx_percentile',
    'avg',
    'bit_or',
    'bit_xor',
    'bool_and',
    'bool_or',
    'collect_list',
    'collect_set',
    'corr',
    'count',
    'count_if',
    'count_min_sketch',
    'covar_pop',
    'covar_samp',
    'every',
    'first',
    'first_value',
    'kurtosis',
    'last',
    'last_value',
    'max',
    'max_by',
    'mean',
    'min',
    'min_by',
    'percentile',
    'percentile_approx',
    'skewness',
    'some',
    'std',
    'stddev',
    'stddev_pop',
    'stddev_samp',
    'sum',
    'var_pop',
    'var_samp',
    'variance',
    'cume_dist',
    'dense_rank',
    'lag',
    'lead',
    'ntile',
    'percent_rank',
    'rank',
    'row_number',
    'array_contains',
    'array_distinct',
    'array_except',
    'array_intersect',
    'array_join',
    'array_max',
    'array_min',
    'array_position',
    'array_remove',
    'array_repeat',
    'array_union',
    'arrays_overlap',
    'arrays_zip',
    'concat',
    'flatten',
    'reverse',
    'sequence',
    'shuffle',
    'slice',
    'sort_array',
    'map_concat',
    'map_entries',
    'map_from_entries',
    'map_keys',
    'map_values',
    'add_months',
    'current_date',
    'current_timestamp',
    'date_add',
    'date_format',
    'date_part',
    'date_sub',
    'date_trunc',
    'datediff',
    'dayofweek',
    'dayofyear',
    'from_unixtime',
    'from_utc_timestamp',
    'hour',
    'last_day',
    'make_date',
    'make_timestamp',
    'minute',
    'month',
    'months_between',
    'next_day',
    'now',
    'quarter',
    'second',
    'to_date',
    'to_timestamp',
    'to_unix_timestamp',
    'to_utc_timestamp',
    'trunc',
    'unix_timestamp',
    'weekday',
    'weekofyear',
    'year',
    'from_json',
    'get_json_object',
    'json_tuple',
    'schema_of_json',
    'to_json',
    'map',
    'struct',
    'named_struct',
    'array',
    'create_union',
    'round',
    'bround',
    'floor',
    'ceil',
    'rand',
    'exp',
    'ln',
    'log10',
    'log2',
    'log',
    'pow',
    'power',
    'sqrt',
    'bin',
    'hex',
    'unhex',
    'conv',
    'abs',
    'pmod',
    'sin',
    'asin',
    'cos',
    'acos',
    'tan',
    'atan',
    'degrees',
    'radians',
    'positive',
    'negative',
    'sign',
    'e',
    'pi',
    'factorial',
    'cbrt',
    'shiftleft',
    'shiftright',
    'shiftrightunsigned',
    'greatest',
    'least',
    'width_bucket',
    'size',
    'binary',
    'cast',
    'day',
    'extract',
    'if',
    'isnull',
    'isnotnull',
    'nvl',
    'coalesce',
    'case',
    'case when',
    'nullif',
    'assert_true',
    'ascii',
    'base64',
    'character_length',
    'chr',
    'context_ngrams',
    'concat_ws',
    'decode',
    'elt',
    'encode',
    'field',
    'find_in_set',
    'format_number',
    'in_file',
    'instr',
    'length',
    'locate',
    'lower',
    'lpad',
    'ltrim',
    'ngrams',
    'octet_length',
    'parse_url',
    'printf',
    'quote',
    'regexp_extract',
    'regexp_replace',
    'repeat',
    'replace',
    'rpad',
    'rtrim',
    'sentences',
    'space',
    'split',
    'str_to_map',
    'substr',
    'substring_index',
    'translate',
    'trim',
    'unbase64',
    'upper',
    'initcap',
    'levenshtein',
    'soundex',
    'mask',
    'mask_first_n',
    'mask_last_n',
    'mask_show_first_n',
    'mask_show_last_n',
    'mask_hash',
    'java_method',
    'reflect',
    'hash',
    'current_user',
    'logged_in_user',
    'current_database',
    'md5',
    'sha1',
    'sha',
    'crc32',
    'sha2',
    'aes_encrypt',
    'aes_decrypt',
    'version',
    'buildversion',
    'surrogate_key',
    'regr_avgx',
    'regr_avgy',
    'regr_count',
    'regr_intercept',
    'regr_r2',
    'regr_slope',
    'regr_sxx',
    'regr_sxy',
    'regr_syy',
    'histogram_numeric',
    'explode',
    'posexplode',
    'inline',
    'stack',
    'parse_url_tuple'
  ],
  builtinVariables: [],
  pseudoColumns: [],
  tokenizer: {
    root: [
      { include: '@comments' },
      { include: '@whitespace' },
      { include: '@pseudoColumns' },
      { include: '@numbers' },
      { include: '@strings' },
      { include: '@complexIdentifiers' },
      { include: '@scopes' },
      [/[;,.]/, 'delimiter'],
      [/[()]/, '@brackets'],
      [/\{\{[0-9a-zA-Z\-_]{21}( as \w+)?\}\}/, 'transclusion'],
      [
        /[\w@#$]+/,
        {
          cases: {
            '@keywords': 'keyword',
            '@operators': 'operator',
            '@builtinVariables': 'predefined',
            '@builtinFunctions': 'predefined',
            '@default': 'identifier'
          }
        }
      ],
      [/[<>=!%&+\-*/|~^]/, 'operator']
    ],
    whitespace: [[/\s+/, 'white']],
    comments: [
      [/--+.*/, 'comment'],
      [/\/\*/, { token: 'comment.quote', next: '@comment' }]
    ],
    comment: [
      [/[^*/]+/, 'comment'],
      // Not supporting nested comments, as nested comments seem to not be standard?
      // i.e. http://stackoverflow.com/questions/728172/are-there-multiline-comment-delimiters-in-sql-that-are-vendor-agnostic
      // [/\/\*/, { token: 'comment.quote', next: '@push' }],    // nested comment not allowed :-(
      [/\*\//, { token: 'comment.quote', next: '@pop' }],
      [/./, 'comment']
    ],
    pseudoColumns: [
      [
        /[$][A-Za-z_][\w@#$]*/,
        {
          cases: {
            '@pseudoColumns': 'predefined',
            '@default': 'identifier'
          }
        }
      ]
    ],
    numbers: [
      [/0[xX][0-9a-fA-F]*/, 'number'],
      [/[$][+-]*\d*(\.\d*)?/, 'number'],
      [/((\d+(\.\d*)?)|(\.\d+))([eE][-+]?\d+)?/, 'number']
    ],
    strings: [
      [/'/, { token: 'string', next: '@singleQuotedString' }],
      [/"/, { token: 'string', next: '@doubleQuotedString' }]
    ],
    singleQuotedString: [
      [/[^']+/, 'string'],
      [/''/, 'string'],
      [/'/, { token: 'string', next: '@pop' }]
    ],
    doubleQuotedString: [
      [/[^"]+/, 'string'],
      [/""/, 'string'],
      [/"/, { token: 'string', next: '@pop' }]
    ],
    complexIdentifiers: [['`', { token: 'identifier.quote', next: '@backquotedIdentifier' }]],
    backquotedIdentifier: [
      [/[^`]+/, 'identifier'],
      [/``/, 'identifier'],
      [/`/, { token: 'identifier.quote', next: '@pop' }]
    ],
    scopes: [
      [/(BEGIN|CASE)\b/i, { token: 'keyword.block' }],
      [/END\b/i, { token: 'keyword.block' }],
      [/WHEN\b/i, { token: 'keyword.choice' }],
      [/THEN\b/i, { token: 'keyword.choice' }]
    ]
  }
}