export default function Spinner({ label = "Loading..." }) {
  return (
    <p className="muted" role="status">
      {label}
    </p>
  );
}
