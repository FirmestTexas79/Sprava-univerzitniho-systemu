import React, {useState} from "react"
import "../styles/OsobniUdaje.css" // Import stylů
import {Link} from "react-router-dom"
import {User} from "../../../lib/src/models/user/User"
import {useAuth} from "../hooks/useAuth.tsx"

export default function UserPage() {
	const {user} = useAuth()



	return (
		<div className="osobni-udaje-container">
			<h2>Osobní údaje</h2>
			<div>
				{user?.firstname}
			</div>
			<div>
				{user?.lastname}
			</div>
			<div>
				{user?.email}
			</div>
			<div>
				{user?.phone}
			</div>
			<div>
				{user?.titleBefore}
			</div>
		</div>
	)
}