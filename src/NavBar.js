import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from './useToken';
import { jwtDecode } from 'jwt-decode';
import fdm_Logo from "./images/fdm-logo.png";
import house_icon from "./images/house.png";
import "./NavBar.css";

const NavigationBar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear the token from session storage
    sessionStorage.removeItem('token');
    
    // Update the token state);
    navigate('/Login_folder/Login'); // Navigate to the login page
  };
  

  const { token } = useToken();
  let userType = '';


  if (token) {
    const decodedToken = jwtDecode(token);
    userType = decodedToken.Type;
  }

  // Define navigation links for each user type
  const navLinks = {
    employee: [
      { name: "Home", path: "./Homepage", icon: house_icon},
      { name: "News Feed", path: "/PostsPage" },
      { name:"Team news feed", path:"/TeamPostsPage"}
    ],
    manager: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Manage Users", path: "/manage-users" },
    ],
    consultant: [
      { name: "Clients", path: "/consultations" },
    ],
    admin: [
      { name: "Home", path: "./Homepage", icon: house_icon},
      { name: "Manage Accounts", path: "/manageAccount" },
      { name: "Teams", path: "/manageTeam" },
      { name: "Clients", path: "/manageClient" },
    ]
  };

  const userLinks = userType === 'admin' 
  ? navLinks[userType] // Admin gets only admin links
  : userType === 'manager' || userType === 'consultant'
  ? [...navLinks.employee, ...navLinks[userType]] // Managers and consultants get employee links plus specific ones
  : navLinks.employee; // Employees get only employee links

  return (
    <nav className="navbar">
      <ul>
        {userLinks.map((link, index) => (
          <li key={index} className="nav-item">
            <a href={link.path} className="nav-link">
              {link.icon && <img src={link.icon} alt={link.name + " icon"} className="nav-icon" />}
              {link.name}
            </a>
          </li>
        ))}
      </ul>

      <div className="logo-container">
      <a href="/" onClick={(e) => {
          e.preventDefault(); // Prevent the default anchor link behavior
          handleLogout(); // Call your logout function
        }} className="nav-link" alt="Logout">
          Logout
      </a>
        <img src={fdm_Logo} alt="App Logo" className="app-logo" />
      </div>
    </nav>
  );
};

export default NavigationBar;
