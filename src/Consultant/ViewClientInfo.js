// ViewClientInfo.js
import { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from '../NavBar';
import useToken from '../useToken';
import { jwtDecode } from 'jwt-decode';
import "./Consultant.css";
function ViewClientInfo() {
  
    const [client, setClient] = useState(null);
    const {token}=useToken();

    let userId ='';

    if (token){
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        userId = decodedToken.userID
    }

    useEffect(() => {
        getClientInfo();
    }, []);

    const getClientInfo = async () => {
        try {
            console.log("Fetching client info for accountId:", userId);
            const response = await axios.get('http://localhost:3001/api/client/getInfo', { params: { userId } });
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
                    <div className={"data-container"}>
                        <h2>Client Id: </h2>
                        <br/>
                        <p className={"info"}>{client[0]?.clientId || 'N/A'}</p>
                        <br/>
                        <h2>Client Name: </h2>
                        <br/>
                        <p className={"info"}>{client[0]?.clientName || 'N/A'}</p>
                        <br/>
                        <h2>Line Manager Email:</h2>
                        <br/>
                        <p className={"info"}>{client[0]?.clientEmail || 'N/A'}</p>
                        <a className={"email-link"} href={"mailto:"+client[0]?.clientEmail || 'N/A'}>Send Email</a>
                    </div>
                ) : (
                    <p>No client information available.</p>
                )}
            </div>
        </div>
    );
}

export default ViewClientInfo;
