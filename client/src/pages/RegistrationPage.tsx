import React, {useState} from "react"
import {UserPassword} from "../../../lib/src/models/user/UserPassword.ts"
import {UserRole} from "../../../lib/src/models/user/UserRole.ts"


// Třída Registration rozšiřující React.Component
// Specifikujeme prázdné props a typ pro stav
export default function RegistrationPage() {
	const [form, setForm] = useState<UserPassword>({
		email: "",
		password: "",
		firstname: "",
		lastname: "",
		phone: "",
		birthday: new Date(),
		titleAfter: "",
		titleBefore: "",
		role: UserRole.STUDENT,
		image: new Blob(),
	})

	// Handler pro změnu hodnot ve formuláři
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = event.target
		setForm({...form, [name]: value})
	}

	// Handler pro odeslání formuláře
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault() // Zabráníme výchozímu chování formuláře
		console.log("Registration data:", form)
		// Zde by se odeslala data na server
	}

	const getInputType = (key: string) => {
		switch (key) {
		case "password":
			return "password"
		case "email":
			return "email"
		case "phone":
			return "tel"
		case "birthday":
			return "date"
		default:
			return "text"
		}
	}


	return (
		<form onSubmit={handleSubmit}>
			<h2>Registrace</h2>
			{Object.keys(form).map((key) =>
				(<div key={key}>
					<label>{key}</label>
					<input
						type={getInputType(key)}
						name={key}
						/* @ts-ignore */
						value={form[key]}
						onChange={handleChange}
					/>
				</div>))}
			<button type="submit">Registrovat</button>
		</form>
	)
}