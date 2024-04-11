import React, { useState } from 'react';
import axios from 'axios';
import './formatting.css';
import NavigationBar from "../NavBar";
import useToken from "../useToken";
import {jwtDecode} from "jwt-decode";

function AddLeaveRequestForm() {
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
    const formattedDateTime = `${currentDate} ${currentTime}`;
    // State for form data
    const { token } = useToken();
    let id = '';
    if (token) {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        id = decodedToken.userID;
        console.log(id)
    }
    const [formData, setFormData] = useState({
        userId: id,
        startTime: '',
        endTime: '',
        description: '',
        dateSubmitted: formattedDateTime,
        Approval: 'Pending'
    });


    // Handle change in form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();


        if (formData.startTime.trim() === '' || formData.endTime.trim() === '') {
            alert("Please enter both start and end date.");
            return;
        }


        try {
            console.log(formData);
            const confirmed = window.confirm("Are you sure you want to submit this leave request?");
            if (confirmed) {
                const response = await axios.post('http://localhost:3001/api/leaveRequest/add', formData);
                console.log('Leave request submitted successfully:', response.data);
                window.location.href = '/successPage';
                        }
        } catch (error) {
            alert("Failed to create leave request. Please try again later.");
        }
   };


   return (
       <div>
           <NavigationBar />


       <div>
           <button className="back">
               <a href={"/"} className="leave-a">Go Back</a>
           </button>
               <form onSubmit={handleSubmit}>

                   <h2>Add Leave Request</h2>
                   <label htmlFor="startTime">Start date:</label>

                   <input className="size" type="date" id="startTime" name="startTime" value={formData.startTime}
                          min={currentDate}
                          onChange={handleChange}/>

                   <label htmlFor="endTime">End date:</label>

                   <input className="size" type="date" id="endTime" name="endTime" value={formData.endTime}
                          min={formData.startTime || currentDate}
                          onChange={handleChange}/>

                   <label htmlFor="description">Reason for leave request:</label>

                   <input className="size2" type="text" id="description" name="description" value={formData.description}
                          onChange={handleChange}/>

                   <button className="inline" type="submit">Submit</button>
               </form>

       </div>

       </div>
   );
}
export default AddLeaveRequestForm;
