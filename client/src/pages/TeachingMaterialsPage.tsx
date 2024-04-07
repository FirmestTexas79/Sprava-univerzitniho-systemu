import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/VyukovyMaterialy.css" // Předpokládá se, že máte definované styly

export default function TeachingMaterialsPage() {
	const [materials, setMaterials] = useState([
		{ nazev: "Základy algebry", soubor: "zaklady_algebry.pdf" },
		{ nazev: "Historie Evropy", soubor: "historie_evropy.pdf" },
		// Přidejte další materiály podle potřeby
	])

	const navigate = useNavigate()

	// Funkce pro navigaci na stránku pro přidání nového materiálu
	const handleAddMaterial = () => {
		navigate("/add-material") // Změníme na správnou cestu v rámci vaší aplikace
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
					údaje</Link>
				<Link to="/add-exam">Zkoušky</Link>	
			</nav>
			<h2>Výukové Materiály</h2>
			{/* Tlačítko pro přidání nového výukového materiálu */}
			<button onClick={handleAddMaterial} className="add-material-btn">
                Přidat Materiál
			</button>
			<div className="materialy-list">
				{materials.map((material, index) => (
					<div key={index} className="material">
						<h3>{material.nazev}</h3>
						<p>{material.soubor}</p>
						{/* Zde by mohlo být tlačítko nebo odkaz na stažení materiálu */}
					</div>
				))}
			</div>
		</div>
	)
}