import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './Login';
import UpdateInfoForm from './updateInfoForm';

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<App />} />
        <Route path="/updateInfo" element ={<UpdateInfoForm />} />
        {/* Define other routes as needed */}
      </Routes>
    </Router>
  );
}

export default Main;
