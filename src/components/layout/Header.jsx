import { NavLink } from "react-router-dom";
import { useBookings } from "../../context/BookingContext.jsx";

export default function Header() {
  const { bookings } = useBookings();

  return (
    <header className="header">
      <div className="container header-inner">
        <NavLink to="/" className="logo">
          EduMatch
        </NavLink>
        <nav className="nav" aria-label="Main">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/mentors">Find Mentors</NavLink>
          <NavLink to="/book">Book</NavLink>
          <NavLink to="/bookings">
            My Bookings{bookings.length ? ` (${bookings.length})` : ""}
          </NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </div>
    </header>
  );
}
