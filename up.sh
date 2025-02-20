#!/bin/bash
touch backend/.env.local
./build_fe.sh

# Check if the --build parameter is passed
if [[ "$1" == "--build" ]]; then
    docker-compose -f docker-compose.yml --env-file .env up -d --build
else
    docker-compose -f docker-compose.yml --env-file .env up -d
fi