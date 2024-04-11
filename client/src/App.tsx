import "./styles/App.css"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

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
