import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["student", "teacher", "admin"], default: "student" },
    phone: { type: String, default: "" },
  },
  { timestamps: true }
);

const mentorSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    subject: { type: String, required: true },
    mode: { type: String, required: true },
    rate: { type: Number, required: true },
    rating: { type: Number, default: 4.8 },
    experience: { type: String, default: "" },
    bio: { type: String, default: "" },
    tags: { type: [String], default: [] },
    availability: { type: String, default: "Weeknights" },
  },
  { timestamps: true }
);

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor", required: true },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    subject: { type: String, required: true },
    sessionDate: { type: String, required: true },
    sessionTime: { type: String, required: true },
    notes: { type: String, default: "" },
    status: { type: String, enum: ["pending", "confirmed", "declined", "cancelled"], default: "pending" },
    meetingLink: { type: String, default: "" },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
export const Mentor = mongoose.model("Mentor", mentorSchema);
export const Booking = mongoose.model("Booking", bookingSchema);

export function publicUser(user) {
  if (!user) return null;
  return { id: String(user._id), name: user.name, email: user.email, role: user.role, phone: user.phone || "" };
}

export function publicMentor(mentor) {
  if (!mentor) return null;
  return {
    id: String(mentor._id),
    userId: mentor.userId ? String(mentor.userId) : null,
    name: mentor.name,
    subject: mentor.subject,
    mode: mentor.mode,
    rate: mentor.rate,
    rating: mentor.rating,
    experience: mentor.experience,
    bio: mentor.bio,
    tags: mentor.tags || [],
    availability: mentor.availability,
  };
}

export function publicBooking(booking, extra = {}) {
  if (!booking) return null;
  return {
    id: String(booking._id),
    userId: String(booking.userId?._id || booking.userId),
    mentorId: String(booking.mentorId?._id || booking.mentorId),
    mentorName: extra.mentorName || booking.mentorId?.name || "",
    studentId: String(booking.userId?._id || booking.userId),
    studentName: booking.studentName,
    studentEmail: booking.studentEmail,
    studentPhone: extra.studentPhone || booking.userId?.phone || "",
    subject: booking.subject,
    date: booking.sessionDate,
    time: booking.sessionTime,
    notes: booking.notes || "",
    status: booking.status,
    meetingLink: booking.meetingLink || "",
    createdAt: booking.createdAt,
  };
}
