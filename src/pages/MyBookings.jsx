import BookingCard from "../components/booking/BookingCard.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import { useBookings } from "../context/BookingContext.jsx";

export default function MyBookings() {
  const { bookings, cancelBooking } = useBookings();

  if (bookings.length === 0) {
    return (
      <section>
        <h1>My bookings</h1>
        <EmptyState
          title="No sessions yet"
          message="When you book a mentor, the session will show up here."
          actionTo="/mentors"
          actionLabel="Find a mentor"
        />
      </section>
    );
  }

  return (
    <section>
      <h1>My bookings</h1>
      <p className="muted">{bookings.length} upcoming session{bookings.length === 1 ? "" : "s"}</p>
      <div className="stack">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} onCancel={cancelBooking} />
        ))}
      </div>
    </section>
  );
}
