import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/AddExamPage.css" // Předpokládá se, že máte definované styly

export default function AddExamPage() {
	const [exam, setExam] = useState({
		subject: "",
		date: "",
		// Přidat další potřebné vlastnosti pro zkoušku
	})
	const navigate = useNavigate()

	const handleChange = (e) => {
		const { name, value } = e.target
		setExam(prevState => ({...prevState, [name]: value}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		// Zde byste měli implementovat logiku pro odeslání údajů o zkoušce na server
		console.log("Odeslané informace o zkoušce:", exam)
		// Po úspěšném odeslání přesměrujte uživatele zpět na dashboard nebo na seznam zkoušek
		navigate("/exams-list")
	}

	return (
		<div className="add-exam-page">
			<h2>Přidat Novou Zkoušku</h2>
			<form onSubmit={handleSubmit} className="add-exam-form">
				<label>
                    Předmět:
					<input
						type="text"
						name="subject"
						value={exam.subject}
						onChange={handleChange}
						required
					/>
				</label>
				<label>
                    Datum zkoušky:
					<input
						type="date"
						name="date"
						value={exam.date}
						onChange={handleChange}
						required
					/>
				</label>
				{/* Přidat další pole formuláře podle potřeby */}
				<button type="submit">Přidat Zkoušku</button>
			</form>
		</div>
	)
}
