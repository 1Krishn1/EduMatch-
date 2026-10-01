import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Header() {
  const { user, logout, isAdmin, isTeacher, isStudent } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="wrap header-inner">
        <NavLink to="/" className="logo">
          <span className="mark">E</span> EduMatch
        </NavLink>
        <nav className="nav" aria-label="Main">
          {(!user || isStudent) && <NavLink to="/mentors">Mentors</NavLink>}
          <NavLink to="/about">About</NavLink>
          {isStudent && <NavLink to="/book">Book</NavLink>}
          {isStudent && <NavLink to="/bookings">My bookings</NavLink>}
          {isTeacher && <NavLink to="/teacher/requests">Requests</NavLink>}
          {isTeacher && <NavLink to="/teacher/profile">Teacher profile</NavLink>}
          {isAdmin && <NavLink to="/admin/students">Students</NavLink>}
          {isAdmin && <NavLink to="/admin/teachers">Teachers</NavLink>}
          {isAdmin && <NavLink to="/admin/mentors">Catalogue</NavLink>}
          {user && <NavLink to="/account">Account</NavLink>}
          {user ? (
            <button className="linkish" type="button" onClick={() => { logout(); navigate("/"); }}>
              Log out
            </button>
          ) : (
            <>
              <NavLink to="/login">Log in</NavLink>
              <NavLink to="/register" className="ghost-light">Join as student</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
