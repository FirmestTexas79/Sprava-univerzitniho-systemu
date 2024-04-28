import { ReactNode, useEffect } from "react";
import { useAuth } from "../hooks/useAuth.tsx";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./navigation/Navbar.tsx";
import "../styles/Page.css";

type PageProps = {
  children: ReactNode,
  disableNavbar?: boolean,
  ignoreAuth?: boolean
}


export function Page({ children, disableNavbar = false, ignoreAuth }: PageProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (ignoreAuth || user) return;
    navigate("/login");
  }, []);

  return (
      <div>
        {!disableNavbar && <Navbar role={user?.role}/>}
            <div style={{flex: 1}}>
              {children}
            </div>
        <Footer/>
      </div>
  );
}

function Footer() {
  return (
      <footer style={{backgroundColor: "#333", color: "#fff", padding: "20px", textAlign: "center", marginTop: "auto" }}>
        &copy; 2024 My Website
      </footer>
  );
}
