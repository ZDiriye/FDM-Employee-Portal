import React, {useState}  from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import useToken from '../useToken';
import fdm_Logo from "../images/fdm-logo.png";


async function LoginUser(credentials) {
    return fetch('http://localhost:3001/validatePassword', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}


const Login = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [step, setStep] = useState(1); 
    const [errorMessage, setErrorMessage] = useState('');
    const [canResend, setCanResend] = useState(true);
    const [countdown, setCountdown] = useState(30);
    const { setToken } = useToken();

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const goBackToLogin = () => {
        setStep(1);
        setErrorMessage('');
        setOtp(new Array(6).fill(''));
    };

    const verifyOTP = async () => {
        const securityCode = otp.join('');
        try {
            const response = await axios.post('http://localhost:3001/securityCode', { username, securityCode });
            if (response.data.validation === true) {
                navigate('/homepage');
            } else {
                setErrorMessage("The OTP entered is incorrect.");
            }
        } catch (error) {
            setErrorMessage("An error occurred while verifying the OTP.");
        }
    };

    const resendOTP = async () => {
        try {
          const response = await axios.post('http://localhost:3001/recoveryEmail', { username });
          console.log(response);
          setCanResend(false);
          startCountdown();
        } catch (error) {
          console.error('Error resending email:', error);
          alert(error.response ? error.response.data.message : error.message);
        }
      };
    

      const startCountdown = () => {
        if (!canResend) return;
    
        let timeLeft = 30;
        const timerId = setInterval(() => {
          timeLeft -= 1;
          setCountdown(timeLeft);
          if (timeLeft <= 0) {
            clearInterval(timerId);
            setCanResend(true);
          }
        }, 1000);
      };

    function handlePasswordResetClick() {
            navigate('/Login_folder/passwordResetCode');
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
                setStep(2);
                setCanResend(true);
                
            })
            .catch(error => {
                console.error('Error sending email:', error);
                alert(error.response ? error.response.data.message : error.message);
            });
          } else {
            alert('Login failed');
          }
        }
        
    

    return (
        <>
        <nav className="simple-nav">
            <img src={fdm_Logo} alt="App Logo" className="app-logo" />
        </nav>
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
                        <button onClick={handlePasswordResetClick} className="forgot-password-button">Forgot password</button>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </form>
                </>
            )}
            {step === 2 && (
                <>
                    <h1>Enter OTP</h1>
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
                            autoComplete="off"
                        />
                        ))}
                    </div>
                    <button type="submit" className="verify-btn">Verify</button>
                    
                    </form>
                    {errorMessage && <p className="error">{errorMessage}</p>}

                    <div className="button-container">
                        <button onClick={resendOTP} className="resend-otp-button" disabled={!canResend}> 
                            Resend OTP {canResend ? '' : `(${countdown})`} 
                        </button>
                        <button onClick={goBackToLogin} className="back-button">Back</button>
                    </div>

                </>
                )}
        </div>
        </>
    );
    
}


export default Login

