import {useAuth} from "../hooks/useAuth.tsx"
import {Navbar} from "../components/navigation/Navbar.tsx"
import {Route, Routes} from "react-router-dom"
import LoginPage from "../pages/LoginPage.tsx"
import DashboardPage from "../pages/DashboardPage.tsx"
import ResetPasswordPage from "../pages/ResetPasswordPage.tsx"
import RegistrationPage from "../pages/RegistrationPage.tsx"
import SchedulePage from "../pages/SchedulePage.tsx"
import SelectSubjectPage from "../pages/SelectSubjectPage.tsx"
import UserPage from "../pages/UserPage.tsx"
import SubjectPlanPage from "../pages/SubjectPlanPage.tsx"
import CourseAdministrationPage from "../pages/CourseAdministrationPage.tsx"
import RatingsPage from "../pages/RatingsPage.tsx"
import TeachingMaterialsPage from "../pages/TeachingMaterialsPage.tsx"

export function Application(){
	const {user} = useAuth()

	return (<><Navbar role={user?.role}/>
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
	</>)
}