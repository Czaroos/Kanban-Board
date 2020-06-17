#!/bin/bash
docker kill kanbak_production_frontend redis > /dev/null 2>&1
docker rm kanbak_production_frontend redis > /dev/null 2>&1

docker kill kanbak_production_backend redis > /dev/null 2>&1
docker rm kanbak_production_backend redis > /dev/null 2>&1

docker-compose up -d