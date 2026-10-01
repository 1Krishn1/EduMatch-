import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client.js";
import TutorCard from "../components/tutors/TutorCard.jsx";

export default function Home() {
  const [mentors, setMentors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/api/mentors")
      .then((list) => setMentors(list.slice(0, 3)))
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="wrap">
      <section className="hero">
        <div>
          <p className="eyebrow">Academic mentoring</p>
          <h1>Find a mentor who already survived the assignment.</h1>
          <p className="lede">
            EduMatch books working tutors and academic mentors for university students —
            subject filters, real profiles, and a confirmed session in one place.
          </p>
          <div className="actions">
            <Link className="btn btn-gold" to="/mentors">Browse mentors</Link>
            <Link className="btn btn-ghost" to="/register">Create a free account</Link>
          </div>
        </div>
        <aside className="hero-panel">
          <p className="eyebrow" style={{ color: "#f3e2c5" }}>This week</p>
          <h2 className="serif" style={{ margin: "0 0 8px", fontSize: "2rem" }}>Sessions that fit night-study hours.</h2>
          <p style={{ color: "rgba(255,255,255,0.75)" }}>
            Online, hybrid or campus. Rates shown before you book. Cancel from My bookings.
          </p>
          <div className="stat-row">
            <div className="stat"><b>6</b><span>seeded mentors</span></div>
            <div className="stat"><b>JWT</b><span>secure login</span></div>
            <div className="stat"><b>CRUD</b><span>live SQLite</span></div>
          </div>
        </aside>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Featured</p>
            <h2>Mentors students actually book</h2>
          </div>
          <Link to="/mentors">See all →</Link>
        </div>
        {error && <p className="error">{error} — start the backend on port 5050.</p>}
        <div className="grid-3">
          {mentors.map((m) => <TutorCard key={m.id} mentor={m} />)}
        </div>
      </section>

      <section className="section grid-3">
        <article className="card">
          <p className="eyebrow">01</p>
          <h3>Search a subject</h3>
          <p className="muted">Filter by database, security, writing or cloud. See rate and mode before you commit.</p>
        </article>
        <article className="card">
          <p className="eyebrow">02</p>
          <h3>Book with an account</h3>
          <p className="muted">Register once. Bookings are stored on the server against your user, not only in the browser.</p>
        </article>
        <article className="card">
          <p className="eyebrow">03</p>
          <h3>Manage the diary</h3>
          <p className="muted">Open My bookings to review or cancel. Admins can add and edit the mentor catalogue.</p>
        </article>
      </section>
    </div>
  );
}
