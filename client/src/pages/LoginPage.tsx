import React, {useState} from "react"
import "../styles/Login.css"
import email_icon from "../assets/email.jpg"
import password_icon from "../assets/password.png"
import {Link, useNavigate} from "react-router-dom"
import {login} from "../services/login"
import {LoginRequestBody} from "../../../lib/src/persistance/LoginRequestBody"


export default function LoginPage() {
	const [user, setUser] = useState<LoginRequestBody>()
	const [errorMessage, setErrorMessage] = useState<string>()
	const navigate = useNavigate() // Use the useNavigate hook here

	const validateCredentials = async () => {
		if (!user?.email || !user?.password) {
			setErrorMessage("Please fill in all fields")
			return
		}
		const loggedUser = await login(user)
		if (!loggedUser) {
			setErrorMessage("Invalid credentials")
			return
		}
		console.log("Logged in as: ", loggedUser)
		navigate("/dashboard")
	}
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await validateCredentials()
	}


	return (
		<div className="container">
			<div className="header">
				<div className="text">Log In</div>
				<div className="underline"></div>
			</div>
			<form onSubmit={handleSubmit} className="login-form">
				<div className="inputs">
					<div className="input">
						<img src={email_icon} alt="Email Icon"/>
						<input type="email" placeholder="Email" value={user?.email}
							   onChange={e => setUser({...user, email: e.target.value})}/>
					</div>
					<div className="input">
						<img src={password_icon} alt="Password Icon"/>
						<input type="password" placeholder="Password" value={user?.password}
							   onChange={e => setUser({...user, password: e.target.value})}/>
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
	)
}