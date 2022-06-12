#!/bin/sh
# -e Exit immediately when a command returns a non-zero status.
# -x Print commands before they are executed
set -e

docker run -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres timescale/timescaledb-ha:pg14-latest