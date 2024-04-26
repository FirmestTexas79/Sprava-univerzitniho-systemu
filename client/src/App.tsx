import "./styles/index.css";

import { AuthProvider } from "./providers/AuthProvider.tsx";
import { Application } from "./providers/Application.tsx";

export default function App() {
  return (
    <AuthProvider>
      <Application />
    </AuthProvider>
  );
}
