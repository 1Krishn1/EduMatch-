export default function Spinner({ label = "Loading mentors..." }) {
  return (
    <div className="card" role="status" aria-live="polite">
      <p className="muted">{label}</p>
    </div>
  );
}
