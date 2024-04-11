import React from "react"
import "../styles/Rozvrh.css" // Předpokládejme, že máte definované styly
import {Link} from "react-router-dom"

// Typy pro naše údaje
type Hodina = {
	cas: string;
	pondeli: string;
	utery: string;
	streda: string;
	ctvrtek: string;
	patek: string;
};

// Předpokládaná data pro rozvrh
const rozvrhData: Hodina[] = [
	{
		cas: "8:00 - 9:00",
		pondeli: "Matematika",
		utery: "Fyzika",
		streda: "Angličtina",
		ctvrtek: "Biologie",
		patek: "Chemie"
	},
	// Další hodiny...
]

export default function SchedulePage() {
	return (
		<div className="rozvrh-container">
			<h2>Můj SchedulePage</h2>
			<table>
				<thead>
					<tr>
						<th>Čas</th>
						<th>Pondělí</th>
						<th>Úterý</th>
						<th>Středa</th>
						<th>Čtvrtek</th>
						<th>Pátek</th>
					</tr>
				</thead>
				<tbody>
					{rozvrhData.map((hodina, index) => (
						<tr key={index}>
							<td>{hodina.cas}</td>
							<td>{hodina.pondeli}</td>
							<td>{hodina.utery}</td>
							<td>{hodina.streda}</td>
							<td>{hodina.ctvrtek}</td>
							<td>{hodina.patek}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
