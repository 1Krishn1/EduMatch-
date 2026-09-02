import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Mentors from "./pages/Mentors";
import TutorProfile from "./pages/TutorProfile";
import BookSession from "./pages/BookSession";
import MyBookings from "./pages/MyBookings";

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
      </Route>
    </Routes>
  );
}
