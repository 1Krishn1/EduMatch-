import { Router } from "express";
import bcrypt from "bcryptjs";
import { pool, publicUser } from "../db/mysql.js";
import { signToken, authRequired } from "../middleware/auth.js";

const router = Router();
const ROLES = ["student", "teacher", "admin"];
const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

router.post("/register", async (req, res) => {
  const { name, email, password, phone } = req.body || {};
  if (!name || name.trim().length < 2) return res.status(400).json({ message: "Enter your full name." });
  if (!validEmail(email || "")) return res.status(400).json({ message: "Enter a valid email address." });
  if (!password || password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters." });
  const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [String(email).toLowerCase()]);
  if (existing.length) return res.status(409).json({ message: "An account with this email already exists." });
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password_hash, role, phone) VALUES (?, ?, ?, 'student', ?)",
    [name.trim(), String(email).toLowerCase(), bcrypt.hashSync(password, 10), phone || ""]
  );
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [result.insertId]);
  const user = publicUser(rows[0]);
  res.status(201).json({ user, token: signToken(user) });
});

router.post("/login", async (req, res) => {
  const { email, password, role } = req.body || {};
  if (role && !ROLES.includes(role)) return res.status(400).json({ message: "Choose student, teacher or admin." });
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [String(email || "").toLowerCase()]);
  const row = rows[0];
  if (!row || !bcrypt.compareSync(password || "", row.password_hash)) return res.status(401).json({ message: "Incorrect email or password." });
  if (role && row.role !== role) return res.status(403).json({ message: `This account is not a ${role} account.` });
  const user = publicUser(row);
  res.json({ user, token: signToken(user) });
});

router.get("/me", authRequired, async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [req.user.id]);
  if (!rows[0]) return res.status(404).json({ message: "User not found." });
  res.json({ user: publicUser(rows[0]) });
});

router.patch("/profile", authRequired, async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [req.user.id]);
  const current = rows[0];
  if (!current) return res.status(404).json({ message: "User not found." });
  const nextName = (req.body.name || current.name).trim();
  const nextEmail = String(req.body.email || current.email).toLowerCase();
  const nextPhone = req.body.phone !== undefined ? req.body.phone : current.phone;
  if (nextName.length < 2) return res.status(400).json({ message: "Enter your full name." });
  if (!validEmail(nextEmail)) return res.status(400).json({ message: "Enter a valid email." });
  const [clash] = await pool.query("SELECT id FROM users WHERE email = ? AND id <> ?", [nextEmail, current.id]);
  if (clash.length) return res.status(409).json({ message: "That email is already used." });
  await pool.query("UPDATE users SET name=?, email=?, phone=? WHERE id=?", [nextName, nextEmail, nextPhone || "", current.id]);
  if (current.role === "teacher") await pool.query("UPDATE mentors SET name=? WHERE user_id=?", [nextName, current.id]);
  const [next] = await pool.query("SELECT * FROM users WHERE id = ?", [current.id]);
  res.json({ user: publicUser(next[0]) });
});

router.patch("/password", authRequired, async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [req.user.id]);
  const row = rows[0];
  if (!row) return res.status(404).json({ message: "User not found." });
  if (!bcrypt.compareSync(req.body.currentPassword || "", row.password_hash)) return res.status(400).json({ message: "Current password is wrong." });
  if (!req.body.newPassword || req.body.newPassword.length < 8) return res.status(400).json({ message: "New password must be at least 8 characters." });
  await pool.query("UPDATE users SET password_hash=? WHERE id=?", [bcrypt.hashSync(req.body.newPassword, 10), row.id]);
  res.json({ ok: true });
});

export default router;
