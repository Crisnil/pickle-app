FROM php:8.4-fpm-alpine

RUN apk add --no-cache \
        postgresql-dev \
        postgresql-client \
        libzip-dev \
        oniguruma-dev \
        git \
        unzip \
        bash \
    && docker-php-ext-install pdo pdo_pgsql mbstring bcmath zip pcntl opcache

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY php.ini /usr/local/etc/php/conf.d/99-dev.ini
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 9000
ENTRYPOINT ["entrypoint.sh"]
CMD ["php-fpm"]
