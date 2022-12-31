#!/bin/bash

mkdir -p ./backup

docker compose cp influxdb:/var/lib/influxdb2 ./backup
