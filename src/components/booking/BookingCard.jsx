// LOKESH: show one booking and a cancel button here.

export default function BookingCard({ booking }) {
  return (
    <article className="card">
      <h3>{booking?.subject ?? "Booking"}</h3>
      <p className="muted">Lokesh — show date, tutor and status.</p>
    </article>
  );
}
