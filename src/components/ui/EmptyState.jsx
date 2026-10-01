import Button from "./Button.jsx";

export default function EmptyState({ title, message, actionTo, actionLabel }) {
  return (
    <div className="card empty">
      <h2>{title}</h2>
      <p className="muted">{message}</p>
      {actionTo && actionLabel ? <Button to={actionTo}>{actionLabel}</Button> : null}
    </div>
  );
}
