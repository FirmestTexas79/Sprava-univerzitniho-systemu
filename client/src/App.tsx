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

import {AuthProvider} from "./providers/AuthProvider.tsx"
import {Application} from "./providers/Application.tsx"

export default function App() {
	return (



		<Router>
			<AuthProvider>
				<Application/>
			</AuthProvider>
		</Router>

	)
}
