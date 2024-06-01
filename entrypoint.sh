#!/bin/sh

# Wait for PostgreSQL to be ready
until nc -z -v -w30 $POSTGRES_HOST $POSTGRES_PORT
do
  echo "Waiting for database connection..."
  sleep 1
done

# Run the seeds
npx tsnd prisma/seeds/init.ts

# Start the application
npm run start
