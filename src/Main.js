import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './Login';

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<App />} />
        {/* Define other routes as needed */}
      </Routes>
    </Router>
  );
}

export default Main;
