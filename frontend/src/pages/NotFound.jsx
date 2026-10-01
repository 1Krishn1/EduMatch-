import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="wrap empty">
      <h1>Page not found</h1>
      <p className="muted">That route is not part of EduMatch.</p>
      <Link className="btn" to="/">Back home</Link>
    </div>
  );
}
