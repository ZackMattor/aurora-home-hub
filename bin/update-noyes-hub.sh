#!/bin/bash

ENDPOINT=10.0.0.20

function run_cmd {
  ssh $ENDPOINT "cd /srv/aurora-home-hub/ops ; $1"
}

run_cmd "docker compose pull"
run_cmd "docker compose up -d --no-deps"

#run_cmd "docker image prune -a -f"
#run_cmd "docker container prune -f"
