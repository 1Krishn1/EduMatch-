import { useEffect, useState } from "react";
import { api } from "../api/client.js";
import TutorCard from "../components/tutors/TutorCard.jsx";

export default function Mentors() {
  const [list, setList] = useState([]);
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState("");
  const [mode, setMode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (subject) params.set("subject", subject);
    if (mode) params.set("mode", mode);
    setLoading(true);
    api(`/api/mentors?${params.toString()}`)
      .then(setList)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [q, subject, mode]);

  const subjects = ["", "Database Systems", "Cybersecurity", "Software Engineering", "Cloud Computing", "Academic Writing", "Python & Data"];

  return (
    <div className="wrap">
      <p className="eyebrow">Catalogue</p>
      <h1>Find a mentor</h1>
      <p className="lede">Search the live mentor table. Results come from the Express API, not a static JSON file.</p>
      <div className="filters">
        <div className="field">
          <label htmlFor="q">Search</label>
          <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, skill, topic" />
        </div>
        <div className="field">
          <label htmlFor="subject">Subject</label>
          <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
            {subjects.map((s) => <option key={s} value={s}>{s || "All subjects"}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="mode">Mode</label>
          <select id="mode" value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="">All modes</option>
            <option>Online</option>
            <option>Hybrid</option>
            <option>In person</option>
          </select>
        </div>
        <div className="field">
          <label>&nbsp;</label>
          <button className="btn btn-ghost" type="button" onClick={() => { setQ(""); setSubject(""); setMode(""); }}>Clear</button>
        </div>
      </div>
      {error && <p className="error">{error}</p>}
      {loading ? <p className="muted">Loading mentors…</p> : null}
      {!loading && list.length === 0 ? <div className="empty"><h3>No mentors match those filters.</h3></div> : null}
      <div className="grid-3">
        {list.map((m) => <TutorCard key={m.id} mentor={m} />)}
      </div>
    </div>
  );
}
