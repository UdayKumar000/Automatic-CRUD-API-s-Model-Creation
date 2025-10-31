# Automatic-CRUD-API-s-Model-Creation


## What this repo is

This repository contains a small automated CRUD API generator. The backend reads model definitions from a `models/` folder (JSON files), registers a CRUD router for each model, and uses Prisma as ORM.

## Prerequisites

- Node.js (v16+ recommended, Node 20 tested)
- npm
- A MySQL database 

## Techstacks Used

- backends : Node.js , Express.js MySQL, Prisma
- frontends : React , Vite , Vue , Tailwind CSS 

## Project layout (high level)

- `backend/` — TypeScript Express backend
  - `package.json` — backend scripts and deps
  - `prisma/schema.prisma` — Prisma schema
  - `generated/prisma` — generated Prisma client (created by `prisma generate`)
  - `src/` — backend source
    - `index.ts` — server entry, registers routes dynamically from `models/`
    - `services/loadModels.js` — loads JSON models from a `models` folder
    - `services/crudGenerator.ts` — generates CRUD routers using Prisma
    - `routes/` — other route files
- `frontend/` — Vite-based frontend (React)
- `models/` — top-level models folder used to generate automatic CRUD API's 

## Environment

Create a `.env` file inside `backend/` and add following variables:

DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your_secret_key_here"

(Adjust to your DB provider and credentials.)

## Run the backend (Terminal)

1. Install dependencies

```powershell
cd backend
npm install
```

2. Generate the Prisma client (important)

```powershell
# make sure .env is set and points to a reachable DB
npx prisma generate --schema=prisma/schema.prisma
```

If generation succeeds you should see a message like "✔ Generated Prisma Client ... to .\generated\prisma".

3. Start the dev server (uses nodemon + ts-node)

```powershell
npm run start
```

The server listens on port 3000 (see `backend/src/index.ts`). On start it will load models via `loadModelFiles()` and register CRUD routes under `/api/<model-name>`.

### Quick troubleshooting for Prisma errors

- If you see: `@prisma/client did not initialize yet. Please run "prisma generate"` — run the generate step above from the `backend/` folder.

## Run the frontend (Terminal)

```powershell
# create another terminal for running frontend 
cd frontend
npm install
npm run dev
```

Open the dev server URL (usually http://localhost:5173) in your browser.

## Adding models

- Now the application is live go the url and you can register yourself and login to create models and gegnerate crud API's

- After creating model the folowwing API's are generated automatically
  - /api/\<modelName> Method : GET
    - Method : GET 
    - This  API provides lists of all the records created in that database model
  - /api/\<modelName>
    - Method : POST
    - This api accept the body and creates a new recordin database
    - The body should be valid json object containing all the required values for inserting a row in database (which is dynamic for every model)
    - Headers : this API need a authorization header 
        Authorization : "Bearer \<Your JWT Token>"
  - /api/\<modelname>
    - Method : PUT
    - This API is used to update records in the database for the model
    - Headers : this API need a authorization header 
        Authorization : "Bearer \<Your JWT Token>"
  - /api/\<modelname>/:id
    - Method : DELETE
    - This API is used to delete records in the database for the model
    - Headers : this API need a authorization header 
        Authorization : "Bearer \<Your JWT Token>"
    - It need the id of the record as aparameter ehich is to be deleted
  -/api/\<modelName>/:id
    - Method : GET
    - It provides a record with the id passed in parameter

- Note - JWT Token is stored inside the localhost of browser if you are using nackend API's then please register and login to frontend first and then you can use UI Dashboard to perform all the operation or use backend API's you have to registed and login as admin user to perform create , update , delete operation on the models user role can only view the records

## Limitations
- At the time when you create new models the routes are generated automatically and the model also get created in the database but prisma has this limitation that it can not proccess the model created at runtime so for this reason you have to reastart the server everytime you  create a new model 
