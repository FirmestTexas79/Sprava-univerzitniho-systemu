import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/VyukoveMaterialy.css"
import { Navbar } from "../components/navigation/Navbar.tsx"
import { UserRole } from "../../../lib/src/models/user/UserRole.ts"

export default function TeachingMaterialsPage() {
	const [materials, setMaterials] = useState([
		{ nazev: "Základy algebry", soubor: "zaklady_algebry.pdf" },
		{ nazev: "Historie Evropy", soubor: "historie_evropy.pdf" },
		// Přidejte další materiály podle potřeby
	])

	const navigate = useNavigate()

	const handleAddMaterial = () => {
		navigate("/add-material")
	}

	return (
		<div className="vyukove-materialy-container">
			<div className="tabulka-cela">
				<header className="teachingMaterials-header">
					<h2>Výukové Materiály</h2>
					<button onClick={handleAddMaterial} className="add-material-btn">
					Přidat Materiál
					</button>
				</header>
				<div className="materialy-list">
					{materials.map((material, index) => (
						<div key={index} className="material">
							<div className="material-nazev">
								<h3>{material.nazev}</h3>
							</div>
							<div className="material-soubor">
								<p>{material.soubor}</p>
							</div>
							{/* Zde mohou být tlačítka nebo odkazy na stažení materiálu */}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
