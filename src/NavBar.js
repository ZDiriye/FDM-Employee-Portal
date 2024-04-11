import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from './useToken';
import { jwtDecode } from 'jwt-decode';
import fdm_Logo from "./images/fdm-logo.png";
import house_icon from "./images/house.png";
import manage_client_icon from "./images/clients.png";
import news_icon from "./images/newspaper.png";
import team_icon from "./images/team.png";
import manage_account_icon from "./images/manageaccount.png";
import manage_team_icon from "./images/manageteam.png";
import client_info_icon from "./images/clientinfo.png";
import dashboard_icon from "./images/dashboard.png"
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
      {name: "Account", path:"./PersonalInfo"},
      { name: "News Feed", path: "/PostsPage", icon:news_icon},
      { name:"Team news feed", path:"/TeamPostsPage", icon:team_icon},
      { name:"Leave requests", path: "/ViewLeaveRequest", icon:team_icon},
    ],
    manager: [
      { name: "Dashboard", path: "/dashboard", icon: dashboard_icon },
      { name: "Manage Users", path: "/manage-users", icon: manage_account_icon },
      { name:"Leave requests", path: "/ViewLeaveRequest", icon:team_icon},
      { name:"Team Leave Requests", path: "/ManageLeaveRequest", icon:manage_team_icon},
    ],
    consultant: [
      { name: "Client Details", path: "/consultations", icon: client_info_icon},
    ],
    admin: [
      { name: "Home", path: "./Homepage", icon: house_icon},
      { name: "Manage Accounts", path: "/manageAccount", icon:manage_account_icon},
      { name: "Teams", path: "/manageTeam", icon:manage_team_icon },
      { name: "Clients", path: "/manageClient", icon:manage_client_icon },
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
          }} className="logout-link" alt="Logout">
            Logout
          </a>
          <img src={fdm_Logo} alt="App Logo" className="app-logo" />
        </div>
      </nav>
  );
};

export default NavigationBar;
