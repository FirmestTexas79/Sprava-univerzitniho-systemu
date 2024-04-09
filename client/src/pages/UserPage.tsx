import React, {useState} from "react"
import "../styles/OsobniUdaje.css" // Import stylů
import {Link} from "react-router-dom"
import {User} from "../../../lib/src/models/user/User"
import {useAuth} from "../hooks/useAuth.tsx"

export default function UserPage() {
	const {user} = useAuth()



	return (
		<div className="osobni-udaje-container">
			<nav className="navbar">
				<Link to="/dashboard">Domů</Link> {/* Změna z a href na Link to */}
				<Link to="/SchedulePage">SchedulePage</Link> {/* Přidán odkaz na SchedulePage */}
				<Link to="/vyber-predmetu">Výběr
					předmětů</Link> {/* Předpokládá se, že toto je funkce dostupná studentům */}
				<Link to="/osobni-udaje">Osobní
					údaje</Link> {/* Předpokládá se, že toto vede na stránku s osobními údaji studenta */}
			</nav>
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