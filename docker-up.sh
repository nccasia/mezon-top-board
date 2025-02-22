#!/bin/bash

# Determine which docker-compose file to use
COMPOSE_FILE="docker-compose.yml"
DOCKER_CMD="docker-compose"
BUILD_FLAG=""

for arg in "$@"
do
    if [ "$arg" == "--debug" ]; then
        COMPOSE_FILE="docker-compose.debug.yml"
    elif [ "$arg" == "--build" ]; then
        BUILD_FLAG="--build"
    elif [ "$arg" == "--core" ]; then
        DOCKER_CMD="docker compose"
    fi
done

# docker-compose -f docker-compose.yml --env-file .env up -d
$DOCKER_CMD -f $COMPOSE_FILE --env-file .env up -d $BUILD_FLAG