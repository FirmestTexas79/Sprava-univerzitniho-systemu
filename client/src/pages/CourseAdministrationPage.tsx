import React, {useState} from "react"
import "../styles/SpravaKurzu.css" // Import stylů
import {Link} from "react-router-dom"
import {Subject} from "../../../lib/src/models/Subject"

export default function CourseAdministrationPage() {
	const [course, setCourse] = useState<Subject>({})
	const [courses, setCourses] = useState<Subject[]>([])

	// Funkce pro přidání nového kurzu (příklad)
	const addCourse = () => {
		setCourses([...courses, course])
		setCourse({})
	}

	return (
		<div className="sprava-kurzu-container">
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
			<h2>Správa Kurzů</h2>
			<button onClick={addCourse}>Přidat Kurz</button>
			<div className="kurzy-list">
				{courses.map((courses) => (
					<div key={courses.id} className="kurz">
						<h3>{courses.name}</h3>
						<p>{courses.description}</p>
					</div>
				))}
			</div>
		</div>
	)
}
