import React, {useEffect, useState} from "react"
import "../styles/SpravaKurzu.css" // Import stylů
import {Subject} from "../../../lib/src/models/Subject"
import {getSubjects} from "../services/subject/getSubjects.ts"
import {MenuItem, Select} from "@mui/material"
import {User} from "../../../lib/src/models/user/User.ts"
import {getListOfUsers} from "../services/user/getListOfUsers.ts"
import {UserRole} from "../../../lib/src/models/user/UserRole.ts"
import {postSubjectSchema} from "../../../lib/src/schemas/subject/PostSubjectBodySchema.ts"
import {postSubject} from "../services/subject/postSubject.ts"

export default function CourseAdministrationPage() {

	const [messeges, setMesseges] = useState<Partial<Record<keyof any, string>>>({})

	const [teachers, setTeachers] = useState<User[]>([])

	const [subject, setSubject] = useState<Subject>()
	const [subjects, setSubjects] = useState<Subject[]>()

	useEffect(() => {
		getSubjects().then(setSubjects)
		getListOfUsers()
			.then((value) => value && setTeachers(value
				.filter((user) => user.role === UserRole.TEACHER)))
	}, [])


	async function onSubmit() {
		try {
			const data = await postSubject(postSubjectSchema.parse(subject).body)
			data === 200 && setSubject({})
		} catch (error) {
			// If validation fails, set the errors
			// @ts-ignore
			if (error instanceof Error && error.errors && error.errors.length > 0) {
				const validationErrors: Partial<Record<keyof any, string>> = {}
				// @ts-ignore
				error.errors.forEach((err: { path: any[]; message: any }) => {
					const key = err.path[0]
					validationErrors[key] = err.message
				})
				setMesseges(validationErrors)
			}
		}
	}

	function onChange(key: keyof Subject, value: any) {
		setSubject({...subject, [key]: value})
	}


	return (
		<div className="sprava-kurzu-container">
			<h2>Správa Kurzů</h2>
			<input type="text" placeholder="Nazev" value={subject?.name}
				   onChange={e => onChange("name", e.target.value)}/>
			<input type="text" placeholder="Zkratka" value={subject?.short}
				   onChange={e => onChange("short", e.target.value)}/>
			<input type="number" placeholder="Kredity" value={subject?.credits}
				   onChange={e => onChange("credits", e.target.value)}/>
			<input type="text" placeholder="Kategorie" value={subject?.category}
				   onChange={e => onChange("category", e.target.value)}/>
			<textarea placeholder="Popis" value={subject?.description}
					  onChange={e => onChange("description", e.target.value)}/>

			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={subject?.guarantor}
				label="Garant"
				onChange={(e) => onChange("guarantor", e.target.value)}
			>
				{teachers.map((teacher) => <MenuItem key={teacher.id}
													 value={teacher.id}>{`${teacher.firstname} ${teacher.lastname}`}</MenuItem>)}
			</Select>


			<button onClick={onSubmit}>
				Odeslat
			</button>
			<div className="kurzy-list">
				{subjects && subjects.map((subject) => (
					<div key={subject.id} className="kurz">
						<h3>{subject.name}</h3>
						<p>{subject.description}</p>
					</div>
				))}
			</div>
		</div>
	)
}
