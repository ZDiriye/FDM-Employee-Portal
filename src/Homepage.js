import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import useToken from './useToken';
import { Link } from 'react-router-dom';
import NavigationBar from './NavBar';
import "./Homepage.css";




function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employee data from your API
    axios.get('http://localhost:3001/getEmployees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  return (
    <div>
      <h2>Employee Directory</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Team</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.firstName}{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.teamId}</td>
              <td>{employee.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



function MainContent({ username }) {

  const [latestPost, setLatestPost] = useState(null);

    useEffect(() => {
        axios.post('http://localhost:3001/viewPost') 
            .then(response => {
                if(response.data.length > 0) {
                    setLatestPost(response.data[0]);
                } else {
                    setLatestPost(null);
                }
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    }, []);


  return (
    <main >
      {username && <h2 className="username-heading">Hello {username}</h2>}  
      <div>
            <h2>General News feed</h2>
            {latestPost && (
               <Link to="/PostsPage" className="post-container">
                  <div>
                      <h2 className="post-title">{latestPost.name}</h2>
                      <p className="post-date">{new Date(latestPost.postDate).toLocaleString()}</p>
                      <p className="post-text"> {latestPost.text}</p>
                  </div>
                </Link>
            )}
            {!latestPost && <p className="no-posts">No posts to display</p>}
          
        </div>    
    </main>
  );
}

function Footer() {
  return (
    <footer style={{ padding: '20px', textAlign: 'center', backgroundColor: 'darkgray', color: 'white' }}>
      <p className="rights-reserved">Employee Portal - All rights reserved ©{new Date().getFullYear()}</p>
    </footer>
  );
}






// The Homepage component
export default function Homepage() {

  const { token } = useToken(); // Use the token from your custom hook
  let name = '';


  if (token) {
    const decodedToken = jwtDecode(token);
    // Assume the token has a claim 'userId', change to 'username' if necessary
    name = decodedToken.Name; // Adjust the key based on your token structure
  }
 
  return (
    <div>
      <NavigationBar/>
      <MainContent username={name}/>
      <EmployeeDirectory/>
      <Footer />
    </div>
  );
}

