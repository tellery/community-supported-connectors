# Tellery connector for Hive / SparkSQL

## Introduction

This is the hive / sparksql implementation for [Tellery Connector](https://github.com/tellery/tellery/tree/main/packages/connector), that allows you to connect Tellery to your own Hive / SparkSQL based data warehouse.

## Installation

There are two ways to use this implementation.

First download the appropriate version of the connector from [Release](https://github.com/tellery/community-supported-connectors/releases)

### Mount directly to your image

Since your connector are packed in a docker image, you can mount the directory with the jar into `/usr/app/extras/lib` of the connector image.

If you are using docker-compose, you can modify the docker-compose.yml, adding the following right after the `version` section:

```yaml
x-connector-extra-volume: &connector_extra_volume
  type: bind
  source: THE_PATH_TO_YOUR_JAR
  target: /usr/app/extras/lib/hive-connector.jar
```

and then modify the `tellery-connector` section to the following:

```yaml
  tellery-connector:
    <<: *restart_policy
    environment:
      connector.deployMode: "LOCAL"
      connector.workspaceId: "0"
    image: ${TELLERY_CONNECTOR_IMAGE}
    ports:
      - 50051:50051
    volumes:
      - <<: *connector_volume
      # add a line here
      - <<: *connector_extra_volume
```

If you are using kubernetes, what you should do is to create a PV for the extra dir (`/usr/app/extras`), and put what you need directly into this dir.

### Repack your own connector image

This way is not as flexible as the previous one, but easier.

Create your own `Dockerfile` (at exactly the same directory where you put the downloaded jar), and put the following

```Dockerfile
# docker tag / version should match what you need
FROM tellery/connector:0.8.2
# put your jar together with the Dockerfile
COPY ./hive-connector.jar /usr/app/extras/lib/hive-connector.jar
```

and build it by
```bash
docker build -t my-connector .
```

After done that, if you are using docker compose, just do
```bash
TELLERY_CONNECTOR_IMAGE=my-connector docker-compose up -d
```

(for more details see [Here](https://github.com/tellery/tellery/tree/main/deploy/compose#environments))

or if you go with kubernetes, put the image to your own registry and modify the `images.server.repository` and `images.server.tag`  (see [Server Configuration](https://tellery.io/docs/getting-started/production-setup#server-configuration))
