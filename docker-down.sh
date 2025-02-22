#!/bin/bash

COMPOSE_FILE="docker-compose.yml"
DOCKER_CMD="docker-compose"

for arg in "$@"
do
    if [ "$arg" == "--debug" ]; then
        COMPOSE_FILE="docker-compose.debug.yml"
    elif [ "$arg" == "--core" ]; then
        DOCKER_CMD="docker compose"
    fi
done

$DOCKER_CMD -f $COMPOSE_FILE --env-file .env down