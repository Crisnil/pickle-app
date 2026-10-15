#!/bin/sh
set -e
if [ ! -d node_modules ] || [ ! -f node_modules/.package-lock.json ]; then
  npm install
fi
exec "$@"
