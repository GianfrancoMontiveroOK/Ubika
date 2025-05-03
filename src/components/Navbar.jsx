import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Divider,
  ListItemIcon,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";
import Grow from "@mui/material/Grow"; // Asegúrate de importar esto
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import LanguageIcon from "@mui/icons-material/Language";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const featureItems = [
  {
    label: "Motor de Reservas",
    route: "/booking-engine",
    icon: <EventAvailableIcon sx={{ color: "#903AF2", mr: 1 }} />,
  },
  {
    label: "Gestor de Canales",
    route: "/channel-manager",
    icon: <DeviceHubIcon sx={{ color: "#903AF2", mr: 1 }} />,
  },
  {
    label: "Sitio Web",
    route: "/website-builder",
    icon: <LanguageIcon sx={{ color: "#903AF2", mr: 1 }} />,
  },
  {
    label: "Pagos Online",
    route: "/payments",
    icon: <AttachMoneyIcon sx={{ color: "#903AF2", mr: 1 }} />,
  },
  {
    label: "Panel Administrativo",
    route: "/admin-panel",
    icon: <DashboardCustomizeIcon sx={{ color: "#903AF2", mr: 1 }} />,
  },
  {
    label: "Automatización",
    route: "/automation",
    icon: <AutoAwesomeMotionIcon sx={{ color: "#903AF2", mr: 1 }} />,
  },
];
function Navbar({ setSearchbarVisible, setSelectedCategory }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  let megaMenuTimeout = null;
  let firstChar = "";
  if (isAuthenticated && user?.username && user?.lastname) {
    firstChar =
      user.username.charAt(0).toUpperCase() +
      user.lastname.charAt(0).toUpperCase();
  }
  const handleMegaMenuEnter = () => {
    clearTimeout(megaMenuTimeout);
    setMegaMenuOpen(true);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimeout = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200); // 200ms de tolerancia
  };
  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  const handleLogout = () => logout();
  const handleAccountClick = () =>
    isAuthenticated ? setDrawerOpen(true) : navigate("/login");

  const drawer = (
    <Box>
      <Box
        sx={{ width: 280, p: 2 }}
        role="presentation"
        onClick={handleDrawerToggle}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: "#903AF2", width: 48, height: 48, mr: 2 }}>
            {isAuthenticated ? firstChar : <AccountCircle />}
          </Avatar>
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ fontFamily: "'Red Hat Display', sans-serif" }}
            >
              {isAuthenticated ? `Hola, ${user?.username}` : "Bienvenido"}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {isAuthenticated ? (
          <List>
            <ListItem button onClick={() => navigate("/dashboard")}>
              {" "}
              <ListItemIcon>
                <DashboardCustomizeIcon sx={{ color: "#903AF2" }} />
              </ListItemIcon>{" "}
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => navigate("/pay")}>
              {" "}
              <ListItemIcon>
                <ShoppingCart sx={{ color: "#903AF2" }} />
              </ListItemIcon>{" "}
              <ListItemText primary="Mis Compras" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              {" "}
              <ListItemIcon>
                <Logout sx={{ color: "#903AF2" }} />
              </ListItemIcon>{" "}
              <ListItemText primary="Cerrar Sesión" />
            </ListItem>
          </List>
        ) : (
          <List>
            <ListItem button onClick={() => navigate("/login")}>
              <ListItemText
                primary="Iniciar Sesión"
                sx={{ color: "#903AF2" }}
              />
            </ListItem>
            <ListItem button onClick={() => navigate("/register")}>
              <ListItemText primary="Crear Cuenta" sx={{ color: "#903AF2" }} />
            </ListItem>
          </List>
        )}

        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
          Accesos rápidos
        </Typography>
        <List>
          <ListItem button onClick={() => navigate("/precios")}>
            <ListItemText primary="Planes y precios" />
          </ListItem>
          <ListItem button onClick={() => navigate("/beneficios")}>
            <ListItemText primary="Beneficios" />
          </ListItem>
          <ListItem button onClick={() => navigate("/comenzar")}>
            <ListItemText primary="Cómo empezar" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: "#ffffff" }}>
        <Toolbar
          sx={{
            px: { xs: 2, sm: 4, lg: 0 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              px: { sm: 10, lg: 30, xl: 40 },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box display={{ xs: "flex", lg: "none" }} alignItems="center">
              <IconButton
                onClick={handleDrawerToggle}
                sx={{ color: "#903AF2" }}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ color: "#903AF2", ml: 2 }}
                >
                  Ubika
                </Typography>
              </Link>
            </Box>

            {/* Menú para escritorio */}
            <Box
              display={{ xs: "none", lg: "flex" }}
              alignItems="center"
              gap={4}
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ color: "#903AF2" }}
                >
                  Ubika
                </Typography>
              </Link>

              <Box
                onMouseEnter={handleMegaMenuEnter}
                onMouseLeave={handleMegaMenuLeave}
                sx={{ position: "relative" }}
              >
                <Button
                  endIcon={<ExpandMoreIcon />}
                  sx={{
                    color: "#903AF2",
                    fontWeight: "bold",
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontSize: "1rem",
                    textTransform: "none",
                    "&:hover": { color: "#702AC2" },
                  }}
                >
                  Plataforma
                </Button>

                <Grow
                  in={megaMenuOpen}
                  timeout={200}
                  style={{ transformOrigin: "top center" }}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      zIndex: 20,
                      width: 680,
                      px: 4,
                      py: 3,
                      mt: 1.5,
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: 2,
                      borderRadius: 3,
                      backgroundColor: "#ffffff",
                      boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {featureItems.map(({ label, route, icon }) => (
                      <Button
                        key={route}
                        onClick={() => {
                          setMegaMenuOpen(false);
                          navigate(route);
                        }}
                        fullWidth
                        startIcon={icon}
                        sx={{
                          justifyContent: "flex-start",
                          fontSize: "0.95rem",
                          color: "#565254",
                          textTransform: "none",
                          fontFamily: "'Merriweather Sans', sans-serif",
                          backgroundColor: "transparent",
                          borderRadius: 2,
                          "&:hover": {
                            backgroundColor: "#f3f0fa",
                            color: "#903AF2",
                          },
                        }}
                      >
                        {label}
                      </Button>
                    ))}
                  </Paper>
                </Grow>
              </Box>
              <Button
                onClick={() => navigate("/precios")}
                sx={{ color: "#903AF2", fontWeight: "bold" }}
              >
                Precios
              </Button>
              <Button
                onClick={() => navigate("/beneficios")}
                sx={{ color: "#903AF2", fontWeight: "bold" }}
              >
                Beneficios
              </Button>
              <Button
                onClick={() => navigate("/comenzar")}
                sx={{ color: "#903AF2", fontWeight: "bold" }}
              >
                Cómo empezar
              </Button>
            </Box>

            <Box display="flex" alignItems="center">
              {isAuthenticated ? (
                <IconButton onClick={handleAccountClick} sx={{ mx: 1 }}>
                  <Avatar sx={{ width: 32, height: 32 }}>{firstChar}</Avatar>
                </IconButton>
              ) : (
                <IconButton onClick={handleAccountClick} sx={{ mx: 1 }}>
                  <AccountCircle fontSize="large" sx={{ color: "#903AF2" }} />
                </IconButton>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{ "& .MuiDrawer-paper": { boxSizing: "border-box", width: 300 } }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Navbar;
