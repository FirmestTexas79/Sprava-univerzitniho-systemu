import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/VyberPredmetu.css" // Import stylů

const SelectSubjectPage = () => {
	const predmety = ["Matematika", "Fyzika", "Chemie", "Biologie", "Informatika"]
	const [vybranePredmety, setVybranePredmety] = useState<string[]>([])
	const navigate = useNavigate()

	const handleVyberPredmetu = (predmet: string) => {
		setVybranePredmety(prev => [...prev, predmet])
	}

	// Přidání nové funkce pro navigaci na formulář pro přidání místnosti
	const handleAddRoom = () => {
		navigate("/add-room") // Předpokládáme, že existuje cesta pro přidání místnosti
	}

	return (
		<div className="vyber-predmetu-container">
			<h2>Výběr Předmětu</h2>
			<ul>
				{predmety.map(predmet => (
					<li key={predmet}>
						{predmet} <button onClick={() => handleVyberPredmetu(predmet)}>Vybrat</button>
					</li>
				))}
			</ul>
			{vybranePredmety.length > 0 && (
				<div>
					<h3>Vybrané předměty:</h3>
					<ul>
						{vybranePredmety.map(predmet => (
							<li key={predmet}>{predmet}</li>
						))}
					</ul>
				</div>
			)}
            
			<button onClick={handleAddRoom} className="add-room-btn">Přidat Místnost</button>
		</div>
	)
}

export default SelectSubjectPage
