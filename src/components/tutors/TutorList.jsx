// SUBODH: map tutors to TutorCard here.
import TutorCard from "./TutorCard";

export default function TutorList({ tutors = [] }) {
  if (tutors.length === 0) {
    return <p className="muted">No tutors to show yet.</p>;
  }

  return (
    <div className="grid-3">
      {tutors.map((tutor) => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  );
}
