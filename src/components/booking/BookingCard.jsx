import Button from "../ui/Button.jsx";

export default function BookingCard({ booking, onCancel }) {
  return (
    <article className="card booking-card">
      <div>
        <p className="eyebrow">{booking.subject}</p>
        <h3>{booking.tutorName}</h3>
        <p className="muted">
          {booking.date} at {booking.time} · {booking.mode || "Online"}
        </p>
        <p>
          {booking.studentName} · {booking.email}
        </p>
        {booking.notes ? <p className="muted">{booking.notes}</p> : null}
      </div>
      <Button variant="danger" onClick={() => onCancel(booking.id)}>
        Cancel
      </Button>
    </article>
  );
}
