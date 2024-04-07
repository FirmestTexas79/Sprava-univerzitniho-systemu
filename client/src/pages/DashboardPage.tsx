import React, {useState} from "react"
import "../styles/Dashboard.css"
import {Link, useNavigate} from "react-router-dom"
import {Button} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import {Simulate} from "react-dom/test-utils"
import {getListOfUsers} from "../services/getListOfUsers.ts"
import {Navbar} from "../components/Navbar.tsx"
import {UserRole} from "../../../lib/src/models/user/UserRole.ts"
import {CheckBox} from "../components/inputs/CheckBox.tsx"
import {User} from "../../../lib/src/models/user/User.ts"

export default function DashboardPage() {

	const [users, setUsers] = useState<User[]>([])
	const navigate = useNavigate()

	const handleLogout = () => {
		// Zde byste měli vymazat všechny relevatní informace o uživateli
		// například z localStorage/sessionStorage nebo kontextu
		//sessionStorage.removeItem("isAdmin") // Příklad odstranění uživatelského stavu
		navigate("/login") // Přesměrování uživatele na login stránku
	}

	return (
		<div className="dashboard-container">
			<Navbar role={UserRole.STUDENT}/>
			<button onClick={handleLogout}>Odhlásit se</button>
			<CheckBox onPress={() => console.log("Veverka")} value={false}/>
			<header className="dashboard-header">
				<h1>Vítejte ve studentském rozhraní!</h1>
			</header>
			<main className="dashboard-main">
				{/* Příklad obsahu pro studenta */}
				<section className="dashboard-schedule">
					<h2>SchedulePage</h2>
					<p>Zde si můžete prohlédnout svůj aktuální školní rozvrh.</p>
					<button>Prohlédnout rozvrh</button>
					<Button onClick={async () => {
						const data = await getListOfUsers(8)
						if (data){
							setUsers(data)
						}
					}} variant="contained" endIcon={<SendIcon />}>
						Send
					</Button>
					{/* Tlačítko může vést na stránku s rozvrhem */}
				</section>
				<section className="dashboard-courses">
					<h2>Výběr předmětů</h2>
					<p>Zde můžete přidávat a odstraňovat předměty ze svého studijního plánu.</p>
					<button>Upravit předměty</button>
					{/* Tlačítko pro úpravu předmětů */}
				</section>
				<section className="dashboard-profile">
					<h2>Osobní údaje</h2>
					<p>Zde můžete aktualizovat své osobní údaje.</p>
					<button>Aktualizovat údaje</button>
					{/* Tlačítko pro aktualizaci osobních údajů */}
				</section>

				{users.map((value)=>(
					<div key={value.id}>
						{`${value.titleBefore || ""} ${value.firstname} ${value.lastname} ${value.titleAfter || ""}`}
					</div>
				))

				}

			</main>
			<footer className="dashboard-footer">
				<p>© {new Date().getFullYear()} Vaše Škola</p>
			</footer>
		</div>
	)
}

