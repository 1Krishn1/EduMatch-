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

## Start the site

Do not use `npm install` unless a package is missing. Run each line on its own.

Terminal 1:

```powershell
cd C:\Users\dvlne\edumatch\backend
& "C:\Program Files\nodejs\node.exe" src/server.js
```

Terminal 2:

```powershell
cd C:\Users\dvlne\edumatch\frontend
& "C:\Program Files\nodejs\node.exe" .\node_modules\vite\bin\vite.js
```

Open http://localhost:5173

The API creates the `edumatch` database and the three tables on first start. View them in http://localhost/phpmyadmin after you also start Apache.

| Role | Email | Password |
|---|---|---|
| Student | student@edumatch.test | Student123! |
| Teacher | anjali@edumatch.test | Teacher123! |
| Admin | admin@edumatch.test | Admin123! |
