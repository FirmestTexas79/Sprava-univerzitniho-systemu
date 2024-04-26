import { ReactNode, useEffect } from "react";
import { useAuth } from "../hooks/useAuth.tsx";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./navigation/Navbar.tsx";

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
    <div>
      {navbar && <Navbar role={user?.role} />}
      {children}
    </div>
  );
}
