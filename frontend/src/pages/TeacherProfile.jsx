import { useEffect, useState } from "react";
import { api } from "../api/client.js";

export default function TeacherProfile() {
  const [form, setForm] = useState(null);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    api("/api/teacher/me").then((data) => {
      const m = data.mentor || {};
      setForm({
        name: data.user.name,
        phone: data.user.phone || "",
        subject: m.subject || "",
        mode: m.mode || "Online",
        rate: m.rate || 40,
        experience: m.experience || "",
        bio: m.bio || "",
        availability: m.availability || "",
        tags: (m.tags || []).join(", "),
      });
    });
  }, []);

  if (!form) return <div className="wrap"><p>Loading…</p></div>;

  async function save(e) {
    e.preventDefault();
    setErr(""); setMsg("");
    try {
      await api("/api/teacher/profile", {
        method: "PUT",
        body: JSON.stringify({ ...form, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean) }),
      });
      setMsg("Profile published to the mentor catalogue.");
    } catch (e2) { setErr(e2.message); }
  }

  return (
    <div className="wrap" style={{ maxWidth: 640 }}>
      <p className="eyebrow">Teacher</p>
      <h1>Public teaching profile</h1>
      {msg && <p className="ok">{msg}</p>}
      {err && <p className="error">{err}</p>}
      <form className="form-card stack" onSubmit={save}>
        {["name", "phone", "subject", "experience", "availability", "bio", "tags"].map((key) => (
          <div className="field" key={key}>
            <label>{key}</label>
            {key === "bio" ? (
              <textarea rows="4" value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
            ) : (
              <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
            )}
          </div>
        ))}
        <div className="field">
          <label>Mode</label>
          <select value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}>
            <option>Online</option>
            <option>Hybrid</option>
            <option>In person</option>
          </select>
        </div>
        <div className="field">
          <label>Rate (AUD / hour)</label>
          <input type="number" value={form.rate} onChange={(e) => setForm({ ...form, rate: e.target.value })} />
        </div>
        <button className="btn btn-gold">Save profile</button>
      </form>
    </div>
  );
}
