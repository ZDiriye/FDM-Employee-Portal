import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import useToken from '../useToken';
import "./PasswordResetCode.css";
import fdm_Logo from "../images/fdm-logo.png";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // New state to control the current step
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [code, setCode] = useState(Array(6).fill(''));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [canResend, setCanResend] = useState(true); // State to control the resend button availability
  const [countdown, setCountdown] = useState(30);
  const { token } = useToken(); // Use the token from your custom hook

  const inputRefs = Array.from({ length: 6 }, () => React.createRef());

  
  const handleChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };


  const handleKeyUp = (e, index) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const emailButton = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/recoveryEmail', { username })
      .then(response => {
        // Move to next step
        setStep(2);
      })
      .catch(error => {
        console.error('Error sending email:', error);
        alert(error.response ? error.response.data.message : error.message);
      });
  };

  const validatePassword = (pass) => {
    const hasNumber = /\d/.test(pass);
    const hasUpperCase = /[A-Z]/.test(pass);
    return hasNumber && hasUpperCase;
  };

  const goBackToLogin = () => {
    navigate('/Login_folder/Login'); // Adjust the route as needed for your routing setup
  };
  const resendOTP = async () => {
    try {
      const response = await axios.post('http://localhost:3001/recoveryEmail', { username });
      console.log(response); // You might want to handle the response or show a message
      setCanResend(false);
      startCountdown();
    } catch (error) {
      console.error('Error resending email:', error);
      alert(error.response ? error.response.data.message : error.message);
    }
  };

  // Start the countdown timer
  const startCountdown = () => {
    if (!canResend) return; // Prevent multiple timers if already counting down

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


  

  const handleSubmit = async  (e) => {
    e.preventDefault();
    const securityCode = code.join('');
    axios.post('http://localhost:3001/securityCode', { username, securityCode })
      .then(response => {
        if(response.data.validation === true){
          //navigate("/Login_folder/ChangePassword");
          setStep(3);
        }else{
          setErrorMessage("Incorrect code entered");
        }
        
      })
      .catch(error => {
        console.error('Error:', error);
        alert(error.response ? error.response.data.message : error.message);
      });
  };
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage('Password must contain at least one uppercase letter and one number.');
      return;
    }
    console.log("this is the username value: ", username);

    try {;
      await axios.post('http://localhost:3001/updatePassword', {userId: username,
      password: password,});
      navigate('/Login_folder/Login'); // Navigate to login page or show success message
   
      
    } catch (error) {
      console.error('Error changing password:', error);
      setErrorMessage(error.response ? error.response.data.message : 'An error occurred');
    }
  };
  



  return (
    <div className="reset-container">
      <nav className="simple-nav">
            <img src={fdm_Logo} alt="App Logo" className="app-logo" />
        </nav>
      {step === 1 && (
        <>
          <form onSubmit={emailButton} className="reset-form">
          <h3 className="reset-instructions">Enter your username to receive a password reset link. Make sure it's the one associated with your account.</h3>
            <input 
              type='text' 
              required 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder='username'
              value={username}
              className='reset-input'
            />
            <button type='submit' className="reset-submit-button">Submit</button>
          </form>
          <button onClick={goBackToLogin} className="back-button">
            Back to Login
          </button>
        </>
      )}
      {step === 2 && (
        <div className="step-container">
          <h2 className="step-title">Enter Security Code</h2>
          <p className="step-description">A security code has been sent to your email. Enter the code below to proceed.</p>
          <form onSubmit={handleSubmit} className="otp-form">
            <div className="otp-inputs">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  className="otp-field"
                  type="text"
                  value={digit}
                  maxLength={1}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyUp={(e) => handleKeyUp(e, index)}
                  required
                />
              ))}
            </div>
            <button type="submit" className="verify-btn">Verify Code</button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form>
          <div className="button-container">
                <button onClick={resendOTP} className="resend-otp-button" disabled={!canResend}> 
                    Resend OTP {canResend ? '' : `(${countdown})`} 
                </button>
                <button onClick={goBackToLogin} className="back-button">Back</button>
            </div>
                
          </div>
      )}

      {step === 3 && (
        <div className="container">
          <h2 className="title">Reset Your Password</h2>
          <form onSubmit={handlePasswordReset} className="password-form">
            <div className="form-group">
              <input
                className="input-field"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                required
              />
            </div>
            <div className="form-group">
              <input
                className="input-field"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                required
              />
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button type="submit" className="submit-button">
              Reset Password
            </button>
          </form>
          <button onClick={goBackToLogin} className="back-button">
            Back to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default PasswordReset;
