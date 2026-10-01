export default function About() {
  return (
    <div className="wrap">
      <p className="eyebrow">The studio</p>
      <h1>A booking desk built for three kinds of people.</h1>
      <p className="lede">
        EduMatch started as a frontend catalogue for ICT930 Assignment 2. Assignment 3 turns it into a
        working desk: students request help, teachers accept the request, and an admin keeps the accounts honest.
      </p>
      <div className="grid-3">
        <article className="card">
          <p className="eyebrow">Students</p>
          <h3>Find help without a group-chat hunt</h3>
          <p className="muted">Search by subject, open a profile, request a session. Track status — pending, confirmed, declined — and update your own contact details.</p>
        </article>
        <article className="card">
          <p className="eyebrow">Teachers</p>
          <h3>See who asked for your time</h3>
          <p className="muted">Each mentor has a login. Incoming requests list the student ID, email and notes. Confirm or decline. Edit rate, bio and availability.</p>
        </article>
        <article className="card">
          <p className="eyebrow">Admin</p>
          <h3>Accounts, not a diary</h3>
          <p className="muted">Admin does not book sessions. They see student IDs and teacher IDs in separate lists and can reset a forgotten password.</p>
        </article>
      </div>
      <section className="section grid-2">
        <article className="card">
          <h3>Why this problem exists</h3>
          <p>University students in Australia still arrange tutoring through WhatsApp forwards. Rates are unclear, history disappears, and a lecturer cannot see demand. EduMatch stores the request against both the student record and the teacher record.</p>
        </article>
        <article className="card">
          <h3>How the stack is split</h3>
          <p>The React client never writes the database. It calls a REST API. Express validates input, JWT identifies the role, and SQLite keeps users, mentors and bookings after refresh. That is the difference from Assignment 2 localStorage.</p>
        </article>
        <article className="card">
          <h3>Security we implemented</h3>
          <p>Passwords are hashed with bcrypt. Tokens expire in seven days. Booking create is student-only. Teacher request lists are scoped to that teacher’s mentor row. Admin password reset cannot target another admin.</p>
        </article>
        <article className="card">
          <h3>What we would add next</h3>
          <p>Email when a request is confirmed, calendar slots, Stripe deposits, and moving SQLite to PostgreSQL on a hosted server so three teammates are not sharing one file.</p>
        </article>
      </section>
    </div>
  );
}
