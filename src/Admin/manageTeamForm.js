import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateTeamForm from './createTeamForm'; // Import the CreateTeamForm component
import NavigationBar from '../NavBar';
import "./Admin.css";
function ViewTeams() {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null); // State to track the selected team
    const [showCreateForm, setShowCreateForm] = useState(false); // State to track whether to show the create team form
    const [managers, setManagers] = useState([]); // State to store the list of managers

    useEffect(() => {
        // Fetch all teams from the server
        getTeams();
        // Fetch all managers from the server
        fetchManagers();
    }, []);

    const getTeams = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/teams/view');
            setTeams(response.data);
        } catch (error) {
            console.error('Error fetching teams:', error.message);
        }
    };

    const fetchManagers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/teams/getManagers');
            setManagers(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching managers:', error.message);
        }
    };

    const handleCreateTeam = () => {
        setShowCreateForm(!showCreateForm);
    };

    const handleRowClick = (team) => {
        setSelectedTeam(team);
    };

    const handleEditTeam = async () => {
        try {
            console.log(selectedTeam);
            await axios.post('http://localhost:3001/api/teams/update', selectedTeam);
            // Logic for handling successful edit
            window.alert('update successful');
            getTeams();
        } catch (error) {
            console.error('Error editing team:', error.message);
            // Logic for handling error
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedTeam({ ...selectedTeam, [name]: value });
    };

    function confirmDelete() {
        if (window.confirm("Are you sure you want to delete this team?")) {
            handleDeleteTeam();
            alert("Team deleted");
            console.log('team deleted');
        }
    }

    const handleDeleteTeam = async () => {
        try {
            await axios.delete('http://localhost:3001/api/teams/delete', { data: selectedTeam });
            // Logic for handling successful deletion
            setSelectedTeam();
            getTeams();
        } catch (error) {
            console.error('Error deleting team:', error.message);
            // Logic for handling error
        }
    };

    return (
        <div>
            <NavigationBar />
            <h1>Select a Team to Edit</h1>
            <br/>
            <table>
                <thead>
                    <tr>
                        <th>Team Id</th>
                        <th>Team Name</th>
                        <th>Manager Id</th>
                        <th>Manager Name</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map(team => (
                        <tr key={team.teamId} onClick={() => handleRowClick(team)}>
                            <td>{team.teamId}</td>
                            <td>{team.teamName}</td>
                            <td>{team.managerId}</td>
                            <td>{team.firstName} {team.lastName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Conditional rendering of the create team form */}
            {showCreateForm && <CreateTeamForm getTeams ={getTeams}/>}
            {/* Button for creating a new team */}
            {!showCreateForm && (
            <div>
                <br/>
                <div className={"button-box"}>
                    <button onClick={handleCreateTeam}>
                        Add New Team
                    </button>
                </div>
            </div>
            )}

            {/* Conditional rendering of edit form */}
            {selectedTeam && (
                <div>
                    <h2>Edit Team Details</h2>
                    <br/>
                    <form>
                        <div>
                            <strong>Team Id:</strong> {selectedTeam.teamId}
                        </div>
                        <label>
                            Team Name:
                            <input
                                type="text"
                                name="teamName"
                                value={selectedTeam.teamName}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Manager Id:
                            <select
                                className={"manager-ID"}
                                name='managerId'
                                value={selectedTeam.managerId}
                                onChange={handleChange}
                            >
                                <option value="">Select Manager ID</option>
                                {managers.map(manager => (
                                    <option key={manager.userId} value={manager.userId}>
                                        {manager.userId}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <div>
                            <strong>Manager Name:</strong> {selectedTeam.firstName} {selectedTeam.lastName}
                        </div>
                        <div className={"form-button-box"}>
                            <button className={"form-button"} type="button" onClick={handleEditTeam}>Save Changes</button>
                            <button className={"form-delete-button"} type="button" onClick={confirmDelete}>Delete Team</button>
                        </div>
                    </form>
                    <br/>
                </div>
            )}
        </div>
    );
}

export default ViewTeams;
