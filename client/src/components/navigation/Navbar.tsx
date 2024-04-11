import {Link, useNavigate} from "react-router-dom"
import React from "react"
import { UserRole } from "../../../../lib/src/models/user/UserRole.ts"
import {useAuth} from "../../hooks/useAuth.tsx"
import {NavbarButton} from "./NavbarButton.tsx"

type NavbarProps = {
	role?: UserRole;
};

export function Navbar({ role = UserRole.STUDENT }: NavbarProps) {
	const {logout} = useAuth()
	const navigate = useNavigate()
	return (
		<nav className="navbar">
			{role === UserRole.TEACHER ? (
				<>
					<Link to="/dashboard">Domů</Link>
					<Link to="/plan-hodin">Plán hodin</Link>
					<Link to="/sprava-kurzu">Správa kurzu</Link>
					<Link to="/zaznam-znamek">Záznam známek</Link>
					<Link to="/vyukove-materialy">Výukové materiály</Link>
					<Link to="/osobni-udaje">Osobní údaje</Link>
					<Link to="/add-exam">Zkoušky</Link>
				</>
			) : role === UserRole.ADMIN ? (
				<>
					<Link to="/dashboard">Domů</Link>
					<Link to="/sprava-uzivatelu">Správa uživatelů</Link>
					<Link to="/nastaveni">Nastavení</Link>
				</>
			) : (
				<>
					<Link to="/dashboard">Domů</Link>
					<Link to="/SchedulePage">SchedulePage</Link>
					<Link to="/vyber-predmetu">Výběr předmětů</Link>
					<Link to="/plan-hodin">Plán hodin</Link>
					<Link to="/osobni-udaje">Osobní údaje</Link>
				</>
			)}
			<NavbarButton onClick={() => {
				logout()
				navigate("login")
			}} title={"Odhlásit"}/>
		</nav>
	)
}
