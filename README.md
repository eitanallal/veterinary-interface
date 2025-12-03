# veterinary-interface

## Download the project

`git clone https://github.com/eitanallal/veterinary-interface.git`

`cd veterinary-interface`

## Install the db locally

Make sure that psql is in the path of the environment variables.
If required:

- username has to be postgres
- password has to be postgres

### Delete the DB (if already exists)

`psql -U postgres -c "DROP DATABASE IF EXISTS veterinary_clinic"`

### Create the DB

`psql -U postgres -c "CREATE DATABASE veterinary_clinic"`

### Restore the DB

`pg_restore -U postgres -d veterinary_clinic -v ./veterinary_db.sql`

## Install and run backend

```
cd backend
npm i
npx ts-node .\src\server.ts
```

## Install and run backend

On another terminal

```
cd frontend
npm i
npm run dev
```

To access the website, in a browser go to URL
http://localhost:5173/

# Specifications

To develop the project, I first started with a database in postgresDB. Using a relational database was the natural decision to take for this project given the format of the data that we want to store.

Once the DB was implemented, I started working on the server. It was imposed to use NodeJS with express. This is actually a very rational decision. That API is pretty straightforward, and only requires a few routes. I decided to use Sequelize for my ORM, because it is pretty easy to use, has all of the required functionalities and is widespread. I created a an mvp version of the server, leaving some features for further improvements (for example using env variables).
Once the backend was ready (and fully tested with postman), I moved on to the frontend. It was imposed to use Vue (even though I am more used to react).
The client was very straightforward to develop with few routes. I decided to use tailwind for styling as it allows to use the full css capabilities, with more readable code. Toasts allow a better user experience when creating animals/events.

During the whole project, everything was written using typescript. I paid attention to be very strict with types, maintaining a high code quality (in the limit of what is doable in a few hours).
Finally, I made some installations tests, to make sure that the installation will work on another side. It would have been preferable to use Docker, but to keep the project minimalist (and because the installations commands are quick to run), I decided not to create the dockerfiles and docker compose.

If you have any trouble during installation or features not working while using the software, please reach out to me
