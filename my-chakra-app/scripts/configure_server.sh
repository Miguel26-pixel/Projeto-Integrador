#!/bin/sh
# -e Exit immediately when a command returns a non-zero status.
# -x Print commands before they are executed
set -ex

docker pull timescale/timescaledb-ha:pg14-latest