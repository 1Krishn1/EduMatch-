# EduMatch full stack

ICT930 Assignment 3. React + Express + MySQL.

## Start MySQL

1. Open XAMPP.
2. Start MySQL. Apache is not needed.
3. Default user is `root` with an empty password. That matches `backend/.env.example`.

Copy the example env file once:

```powershell
copy backend\.env.example backend\.env
```

## One install, then run

```powershell
cd C:\Users\dvlne\edumatch\backend
npm install
cd ..\frontend
npm install
cd ..\backend
node src/server.js
```

Second terminal:

```powershell
cd C:\Users\dvlne\edumatch\frontend
node .\node_modules\vite\bin\vite.js
```

Open http://localhost:5173

The API creates the `edumatch` database and the three tables on first start. View them in http://localhost/phpmyadmin after you also start Apache.

| Role | Email | Password |
|---|---|---|
| Student | student@edumatch.test | Student123! |
| Teacher | anjali@edumatch.test | Teacher123! |
| Admin | admin@edumatch.test | Admin123! |
