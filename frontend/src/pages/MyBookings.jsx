import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client.js";

function sessionDate(booking) {
  return new Date(`${booking.date}T${booking.time || "00:00"}`);
}

export default function MyBookings() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(null);

  function load() {
    api("/api/bookings").then(setRows).catch((e) => setError(e.message));
  }

  useEffect(load, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const due = rows.find((b) => {
        if (b.status !== "confirmed" || !b.meetingLink) return false;
        const diff = sessionDate(b).getTime() - Date.now();
        return diff <= 2 * 60 * 1000 && diff >= -15 * 60 * 1000;
      });
      if (!due) return;
      const seen = sessionStorage.getItem(`notified-${due.id}`);
      if (seen) return;
      sessionStorage.setItem(`notified-${due.id}`, "1");
      setAlert(due);
      if (window.Notification && Notification.permission === "granted") {
        new Notification("EduMatch session starting", { body: `${due.mentorName} at ${due.time}. Open the meeting link.` });
      }
    }, 15000);
    return () => clearInterval(timer);
  }, [rows]);

  useEffect(() => {
    if (window.Notification && Notification.permission === "default") Notification.requestPermission();
  }, []);

  async function cancel(id) {
    await api(`/api/bookings/${id}/cancel`, { method: "PATCH" });
    load();
  }

  return (
    <div className="wrap">
      <p className="eyebrow">Diary</p>
      <h1>My bookings</h1>
      {alert && (
        <div className="banner">
          Your session with {alert.mentorName} is now ({alert.date} {alert.time}).{" "}
          <a href={alert.meetingLink} target="_blank" rel="noreferrer">Join meeting</a>
        </div>
      )}
      {error && <p className="error">{error}</p>}
      {rows.length === 0 && (
        <div className="empty">
          <h3>No sessions yet</h3>
          <Link className="btn" to="/mentors">Find a mentor</Link>
        </div>
      )}
      <div className="stack">
        {rows.map((b) => (
          <article className="booking" key={b.id}>
            <div>
              <h3>{b.mentorName}</h3>
              <p className="meta">
                <span>{b.subject}</span>
                <span>{b.date} {b.time}</span>
                <span>{b.status}</span>
              </p>
              {b.notes && <p className="muted">{b.notes}</p>}
              {b.status === "confirmed" && b.meetingLink && (
                <p><a className="btn" href={b.meetingLink} target="_blank" rel="noreferrer">Open meeting link</a></p>
              )}
            </div>
            {b.status !== "cancelled" && b.status !== "declined" && (
              <button className="btn btn-danger" type="button" onClick={() => cancel(b.id)}>Cancel</button>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
