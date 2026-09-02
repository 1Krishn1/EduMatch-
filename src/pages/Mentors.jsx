// SUBODH: replace this page with the mentor list, search and filters.
import EmptyState from "../components/ui/EmptyState";

export default function Mentors() {
  return (
    <section>
      <h1>Find Mentors</h1>
      <p className="muted">Subodh — build search, filters and tutor cards here.</p>
      <EmptyState
        title="Mentor list coming soon"
        message="Load tutors.json, show loading/error states, then list TutorCard items."
      />
    </section>
  );
}
