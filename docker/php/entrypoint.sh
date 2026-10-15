#!/bin/sh
set -e

until pg_isready -h "${DB_HOST:-postgres}" -p "${DB_PORT:-5432}" -U "${DB_USERNAME:-picklematch}" 2>/dev/null; do
  echo "Waiting for postgres..."
  sleep 1
done

if [ ! -f vendor/autoload.php ]; then
  composer install --no-interaction --prefer-dist
fi

if [ ! -f .env ]; then
  cp .env.example .env
fi

php artisan key:generate --ansi --force
php artisan migrate --force

exec "$@"
