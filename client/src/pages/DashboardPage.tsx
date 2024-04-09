import React, { useState } from "react"
import "../styles/Dashboard.css"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { getListOfUsers } from "../services/user/getListOfUsers.ts"
import { Navbar } from "../components/Navbar.tsx"
import { UserRole } from "../../../lib/src/models/user/UserRole.ts"
import { CheckBox } from "../components/inputs/CheckBox.tsx"
import { User } from "../../../lib/src/models/user/User.ts"
import {useAuth} from "../hooks/useAuth.tsx"

export default function DashboardPage() {
	const {user, logout} = useAuth()
	const [users, setUsers] = useState<User[]>([])


	return (
		<div className="dashboard-container">
			<Navbar role={user?.role} />
			<button onClick={logout}>Odhlásit se</button>
			<CheckBox onPress={() => console.log("Veverka")} value={false} />
			<header className="dashboard-header">
				<h1>Vítejte ve studentském rozhraní!</h1>
			</header>
			<div className="dashboard-main">
				{/* Ohraničené bloky */}
				<div className="dashboard-section">
					<section className="dashboard-schedule">
						<h2>SchedulePage</h2>
						<p>Zde si můžete prohlédnout svůj aktuální školní rozvrh.</p>
						<button>Prohlédnout rozvrh</button>
						<Button
							onClick={async () => {
								const data = await getListOfUsers(8)
								if (data) {
									setUsers(data)
								}
							}}
							variant="contained"
							endIcon={<SendIcon />}
						>
							Send
						</Button>
						{/* Tlačítko může vést na stránku s rozvrhem */}
					</section>
				</div>
				<div className="dashboard-section">
					<section className="dashboard-courses">
						<h2>Výběr předmětů</h2>
						<p>
							Zde můžete přidávat a odstraňovat předměty ze svého studijního
							plánu.
						</p>
						<button>Upravit předměty</button>
						{/* Tlačítko pro úpravu předmětů */}
					</section>
				</div>
				<div className="dashboard-section">
					<section className="dashboard-profile">
						<h2>Osobní údaje</h2>
						<p>Zde můžete aktualizovat své osobní údaje.</p>
						<button>Aktualizovat údaje</button>
						{/* Tlačítko pro aktualizaci osobních údajů */}
					</section>
				</div>

				{/* Zobrazení uživatelů */}
				{users.map((value) => (
					<div key={value.id}>
						{`${value.titleBefore || ""} ${value.firstname} ${value.lastname} ${value.titleAfter || ""}`}
					</div>
				))}
			</div>
			<footer className="dashboard-footer">
				<p>© {new Date().getFullYear()} Vaše Škola</p>
			</footer>
		</div>
	)
}
