import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ROLES = [
  { id: "student", label: "Student", hint: "Book mentors and manage your sessions", email: "student@edumatch.test", password: "Student123!" },
  { id: "teacher", label: "Teacher", hint: "See booking requests for your classes", email: "anjali@edumatch.test", password: "Teacher123!" },
  { id: "admin", label: "Admin", hint: "Manage student and teacher accounts", email: "admin@edumatch.test", password: "Admin123!" },
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const current = ROLES.find((r) => r.id === role);
  const [email, setEmail] = useState(current.email);
  const [password, setPassword] = useState(current.password);
  const [error, setError] = useState("");

  function pick(next) {
    const r = ROLES.find((x) => x.id === next);
    setRole(next);
    setEmail(r.email);
    setPassword(r.password);
    setError("");
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const user = await login(email, password, role);
      if (user.role === "admin") navigate("/admin/students");
      else if (user.role === "teacher") navigate("/teacher/requests");
      else navigate("/bookings");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="wrap" style={{ maxWidth: 520 }}>
      <p className="eyebrow">Sign in</p>
      <h1>Log in by role</h1>
      <p className="muted">Choose how you want to enter. The same email cannot open a different role.</p>
      <div className="role-tabs" role="tablist">
        {ROLES.map((r) => (
          <button key={r.id} type="button" className={role === r.id ? "role-tab active" : "role-tab"} onClick={() => pick(r.id)}>
            {r.label}
          </button>
        ))}
      </div>
      <p className="banner">{current.hint}<br />Demo: {current.email} / {current.password}</p>
      <form className="form-card stack" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="btn btn-gold">Log in as {current.label.toLowerCase()}</button>
        <p className="muted">Students can also <Link to="/register">create an account</Link>. Teachers are issued by admin.</p>
      </form>
    </div>
  );
}
