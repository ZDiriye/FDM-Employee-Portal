import React, { useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import './formatting.css';

import NavigationBar from "../NavBar";


function ManageLeaveRequest() {
   const [leaveRequests, setLeaveRequests] = useState([]);
   const [selectedApprovals, setSelectedApprovals] = useState([]);
   const [filter, setFilter] = useState('Pending');
   const [orderBy, setOrderBy] = useState('Newest');


   // Function to fetch leave requests from the server
   const fetchLeaveRequests = useCallback(async () => {
       try {
           const response = await axios.get(`http://localhost:5000/api/leaveRequest/getManagedLeaveRequest?filter=${filter}&orderBy=${orderBy}`);
           setLeaveRequests(response.data);
           setSelectedApprovals(response.data.map(request => ({ userId: request.userId, dateSubmitted: request.dateSubmitted, approvalStatus: 'Pending'})));
       } catch (error) {
           console.error('Error fetching leave requests:', error);
       }
   }, [filter, orderBy]);


   // Effect to fetch leave requests when filter or orderBy changes
   useEffect(() => {
       fetchLeaveRequests();
   }, [filter, orderBy, fetchLeaveRequests]);


   // Handle change in filter selection
   const handleFilterChange = (event) => {
       setFilter(event.target.value);
   };


   // Handle change in orderBy selection
   const handleOrderByChange = (event) => {
       setOrderBy(event.target.value);
   };


   // Handle change in Approval selection
   const handleApprovalChange = (index, approvalStatus) => {
       const updatedApprovals = [...selectedApprovals];
       updatedApprovals[index].approvalStatus = approvalStatus;
       setSelectedApprovals(updatedApprovals);
   };


   const handleSubmit = async () => {
       const selectedRequests = selectedApprovals.filter(approval => approval.approvalStatus !== 'Pending');
       if (selectedRequests.length === 0) {
           alert('Nothing has been selected.');
           return; // Exit the function if no request has been selected
       }
       if (window.confirm('Are you sure you want to submit?')) {
           try {
               await axios.post('http://localhost:5000/api/leaveRequest/update', selectedRequests);
               fetchLeaveRequests();
           } catch (error) {
               console.error('Error updating approvals:', error);
           }
       }
   };
  

   return (
       <div>

           <NavigationBar />

       <div>

           <div className="Container">

               <div className="blog">

                   <h1>Leave Requests</h1>
                   <br/>

                   {/* Filter dropdown */}
                   <select className="filters" value={filter} onChange={handleFilterChange}>
                       <option value="Pending">Pending</option>
                       <option value="Completed">Completed</option>
                   </select>


                   {/* Order by dropdown */}
                   <select className="filters" value={orderBy} onChange={handleOrderByChange}>
                       <option value="Newest">Newest</option>
                       <option value="Oldest">Oldest</option>
                   </select>

                   <br/>
                   <br></br>
                   <br></br>

                   {leaveRequests.length > 0 ? (
                       <div className="container" className="align-left">

                           <table id="requests" className="table table-striped">

                               <thead>
                               <tr>
                                   <th>User</th>
                                   <th>Date Submitted</th>
                                   <th>Start Time</th>
                                   <th>End Time</th>
                                   <th>Description</th>
                                   <th>Decision</th>
                               </tr>
                               </thead>
                               <tbody>
                               {leaveRequests.map((request, index) => (
                                   <tr key={index}>
                                       <td> {request.firstName} {request.lastName}</td>
                                       <td>{request.dateSubmitted}</td>
                                       <td> {request.startTime}</td>
                                       <td>{request.endTime}</td>
                                       <td>{request.description}</td>
                                       <td>
                                           {request.Approval === "Pending" ? (
                                               <div>

                                                   <label>

                                                       <input
                                                           type="radio"
                                                           name={`approval${index}`}
                                                           value="Approved"
                                                           onChange={() => handleApprovalChange(index, 'Approved')}
                                                           checked={selectedApprovals[index].approvalStatus === 'Approved'}
                                                       />
                                                       Approve
                                                   </label>
                                                   <br></br>
                                                   <br></br>
                                                   <label>

                                                       <input
                                                           type="radio"
                                                           name={`approval${index}`}
                                                           value="Declined"
                                                           onChange={() => handleApprovalChange(index, 'Declined')}
                                                           checked={selectedApprovals[index].approvalStatus === 'Declined'}
                                                       />Decline
                                                   </label>
                                               </div>
                                           ) : (
                                               <p>{request.Approval}</p>
                                           )}
                                       </td>

                                   </tr>
                               ))}
                               </tbody>
                           </table>
                           <br/>
                           {filter !== "Completed" && (
                               <button onClick={handleSubmit}>Submit</button>
                           )}
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
export default ManageLeaveRequest;
