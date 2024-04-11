import React, { useState } from 'react';
import axios from 'axios';
import './updateInfo.css';
import NavigationBar from '../NavBar';
import useToken from '../useToken';
import { jwtDecode } from 'jwt-decode';

function UpdateInfoForm() {
    // State to hold form data
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
        newFirstName: '',
        newLastName: '',
    });

    const { token } = useToken();
    let userId = '';
    if (token) {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        userId = decodedToken.userID;
    }

    // Handle form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedFormData = {
            ...formData,
            userId: userId,
            password: formData.password
        };
        console.log(formData.password);
        // Send post request to server to update user info
        try {
            const response = await axios.post('http://localhost:3001/updatePersonalInfo', updatedFormData);
            console.log('Information updated successfully:', response.data);
            alert('Information updated successfully.');
        } catch (error) {
            console.error('There was an error updating the info', error);
            alert('Failed to update account. Please try again later.');
        }
    };

    return (
        <div>
            <NavigationBar />
            <form onSubmit={handleSubmit}>
                <h1>Update Information</h1>
                <label htmlFor="userId">User ID</label>
                <div id="userId">{userId}</div>

                <label htmlFor="password">New Password</label>
                <input
                    type="text"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />

                <label htmlFor="fname">First Name</label>
                <input
                    type="text"
                    id="fname"
                    name="newFirstName"
                    value={formData.newFirstName}
                    onChange={handleChange}
                    placeholder="New First Name"
                    required
                />

                <label htmlFor="lname">Last Name</label>
                <input
                    type="text"
                    id="lname"
                    name="newLastName"
                    value={formData.newLastName}
                    onChange={handleChange}
                    placeholder="New Last Name"
                    required
                />

                <br/>
                <input className="light" type="submit" value="Update Information" />
            </form>
        </div>
    );
}

export default UpdateInfoForm;
