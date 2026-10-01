import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BookingForm from "../components/booking/BookingForm.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import { useBookings } from "../context/BookingContext.jsx";
import { loadTutors } from "../data/loadTutors.js";

export default function BookSession() {
  const { tutorId } = useParams();
  const navigate = useNavigate();
  const { addBooking } = useBookings();
  const [tutors, setTutors] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    loadTutors().then((list) => {
      setTutors(list);
      setStatus("ready");
    });
  }, []);

  if (status === "loading") return <Spinner label="Loading booking form..." />;

  const selectedTutor = tutors.find((item) => item.id === tutorId);

  return (
    <section>
      <h1>Book a session</h1>
      <p className="muted">
        {selectedTutor
          ? `Booking ${selectedTutor.name}.`
          : "Choose a mentor, then add your details."}{" "}
        <Link to="/mentors">Browse mentors</Link>
      </p>
      <BookingForm
        key={selectedTutor?.id || "none"}
        tutors={tutors}
        selectedTutor={selectedTutor}
        onSubmit={(booking) => {
          addBooking(booking);
          navigate("/bookings");
        }}
      />
    </section>
  );
}
