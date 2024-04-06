import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import useToken from '../useToken';
import "./PasswordResetCode.css";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // New state to control the current step
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [code, setCode] = useState(Array(6).fill(''));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      {step === 1 && (
        <>
          <h3 className="reset-title">Please enter your username, and if we find a match in the system, an email will be sent with a security code.</h3>
          <form onSubmit={emailButton} className="reset-form">
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
        </>
      )}
      {step === 2 && (
        <>
          <h2>Enter Security Code</h2>
          <form onSubmit={handleSubmit}>
            <div className="otp-inputs">
              <p>Username: {username}</p>
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
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <br />

            <button type="submit" className="verify-btn">Verify Code</button>
          </form>
        </>
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
        </div>
      )}
    </div>
  );
};

export default PasswordReset;
