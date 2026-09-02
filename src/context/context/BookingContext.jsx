
import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('edumatch_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('edumatch_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (newBooking) => {
    setBookings((prev) => [...prev, { ...newBooking, id: Date.now() }]);
  };

  const cancelBooking = (bookingId) => {
    setBookings((prev) => prev.filter((item) => item.id !== bookingId));
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBookings = () => useContext(BookingContext);
