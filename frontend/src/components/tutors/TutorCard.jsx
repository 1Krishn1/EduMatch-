import { Link } from "react-router-dom";

function initials(name) {
  return name.split(" ").slice(0, 2).map((p) => p[0]).join("");
}

export default function TutorCard({ mentor }) {
  return (
    <article className="tutor">
      <div className="tutor-top">
        <div className="avatar" aria-hidden="true">{initials(mentor.name)}</div>
      </div>
      <div className="tutor-body">
        <p className="eyebrow">{mentor.subject}</p>
        <h3>{mentor.name}</h3>
        <p className="meta">
          <span>{mentor.mode}</span>
          <span>★ {mentor.rating}</span>
          <span className="price">${mentor.rate}/hr</span>
        </p>
        <p className="muted">{mentor.experience}</p>
        <div className="chips">
          {(mentor.tags || []).slice(0, 3).map((t) => <span className="chip" key={t}>{t}</span>)}
        </div>
        <div className="actions" style={{ marginTop: "auto" }}>
          <Link className="btn btn-ghost" to={`/mentors/${mentor.id}`}>Profile</Link>
          <Link className="btn" to={`/book/${mentor.id}`}>Book</Link>
        </div>
      </div>
    </article>
  );
}
