// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import useToken from './useToken';

const PrivateRoute = ({ children }) => {
  const { token } = useToken();

  if (!token) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/Login_folder/login" replace />;
  }

  // User is authenticated, render the children components
  return children;
};

export default PrivateRoute;
