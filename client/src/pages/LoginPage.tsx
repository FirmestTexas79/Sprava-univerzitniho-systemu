import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import email_icon from "../assets/email.jpg";
import password_icon from "../assets/password.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";
import { AuthApi, LoginForm } from "../services/AuthApi.ts";


export default function LoginPage() {
  const { login, user } = useAuth();
  const [loginForm, setLoginForm] = useState<LoginForm>({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    navigate("/dashboard");

  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const api = new AuthApi();
    const response = await api.login(loginForm);
    if (response.error) {
      setErrorMessage(response.error);
    } else {
      if (!response.data) return;
      login(response.data.token);
    }
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
            <input type="email" placeholder="Email" value={loginForm?.email}
                   onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} />
          </div>
          <div className="input">
            <img src={password_icon} alt="Password Icon" />
            <input type="password" placeholder="Password" value={loginForm?.password}
                   onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} />
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
}
