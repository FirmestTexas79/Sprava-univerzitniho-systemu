import React, {useState} from "react"
import "../styles/OsobniUdaje.css" // Import stylů
import {Link} from "react-router-dom"
import {User} from "../../../lib/src/models/user/User"

export default function UserPage() {
	const [user, setUser] = useState<User>({})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target
		setUser(prevState => ({...prevState, [name]: value}))
	}


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
			<form>
				<label>
					Jméno:
					<input type="text" name="firstname" value={user.firstname} onChange={handleChange}/>
				</label>
				<label>
					Příjmení:
					<input type="text" name="lastname" value={user.lastname} onChange={handleChange}/>
				</label>
				<label>
					E-mail:
					<input type="email" name="email" value={user.email} onChange={handleChange}/>
				</label>
				<label>
					Telefon:
					<input type="text" name="phone" value={user.phone} onChange={handleChange}/>
				</label>
				<button type="button" onClick={() => alert("Údaje byly aktualizovány.")}>Uložit změny</button>
			</form>
		</div>
	)
}