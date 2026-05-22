# Shelfgleam

This is a bookshelf project to give you information, reviews and recommendations for your shelves!

Tech stacks used: _Add Images_
Node.js
React.js
PostgreSQL

## Instructions to Run:

Make sure to install the necessary packages to run the project. Execute in the following directories `shelfgleam/backend` and `shelfgleam/frontend`:

```
npm install
```

## Backend

### ENVIRONMENT VARIABLES:

Create a `.env` file inside the /backend folder, and configure the information using [env.example](/backend/.env.example) as reference.

### Migrations

This project uses dbmate for migrations.

**Database used**: PostgreSQL

#### Migration Commands:

`npm run db:migrate` - create database (if it doesn't exist) and run any pending migrations

`npm run db:rollback` - rollback the most recent migration

---

To create a new migration file, execute:

```
npx dbmate new <migration_file_name>
```

---

### Running back end server

Within `shelfgleam/backend`, run:

```
npm run dev
```
