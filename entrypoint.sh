#!/bin/sh
echo "start node:"
node --max-http-header-size=15000 ./build/server.js