import React, {useState} from "react"
import "../styles/ZaznamZnamek.css" // Import stylů
import {Link} from "react-router-dom"

export default function RatingsPage() {
	const [ratings, setRatings] = useState([
		{student: "Jan Novák", predmet: "Matematika", znamka: "C"},
		{student: "Eva Dvořáková", predmet: "Fyzika", znamka: "A"},
		// Přidejte další záznamy podle potřeby
	])

	// Funkce pro přidání nové známky (příklad)
	const addRating = () => {
		const newRating = {student: "Nový Student", predmet: "Nový Předmět", znamka: ""}
		setRatings([...ratings, newRating])
	}

	return (
		<div className="zaznam-znamek-container">
			<nav className="navbar">
				{/* Příklad odkazů specifických pro učitele */}
				<Link to="/ucitel-dashboard">Domů</Link>
				<Link to="/plan-hodin">Plán hodin</Link>
				<Link to="/sprava-kurzu">Správa kurzu</Link>
				<Link to="/zaznam-znamek">Záznam známek</Link>
				<Link to="/vyukove-materialy">Výukové materiály</Link>
				<Link to="/osobni-udaje-ucitele">Osobní
					údaje</Link> {/* Předpokládám sdílenou funkcionalitu s studenty */}
			</nav>

			<h2>Záznam Známek</h2>
			<button onClick={addRating}>Přidat Známku</button>
			<div className="znamky-list">
				{ratings.map((zaznam, index) => (
					<div key={index} className="znamka">
						<p><strong>Student:</strong> {zaznam.student}</p>
						<p><strong>Předmět:</strong> {zaznam.predmet}</p>
						<p><strong>Známka:</strong> {zaznam.znamka}</p>
					</div>
				))}
			</div>
		</div>
	)
}