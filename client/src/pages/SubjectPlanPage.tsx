import React from "react"
import "../styles/PlanHodin.css" // Import stylů
import {Link} from "react-router-dom"

export default function SubjectPlanPage() {
	// Předpokládáme, že data pro plán hodin by mohla být načítána z API nebo podobného zdroje
	const hodiny = [
		{cas: "8:00 - 9:00", predmet: "Matematika", trida: "Aula"},
		{cas: "9:10 - 10:10", predmet: "Fyzika", trida: "A3"},
		// Přidejte další hodiny podle potřeby
	]

	return (
		<div className="plan-hodin-container">
			<nav className="navbar">
				{/* Příklad odkazů specifických pro učitele */}
				<Link to="/ucitel-dashboard">Domů</Link>
				<Link to="/plan-hodin">Plán hodin</Link>
				<Link to="/sprava-kurzu">Správa kurzu</Link>
				<Link to="/zaznam-znamek">Záznam známek</Link>
				<Link to="/vyukove-materialy">Výukové materiály</Link>
				<Link to="/osobni-udaje">Osobní údaje</Link> {/* Předpokládám sdílenou funkcionalitu s studenty */}
			</nav>
			<h2>Plán Hodin</h2>
			<table>
				<thead>
					<tr>
						<th>Čas</th>
						<th>Předmět</th>
						<th>Třída</th>
					</tr>
				</thead>
				<tbody>
					{hodiny.map((hodina, index) => (
						<tr key={index}>
							<td>{hodina.cas}</td>
							<td>{hodina.predmet}</td>
							<td>{hodina.trida}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}