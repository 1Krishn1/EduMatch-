import { useEffect, useState } from "react";
import Button from "../components/ui/Button.jsx";
import TutorCard from "../components/tutors/TutorCard.jsx";
import { loadTutors } from "../data/loadTutors.js";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    loadTutors().then((list) => setFeatured(list.slice(0, 3)));
  }, []);

  return (
    <section>
      <div className="hero">
        <p className="muted">Tutor and academic mentor booking</p>
        <h1>Find the right mentor. Book a session in minutes.</h1>
        <p className="muted">
          EduMatch helps students discover tutors by subject, compare ratings
          and rates, and book academic mentoring sessions from one simple
          frontend.
        </p>
        <p className="hero-actions">
          <Button to="/mentors">Find mentors</Button>
          <Button to="/about" variant="accent">
            How it works
          </Button>
        </p>
      </div>

      <h2 className="section-title">How EduMatch works</h2>
      <div className="grid-3">
        <article className="card">
          <h3>1. Search</h3>
          <p className="muted">Browse mentors by subject, price and rating.</p>
        </article>
        <article className="card">
          <h3>2. Compare</h3>
          <p className="muted">Open a profile and check availability and topics.</p>
        </article>
        <article className="card">
          <h3>3. Book</h3>
          <p className="muted">Submit a short form and track the booking.</p>
        </article>
      </div>

      {featured.length > 0 ? (
        <>
          <h2 className="section-title">Featured mentors</h2>
          <div className="grid-3">
            {featured.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}