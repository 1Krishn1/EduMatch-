export default function EmptyState({ title, message }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p className="muted">{message}</p>
    </div>
  );
}
