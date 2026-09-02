import Button from "../components/ui/Button";

export default function Home() {
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
        <p
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginTop: 20,
          }}
        >
          <Button to="/mentors">Find mentors</Button>
          <Button to="/about" variant="accent">
            How it works
          </Button>
        </p>
      </div>

      <h2 style={{ marginTop: 36 }}>How EduMatch works</h2>
      <div className="grid-3">
        <article className="card">
          <h3>1. Search</h3>
          <p className="muted">Browse mentors by subject, price and rating.</p>
        </article>
        <article className="card">
          <h3>2. Compare</h3>
          <p className="muted">Open a profile and check availability and reviews.</p>
        </article>
        <article className="card">
          <h3>3. Book</h3>
          <p className="muted">Submit a short form and track the booking.</p>
        </article>
      </div>
    </section>
  );
}
