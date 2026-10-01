import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/ui/Button.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import { loadTutors } from "../data/loadTutors.js";

export default function TutorProfile() {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;
    loadTutors().then((list) => {
      if (!active) return;
      setTutor(list.find((item) => item.id === id) || null);
      setStatus("ready");
    });
    return () => {
      active = false;
    };
  }, [id]);

  if (status === "loading") return <Spinner label="Loading profile..." />;
  if (!tutor) {
    return (
      <EmptyState
        title="Mentor not found"
        message="That profile is not in the current mentor list."
        actionTo="/mentors"
        actionLabel="Back to mentors"
      />
    );
  }

  return (
    <section className="profile">
      <p>
        <Link to="/mentors">← All mentors</Link>
      </p>
      <article className="card">
        <p className="eyebrow">{tutor.subject}</p>
        <h1>{tutor.name}</h1>
        <p className="muted">{tutor.bio}</p>
        <p className="meta">
          <span>{tutor.rating.toFixed(1)} ★ ({tutor.reviews} reviews)</span>
          <span>${tutor.rate} per hour</span>
          <span>{tutor.mode}</span>
          <span>{tutor.availability}</span>
        </p>
        <p>
          {(tutor.topics || []).map((topic) => (
            <span key={topic} className="chip">
              {topic}
            </span>
          ))}
        </p>
        <Button to={`/book/${tutor.id}`}>Book this mentor</Button>
      </article>
    </section>
  );
}
