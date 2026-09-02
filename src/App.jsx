import React from 'react';
import Home from './pages/Home';
import Mentors from './pages/Mentors';
import About from './pages/About';
import BookSession from './pages/BookSession';
import MyBookings from './pages/MyBookings';

export default function App() {
  return (
    <div style={{ padding: '20px' }}>
      <Home />
      <Mentors />
      <About />
      <BookSession />
      <MyBookings />
    </div>
  );
}
