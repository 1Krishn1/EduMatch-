import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Mentors from "./pages/Mentors.jsx";
import TutorProfile from "./pages/TutorProfile.jsx";
import BookSession from "./pages/BookSession.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Account from "./pages/Account.jsx";
import TeacherRequests from "./pages/TeacherRequests.jsx";
import TeacherProfile from "./pages/TeacherProfile.jsx";
import AdminPeople from "./pages/AdminPeople.jsx";
import AdminMentors from "./pages/AdminMentors.jsx";
import NotFound from "./pages/NotFound.jsx";
import { useAuth } from "./context/AuthContext.jsx";

function Gate({ roles, children }) {
  const { user, ready } = useAuth();
  if (!ready) return <p className="page-note">Loading session…</p>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/mentors/:id" element={<TutorProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Gate><Account /></Gate>} />
        <Route path="/book" element={<Gate roles={["student"]}><BookSession /></Gate>} />
        <Route path="/book/:tutorId" element={<Gate roles={["student"]}><BookSession /></Gate>} />
        <Route path="/bookings" element={<Gate roles={["student"]}><MyBookings /></Gate>} />
        <Route path="/teacher/requests" element={<Gate roles={["teacher"]}><TeacherRequests /></Gate>} />
        <Route path="/teacher/profile" element={<Gate roles={["teacher"]}><TeacherProfile /></Gate>} />
        <Route path="/admin/students" element={<Gate roles={["admin"]}><AdminPeople kind="students" /></Gate>} />
        <Route path="/admin/teachers" element={<Gate roles={["admin"]}><AdminPeople kind="teachers" /></Gate>} />
        <Route path="/admin/mentors" element={<Gate roles={["admin"]}><AdminMentors /></Gate>} />
        <Route path="/admin" element={<Navigate to="/admin/students" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
