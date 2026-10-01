import { Router } from "express";
import { pool, publicBooking, publicMentor, publicUser } from "../db/mysql.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();
router.use(authRequired);
router.use((req, res, next) => (req.user.role === "teacher" ? next() : res.status(403).json({ message: "Teacher access required." })));

router.get("/me", async (req, res) => {
  const [users] = await pool.query("SELECT * FROM users WHERE id = ?", [req.user.id]);
  const [mentors] = await pool.query("SELECT * FROM mentors WHERE user_id = ?", [req.user.id]);
  res.json({ user: publicUser(users[0]), mentor: publicMentor(mentors[0]) });
});

router.put("/profile", async (req, res) => {
  if (req.body.name) await pool.query("UPDATE users SET name=?, phone=? WHERE id=?", [req.body.name.trim(), req.body.phone || "", req.user.id]);
  const [mentors] = await pool.query("SELECT * FROM mentors WHERE user_id = ?", [req.user.id]);
  if (mentors[0]) {
    const next = { ...publicMentor(mentors[0]), ...req.body };
    await pool.query(
      "UPDATE mentors SET name=?, subject=?, mode=?, rate=?, experience=?, bio=?, tags=?, availability=? WHERE id=?",
      [next.name, next.subject, next.mode, Number(next.rate) || mentors[0].rate, next.experience, next.bio, JSON.stringify(next.tags || []), next.availability, mentors[0].id]
    );
  }
  const [users] = await pool.query("SELECT * FROM users WHERE id = ?", [req.user.id]);
  const [updated] = await pool.query("SELECT * FROM mentors WHERE user_id = ?", [req.user.id]);
  res.json({ user: publicUser(users[0]), mentor: publicMentor(updated[0]) });
});

router.get("/requests", async (req, res) => {
  const [mentors] = await pool.query("SELECT * FROM mentors WHERE user_id = ?", [req.user.id]);
  if (!mentors[0]) return res.json([]);
  const [rows] = await pool.query(
    `SELECT b.*, m.name AS mentor_name, u.phone AS student_phone
     FROM bookings b JOIN mentors m ON m.id = b.mentor_id JOIN users u ON u.id = b.user_id
     WHERE b.mentor_id = ? ORDER BY b.created_at DESC`,
    [mentors[0].id]
  );
  res.json(rows.map(publicBooking));
});

router.get("/students/:id", async (req, res) => {
  const [students] = await pool.query("SELECT * FROM users WHERE id = ? AND role = 'student'", [req.params.id]);
  if (!students[0]) return res.status(404).json({ message: "Student not found." });
  const [mentors] = await pool.query("SELECT id FROM mentors WHERE user_id = ?", [req.user.id]);
  const [linked] = mentors[0]
    ? await pool.query("SELECT id FROM bookings WHERE mentor_id = ? AND user_id = ?", [mentors[0].id, students[0].id])
    : [[]];
  if (!linked.length) return res.status(403).json({ message: "You can only view students who booked you." });
  res.json(publicUser(students[0]));
});

router.patch("/requests/:id", async (req, res) => {
  const [mentors] = await pool.query("SELECT * FROM mentors WHERE user_id = ?", [req.user.id]);
  const [rows] = await pool.query("SELECT * FROM bookings WHERE id = ?", [req.params.id]);
  if (!rows[0] || !mentors[0] || rows[0].mentor_id !== mentors[0].id) return res.status(404).json({ message: "Request not found." });
  if (!["confirmed", "declined"].includes(req.body.status)) return res.status(400).json({ message: "Status must be confirmed or declined." });
  if (req.body.status === "confirmed" && !/^https?:\/\/\S+$/i.test(req.body.meetingLink || "")) {
    return res.status(400).json({ message: "Paste a Teams, Zoom or Meet link starting with http." });
  }
  await pool.query("UPDATE bookings SET status=?, meeting_link=? WHERE id=?", [
    req.body.status, req.body.status === "confirmed" ? req.body.meetingLink.trim() : "", req.params.id,
  ]);
  const [next] = await pool.query(
    "SELECT b.*, m.name AS mentor_name FROM bookings b JOIN mentors m ON m.id = b.mentor_id WHERE b.id = ?",
    [req.params.id]
  );
  res.json(publicBooking(next[0]));
});

export default router;
