import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateClientForm from './createClientForm'; // Import the CreateClientForm component
import NavigationBar from '../NavBar';
import "./Admin.css";
function ViewClients() {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null); // State to track the selected client
    const [showCreateForm, setShowCreateForm] = useState(false); // State to track whether to show the create client form

    useEffect(() => {
        getClients();
    }, []);

    const getClients = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/clients/view');
            setClients(response.data);
        } catch (error) {
            console.error('Error fetching clients:', error.message);
        }
    };

    const handleRowClick = (client) => {
        setSelectedClient(client);
    };

    const handleCreateClient = () => {
        setShowCreateForm(!showCreateForm);
    };

    const handleEditClient = async () => {
        try {
            await axios.post('http://localhost:3001/api/clients/update', selectedClient);
            alert('Client updated successfully');
            // Fetch updated list of clients
            getClients();
        } catch (error) {
            console.error('Error editing client:', error.message);
        }
    };

    const handleDeleteClient = async () => {
        try {
            await axios.delete('http://localhost:3001/api/clients/delete', { data: { clientId: selectedClient.clientId } });
            alert('Client deleted successfully');
            // Fetch updated list of clients
            setSelectedClient();
            getClients();
        } catch (error) {
            console.error('Error deleting client:', error.message);
        }
    };

    return (
        <div>
             <NavigationBar />
            <h1>Select a Client to Edit</h1>
            <br/>
            <table>
                <thead>
                    <tr>
                        <th>Client ID</th>
                        <th>Client Name</th>
                        <th>Client Email</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.clientId} onClick={() => handleRowClick(client)}>
                            <td>{client.clientId}</td>
                            <td>{client.clientName}</td>
                            <td>{client.clientEmail}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Conditional rendering of the create client form */}
            {showCreateForm && <CreateClientForm getClients={getClients}/>}
            {/* Button for creating a new client */}
            {!showCreateForm && (
            <div>
                <br/>
                <div className={"button-box"}>
                    <button onClick={handleCreateClient}>
                        Add New Client
                    </button>
                </div>
            </div>
            )}

            {selectedClient && (
                <div>
                    <h2>Edit Client Details</h2>
                    <br/>
                    <form>
                        <div>
                            <strong>Client ID:</strong> {selectedClient.clientId}
                        </div>
                        <label>
                            Client Name:
                            <input
                                type="text"
                                name="clientName"
                                value={selectedClient.clientName}
                                onChange={(e) => setSelectedClient({ ...selectedClient, clientName: e.target.value })}
                            />
                        </label>
                        <label>
                            Client Email:
                            <input
                                className={"client-email"}
                                type="email"
                                name="clientEmail"
                                value={selectedClient.clientEmail}
                                onChange={(e) => setSelectedClient({ ...selectedClient, clientEmail: e.target.value })}
                            />
                        </label>
                        <br/>
                        <div className={"form-button-box"}>
                            <button className={"form-button"} type="button" onClick={handleEditClient}>Save Changes</button>
                            <button className={"form-delete-button"} type="button" onClick={handleDeleteClient}>Delete Client</button>
                        </div>
                    </form>
                    <br/>
                </div>
            )}
        </div>
    );
}

export default ViewClients;
