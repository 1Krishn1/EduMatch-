// LOKESH: replace this starter with real addBooking / cancelBooking state.
// Wrap the app with BookingProvider in main.jsx when you are ready.
import { createContext, useContext, useState } from "react";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);

  const addBooking = (booking) => {
    setBookings((current) => [
      ...current,
      { id: Date.now().toString(), ...booking },
    ]);
  };

  const cancelBooking = (id) => {
    setBookings((current) => current.filter((item) => item.id !== id));
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const value = useContext(BookingContext);
  if (!value) {
    throw new Error("useBookings must be used inside BookingProvider");
  }
  return value;
}
