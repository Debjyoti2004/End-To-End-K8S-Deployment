#!/bin/sh

DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres-db:5432/${POSTGRES_DB}"
export DATABASE_URL

exec "$@"