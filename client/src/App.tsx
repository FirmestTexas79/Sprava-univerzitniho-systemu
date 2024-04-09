import "./styles/App.css"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import RegistrationPage from "./pages/RegistrationPage"
import SchedulePage from "./pages/SchedulePage"
import SelectSubjectPage from "./pages/SelectSubjectPage"
import UserPage from "./pages/UserPage"
import SubjectPlanPage from "./pages/SubjectPlanPage"
import CourseAdministrationPage from "./pages/CourseAdministrationPage"
import RatingsPage from "./pages/RatingsPage"
import TeachingMaterialsPage from "./pages/TeachingMaterialsPage"

import headerImage from "./assets/f.png"
import {AuthProvider} from "./providers/AuthProvider.tsx"
import {Navbar} from "./components/Navbar.tsx"

export default function App() {
	return (



		<Router>
			<AuthProvider>
				<Navbar/>
				<div className="App">
					<header className="App-header">
						<img src={headerImage} alt="Logo"/>
					</header>
					<Routes>
						<Route path="/" element={<LoginPage/>}/>
						<Route path="/dashboard" element={<DashboardPage/>}/>
						<Route path="/reset-password" element={<ResetPasswordPage/>}/>
						<Route path="/registration" element={<RegistrationPage/>}/>
						<Route path="/rozvrh" element={<SchedulePage/>}/>
						<Route path="/vyber-predmetu" element={<SelectSubjectPage/>}/>
						<Route path="/osobni-udaje" element={<UserPage/>}/>
						<Route path="/login" element={<LoginPage/>}/>
						{/*<Route path="/ucitel-dashboard" element={<TeacherDashboardPage/>}/>*/}
						<Route path="/plan-hodin" element={<SubjectPlanPage/>}/>
						<Route path="/sprava-kurzu" element={<CourseAdministrationPage/>}/>
						<Route path="/zaznam-znamek" element={<RatingsPage/>}/>
						<Route path="/vyukove-materialy" element={<TeachingMaterialsPage/>}/>
						{/*<Route path="/osobni-udaje-ucitele" element={<TeacherUserPage/>}/>*/}
					</Routes>
				</div>
			</AuthProvider>
		</Router>

	)
}
