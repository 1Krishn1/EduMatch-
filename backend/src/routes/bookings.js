import { Router } from "express";
import { pool, publicBooking } from "../db/mysql.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();
router.use(authRequired);

router.get("/", async (req, res) => {
  const [rows] = await pool.query(
    `SELECT b.*, m.name AS mentor_name, u.phone AS student_phone
     FROM bookings b JOIN mentors m ON m.id = b.mentor_id JOIN users u ON u.id = b.user_id
     WHERE b.user_id = ? ORDER BY b.session_date DESC, b.id DESC`,
    [req.user.id]
  );
  res.json(rows.map(publicBooking));
});

router.post("/", async (req, res) => {
  if (req.user.role !== "student") return res.status(403).json({ message: "Only students can request a booking." });
  const { mentorId, studentName, studentEmail, subject, date, time, notes } = req.body || {};
  if (!mentorId) return res.status(400).json({ message: "Choose a mentor." });
  if (!studentName || studentName.trim().length < 2) return res.status(400).json({ message: "Enter the student name." });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentEmail || "")) return res.status(400).json({ message: "Enter a valid email." });
  if (!subject) return res.status(400).json({ message: "Enter a subject." });
  if (!date || !time) return res.status(400).json({ message: "Choose a session date and time." });
  if (new Date(`${date}T${time}`) < new Date()) return res.status(400).json({ message: "Session date and time cannot be in the past." });
  const [mentors] = await pool.query("SELECT id, name FROM mentors WHERE id = ?", [mentorId]);
  if (!mentors[0]) return res.status(404).json({ message: "Mentor not found." });
  const [result] = await pool.query(
    `INSERT INTO bookings (user_id, mentor_id, student_name, student_email, subject, session_date, session_time, notes, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
    [req.user.id, mentorId, studentName.trim(), studentEmail.trim(), subject.trim(), date, time, notes || ""]
  );
  const [rows] = await pool.query("SELECT b.*, ? AS mentor_name FROM bookings b WHERE b.id = ?", [mentors[0].name, result.insertId]);
  res.status(201).json(publicBooking(rows[0]));
});

router.patch("/:id/cancel", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM bookings WHERE id = ?", [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: "Booking not found." });
  if (String(rows[0].user_id) !== String(req.user.id)) return res.status(403).json({ message: "You can only cancel your own bookings." });
  await pool.query("UPDATE bookings SET status = 'cancelled' WHERE id = ?", [req.params.id]);
  const [next] = await pool.query(
    "SELECT b.*, m.name AS mentor_name FROM bookings b JOIN mentors m ON m.id = b.mentor_id WHERE b.id = ?",
    [req.params.id]
  );
  res.json(publicBooking(next[0]));
});

export default router;
