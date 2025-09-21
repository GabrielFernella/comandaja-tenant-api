#!/bin/sh
set -e

echo "Running NPM INSTALL..."
npm install
echo "Running BUILD..."
npm run build
echo "Running database MIGRATIONS..."
npx typeorm migration:run -d dist/config/database.js

echo "Starting the application..."
exec "$@"
