# EduMatch

ICT930 Assignment 3 full-stack mentor booking platform for CIHE.

Students request a session with a date and time. Teachers paste a Teams, Zoom or Meet link and confirm. Admins manage student and teacher accounts. Bookings are stored in MySQL, not in the browser.

Team: Krishna Bahadur Budhathoki, Subodh Manandhar, Lok Raj Bhatta.

## Stack

- React 19 and React Router
- Express REST API
- MySQL (XAMPP) with users, mentors and bookings
- JWT login and bcrypt password hashes
- Roles: student, teacher, admin

## Run locally

1. Start MySQL in XAMPP.
2. Copy `backend/.env.example` to `backend/.env`.
3. Start the API:

```powershell
cd backend
npm install
node src/server.js
```

4. Start the website:

```powershell
cd frontend
npm install
node .\node_modules\vite\bin\vite.js
```

Open http://localhost:5173

| Role | Email | Password |
|---|---|---|
| Student | student@edumatch.test | Student123! |
| Teacher | anjali@edumatch.test | Teacher123! |
| Admin | admin@edumatch.test | Admin123! |

Admin password reset sets the password to `12346789`.

Assignment 2 frontend remains in the older commits. This README describes the Assignment 3 full-stack build.
