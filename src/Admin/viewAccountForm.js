import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewAccountForm() {
    const [accounts, setAccounts] = useState([]);
    const [clients, setClients] = useState([]);
    const [teams, setTeams] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        fetchAccounts();
        fetchClients();
        fetchTeams();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/accounts/view');
            setAccounts(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };

    const fetchClients = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/clients/view');
            setClients(response.data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    const fetchTeams = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/teams/view');
            setTeams(response.data);
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    };

    const handleRowClick = (account) => {
        setSelectedAccount(account);
        setShowEditForm(true);
    };

    const handleCloseEditForm = () => {
        setShowEditForm(false);
        setSelectedAccount(null); // Reset selected account
        fetchAccounts(); // Refresh account list
    };

    const handleEditAccount = async () => {
        try {
            await axios.post('http://localhost:3001/api/accounts/update', selectedAccount);
            // Optionally, show a success message
            alert('Account updated successfully');
            handleCloseEditForm();
        } catch (error) {
            console.error('Error editing account:', error.message);
            // Optionally, show an error message
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await axios.delete('http://localhost:3001/api/accounts/delete', { data: { userId: selectedAccount.userId } });
            // Optionally, show a success message
            alert('Account deleted successfully');
            fetchAccounts(); // Refresh account list
            setSelectedAccount(null); // Reset selected account
        } catch (error) {
            console.error('Error deleting account:', error.message);
            // Optionally, show an error message
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedAccount({ ...selectedAccount, [name]: value });
    };

    return (
        <div>
            <h1>All Accounts</h1>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>Account Type</th>
                        <th>Team ID</th>
                        <th>Client ID</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map(account => (
                        <tr key={account.userId} onClick={() => handleRowClick(account)}>
                            <td>{account.userId}</td>
                            <td>{account.firstName}</td>
                            <td>{account.lastName}</td>
                            <td>{account.password}</td>
                            <td>{account.email}</td>
                            <td>{account.type}</td>
                            <td>{account.teamId}</td>
                            <td>{account.clientId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showEditForm && selectedAccount && (
                <div>
                    <h2>Edit Account Details</h2>
                    <form>
                        <div>
                            <strong>User ID:</strong> {selectedAccount.userId}
                        </div>
                        <label>
                            First Name:
                            <input
                                type="text"
                                name="firstName"
                                value={selectedAccount.firstName}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Last Name:
                            <input
                                type="text"
                                name="lastName"
                                value={selectedAccount.lastName}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={selectedAccount.password}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={selectedAccount.email}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Account Type:
                            <select name="type" value={selectedAccount.type} onChange={handleChange}>
                                <option value="employee">Employee</option>
                                <option value="manager">Manager</option>
                                <option value="admin">Admin</option>
                                <option value="consultant">Consultant</option>
                            </select>
                        </label>
                      
                        <label>
                            Team ID:
                            <select name="teamId" value={selectedAccount.teamId || ''} onChange={handleChange}>
                                <option value="">Select Team ID</option>
                                {teams.map(team => (
                                    <option key={team.teamId} value={team.teamId}>
                                        {team.teamId}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Client ID:
                            <select name="clientId" value={selectedAccount.clientId || ''} onChange={handleChange}>
                                <option value="">Select Client ID</option>
                                {clients.map(client => (
                                    <option key={client.clientId} value={client.clientId}>
                                        {client.clientId}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <button type="button" onClick={handleEditAccount}>Save Changes</button>
                        <button type="button" onClick={handleDeleteAccount}>Delete Account</button>
                        <button type="button" onClick={handleCloseEditForm}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
}
