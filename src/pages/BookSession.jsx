<<<<<<< HEAD
import React, { useState } from 'react';
import { useBookings } from '../context/BookingContext';

export default function BookSession({ tutorName = "Dr. Sarah Chen" }) {
  const { addBooking } = useBookings();
  const [formData, setFormData] = useState({ studentName: '', email: '', date: '', time: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.studentName.trim()) newErrors.studentName = 'Full name is required.';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required.';
    if (!formData.date) newErrors.date = 'Please select a session date.';
    if (!formData.time) newErrors.time = 'Please select a session time.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      addBooking({ ...formData, tutorName });
      setIsSubmitted(true);
      setErrors({});
    }
  };

  if (isSubmitted) {
    return (
      <div style={{ padding: '2rem', border: '2px solid #2e7d32', borderRadius: '8px', background: '#e8f5e9', textAlign: 'center' }}>
        <h2>🎉 Session Confirmed!</h2>
        <p>Your session with <strong>{tutorName}</strong> on <strong>{formData.date}</strong> at <strong>{formData.time}</strong> is successfully booked.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '420px', margin: '2rem auto', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2>Book a Session</h2>
      <p>Tutor: <strong>{tutorName}</strong></p>

      <div>
        <label htmlFor="studentName">Full Name</label>
        <input
          id="studentName"
          type="text"
          value={formData.studentName}
          onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
        {errors.studentName && <span style={{ color: '#d32f2f', fontSize: '0.85rem' }}>{errors.studentName}</span>}
      </div>

      <div>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
        {errors.email && <span style={{ color: '#d32f2f', fontSize: '0.85rem' }}>{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="date">Session Date</label>
        <input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
        {errors.date && <span style={{ color: '#d32f2f', fontSize: '0.85rem' }}>{errors.date}</span>}
      </div>

      <div>
        <label htmlFor="time">Preferred Time</label>
        <input
          id="time"
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
        {errors.time && <span style={{ color: '#d32f2f', fontSize: '0.85rem' }}>{errors.time}</span>}
      </div>

      <button type="submit" style={{ padding: '0.75rem', background: '#0066cc', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
        Confirm Booking
      </button>
    </form>
=======
// LOKESH: replace this page with the booking form and validation.
import { useParams } from "react-router-dom";
import EmptyState from "../components/ui/EmptyState";

export default function BookSession() {
  const { tutorId } = useParams();

  return (
    <section>
      <h1>Book a session</h1>
      <p className="muted">
        Lokesh — build the form here.
        {tutorId ? ` Pre-select tutor ${tutorId}.` : " No tutor selected yet."}
      </p>
      <EmptyState
        title="Booking form coming soon"
        message="Add name, email, subject, date/time and notes. Validate before submit. Save via BookingContext."
      />
    </section>
>>>>>>> c9b7fa7 (Add EduMatch layout Home About and team placeholders)
  );
}
