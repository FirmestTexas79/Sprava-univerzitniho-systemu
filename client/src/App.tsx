import "./styles/App.css";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "./providers/AuthProvider.tsx";
import { Application } from "./providers/Application.tsx";

export default function App() {
  return (


    <Router>
      <AuthProvider>
        <Application />
      </AuthProvider>
    </Router>

  );
}
