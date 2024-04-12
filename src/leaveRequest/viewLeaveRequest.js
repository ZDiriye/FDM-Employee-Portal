import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import NavigationBar from "../NavBar";
import './formatting.css';
import useToken from "../useToken";

function ViewLeaveRequest() {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [filter, setFilter] = useState('All');
    const [orderBy, setOrderBy] = useState('newest');
    const [leaveRequestCounts, setLeaveRequestCounts] = useState({
        totalLeaveRequests: 0,
        pendingLeaveRequests: 0,
        completedLeaveRequests: 0,
    });

    const { token } = useToken();
    let userId ='';

    if (token){
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        userId = decodedToken.userID
    }

    // Fetch leave requests from the server based on filter and orderBy and userId
    useEffect(() => {
        async function fetchLeaveRequests() {
            try {
                const response = await axios.get(`http://localhost:3001/api/leaveRequest/getUserLeaveRequest?filter=${filter}&orderBy=${orderBy}&userId=${userId}`);
                setLeaveRequests(response.data);
            } catch (error) {
                console.error('Error fetching leave requests:', error);
            }
        }
        fetchLeaveRequests();
    }, [filter, orderBy, userId]);

    // Fetch leave request counts once when the component mounts
    useEffect(() => {
        async function fetchLeaveRequestCounts() {
            try {
                const response2 = await axios.get(`http://localhost:3001/api/leaveRequest/countUserLeaveRequest?userId=${userId}`);
                setLeaveRequestCounts(response2.data);
            } catch (error) {
                console.error('Error fetching leave request counts:', error);
            }
        }
        fetchLeaveRequestCounts();
    }, [userId]);


    // Handle change in filter selection
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };


    // Handle change in orderBy selection
    const handleOrderByChange = (event) => {
        setOrderBy(event.target.value);
    };


    return (
        <div>
        <NavigationBar />
        <div>
            {/* Button to navigate to Add Leave Request Form */}
            <br></br>


            <div className="Container">

                <button className="light">
                    <a href={"/AddLeaveRequestForm"} className="leave-a">Create Leave Request</a>
                </button>
                <div className="blog">

                    <h1> View Leave Requests </h1>
                    <br/>
                    <div>
                        <button className="blue">My Requests ({leaveRequestCounts.totalLeaveRequests})</button>

                        <button className="gray">Awaiting Decision ({leaveRequestCounts.pendingLeaveRequests})</button>

                        <button className="green">Completed ({leaveRequestCounts.completedLeaveRequests})</button>
                    </div>

                    {/* Display leave requests or a message if none found */}
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <select className="filters" value={filter} onChange={handleFilterChange}>
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>


                    {/* Order by dropdown */}
                    <select className="filters" value={orderBy} onChange={handleOrderByChange}>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                    <br/>
                    <br/>
                    <br/>
                    <br/>

                    {leaveRequests.length > 0 ? (
                        <div className="container" className="align-left">

                            <table id="requests" className="table table-striped">
                                <thead>
                                <tr>
                                    <th>Date Submitted</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Description</th>
                                    <th>Approval</th>
                                </tr>
                                </thead>
                                <tbody>
                                {leaveRequests.map((request, index) => (
                                    <tr key={index}>
                                        <td> {request.dateSubmitted}</td>
                                        <td> {request.startTime}</td>
                                        <td>{request.endTime}</td>
                                        <td>{request.description}</td>
                                        <td>{request.Approval}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (

                        <p>No leave requests found.</p>
                    )}

                </div>


            </div>


        </div>
        </div>

    );
}

export default ViewLeaveRequest;
