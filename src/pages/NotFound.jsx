import EmptyState from "../components/ui/EmptyState.jsx";

export default function NotFound() {
  return (
    <EmptyState
      title="Page not found"
      message="That link is not part of EduMatch."
      actionTo="/"
      actionLabel="Back home"
    />
  );
}
