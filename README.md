# EduMatch

EduMatch is a mentor booking desk for university students. A student searches by subject, not by a teacher name, then requests a session with a date and time. The teacher pastes a Teams, Zoom or Meet link and confirms. The student opens that link from My bookings. An admin sees student and teacher IDs and can reset a forgotten password. Admin does not book sessions.

Built for ICT930 Assessment 3 at CIHE. The React site never writes the database. It calls an Express API. MySQL stores users, mentors and bookings.

Team: Krishna Bahadur Budhathoki, Subodh Manandhar, Lok Raj Bhatta.

GitHub: https://github.com/1Krishn1/EduMatch-

## Stack

- React 19 and React Router
- Express REST API
- MySQL through XAMPP, viewed in phpMyAdmin
- JWT login and bcrypt password hashes

## Run

1. Start MySQL in XAMPP.
2. Copy `backend/.env.example` to `backend/.env`.
3. Start the API: `cd backend` then `node src/server.js`.
4. Start the site: `cd frontend` then `node .\node_modules\vite\bin\vite.js`.
5. Open http://localhost:5173

| Role | Email | Password |
|---|---|---|
| Student | student@edumatch.test | Student123! |
| Teacher | anjali@edumatch.test | Teacher123! |
| Admin | admin@edumatch.test | Admin123! |

Admin password reset sets the password to `12346789`.
