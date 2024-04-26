import { useNavigate } from "react-router-dom";
import { AppBar } from "@mui/material";
import { useAuth } from "../../hooks/useAuth.tsx";
import { UserRoles } from "@prisma/client";

type NavbarProps = {
  role?: UserRoles
};

export function Navbar({ role = UserRoles.STUDENT }: NavbarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar position="static">

    </AppBar>
  );
}
