#!/bin/bash

docker compose cp ./backup/influxdb2/. influxdb:/var/lib/influxdb2
docker compose cp ./backup/grafana/. grafana:/var/lib/grafana
docker compose exec --user root grafana chown -R grafana:root /var/lib/grafana

docker compose restart influxdb
docker compose restart grafana
