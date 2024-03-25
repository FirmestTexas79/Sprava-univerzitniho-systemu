import React, { useState } from "react";
import './Login.css';
//import email_icon from './Components/email.jpg'; // Commented out for demonstration
//import password_icon from './Components/password.png'; // Commented out for demonstration
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [action] = useState("Log In");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    let navigate = useNavigate(); // Use the useNavigate hook here

    const validateCredentials = () => {
        // Simulate checking credentials (replace this with your actual validation logic)
        if(email !== "jemitojedno@uhk.cz" || password !== "123456") {
            setErrorMessage("Incorrect email or password.");
            return false;
        }
        setErrorMessage(""); // Clear error message
        return true; // Here we return true if the credentials are correct
    };

    const handleSubmit = () => {
        if(validateCredentials()) {
            // Proceed with login process
            console.log("Login successful");
            navigate('/dashboard'); // Use navigate to redirect to Dashboard
        }
    };
    
    return (
        <div className="container">
           <div className="header"> 
               <div className="text">{action}</div>
               <div className="underline"></div>
           </div>
           <div className="inputs">
               <div className="input">
                    {/* <img src={email_icon} alt="Email Icon"/> */}
                   <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
               </div>
               <div className="input">
                  {/* <img src={password_icon} alt="Password Icon"/> */}
                   <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
               </div>
               {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
           </div>
           <div className="forgot-password">Lost Password?<span>Click here!</span></div>
           <div className="submit-container">
               <div className={action==="Log In"?"submit gray":"submit"} onClick={handleSubmit}>Log In</div>
           </div>
        </div>
    );
};

export default Login;
