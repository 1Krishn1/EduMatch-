import { Router } from "express";
import { pool, publicMentor } from "../db/mysql.js";
import { authRequired, adminRequired } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  const q = String(req.query.q || "").toLowerCase();
  const filters = [];
  const params = [];
  if (req.query.subject) { filters.push("subject = ?"); params.push(req.query.subject); }
  if (req.query.mode) { filters.push("mode = ?"); params.push(req.query.mode); }
  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
  const [rows] = await pool.query(`SELECT * FROM mentors ${where} ORDER BY rating DESC, name`, params);
  const list = rows.map(publicMentor).filter((m) => !q || `${m.name} ${m.subject} ${m.bio} ${m.tags.join(" ")}`.toLowerCase().includes(q));
  res.json(list);
});

router.get("/:id", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM mentors WHERE id = ?", [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: "Mentor not found." });
  res.json(publicMentor(rows[0]));
});

router.post("/", authRequired, adminRequired, async (req, res) => {
  const { name, subject, mode, bio } = req.body || {};
  if (!name || !subject || !mode || !bio) return res.status(400).json({ message: "Name, subject, mode and bio are required." });
  const [result] = await pool.query(
    "INSERT INTO mentors (name, subject, mode, rate, rating, experience, bio, tags, availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [name, subject, mode, Number(req.body.rate) || 40, Number(req.body.rating) || 4.5, req.body.experience || "Mentor", bio, JSON.stringify(req.body.tags || []), req.body.availability || "Flexible"]
  );
  const [rows] = await pool.query("SELECT * FROM mentors WHERE id = ?", [result.insertId]);
  res.status(201).json(publicMentor(rows[0]));
});

router.delete("/:id", authRequired, adminRequired, async (req, res) => {
  const [result] = await pool.query("DELETE FROM mentors WHERE id = ?", [req.params.id]);
  if (!result.affectedRows) return res.status(404).json({ message: "Mentor not found." });
  res.json({ ok: true });
});

export default router;
