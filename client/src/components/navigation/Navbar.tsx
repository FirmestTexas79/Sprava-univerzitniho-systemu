import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { UserRole } from "../../../../lib/src/models/user/UserRole.ts";
import { useAuth } from "../../hooks/useAuth.tsx";

type NavbarProps = {
	role?: UserRole;
};

export function Navbar({ role = UserRole.STUDENT }: NavbarProps) {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleNavigation = (path: string) => {
		navigate(path);
	};

	const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		logout();
		handleNavigation("/login");
		handleMenuClose();
	};

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					My App
				</Typography>
				{role === UserRole.TEACHER && (
					<>
						<Button color="inherit" onClick={() => handleNavigation("/dashboard")}>
							Domů
						</Button>
						<Button color="inherit" onClick={() => handleNavigation("/plan-hodin")}>
							Plán hodin
						</Button>
						<Button color="inherit" onClick={() => handleNavigation("/sprava-kurzu")}>
							Správa kurzu
						</Button>
						<Button color="inherit" onClick={() => handleNavigation("/zaznam-znamek")}>
							Záznam známek
						</Button>
						<Button color="inherit" onClick={() => handleNavigation("/vyukove-materialy")}>
							Výukové materiály
						</Button>
						<Button color="inherit" onClick={() => handleNavigation("/osobni-udaje")}>
							Osobní údaje
						</Button>
						<Button color="inherit" onClick={() => handleNavigation("/add-exam")}>
							Zkoušky
						</Button>
					</>
				)}
				{role === UserRole.ADMIN && (
					<>
						<Button color="inherit" onClick={() => handleNavigation("/dashboard")}>
							Domů
						</Button>
						<Button color="inherit" onClick={() => handleNavigation("/sprava-uzivatelu")}>
							Správa uživatelů
						</Button>
						<Button color="inherit" onClick={() => handleNavigation("/nastaveni")}>
							Nastavení
						</Button>
					</>
				)}
				{role !== UserRole.TEACHER && role !== UserRole.ADMIN && (
					<>
						<Button color="inherit" onClick={() => handleNavigation("/dashboard")}>
							Domů
						</Button>
						<Button color="inherit" onClick={() => handleNavigation("/vyber-predmetu")}>
							Výběr předmětů
						</Button>
						<Button color="inherit" onClick={() => handleNavigation("/plan-hodin")}>
							Plán hodin
						</Button>
						<Button color="inherit" onClick={() => handleNavigation("/osobni-udaje")}>
							Osobní údaje
						</Button>
					</>
				)}
				<IconButton
					size="large"
					edge="end"
					color="inherit"
					aria-label="user-menu"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					onClick={handleMenuOpen}
				>
					<AccountCircle />
				</IconButton>
				<Menu
					id="menu-appbar"
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					keepMounted
					transformOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					open={Boolean(anchorEl)}
					onClose={handleMenuClose}
				>
					<MenuItem onClick={() => handleNavigation("/osobni-udaje")}>Personal Data</MenuItem>
					<MenuItem onClick={handleLogout}>Logout</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	);
}
