import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, "../../data");
fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, "edumatch.sqlite");
export const db = new DatabaseSync(dbPath);

db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'student',
    phone TEXT DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS mentors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    mode TEXT NOT NULL,
    rate INTEGER NOT NULL,
    rating REAL NOT NULL DEFAULT 4.8,
    experience TEXT NOT NULL,
    bio TEXT NOT NULL,
    tags TEXT NOT NULL DEFAULT '[]',
    availability TEXT NOT NULL DEFAULT 'Weeknights',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    mentor_id INTEGER NOT NULL,
    student_name TEXT NOT NULL,
    student_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    session_date TEXT NOT NULL,
    notes TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (mentor_id) REFERENCES mentors(id) ON DELETE CASCADE
  );
`);

function addColumn(table, column, type) {
  try {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}`);
  } catch {
    /* already exists */
  }
}
addColumn("users", "phone", "TEXT DEFAULT ''");
addColumn("mentors", "user_id", "INTEGER");

export function rowMentor(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    userId: row.user_id ? String(row.user_id) : null,
    name: row.name,
    subject: row.subject,
    mode: row.mode,
    rate: row.rate,
    rating: row.rating,
    experience: row.experience,
    bio: row.bio,
    tags: JSON.parse(row.tags || "[]"),
    availability: row.availability,
  };
}

export function rowUser(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    name: row.name,
    email: row.email,
    role: row.role,
    phone: row.phone || "",
  };
}

export function rowBooking(row) {
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
    date: row.session_date,
    notes: row.notes || "",
    status: row.status,
    createdAt: row.created_at,
  };
}
