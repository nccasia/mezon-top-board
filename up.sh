#!/bin/bash
cp .env ./backend/.env.local
cp .env ./frontend/.env
docker-compose -f docker-compose.yml --env-file .env up -d