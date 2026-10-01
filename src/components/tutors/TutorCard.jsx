import { Link } from "react-router-dom";
import Button from "../ui/Button.jsx";

export default function TutorCard({ tutor }) {
  return (
    <article className="card tutor-card">
      <p className="eyebrow">{tutor.subject}</p>
      <h3>
        <Link to={`/mentors/${tutor.id}`}>{tutor.name}</Link>
      </h3>
      <p className="muted">{tutor.bio}</p>
      <p className="meta">
        <span>{tutor.rating.toFixed(1)} ★ ({tutor.reviews})</span>
        <span>${tutor.rate}/hr</span>
        <span>{tutor.mode}</span>
      </p>
      <div className="actions">
        <Button to={`/mentors/${tutor.id}`} variant="ghost">
          View profile
        </Button>
        <Button to={`/book/${tutor.id}`}>Book</Button>
      </div>
    </article>
  );
}
