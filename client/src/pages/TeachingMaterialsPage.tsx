import React, {useState} from "react"
import {Link} from "react-router-dom"


export default function TeachingMaterialsPage() {
	const [materials, setMaterials] = useState([
		{nazev: "Základy algebra", soubor: "zaklady_algebra.pdf"},
		{nazev: "Historie Evropy", soubor: "historie_evropy.pdf"},
		// Přidejte další materiály podle potřeby
	])

	// Funkce pro přidání nového materiálu (pro demonstraci)
	const addMaterial = () => {
		const newMaterial = {nazev: "Nový Materiál", soubor: "novy_material.pdf"}
		setMaterials([...materials, newMaterial])
	}

	return (
		<div className="vyukove-materialy-container">
			<nav className="navbar">
				{/* Příklad odkazů specifických pro učitele */}
				<Link to="/TeacherDashboardPage">Domů</Link>
				<Link to="/plan-hodin">Plán hodin</Link>
				<Link to="/sprava-kurzu">Správa kurzu</Link>
				<Link to="/zaznam-znamek">Záznam známek</Link>
				<Link to="/vyukove-materialy">Výukové materiály</Link>
				<Link to="/osobni-udaje-ucitele">Osobní
					údaje</Link> {/* Předpokládám sdílenou funkcionalitu s studenty */}
			</nav>
			<h2>Výukové Materiály</h2>
			<button onClick={addMaterial}>Přidat Materiál</button>
			<div className="materialy-list">
				{materials.map((material, index) => (
					<div key={index} className="material">
						<h3>{material.nazev}</h3>
						<p>{material.soubor}</p>
					</div>
				))}
			</div>
		</div>
	)
}