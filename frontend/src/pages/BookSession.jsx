import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function BookSession() {
  const { tutorId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mentors, setMentors] = useState([]);
  const [form, setForm] = useState({
    mentorId: tutorId || "",
    studentName: user?.name || "",
    studentEmail: user?.email || "",
    subject: "",
    date: "",
    time: "",
    notes: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api("/api/mentors").then((list) => {
      setMentors(list);
      if (tutorId) {
        const m = list.find((x) => String(x.id) === String(tutorId));
        if (m) setForm((f) => ({ ...f, mentorId: String(m.id), subject: f.subject || m.subject }));
      }
    });
  }, [tutorId]);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await api("/api/bookings", { method: "POST", body: JSON.stringify(form) });
      navigate("/bookings");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="wrap" style={{ maxWidth: 640 }}>
      <p className="eyebrow">Booking</p>
      <h1>Reserve a session</h1>
      <form className="form-card stack" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="mentorId">Mentor</label>
          <select id="mentorId" value={form.mentorId} onChange={(e) => set("mentorId", e.target.value)} required>
            <option value="">Select a mentor</option>
            {mentors.map((m) => <option key={m.id} value={m.id}>{m.name} — {m.subject}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="studentName">Your name</label>
          <input id="studentName" value={form.studentName} onChange={(e) => set("studentName", e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="studentEmail">Email</label>
          <input id="studentEmail" type="email" value={form.studentEmail} onChange={(e) => set("studentEmail", e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="subject">Focus subject</label>
          <input id="subject" value={form.subject} onChange={(e) => set("subject", e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="date">Session date</label>
          <input id="date" type="date" value={form.date} onChange={(e) => set("date", e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="time">Session time</label>
          <input id="time" type="time" value={form.time} onChange={(e) => set("time", e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="notes">What do you need help with?</label>
          <textarea id="notes" rows="4" value={form.notes} onChange={(e) => set("notes", e.target.value)} />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="btn btn-gold" disabled={saving}>{saving ? "Saving…" : "Confirm booking"}</button>
      </form>
    </div>
  );
}
