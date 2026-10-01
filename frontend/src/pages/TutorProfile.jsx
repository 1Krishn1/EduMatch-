import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api/client.js";

export default function TutorProfile() {
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api(`/api/mentors/${id}`).then(setMentor).catch((e) => setError(e.message));
  }, [id]);

  if (error) return <div className="wrap"><p className="error">{error}</p></div>;
  if (!mentor) return <div className="wrap"><p className="muted">Loading profile…</p></div>;

  return (
    <div className="wrap profile">
      <section className="card">
        <p className="eyebrow">{mentor.subject}</p>
        <h1>{mentor.name}</h1>
        <p className="meta">
          <span>{mentor.mode}</span>
          <span>★ {mentor.rating}</span>
          <span className="price">${mentor.rate} / hour</span>
        </p>
        <p>{mentor.bio}</p>
        <p className="muted">{mentor.experience} · {mentor.availability}</p>
        <div className="chips">
          {(mentor.tags || []).map((t) => <span className="chip" key={t}>{t}</span>)}
        </div>
        <div className="actions">
          <Link className="btn btn-gold" to={`/book/${mentor.id}`}>Book this mentor</Link>
          <Link className="btn btn-ghost" to="/mentors">Back to list</Link>
        </div>
      </section>
      <aside className="card">
        <h3>What a session covers</h3>
        <p className="muted">Bring the assignment brief, a draft, or the question you are stuck on. Sessions are 60 minutes unless you agree otherwise with the mentor.</p>
        <h3>Need an account?</h3>
        <p className="muted">Booking requires login so the session is saved against your student record.</p>
      </aside>
    </div>
  );
}
