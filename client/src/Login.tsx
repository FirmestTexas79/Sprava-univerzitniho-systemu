import React, { useState } from "react";
import './Login.css';
import email_icon from './Components/email.jpg'; // Commented out for demonstration
import password_icon from './Components/password.png'; // Commented out for demonstration
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const [action] = useState("Log In");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    let navigate = useNavigate(); // Use the useNavigate hook here

    const validateCredentials = () => {
        if(email === "admin@uhk.cz" && password === "Admin") {
            sessionStorage.setItem('isAdmin', 'true'); // Uložení informace o adminovi
            setErrorMessage("");
            navigate('/registration'); // Přesměruje admina přímo na registraci
        } else if(email === "student@uhk.cz" && password === "Student") {
            sessionStorage.setItem('isAdmin', 'false'); // Uložení informace o běžném uživateli
            setErrorMessage("");
            navigate('/dashboard'); // Přesměruje běžného uživatele na dashboard
        } else if (email === "ucitel@uhk.cz" && password === "Ucitel") {
            sessionStorage.setItem('isAdmin', 'false'); // Uložení informace o běžném uživateli
            setErrorMessage("");
            navigate('/ucitel-dashboard'); // Přesměruje běžného uživatele na dashboard
        }
        else {
            setErrorMessage("Incorrect email or password.");
        }
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validateCredentials();
    };
    
    
    return (
        <div className="container">
            <div className="header">
                <div className="text">Log In</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="inputs">
                    <div className="input">
                        <img src={email_icon} alt="Email Icon" />
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="Password Icon" />
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </div>
                <div className="forgot-password">
                    Lost Password? <Link to="/reset-password">Click here!</Link>
                </div>
                <div className="submit-container">
                    <button type="submit" className="submit">Log In</button>
                </div>
            </form>
        </div>
    );
};
export default Login;
