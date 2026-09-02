import React from 'react';
import { useBookings } from '../context/BookingContext';

export default function MyBookings() {
  const { bookings, cancelBooking } = useBookings();

  if (bookings.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>My Bookings</h2>
        <p>No upcoming sessions scheduled yet.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '650px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2>My Scheduled Sessions</h2>
      {bookings.map((item) => (
        <div 
          key={item.id} 
          style={{ 
            border: '1px solid #ccc', 
            padding: '1.25rem', 
            marginBottom: '1rem', 
            borderRadius: '8px', 
            display: 'flex', 
            justify: 'space-between', 
            alignItems: 'center', 
            background: '#f9f9f9' 
          }}
        >
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Tutor: {item.tutorName}</h3>
            <p style={{ margin: '0.25rem 0' }}>
              <strong>Date:</strong> {item.date} | <strong>Time:</strong> {item.time}
            </p>
            <p style={{ margin: '0.25rem 0', color: '#555', fontSize: '0.9rem' }}>
              Student: {item.studentName} ({item.email})
            </p>
          </div>
          <button 
            onClick={() => cancelBooking(item.id)}
            style={{ 
              background: '#d32f2f', 
              color: '#fff', 
              border: 'none', 
              padding: '0.5rem 1rem', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Cancel Session
          </button>
        </div>
      ))}
    </div>
  );
}
