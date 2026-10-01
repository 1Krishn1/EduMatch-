import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await register(form);
      navigate("/mentors");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="wrap" style={{ maxWidth: 480 }}>
      <p className="eyebrow">Account</p>
      <h1>Create your EduMatch profile</h1>
      <form className="form-card stack" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div className="field">
          <label htmlFor="password">Password (min 8 characters)</label>
          <input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="btn btn-gold">Register</button>
        <p className="muted">Already have an account? <Link to="/login">Log in</Link></p>
      </form>
    </div>
  );
}
