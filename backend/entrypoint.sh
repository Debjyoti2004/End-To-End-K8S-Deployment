#!/bin/sh

# wait for Postgres to be ready
until pg_isready -h postgres-db -p 5432; do
  echo "Waiting for Postgres..."
  sleep 2
done

# run Prisma migrations
npx prisma migrate deploy

# start backend
node src/index.js
