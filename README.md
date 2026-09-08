# EduMatch

Tutor and academic mentor booking platform.

**ICT930 Advanced Web Application Development — Assignment 2**  
Crown Institute of Higher Education (CIHE), Master of IT, Semester 2 2026

EduMatch is a **frontend-only** React app. Students can search mentors, open a profile, book a session and cancel bookings. Mentor data comes from local JSON. Bookings stay in the browser with React Context and `localStorage`.

| Item | Link |
|---|---|
| GitHub | https://github.com/1Krishn1/EduMatch- |
| Live site | https://edu-match-theta.vercel.app |
| Framework | React 19 + Vite + React Router 7 |

---

## Team

| Member | Responsibility |
|---|---|
| **Krishna Bahadur Budhathoki** | Project setup, layout (Header, Footer, Layout), theme CSS, routing (`App.jsx`), Home, About, shared UI, documentation |
| **Subodh** | Mentor data (`tutors.json`, `loadTutors.js`), Find Mentors, search / filters / sort, tutor cards, tutor profile |
| **Lokesh (Lok Raj Bhatta)** | `BookingContext`, booking form and validation, My Bookings, booking components, `vercel.json`, Vercel deploy |

---

## Technology stack

- **HTML** — semantic structure (header, main, footer, forms, labels)
- **CSS** — design tokens, layout, cards, responsive rules
- **JavaScript** — filters, validation, async load, booking updates
- **React 19** — functional components and hooks (`useState`, `useEffect`, `useMemo`, `useContext`)
- **React Router 7** — client-side multi-page navigation
- **Context API** — shared booking state
- **Vite 8** — development server and production build
- **Mock JSON** — `src/data/tutors.json` loaded through a short Promise
- **Git + GitHub** — team version control
- **Vercel** — public hosting

No backend, database or payment API. This matches the assignment option to use mock data.

---

## Pages and routes

| Route | Page | Owner |
|---|---|---|
| `/` | Home — product story, how it works, featured mentors | Krishna |
| `/mentors` | Find Mentors — search, subject, mode, sort | Subodh |
| `/mentors/:id` | Tutor profile | Subodh |
| `/book` | Book a session | Lokesh |
| `/book/:tutorId` | Book a session with mentor pre-selected | Lokesh |
| `/bookings` | My Bookings — list and cancel | Lokesh |
| `/about` | About EduMatch | Krishna |
| `*` | Not Found | Krishna |

All routes render inside a shared `Layout` (header + main + footer).

---

## Key features

- Multi-page routing with a persistent teal header
- Reusable layout, UI, tutor and booking components
- Shared booking state in `BookingContext`
- Bookings persist after refresh (`localStorage`)
- Async mentor load with loading, error and empty states
- Search, subject filter, mode filter and sort
- Featured mentors on Home
- Booking form validation (name, email, subject, date, notes)
- Cancel a booking from My Bookings
- Responsive layout for desktop and mobile
- Skip link and labelled form fields
- SPA rewrite on Vercel so refresh on `/mentors` does not 404

---

## Design decisions

- **Frontend only** so the marker can assess UI, routing and state without a server.
- **Folder-by-concern** (`layout`, `ui`, `tutors`, `booking`) instead of one large page file.
- **`App.jsx` is routes only.** Feature code lives in page and component files so three people can work without overwriting the shell.
- **`BookingProvider` wraps the app in `main.jsx`**, not by replacing the EduMatch navigation with a two-link demo.
- **`loadTutors()` returns a Promise** (short delay) so loading state is visible, as the brief requires asynchronous data handling.
- **CSS variables** (`#1C4A4E` teal, `#F6F3EE` cream) keep one visual language across members.
- **`vercel.json`** rewrites all paths to `index.html` for React Router.

---

## Project structure

```text
edumatch/
  public/
  src/
    assets/
    components/
      layout/          Header.jsx  Footer.jsx  Layout.jsx
      ui/              Button.jsx  Spinner.jsx  EmptyState.jsx
      tutors/          FilterBar.jsx  TutorCard.jsx  TutorList.jsx
      booking/         BookingForm.jsx  BookingCard.jsx
    context/           BookingContext.jsx
    data/              tutors.json  loadTutors.js
    pages/             Home  About  Mentors  TutorProfile
                       BookSession  MyBookings  NotFound
    styles/            variables.css
    App.jsx            routes
    main.jsx           BrowserRouter + BookingProvider
    index.css
  index.html
  package.json
  vite.config.js
  vercel.json
  README.md
```

---

## Install and run

You need **Node.js 18 or newer**.

```bash
git clone https://github.com/1Krishn1/EduMatch-.git
cd EduMatch-
npm install
npm run dev
```

Open the URL Vite prints, usually `http://localhost:5173`.

Production build:

```bash
npm run build
npm run preview
```

If `npm run dev` fails on Windows because of a broken script shell, start Vite directly:

```bash
node .\node_modules\vite\bin\vite.js
```

---

## Deploy

The site is hosted on Vercel from the `main` branch.

- Live URL: https://edu-match-theta.vercel.app
- Config: `vercel.json` (SPA rewrite)

To deploy a new copy:

```bash
npx vercel
```

A new push to `main` rebuilds the connected Vercel project.

---

## How we worked

1. Create Vite + React project and GitHub repo.
2. Build the shared shell (layout, theme, routes, Home, About).
3. Add mentor discovery (JSON, filters, profile).
4. Add booking state, form validation and My Bookings.
5. Connect Vercel and add the SPA rewrite.
6. Write README, reflection report and screenshots for submission.

VS Code does not update GitHub by itself. After a change:

```bash
git pull
git add .
git commit -m "Short description"
git push
```

---

## Assignment mapping

| Brief requirement | Where it is in EduMatch |
|---|---|
| React functional components and hooks | All pages and context |
| Client-side routing | `src/App.jsx` |
| Layout / UI / feature components | `src/components/` |
| Local + shared state | Page hooks + `BookingContext` |
| Mock data + async load | `src/data/` |
| Loading and error states | Mentors page, Spinner, EmptyState |
| Forms with validation | Book Session |
| Dynamic UI (search, filters) | Find Mentors |
| Responsive design | `src/index.css` media queries |
| Public URL | Vercel link above |

---

## Licence / use

Student assessment work for ICT930 Assignment 2. Not a commercial product.
