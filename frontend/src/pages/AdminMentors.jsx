import { useEffect, useState } from "react";
import { api } from "../api/client.js";

const blank = { name: "", subject: "Software Engineering", mode: "Online", rate: 40, rating: 4.5, experience: "", bio: "", availability: "Flexible", tags: "React, SQL" };

export default function AdminMentors() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState(blank);
  const [error, setError] = useState("");

  function load() {
    api("/api/mentors").then(setList);
  }
  useEffect(load, []);

  async function create(e) {
    e.preventDefault();
    setError("");
    try {
      await api("/api/mentors", {
        method: "POST",
        body: JSON.stringify({ ...form, rate: Number(form.rate), rating: Number(form.rating), tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean) }),
      });
      setForm(blank);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    await api(`/api/mentors/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="wrap">
      <p className="eyebrow">Admin</p>
      <h1>Mentor catalogue</h1>
      <div className="grid-2">
        <form className="form-card stack" onSubmit={create}>
          <h3>Add mentor</h3>
          {["name", "subject", "experience", "availability", "bio", "tags"].map((key) => (
            <div className="field" key={key}>
              <label htmlFor={key}>{key}</label>
              {key === "bio" ? (
                <textarea id={key} rows="3" value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required={key !== "tags"} />
              ) : (
                <input id={key} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required={key !== "tags"} />
              )}
            </div>
          ))}
          <div className="field">
            <label htmlFor="mode">Mode</label>
            <select id="mode" value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}>
              <option>Online</option>
              <option>Hybrid</option>
              <option>In person</option>
            </select>
          </div>
          {error && <p className="error">{error}</p>}
          <button className="btn">Save mentor</button>
        </form>
        <div className="stack">
          {list.map((m) => (
            <article className="booking" key={m.id}>
              <div>
                <h3>{m.name}</h3>
                <p className="muted">{m.subject} · {m.mode} · ${m.rate}</p>
              </div>
              <button className="btn btn-danger" type="button" onClick={() => remove(m.id)}>Delete</button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
