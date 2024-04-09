import React, { useState } from "react"
import "../styles/OsobniUdajeUcitele.css" // Předpokládá se, že máte definované styly
import { Link } from "react-router-dom"
import { User } from "../../../lib/src/models/user/User"

export default function TeacherUserPage() {
	const [user, setUser] = useState<User>({
		firstname: "",
		lastname: "",
		email: "",
		phone: "",
		// Přidat další vlastnosti podle modelu User, pokud je potřeba
	})
	const [message, setMessage] = useState<string>("")

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target
		setUser(prevState => ({...prevState, [name]: value}))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Zde byste měli implementovat logiku pro odeslání údajů na server
		console.log("Odeslané údaje:", user)
		setMessage("Údaje byly úspěšně uloženy.")
		// Po odeslání můžete také vymazat formulář nebo přesměrovat uživatele
	}

	return (
		<div className="osobni-udaje-ucitele-container">
			<nav className="navbar">
				<Link to="/ucitel-dashboard">Domů</Link>
				<Link to="/plan-hodin">Plán hodin</Link>
				<Link to="/sprava-kurzu">Správa kurzu</Link>
				<Link to="/zaznam-znamek">Záznam známek</Link>
				<Link to="/vyukove-materialy">Výukové materiály</Link>
				<Link to="/osobni-udaje-ucitele">Osobní údaje</Link>
				<Link to="/add-exam">Zkoušky</Link>
			</nav>
			<h2>Osobní údaje</h2>
			{message && <div className="message">{message}</div>}
			<form onSubmit={handleSubmit}>
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
				{/* Přidat další pole podle potřeby */}
				<button type="submit">Uložit změny</button>
			</form>
		</div>
	)
}
