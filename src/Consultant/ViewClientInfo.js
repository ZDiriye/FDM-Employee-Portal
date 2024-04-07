// ViewClientInfo.js
import { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from '../NavBar';
function ViewClientInfo() {
    const [accountId, setAccountId] = useState(10);
    const [client, setClient] = useState(null);

    useEffect(() => {
        getClientInfo();
    }, []);

    const getClientInfo = async () => {
        try {
            console.log("Fetching client info for accountId:", accountId);
            const response = await axios.get('http://localhost:3001/api/client/getInfo', { params: { accountId } });
            console.log("Response:", response.data);
            setClient(response.data);
        } catch (error) {
            console.error('Error fetching client info:', error);
        }
    };

    useEffect(() => {
        console.log("Client data:", client);
    }, [client]);

    return (
        <div>
            <NavigationBar/>
            <div className="ViewClient">
                <h1>Client Information</h1>
                {client !== null ? (
                    <div>
                        <p>Client Id: {client[0]?.clientId || 'N/A'}</p>
                        <p>Client Name: {client[0]?.clientName || 'N/A'}</p>
                        <p>Line Manager Email: {client[0]?.clientEmail || 'N/A'}</p>
                    </div>
                ) : (
                    <p>No client information available.</p>
                )}
            </div>
        </div>
    );
}

export default ViewClientInfo;
