# EduMatch

ICT930 Assessment 3 full-stack mentor booking platform for Crown Institute of Higher Education.

EduMatch replaces scattered tutoring chats with one desk. A student does not need a teacher name. They browse the live mentor catalogue, filter by subject or mode, open a profile, and request a session with a date and time. The teacher logs in, sees only requests for their own classes, pastes a Teams, Zoom or Google Meet link, and confirms. The student then sees that link on My bookings and can open it. If the site is open near the session time, a banner tells them the meeting is ready. An admin sees student IDs and teacher IDs on separate screens, can reset a forgotten password, and can add or delete mentors. Admin does not book sessions.

Team: Krishna Bahadur Budhathoki, Subodh Manandhar, Lok Raj Bhatta.

Lecturer: Dr Layla Boroon. Submission: 4 October 2026.

Repository: https://github.com/1Krishn1/EduMatch-

## What problem it solves

University mentoring still runs through discussion boards and word of mouth. Rates, availability and history are buried in messages. A teacher has no request queue. An administrator cannot see an account ID or reset a forgotten password. EduMatch stores the request against both the student record and the teacher record.

The closest approved domain in the brief is community health services booking: a person books a provider for a time slot.

## Roles

| Role | What they can do |
|---|---|
| Student | Browse mentors, open a profile, register, book a date and time, see status and the meeting link, cancel, edit name, email and phone |
| Teacher | Log in, see only their requests, read the student ID and email, paste a meeting link, confirm or decline, edit their public profile |
| Admin | See student IDs and teacher IDs, reset a password to `12346789`, add or delete mentors. No booking diary |

A student email cannot open the teacher tab. A missing login token returns 401. A wrong role returns 403.

## How a booking moves

1. The student opens Mentors. This list is public and comes from MySQL, not a static JSON file.
2. They log in on the Student tab and submit a date, time and notes. The row is saved as pending.
3. The teacher opens Requests, pastes a link that starts with http, and confirms. Confirm is blocked if the link is missing.
4. The student opens My bookings and clicks the link.

Status values are pending, confirmed, declined and cancelled.

## Technology stack

- React 19 and React Router 7 for the pages
- Vite development server on port 5173
- Express REST API on port 5050
- MySQL database named `edumatch`, created through XAMPP and viewed in phpMyAdmin
- JWT sessions and bcrypt password hashes

The React client never writes the database. It sends JSON with a Bearer token. Express checks the token and the role, then runs SQL. Errors return JSON with 400, 401, 403 or 404, not an HTML error page.

## Database

Three tables, linked by foreign keys.

| Table | Main columns |
|---|---|
| users | id, name, email, password_hash, role, phone |
| mentors | id, user_id, name, subject, mode, rate, rating, bio, tags, availability |
| bookings | id, user_id, mentor_id, subject, session_date, session_time, notes, status, meeting_link |

`user_id` on mentors links a teacher login to their public profile. The API creates the database and tables on first start, and seeds demo accounts only when the tables are empty.

## Pages

- Home
- Mentors, with search, subject filter and mode filter
- Mentor profile
- Book, with date and time
- My bookings
- About
- Login with Student, Teacher and Admin tabs
- Register
- Account
- Teacher requests and teacher profile
- Admin students, admin teachers and admin catalogue

The layout collapses to one column under 900px. Forms have labels and the shell has a skip link.

## Demo accounts

| Role | Email | Password |
|---|---|---|
| Student | student@edumatch.test | Student123! |
| Teacher | anjali@edumatch.test | Teacher123! |
| Admin | admin@edumatch.test | Admin123! |

Other teachers use the same password `Teacher123!`: james@edumatch.test, priya@edumatch.test, daniel@edumatch.test, sofia@edumatch.test, ravi@edumatch.test.

Admin password reset sets the password to `12346789`.

## Run locally

Do not paste `npm install` from this page. On this Windows laptop, npm reads the root `package.json` and stops. The modules are already installed. Start MySQL in XAMPP first, then use two terminals.

Terminal 1, the API:

```powershell
cd C:\Users\dvlne\edumatch\backend
node src/server.js
```

Terminal 2, the website:

```powershell
cd C:\Users\dvlne\edumatch\frontend
node .\node_modules\vite\bin\vite.js
```

Open http://localhost:5173

The first terminal should print `MySQL connected` and `EduMatch API running on http://localhost:5050`.

To see the tables, start Apache in XAMPP as well, open http://localhost/phpmyadmin and select the `edumatch` database. The tables are `users`, `mentors` and `bookings`.

Copy `backend/.env.example` to `backend/.env` only if that file is missing. Default user is `root` with an empty password.

## Project structure

```text
backend/
  src/server.js
  src/db/mysql.js
  src/middleware/auth.js
  src/routes/   auth, mentors, bookings, teacher, admin
frontend/
  src/pages/
  src/components/
  src/context/AuthContext.jsx
  src/api/client.js
```

## Out of scope

Payments, confirmation email, and a public hosted API. The Week 12 demo runs on the laptop: site on port 5173, API on port 5050, MySQL in XAMPP. Each laptop has its own database.
