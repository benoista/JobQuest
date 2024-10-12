#!/bin/bash
rm -rf ./db/data
sudo docker compose up --build api && sudo docker compose up --build db