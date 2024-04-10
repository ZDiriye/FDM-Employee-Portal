import React, {useState} from 'react';
import axios from 'axios';
import './updateInfo.css';

function UpdateInfoForm(){
    //state to hold form data
    const[formData, setFormData] = useState({
        userId: '',
        password: '',
        newFirstName: '',
        newLastName: '',
    });

    //handle form input changes
    const handleChange = (event) => {
        const{name, value} = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    //handle form submission
    const handleSubmit = async (event) =>{
        event.preventDefault();

        //send post request to server to update user info
        try {
        const response = await axios.post('http://localhost:5000/updatePersonalInfo', formData);
        console.log('Information updates successfully:', response.data);
        alert("Information updated successfully.");
        }
        catch (error){
        console.error('There was an error updating the info', error);
        alert("Failed to create leave request. Please try again later.");
        }
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label for="userId">User ID</label>
                <input
                    type="text"
                    id="userId"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    placeholder="User ID"
                    required
                />

                <label for="password">New Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />

                <label for="fname">First Name</label>
                <input
                    type="text"
                    id="fname"
                    name="newFirstName"
                    value={formData.newFirstName}
                    onChange={handleChange}
                    placeholder="New First Name"
                    required
                />

                <label for="lname">Last Name</label>
                <input
                    type="text"
                    id="lname"
                    name="newLastName"
                    value={formData.newLastName}
                    onChange={handleChange}
                    placeholder="New Last Name"
                    required
                />

                <input type = "submit" value= "Update Information" />
            </form>
        </div>
    );
};

export default UpdateInfoForm;