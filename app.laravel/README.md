# PrimeVue Showcase — Laravel

A Laravel 13 + Vue 3 + PrimeVue SPA, converted from the original Nuxt 3 showcase.

## Requirements

- PHP 8.3+
- Node.js 20+
- Composer 2

## Installation

    composer install
    cp .env.example .env
    php artisan key:generate
    npm install

## Development

    # Terminal 1 – Vite dev server
    npm run dev

    # Terminal 2 – Laravel
    php artisan serve

Open http://localhost:8000

## Production Build

    npm run build
    php artisan serve
