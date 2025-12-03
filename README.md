# veterinary-interface

git clone https://github.com/eitanallal/veterinary-interface.git

cd veterinary-interface

## Install the db locally

Make sure that psql is in the path of the environment variables.

Delete the DB (if already exists)

`psql -U postgres -c "DROP DATABASE IF EXISTS veterinary_clinic"`

Create the DB

`psql -U postgres -c "CREATE DATABASE veterinary_clinic"`

Restore the DB
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
http://http://localhost:5173/
