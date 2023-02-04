#!/bin/bash

# This script will kill the Aurora Home Hub process running at Noyes.
# It will then perform some networking magic to wire up the local instance
# for the location.

ENDPOINT=10.0.0.20

function run_cmd {
  ssh $ENDPOINT "cd /srv/aurora-home-hub/ops ; $1"
}

run_cmd "docker compose stop aurora_server"

ssh $ENDPOINT -R 8080:localhost:8080 -R 1337:localhost:1337 "echo 'Bound local services to remote. CTRL+C to exit.' ; sleep infinity"

run_cmd "docker compose start aurora_server"
