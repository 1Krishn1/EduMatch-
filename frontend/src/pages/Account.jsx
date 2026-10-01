import { useState } from "react";
import { api } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Account() {
  const { user, persistUser } = useAuth();
  const [profile, setProfile] = useState({ name: user.name, email: user.email, phone: user.phone || "" });
  const [pass, setPass] = useState({ currentPassword: "", newPassword: "" });
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function saveProfile(e) {
    e.preventDefault();
    setErr(""); setMsg("");
    try {
      const data = await api("/api/auth/profile", { method: "PATCH", body: JSON.stringify(profile) });
      persistUser(data.user);
      setMsg("Profile saved.");
    } catch (e2) { setErr(e2.message); }
  }

  async function savePassword(e) {
    e.preventDefault();
    setErr(""); setMsg("");
    try {
      await api("/api/auth/password", { method: "PATCH", body: JSON.stringify(pass) });
      setPass({ currentPassword: "", newPassword: "" });
      setMsg("Password changed.");
    } catch (e2) { setErr(e2.message); }
  }

  return (
    <div className="wrap" style={{ maxWidth: 640 }}>
      <p className="eyebrow">{user.role} account</p>
      <h1>Your details</h1>
      <p className="muted">ID #{user.id} — this is the number admin and teachers see.</p>
      {msg && <p className="ok">{msg}</p>}
      {err && <p className="error">{err}</p>}
      <form className="form-card stack" onSubmit={saveProfile}>
        <div className="field"><label>Full name</label><input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></div>
        <div className="field"><label>Email</label><input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} /></div>
        <div className="field"><label>Phone</label><input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} /></div>
        <button className="btn">Save profile</button>
      </form>
      <form className="form-card stack" style={{ marginTop: 16 }} onSubmit={savePassword}>
        <h3>Change password</h3>
        <div className="field"><label>Current password</label><input type="password" value={pass.currentPassword} onChange={(e) => setPass({ ...pass, currentPassword: e.target.value })} /></div>
        <div className="field"><label>New password</label><input type="password" value={pass.newPassword} onChange={(e) => setPass({ ...pass, newPassword: e.target.value })} /></div>
        <button className="btn btn-ghost">Update password</button>
      </form>
    </div>
  );
}
