import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios library
import "./Admin.css";

function CreateTeamForm(props) {
    const [teamName, setTeamName] = useState('');
    const [managerId, setManagerId] = useState('');
    const [managers, setManagers] = useState([]);

    useEffect(() => {
        fetchManagers();
    }, []);

    const fetchManagers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/teams/getTeamlessManager');
            setManagers(response.data);
        } catch (error) {
            console.error('Error fetching teamless managers:', error.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            console.log(managerId, teamName);
            const response = await axios.post('http://localhost:3001/api/teams/add', {
                managerId,
                teamName
            });
    
            console.log('Team created successfully:', response.data);
            setTeamName('');
            setManagerId('');
            window.alert("Team created");
            fetchManagers();
            props.getTeams();
        } catch (error) {
            console.error('Error creating team:', error.message);
        }
    };
    

    return (
        <div>
            <h2>Create New Team</h2>
            <br/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="teamName">Team Name:</label>
                    <input 
                        type="text" 
                        id="teamName" 
                        value={teamName} 
                        onChange={(event) => setTeamName(event.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="managerId">Manager ID:</label>
                    <select
                        className={"manager-ID-2"}
                        id="managerId" 
                        value={managerId} 
                        onChange={(event) => setManagerId(event.target.value)} 
                        required 
                    >
                        <option value="">Select Manager ID</option>
                        {managers.map(manager => (
                            <option key={manager.userId} value={manager.userId}>
                                {manager.userId}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={"button-box"}>
                    <button type="submit">Create Team</button>
                </div>
            </form>
        </div>
    );
}

export default CreateTeamForm;
