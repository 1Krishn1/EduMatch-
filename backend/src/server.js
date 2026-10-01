import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDb, seedIfEmpty } from "./db/mysql.js";
import authRoutes from "./routes/auth.js";
import mentorRoutes from "./routes/mentors.js";
import bookingRoutes from "./routes/bookings.js";
import teacherRoutes from "./routes/teacher.js";
import adminRoutes from "./routes/admin.js";

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.get("/api/health", (_req, res) => res.json({ ok: true, service: "EduMatch API", db: "MySQL" }));
app.use("/api/auth", authRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/admin", adminRoutes);
app.use((req, res) => res.status(404).json({ message: `No route for ${req.method} ${req.path}` }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Server error. Try again." });
});

connectDb()
  .then(seedIfEmpty)
  .then(() => app.listen(PORT, () => console.log(`EduMatch API running on http://localhost:${PORT}`)))
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
