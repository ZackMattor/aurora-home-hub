#!/bin/bash

docker compose cp ./backup/influxdb2/. influxdb:/var/lib/influxdb2

docker compose restart influxdb
