import { useEffect, useState } from "react";
import { api } from "../api/client.js";

export default function AdminPeople({ kind }) {
  const [rows, setRows] = useState([]);
  const [pwd, setPwd] = useState({});
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const title = kind === "teachers" ? "Teachers" : "Students";

  function load() {
    api(`/api/admin/${kind}`).then(setRows).catch((e) => setErr(e.message));
  }
  useEffect(() => { setMsg(""); setErr(""); load(); }, [kind]);

  async function reset(id) {
    const newPassword = pwd[id];
    setErr(""); setMsg("");
    try {
      await api(`/api/admin/users/${id}/password`, { method: "PATCH", body: JSON.stringify({ newPassword }) });
      setMsg(`Password updated for ID #${id}.`);
      setPwd({ ...pwd, [id]: "" });
    } catch (e) { setErr(e.message); }
  }

  return (
    <div className="wrap">
      <p className="eyebrow">Admin</p>
      <h1>{title}</h1>
      <p className="muted">IDs are the database keys. Reset a forgotten password here. Admin does not book sessions.</p>
      {msg && <p className="ok">{msg}</p>}
      {err && <p className="error">{err}</p>}
      <div className="stack">
        {rows.map((u) => (
          <article className="booking" key={u.id}>
            <div>
              <h3>ID #{u.id} · {u.name}</h3>
              <p className="meta">
                <span>{u.email}</span>
                <span>{u.phone || "no phone"}</span>
                {u.subject && <span>{u.subject}</span>}
                {u.mentorId && <span>Mentor row #{u.mentorId}</span>}
              </p>
            </div>
            <div className="actions">
              <input
                placeholder="New password"
                type="password"
                value={pwd[u.id] || ""}
                onChange={(e) => setPwd({ ...pwd, [u.id]: e.target.value })}
                style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid #e4ddd2" }}
              />
              <button className="btn" type="button" onClick={() => reset(u.id)}>Set password</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
