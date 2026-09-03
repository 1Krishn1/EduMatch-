import TutorCard from "./TutorCard.jsx";
import EmptyState from "../ui/EmptyState.jsx";

export default function TutorList({ tutors = [] }) {
  if (tutors.length === 0) {
    return (
      <EmptyState
        title="No mentors match those filters"
        message="Try another subject, clear the search, or choose Any mode."
      />
    );
  }

  return (
    <div className="grid-3">
      {tutors.map((tutor) => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  );
}
