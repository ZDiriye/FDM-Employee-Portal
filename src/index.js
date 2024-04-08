import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Login_folder/Login';
import Homepage from './Homepage';
import PasswordResetCode from './Login_folder/PasswordResetCode';
import PostsPage from './Blog/ViewPostPage';
import DeletePostsPage from './Blog/DeletePost';
import TeamPostsPage from './teamBlog/ViewTeamPostPage'; 
import DeleteTeamPostsPage from './teamBlog/DeleteTeamPost';
import CreateTeamPostForm from './teamBlog/CreateTeamPostForm';
import PrivateRoute from './PrivateRoute';
import { Navigate } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import ManageAccount from './Admin/manageAccountsForm';
import ManageClient from './Admin/manageClientForm';
import ManageTeam from './Admin/manageTeamForm';


const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/Login_folder/Login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Homepage /></PrivateRoute>} />
        <Route path="/Login_folder/passwordResetCode" element={<PasswordResetCode />} />
        <Route path="/PostsPage" element={<PrivateRoute><PostsPage /></PrivateRoute>} />
        <Route path="/DeletePostsPage" element={<DeletePostsPage />} />
        <Route path="/TeamPostsPage" element={<TeamPostsPage />} />
        <Route path="/DeleteTeamPost" element={<DeleteTeamPostsPage/>} />
        <Route path="/CreateteamPostForm" element={< CreateTeamPostForm/>} />
        <Route path="/ManageAccount" element={<PrivateRoute><ManageAccount /></PrivateRoute>} />
        <Route path="/ManageClient" element={<PrivateRoute><ManageClient /></PrivateRoute>} />
        <Route path="/ManageTeam" element={<PrivateRoute><ManageTeam /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

//<Route path="/Login_folder/SecurityCodeInput" element={<SecurityCodeInput />} />
export default function App(){
  return (
    <BrowserRouter>
      {/* Pass the token and logout handler to the NavigationBar as props if needed */}
      <Main />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
