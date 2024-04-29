import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.tsx";
import { UserRoles } from "@prisma/client";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { stringAvatar } from "../../services/utils.ts";

type NavbarProps = {
  role?: UserRoles
};

type Page = {
  label: string;
  route: string;
}

type Settings = {
  label: string;
  onClick: () => void;
}

const STUDENT_PAGES: Page[] = [
  {
    label: "Dashboard",
    route: "/",
  },
  {
    label: "Rozvrh",
    route: "/schedule",
  },
  {
    label: "Testy",
    route: "/exams",
  },
  {
    label: "Uživatelé",
    route: "/users",
  },
  {
    label: "Předměty",
    route: "/subjects",
  },
];

const TEACHER_PAGES: Page[] = [
  {
    label: "Dashboard",
    route: "/",
  },
  {
    label: "Rozvrh",
    route: "/schedule",
  },
  {
    label: "Testy",
    route: "/exams",
  },
  {
    label: "Uživatelé",
    route: "/users",
  },
  {
    label: "Předměty",
    route: "/subjects",
  },
];

const ADMIN_PAGES: Page[] = [
  {
    label: "Dashboard",
    route: "/",
  },
  {
    label: "Uživatelé",
    route: "/users",
  },
  {
    label: "Místnosti",
    route: "/rooms",
  },
  {
    label: "Předměty",
    route: "/subjects",
  },
];

export function Navbar({ role = UserRoles.STUDENT }: NavbarProps) {
  const {
    logout,
    user,
  } = useAuth();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [pages, setPages] = useState<Page[]>(role === UserRoles.STUDENT ? STUDENT_PAGES : role === UserRoles.TEACHER ? TEACHER_PAGES : ADMIN_PAGES);
  const [settings, setSettings] = useState<Settings[]>([{
    label: "Profil",
    onClick: () => {
      navigate(`/user/${user?.id}`);
    },
  }, {
    label: "Odlášení",
    onClick: () => {
      logout();
      navigate("/login");
    },
  }]);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
      <AppBar position="static" sx={{ borderRadius: "20px" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{
              flexGrow: 1,
              display: {
                xs: "flex",
                md: "none",
              }
            }}>
              <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: {
                      xs: "block",
                      md: "none",
                    },
                  }}
              >
                {pages.map((page) => (
                    <MenuItem key={page.label} onClick={() => {
                      navigate(page.route);
                      handleCloseNavMenu();
                    }}>
                      <Typography onClick={() => navigate(page.route)} textAlign="center">{page.label}</Typography>
                    </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
              },
              borderRadius: "20px"
            }}>
              {pages.map((page) => (
                  <Button
                      key={page.label}
                      onClick={() => {
                        navigate(page.route);
                        handleCloseNavMenu();
                      }}
                      sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                      }}
                  >
                    {page.label}
                  </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <Box sx={{
                  borderRadius: "20px"
                }}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar {...stringAvatar(`${user?.firstname} ${user?.lastname}`)}
                            src={user?.image && `data:image/png;base64,${user?.image?.toString("base64")}`} />
                  </IconButton>
                </Box>
              </Tooltip>
              <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                    <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                      <Typography onClick={setting.onClick} textAlign="center">{setting.label}</Typography>
                    </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
  );
}
