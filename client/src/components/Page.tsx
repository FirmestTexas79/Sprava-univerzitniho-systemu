import { ReactNode, useEffect } from "react";
import { useAuth } from "../hooks/useAuth.tsx";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./navigation/Navbar.tsx";
import "../styles/Page.css";

type PageProps = {
  children: ReactNode,
  navbar?: boolean,
  ignoreAuth?: boolean
}


export function Page({ children, navbar = true, ignoreAuth }: PageProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (ignoreAuth || user) return;
    navigate("/login");
  }, []);

  return (
    <div className="page-container">
        {navbar && <Navbar role={user?.role} />}
      <div className="content-container">
        {children}
      </div>
    </div>
  );
}
