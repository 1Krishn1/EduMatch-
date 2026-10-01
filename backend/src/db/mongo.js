import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User, Mentor } from "./models.js";

export async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI. Copy backend/.env.example to backend/.env and paste your Atlas connection string.");
  }
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}

const mentorSeed = [
  ["Dr Anjali Sharma", "anjali@edumatch.test", "Database Systems", "Online", 45, 4.9, "8 years · lecturer", "SQL and normalisation coaching.", ["SQL", "ERD"], "Mon–Thu evenings"],
  ["James Okoro", "james@edumatch.test", "Cybersecurity", "Hybrid", 55, 4.8, "10 years · SOC", "Log analysis and OWASP labs.", ["SOC", "OWASP"], "Weekends"],
  ["Priya Adhikari", "priya@edumatch.test", "Software Engineering", "Online", 40, 4.7, "6 years · engineer", "React and requirements coaching.", ["React", "Git"], "Flexible"],
  ["Daniel Chen", "daniel@edumatch.test", "Cloud Computing", "In person", 50, 4.8, "9 years · architect", "Azure and AWS case studies.", ["Azure", "AWS"], "Tue–Fri"],
  ["Sofia Martins", "sofia@edumatch.test", "Academic Writing", "Online", 35, 4.9, "12 years · advisor", "APA and reflection writing.", ["APA"], "Weeknights"],
  ["Ravi Thapa", "ravi@edumatch.test", "Python & Data", "Hybrid", 42, 4.6, "7 years · data", "Python and simple APIs.", ["Python"], "Sat–Sun"],
];

export async function seedIfEmpty() {
  if ((await User.countDocuments()) === 0) {
    await User.create([
      { name: "Alex Student", email: "student@edumatch.test", passwordHash: bcrypt.hashSync("Student123!", 10), role: "student", phone: "0400 111 222" },
      { name: "Admin Taylor", email: "admin@edumatch.test", passwordHash: bcrypt.hashSync("Admin123!", 10), role: "admin", phone: "0400 000 000" },
    ]);
  }
  if ((await Mentor.countDocuments()) === 0) {
    for (const [name, email, subject, mode, rate, rating, experience, bio, tags, availability] of mentorSeed) {
      let teacher = await User.findOne({ email });
      if (!teacher) {
        teacher = await User.create({
          name, email, passwordHash: bcrypt.hashSync("Teacher123!", 10), role: "teacher", phone: "0400 555 000",
        });
      }
      await Mentor.create({ userId: teacher._id, name, subject, mode, rate, rating, experience, bio, tags, availability });
    }
  }
}
