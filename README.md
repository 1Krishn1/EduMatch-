# EduMatch

Frontend booking site for tutors and academic mentors. Built for ICT930 Assignment 2 with React and Vite.

Students can search mentors, open a profile, book a session and cancel bookings. Mentor data comes from local JSON. Bookings stay in the browser with `localStorage`.

## Technology stack

- React 19 (functional components and hooks)
- React Router 7
- Vite
- Context API for shared booking state
- Mock JSON data with a short async load

## Install and run

You need Node.js 18 or newer.

```bash
cd edumatch
npm install
npm run dev
```

Then open the local URL Vite prints, usually `http://localhost:5173`.

Build for production:

```bash
npm run build
npm run preview
```

## Key features

- Multi-page routing: Home, Mentors, Mentor profile, Book, My Bookings, About
- Reusable layout, cards, filters, form and buttons
- Shared booking state in `BookingContext`
- Search, subject filter, mode filter and sort
- Loading and empty states
- Booking form validation
- Responsive layout for desktop and mobile
- Skip link and labelled form fields

## Main design decisions

- Keep the app frontend-only so it can be marked without a backend.
- Load `src/data/tutors.json` through a small promise so loading state is visible.
- Save bookings in `localStorage` so a refresh does not wipe the list.
- Split UI into layout, feature and shared components instead of one large page file.

## Project structure

```
src/
  components/layout|tutors|booking|ui
  context/BookingContext.jsx
  data/tutors.json
  pages/
  styles/
```

## Deployed URL

Add the public URL here after you deploy to Vercel or Netlify.

Vercel is already set up with `vercel.json` so page refresh on routes like `/mentors` still works.

```bash
npx vercel
```
