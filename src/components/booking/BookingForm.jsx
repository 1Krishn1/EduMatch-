import { useMemo, useState } from "react";
import Button from "../ui/Button.jsx";

const empty = {
  studentName: "",
  email: "",
  subject: "",
  date: "",
  time: "",
  notes: "",
};

function validate(form, tutorRequired) {
  const errors = {};
  if (!form.tutorId) errors.tutorId = tutorRequired;
  if (!form.studentName.trim()) errors.studentName = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!form.subject.trim()) errors.subject = "Choose a subject.";
  if (!form.date) errors.date = "Pick a date.";
  if (form.date) {
    const picked = new Date(`${form.date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (picked < today) errors.date = "Date cannot be in the past.";
  }
  if (!form.time) errors.time = "Pick a time.";
  return errors;
}

export default function BookingForm({ tutors, selectedTutor, onSubmit }) {
  const [form, setForm] = useState({
    ...empty,
    tutorId: selectedTutor?.id ?? "",
    subject: selectedTutor?.subject ?? "",
  });
  const [errors, setErrors] = useState({});

  const tutor = useMemo(
    () => tutors.find((item) => item.id === form.tutorId) ?? selectedTutor,
    [form.tutorId, selectedTutor, tutors]
  );

  const update = (field, value) => {
    setForm((current) => {
      const next = { ...current, [field]: value };
      if (field === "tutorId") {
        const match = tutors.find((item) => item.id === value);
        if (match) next.subject = match.subject;
      }
      return next;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(form, "Choose a mentor.");
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    onSubmit({
      tutorId: tutor.id,
      tutorName: tutor.name,
      studentName: form.studentName.trim(),
      email: form.email.trim(),
      subject: form.subject,
      date: form.date,
      time: form.time,
      notes: form.notes.trim(),
      rate: tutor.rate,
      mode: tutor.mode,
    });
  };

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h2>Session details</h2>

      <div className="field">
        <label htmlFor="tutorId">Mentor</label>
        <select
          id="tutorId"
          value={form.tutorId}
          onChange={(e) => update("tutorId", e.target.value)}
        >
          <option value="">Select a mentor</option>
          {tutors.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} — {item.subject} (${item.rate}/hr)
            </option>
          ))}
        </select>
        {errors.tutorId ? <p className="error">{errors.tutorId}</p> : null}
      </div>

      <div className="field">
        <label htmlFor="studentName">Full name</label>
        <input
          id="studentName"
          value={form.studentName}
          onChange={(e) => update("studentName", e.target.value)}
        />
        {errors.studentName ? <p className="error">{errors.studentName}</p> : null}
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
        {errors.email ? <p className="error">{errors.email}</p> : null}
      </div>

      <div className="field">
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
        />
        {errors.subject ? <p className="error">{errors.subject}</p> : null}
      </div>

      <div className="grid-2">
        <div className="field">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
          />
          {errors.date ? <p className="error">{errors.date}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="time">Time</label>
          <input
            id="time"
            type="time"
            value={form.time}
            onChange={(e) => update("time", e.target.value)}
          />
          {errors.time ? <p className="error">{errors.time}</p> : null}
        </div>
      </div>

      <div className="field">
        <label htmlFor="notes">Notes (optional)</label>
        <textarea
          id="notes"
          rows="3"
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="What do you want help with?"
        />
      </div>

      <Button type="submit">Confirm booking</Button>
    </form>
  );
}
