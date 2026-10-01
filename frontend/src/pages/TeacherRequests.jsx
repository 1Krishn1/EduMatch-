import { useEffect, useState } from "react";
import { api } from "../api/client.js";

export default function TeacherRequests() {
  const [rows, setRows] = useState([]);
  const [links, setLinks] = useState({});
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState("");

  function load() {
    api("/api/teacher/requests").then(setRows).catch((e) => setError(e.message));
  }
  useEffect(load, []);

  async function confirm(id) {
    setError("");
    try {
      await api(`/api/teacher/requests/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "confirmed", meetingLink: links[id] || "" }),
      });
      load();
    } catch (e) {
      setError(e.message);
    }
  }

  async function decline(id) {
    await api(`/api/teacher/requests/${id}`, { method: "PATCH", body: JSON.stringify({ status: "declined" }) });
    load();
  }

  async function openStudent(id) {
    setDetail(await api(`/api/teacher/students/${id}`));
  }

  return (
    <div className="wrap">
      <p className="eyebrow">Teacher desk</p>
      <h1>Booking requests</h1>
      <p className="muted">Paste a Teams, Zoom or Google Meet link, then confirm. The student will see that link.</p>
      {error && <p className="error">{error}</p>}
      {detail && <div className="banner">Student ID #{detail.id} · {detail.name} · {detail.email} · {detail.phone || "no phone"}</div>}
      {rows.length === 0 && <div className="empty"><h3>No requests yet</h3></div>}
      <div className="stack">
        {rows.map((b) => (
          <article className="booking" key={b.id}>
            <div>
              <h3>{b.studentName}</h3>
              <p className="meta">
                <span>Student ID #{b.studentId}</span>
                <span>{b.studentEmail}</span>
                <span>{b.date} {b.time}</span>
                <span>{b.status}</span>
              </p>
              {b.notes && <p className="muted">{b.notes}</p>}
              {b.meetingLink && <p><a href={b.meetingLink} target="_blank" rel="noreferrer">Current link</a></p>}
            </div>
            <div className="actions">
              <button className="btn btn-ghost" type="button" onClick={() => openStudent(b.studentId)}>Student</button>
              {b.status === "pending" && (
                <>
                  <input
                    placeholder="https://teams.microsoft.com/..."
                    value={links[b.id] || ""}
                    onChange={(e) => setLinks({ ...links, [b.id]: e.target.value })}
                    style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid #e4ddd2", minWidth: 240 }}
                  />
                  <button className="btn" type="button" onClick={() => confirm(b.id)}>Confirm with link</button>
                  <button className="btn btn-danger" type="button" onClick={() => decline(b.id)}>Decline</button>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
