// SUBODH: turn this into a real mentor card (name, subject, rate, rating).
import { Link } from "react-router-dom";

export default function TutorCard({ tutor }) {
  const id = tutor?.id ?? "1";
  const name = tutor?.name ?? "Tutor name";

  return (
    <article className="card">
      <h3>{name}</h3>
      <p className="muted">Subodh — add subject, rate and rating.</p>
      <Link to={`/mentors/${id}`}>View profile</Link>
    </article>
  );
}
