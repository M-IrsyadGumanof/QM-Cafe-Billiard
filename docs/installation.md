# Installation Documentation

## Requirement

- PHP sesuai composer.json
- Composer
- Node.js dan NPM
- SQLite atau MySQL

## Langkah Instalasi

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan storage:link
php artisan migrate:fresh --seed
npm run dev
php artisan serve
```

## Akun Demo

- Admin: admin@qmcafe.com / Admin@12345
- Customer: customer@qmcafe.com / Customer@12345
- Kitchen: kitchen@qmcafe.com / Kitchen@12345
- Billiard: billiard@qmcafe.com / Billiard@12345
- Owner: owner@qmcafe.com / Owner@12345
