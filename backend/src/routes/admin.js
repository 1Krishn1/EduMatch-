import { Router } from "express";
import bcrypt from "bcryptjs";
import { pool, publicUser, publicMentor } from "../db/mysql.js";
import { authRequired, adminRequired } from "../middleware/auth.js";

const router = Router();
router.use(authRequired, adminRequired);
const DEFAULT_PASSWORD = "12346789";

router.get("/students", async (_req, res) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE role = 'student' ORDER BY id");
  res.json(rows.map(publicUser));
});

router.get("/teachers", async (_req, res) => {
  const [rows] = await pool.query(
    `SELECT u.*, m.id AS mentor_id, m.subject FROM users u
     LEFT JOIN mentors m ON m.user_id = u.id WHERE u.role = 'teacher' ORDER BY u.id`
  );
  res.json(rows.map((r) => ({ ...publicUser(r), mentorId: r.mentor_id ? String(r.mentor_id) : null, subject: r.subject || "" })));
});

router.patch("/users/:id/password", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: "User not found." });
  if (rows[0].role === "admin") return res.status(403).json({ message: "Cannot reset another admin here." });
  await pool.query("UPDATE users SET password_hash=? WHERE id=?", [bcrypt.hashSync(DEFAULT_PASSWORD, 10), rows[0].id]);
  res.json({ ok: true, user: publicUser(rows[0]), defaultPassword: DEFAULT_PASSWORD });
});

router.get("/mentors", async (_req, res) => {
  const [rows] = await pool.query("SELECT * FROM mentors ORDER BY name");
  res.json(rows.map(publicMentor));
});

export default router;
