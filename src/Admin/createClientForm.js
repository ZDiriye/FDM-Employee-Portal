import React, { useState } from 'react';
import axios from 'axios';

function CreateClientForm() {
    const [clientName, setClientName] = useState('');
    const [clientEmail, setClientEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // Send a POST request to the backend to create a new client
            console.log(clientName,clientEmail);
            const response = await axios.post('http://localhost:3001/api/clients/add', {
                clientName,
                clientEmail
            });

            console.log('Client created successfully:', response.data);
            // Reset form fields after successful submission
            setClientName('');
            setClientEmail('');
            window.alert("Client created");
        } catch (error) {
            console.error('Error creating client:', error.message);
        }
    };

    return (
        <div>
            <h2>Create New Client</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="clientName">Client Name:</label>
                    <input 
                        type="text" 
                        id="clientName" 
                        value={clientName} 
                        onChange={(event) => setClientName(event.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="clientEmail">Client Email:</label>
                    <input 
                        type="email" 
                        id="clientEmail" 
                        value={clientEmail} 
                        onChange={(event) => setClientEmail(event.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Create Client</button>
            </form>
        </div>
    );
}

export default CreateClientForm;
