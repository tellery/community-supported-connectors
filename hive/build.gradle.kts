import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar

group = "io.tellery.connectors"
version = "0.8.2"

repositories {
//    mavenLocal()
    maven {
        url = uri("https://maven.pkg.github.com/tellery/community-supported-connectors")
        credentials {
            username = project.findProperty("gpr.user") as String? ?: System.getenv("GITHUB_USERNAME")
            password = project.findProperty("gpr.key") as String? ?: System.getenv("GITHUB_TOKEN")
        }
    }
    jcenter()
}

plugins {
    idea
    kotlin("jvm") version "1.5.21"
    id("com.github.johnrengelman.shadow") version "5.2.0"

}

dependencies {
    compileOnly("io.tellery:connector-interface:0.8.2")
    runtimeOnly("org.apache.hive:hive-jdbc:2.1.0") {
        exclude(group = "org.slf4j")
        exclude(group = "log4j", module = "log4j")
        exclude(group = "org.apache.logging.log4j")
        exclude(group = "io.netty", module = "netty")
        exclude(group = "com.google.protobuf", module = "protobuf-java")
        exclude(group = "com.fasterxml.jackson.dataformat")
        exclude(group = "com.fasterxml.jackson.module")
        exclude(group = "com.fasterxml.jackson.core")
        exclude(group = "com.google.guava", module="guava")
    }
}

sourceSets.main {
    java.srcDirs("src")
    resources.srcDirs("resources")
}

sourceSets.test {
    java.srcDirs("test")
    resources.srcDirs("testresources")
}

idea {
    module {
        inheritOutputDirs = false
        outputDir = file("$buildDir/classes/kotlin/main")
        testOutputDir = file("$buildDir/classes/kotlin/test")
    }
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        jvmTarget = "1.8"
        freeCompilerArgs = freeCompilerArgs + "-Xopt-in=kotlin.RequiresOptIn"
    }
}

tasks.withType<ShadowJar> {
    archiveFileName.set("${project.name}-${project.version}.jar")
    isZip64 = true
}
