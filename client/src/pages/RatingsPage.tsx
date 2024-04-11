import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/ZaznamZnamek.css" // Import stylů

export default function RatingsPage() {
	const [ratings, setRatings] = useState([
		{ student: "Jan Novák", predmet: "Matematika", znamka: "C" },
		{ student: "Eva Dvořáková", predmet: "Fyzika", znamka: "A" },
		// Přidejte další záznamy podle potřeby
	])

	const navigate = useNavigate()

	// Předpokládejme, že máme funkci pro navigaci na stránku pro přidání nového předmětu
	const handleAddSubject = () => {
		navigate("/add-subject") // Změníme na správnou cestu v rámci vaší aplikace
	}

	return (
		<div className="zaznam-znamek-container">
			<h2>Záznam Známek</h2>
			{/* Tlačítko pro přidání nového předmětu */}
			<button onClick={handleAddSubject} className="add-subject-btn">
                Přidat Předmět
			</button>
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
