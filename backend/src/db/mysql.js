import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "edumatch",
  waitForConnections: true,
  connectionLimit: 10,
});

export async function connectDb() {
  const admin = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
  });
  await admin.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || "edumatch"}\``);
  await admin.end();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(160) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role ENUM('student','teacher','admin') NOT NULL DEFAULT 'student',
      phone VARCHAR(40) DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS mentors (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NULL,
      name VARCHAR(120) NOT NULL,
      subject VARCHAR(80) NOT NULL,
      mode VARCHAR(40) NOT NULL,
      rate INT NOT NULL,
      rating DECIMAL(2,1) DEFAULT 4.8,
      experience VARCHAR(160) NOT NULL,
      bio TEXT NOT NULL,
      tags JSON,
      availability VARCHAR(80) DEFAULT 'Weeknights',
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      mentor_id INT NOT NULL,
      student_name VARCHAR(120) NOT NULL,
      student_email VARCHAR(160) NOT NULL,
      subject VARCHAR(80) NOT NULL,
      session_date DATE NOT NULL,
      session_time VARCHAR(8) NOT NULL,
      notes TEXT,
      status ENUM('pending','confirmed','declined','cancelled') NOT NULL DEFAULT 'pending',
      meeting_link VARCHAR(500) DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (mentor_id) REFERENCES mentors(id) ON DELETE CASCADE
    )
  `);
  console.log("MySQL connected");
}

const mentors = [
  ["Dr Anjali Sharma", "anjali@edumatch.test", "Database Systems", "Online", 45, 4.9, "8 years · lecturer", "SQL and normalisation coaching.", ["SQL", "ERD"], "Mon–Thu evenings"],
  ["James Okoro", "james@edumatch.test", "Cybersecurity", "Hybrid", 55, 4.8, "10 years · SOC", "Log analysis and OWASP labs.", ["SOC", "OWASP"], "Weekends"],
  ["Priya Adhikari", "priya@edumatch.test", "Software Engineering", "Online", 40, 4.7, "6 years · engineer", "React and requirements coaching.", ["React", "Git"], "Flexible"],
  ["Daniel Chen", "daniel@edumatch.test", "Cloud Computing", "In person", 50, 4.8, "9 years · architect", "Azure and AWS case studies.", ["Azure", "AWS"], "Tue–Fri"],
  ["Sofia Martins", "sofia@edumatch.test", "Academic Writing", "Online", 35, 4.9, "12 years · advisor", "APA and reflection writing.", ["APA"], "Weeknights"],
  ["Ravi Thapa", "ravi@edumatch.test", "Python & Data", "Hybrid", 42, 4.6, "7 years · data", "Python and simple APIs.", ["Python"], "Sat–Sun"],
];

export async function seedIfEmpty() {
  const [users] = await pool.query("SELECT COUNT(*) AS n FROM users");
  if (users[0].n === 0) {
    await pool.query(
      "INSERT INTO users (name, email, password_hash, role, phone) VALUES (?, ?, ?, 'student', ?), (?, ?, ?, 'admin', ?)",
      ["Alex Student", "student@edumatch.test", bcrypt.hashSync("Student123!", 10), "0400 111 222", "Admin Taylor", "admin@edumatch.test", bcrypt.hashSync("Admin123!", 10), "0400 000 000"]
    );
  }
  const [count] = await pool.query("SELECT COUNT(*) AS n FROM mentors");
  if (count[0].n === 0) {
    for (const [name, email, subject, mode, rate, rating, experience, bio, tags, availability] of mentors) {
      const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
      let userId = existing[0]?.id;
      if (!userId) {
        const [result] = await pool.query(
          "INSERT INTO users (name, email, password_hash, role, phone) VALUES (?, ?, ?, 'teacher', ?)",
          [name, email, bcrypt.hashSync("Teacher123!", 10), "0400 555 000"]
        );
        userId = result.insertId;
      }
      await pool.query(
        "INSERT INTO mentors (user_id, name, subject, mode, rate, rating, experience, bio, tags, availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [userId, name, subject, mode, rate, rating, experience, bio, JSON.stringify(tags), availability]
      );
    }
  }
}

export function publicUser(row) {
  if (!row) return null;
  return { id: String(row.id), name: row.name, email: row.email, role: row.role, phone: row.phone || "" };
}

export function publicMentor(row) {
  if (!row) return null;
  const tags = typeof row.tags === "string" ? JSON.parse(row.tags || "[]") : row.tags || [];
  return {
    id: String(row.id), userId: row.user_id ? String(row.user_id) : null, name: row.name,
    subject: row.subject, mode: row.mode, rate: row.rate, rating: Number(row.rating),
    experience: row.experience, bio: row.bio, tags, availability: row.availability,
  };
}

export function publicBooking(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    userId: String(row.user_id),
    mentorId: String(row.mentor_id),
    mentorName: row.mentor_name || "",
    studentId: String(row.user_id),
    studentName: row.student_name,
    studentEmail: row.student_email,
    studentPhone: row.student_phone || "",
    subject: row.subject,
    date: String(row.session_date).slice(0, 10),
    time: String(row.session_time).slice(0, 5),
    notes: row.notes || "",
    status: row.status,
    meetingLink: row.meeting_link || "",
    createdAt: row.created_at,
  };
}
