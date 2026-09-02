import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Mentors from './pages/Mentors';
import About from './pages/About';
import BookSession from './pages/BookSession';
import MyBookings from './pages/MyBookings';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/about" element={<About />} />
        <Route path="/book" element={<BookSession />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </Router>
  );
}
