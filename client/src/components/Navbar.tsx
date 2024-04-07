import {Link} from "react-router-dom"
import React, {useEffect} from "react"
import {UserRole} from "../../../lib/src/models/user/UserRole.ts"

type NavbarProps={
	role?:UserRole
	//onLoad?:(value?) => void
}

export function Navbar({role = UserRole.STUDENT}:NavbarProps){

	/*useEffect(() => {
		onLoad && onLoad(3)
	}, [])*/

	return (<nav className="navbar">{
		role == UserRole.TEACHER ? <>
			<Link to="/ucitel-dashboard">Domů</Link>
			<Link to="/plan-hodin">Plán hodin</Link>
			<Link to="/sprava-kurzu">Správa kurzu</Link>
			<Link to="/zaznam-znamek">Záznam známek</Link>
			<Link to="/vyukove-materialy">Výukové materiály</Link>
			<Link to="/osobni-udaje-ucitele">Osobní údaje</Link>
			<Link to="/add-exam">Zkoušky</Link>
		</> : <>
			<Link to="/dashboard">Domů</Link>
			<Link to="/SchedulePage">SchedulePage</Link>
			<Link to="/vyber-predmetu">Výběr předmětů</Link>
			<Link to="/osobni-udaje">Osobní údaje</Link>
		</>

	}

	</nav>)
}