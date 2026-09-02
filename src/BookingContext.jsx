import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  // Initialize state from LocalStorage so data persists on refresh
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('edumatch_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to LocalStorage whenever bookings state changes
  useEffect(() => {
    localStorage.setItem('edumatch_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Add a new session
  const addBooking = (booking) => {
    setBookings((current) => [
      ...current,
      { id: Date.now().toString(), ...booking },
    ]);
  };

  // Cancel an existing session
  const cancelBooking = (id) => {
    setBookings((current) => current.filter((item) => item.id !== id));
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

// Custom hook with standard error check
export function useBookings() {
  const value = useContext(BookingContext);
  if (!value) {
    throw new Error('useBookings must be used inside a BookingProvider');
  }
  return value;
}
