import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios library

function CreateTeamForm() {
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
        } catch (error) {
            console.error('Error creating team:', error.message);
        }
    };

    return (
        <div>
            <h2>Create New Team</h2>
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
                <button type="submit">Create Team</button>
            </form>
        </div>
    );
}

export default CreateTeamForm;
