FROM php:8.4-fpm-alpine

RUN apk update && apk add \
    bash \
    curl \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    postgresql-dev

RUN docker-php-ext-install pdo pdo_pgsql gd zip

# Install Composer
COPY --from=composer:2.8.4 /usr/bin/composer /usr/local/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN chown -R www-data:www-data storage/ bootstrap/cache/

EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
