# Laravel Next.js Calendar

### Backend settings

#### Environment variables

Navigate to the `/api` directory. Copy and paste the `.env.example` file and rename it to `.env`

```
cp .env.example .env
```

Now open the `.env` file and fill in the values as needed. 

```
composer install
```

#### Migrations

```
php artisan migrate --seed
```

### Frontend setup

#### Environment variables

We now take care of settings up our frontend. Therefore, navigate to the `/web` directory.
First things first, we need to run `npm install` or `yarn install` to install all our dependencies.

### Launching the app

```
php artisan serve
```

In the second terminal, navigate to `/web` and execute

```
npm run dev
#or
yarn dev
```
