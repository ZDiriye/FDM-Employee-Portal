import React, {useState}  from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import './Login.css';
import axios from 'axios';
import useToken from '../useToken';


async function LoginUser(credentials) {
    return fetch('http://localhost:3001/validatePassword', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}

const emailButton = (e) => {
    e.preventDefault();
    
  };

const Login = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [step, setStep] = useState(1); // step 1 for login, step 2 for otp
    const [errorMessage, setErrorMessage] = useState('');
    const { setToken } = useToken();

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };
    

    const onFinish = async (e) => {
        e.preventDefault();
        const response = await LoginUser({username, password});
        console.log(response)
        const tokenResponse = response.token
        if (tokenResponse && response.validation) {
            setToken({token : tokenResponse});
            axios.post('http://localhost:3001/recoveryEmail', { username })
            .then(response => {
                //setStep(2);
            })
            .catch(error => {
                console.error('Error sending email:', error);
                alert(error.response ? error.response.data.message : error.message);
            });
            //navigate('/homepage');
            setStep(2);
          } else {
            // Handle the error case here
            alert('Login failed');
          }
        }
        
    const verifyOTP = async () => {
        const securityCode = otp.join('');
        try {
            const response = await axios.post('http://localhost:3001/securityCode', { username, securityCode });
            if (response.data.validation === true) {
                //setToken({ token: response.data.token });
                navigate('/homepage');
            } else {
                setErrorMessage("The OTP entered is incorrect.");
            }
        } catch (error) {
            setErrorMessage("An error occurred while verifying the OTP.");
        }
    };

    function handlePasswordResetClick() {
            navigate('/Login_folder/passwordResetCode'); // Use the path you defined in your <Route>
    }

    return (
        <div className="login-container">
            {step === 1 && (
                <>
                    <h1 className="login-title">Login</h1>
                    <form onSubmit={onFinish} className="login-form">
                    <div className="form-group">
                    <p> Username </p>
                    <input 
                        type="text" 
                        className="login-input username-input"
                        required 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Enter your username" 
                    />
                </div>
                <div className="form-group">
                    <p> Password </p>
                    <input 
                        type="password" 
                        className="login-input password-input" 
                        required 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Enter your password"
                    /> 
                </div>
                        <button type="submit" className="submit-button">Submit</button>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </form>
                    {/*<button onClick={() => setStep(2)} className="forgot-password-button">Forgot password</button>*/}
                    <button onClick={handlePasswordResetClick} className="forgot-password-button">Forgot password</button>
                </>
            )}
            {step === 2 && (
                <>
                    <h2>Enter OTP</h2>
                    <form onSubmit={(e) => {
                    e.preventDefault();
                    verifyOTP();
                    }}>
                    <div className="otp-inputs">
                        {otp.map((data, index) => (
                        <input
                            key={index}
                            className="otp-field"
                            type="text"
                            name="otp"
                            maxLength="1"
                            value={data}
                            onChange={e => handleChange(e.target, index)}
                            onFocus={e => e.target.select()}
                            autoComplete="off" // Disable autocomplete suggestions
                        />
                        ))}
                    </div>
                    <button type="submit" className="verify-btn">Verify</button>
                    </form>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                </>
                )}
        </div>
    );
}


export default Login

