import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "edumatch-bookings";
const BookingContext = createContext(null);

function loadBookings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(loadBookings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (booking) => {
    setBookings((current) => [
      {
        id: `${Date.now()}`,
        status: "confirmed",
        createdAt: new Date().toISOString(),
        ...booking,
      },
      ...current,
    ]);
  };

  const cancelBooking = (id) => {
    setBookings((current) => current.filter((item) => item.id !== id));
  };

  const value = useMemo(
    () => ({ bookings, addBooking, cancelBooking }),
    [bookings]
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBookings() {
  const value = useContext(BookingContext);
  if (!value) {
    throw new Error("useBookings must be used inside BookingProvider");
  }
  return value;
}