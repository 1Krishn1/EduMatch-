import bcrypt from "bcryptjs";
import { db } from "./database.js";

const mentorSeed = [
  {
    name: "Dr Anjali Sharma",
    email: "anjali@edumatch.test",
    subject: "Database Systems",
    mode: "Online",
    rate: 45,
    rating: 4.9,
    experience: "8 years · MIT lecturer",
    bio: "Helps postgraduate students design normalised schemas, write efficient SQL and prepare for database exams.",
    tags: ["SQL", "ERD", "Normalisation", "MySQL"],
    availability: "Mon–Thu evenings",
  },
  {
    name: "James Okoro",
    email: "james@edumatch.test",
    subject: "Cybersecurity",
    mode: "Hybrid",
    rate: 55,
    rating: 4.8,
    experience: "10 years · SOC analyst",
    bio: "Walks students through log analysis, threat modelling and practical defence labs.",
    tags: ["SOC", "OWASP", "Linux", "Risk"],
    availability: "Weekends",
  },
  {
    name: "Priya Adhikari",
    email: "priya@edumatch.test",
    subject: "Software Engineering",
    mode: "Online",
    rate: 40,
    rating: 4.7,
    experience: "6 years · product engineer",
    bio: "Coaches teams on requirements, React architecture and Git workflow.",
    tags: ["React", "Requirements", "Git", "UX"],
    availability: "Flexible",
  },
  {
    name: "Daniel Chen",
    email: "daniel@edumatch.test",
    subject: "Cloud Computing",
    mode: "In person",
    rate: 50,
    rating: 4.8,
    experience: "9 years · cloud architect",
    bio: "Explains Azure and AWS patterns with retail case studies.",
    tags: ["Azure", "AWS", "DevOps"],
    availability: "Tue–Fri",
  },
  {
    name: "Sofia Martins",
    email: "sofia@edumatch.test",
    subject: "Academic Writing",
    mode: "Online",
    rate: 35,
    rating: 4.9,
    experience: "12 years · learning advisor",
    bio: "Edits structure, APA referencing and reflection writing for postgraduate reports.",
    tags: ["APA", "Reflection", "Editing"],
    availability: "Weeknights",
  },
  {
    name: "Ravi Thapa",
    email: "ravi@edumatch.test",
    subject: "Python & Data",
    mode: "Hybrid",
    rate: 42,
    rating: 4.6,
    experience: "7 years · data engineer",
    bio: "Builds confidence with Python, pandas and simple APIs.",
    tags: ["Python", "APIs", "Pandas"],
    availability: "Sat–Sun",
  },
];

export function seedIfEmpty() {
  const userCount = db.prepare("SELECT COUNT(*) AS n FROM users").get().n;
  if (userCount === 0) {
    const insertUser = db.prepare(
      "INSERT INTO users (name, email, password_hash, role, phone) VALUES (?, ?, ?, ?, ?)"
    );
    insertUser.run("Alex Student", "student@edumatch.test", bcrypt.hashSync("Student123!", 10), "student", "0400 111 222");
    insertUser.run("Admin Taylor", "admin@edumatch.test", bcrypt.hashSync("Admin123!", 10), "admin", "0400 000 000");
  }

  const mentorCount = db.prepare("SELECT COUNT(*) AS n FROM mentors").get().n;
  if (mentorCount === 0) {
    const insertUser = db.prepare(
      "INSERT INTO users (name, email, password_hash, role, phone) VALUES (?, ?, ?, 'teacher', ?)"
    );
    const insertMentor = db.prepare(
      `INSERT INTO mentors (user_id, name, subject, mode, rate, rating, experience, bio, tags, availability)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );
    for (const m of mentorSeed) {
      const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(m.email);
      const userId = existing
        ? existing.id
        : insertUser.run(m.name, m.email, bcrypt.hashSync("Teacher123!", 10), "0400 555 000").lastInsertRowid;
      insertMentor.run(
        userId, m.name, m.subject, m.mode, m.rate, m.rating, m.experience, m.bio,
        JSON.stringify(m.tags), m.availability
      );
    }
  }
}

if (process.argv[1] && String(process.argv[1]).includes("seed.js")) {
  seedIfEmpty();
  console.log("Database seeded.");
}
