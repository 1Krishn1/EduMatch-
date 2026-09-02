// SUBODH: replace this page. Use useParams() to read :id
import { useParams, Link } from "react-router-dom";
import EmptyState from "../components/ui/EmptyState";

export default function TutorProfile() {
  const { id } = useParams();

  return (
    <section>
      <h1>Tutor Profile</h1>
      <p className="muted">Subodh — show tutor {id} here.</p>
      <EmptyState
        title="Profile coming soon"
        message="Load the tutor by id. Add a Book button that goes to /book/TUTOR_ID."
      />
      <p style={{ marginTop: 16 }}>
        <Link to="/mentors">Back to mentors</Link>
      </p>
    </section>
  );
}
