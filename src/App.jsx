import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Mentors from "./pages/Mentors.jsx";
import TutorProfile from "./pages/TutorProfile.jsx";
import BookSession from "./pages/BookSession.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="mentors" element={<Mentors />} />
        <Route path="mentors/:id" element={<TutorProfile />} />
        <Route path="book" element={<BookSession />} />
        <Route path="book/:tutorId" element={<BookSession />} />
        <Route path="bookings" element={<MyBookings />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
