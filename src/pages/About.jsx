export default function About() {
  return (
    <section>
      <h1>About EduMatch</h1>
      <p>
        EduMatch is a frontend booking platform for tutors and academic
        mentors. Students can discover mentors, view profiles and request a
        session. This version is frontend-only: mentor data is loaded from mock
        JSON and bookings are stored in the browser.
      </p>
      <div className="grid-3" style={{ marginTop: 24 }}>
        <article className="card">
          <h3>Students</h3>
          <p className="muted">
            Search, filter and book support for assignments and exams.
          </p>
        </article>
        <article className="card">
          <h3>Mentors</h3>
          <p className="muted">Show subjects, rates and availability in one profile.</p>
        </article>
        <article className="card">
          <h3>This assignment</h3>
          <p className="muted">
            Built with React, React Router and component-based UI for ICT930.
          </p>
        </article>
      </div>
    </section>
  );
}
