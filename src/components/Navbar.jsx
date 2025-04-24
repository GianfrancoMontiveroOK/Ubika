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
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

function Navbar({ setSearchbarVisible, setSelectedCategory }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  let firstChar = "";

  if (isAuthenticated && user?.username && user?.lastname) {
    firstChar =
      user.username.charAt(0).toUpperCase() +
      user.lastname.charAt(0).toUpperCase();
  }

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
              <ListItemIcon>
                <DashboardCustomizeIcon sx={{ color: "#903AF2" }} />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                primaryTypographyProps={{
                  sx: { fontFamily: "'Merriweather Sans', sans-serif" },
                }}
              />
            </ListItem>

            <ListItem button onClick={() => navigate("/pay")}>
              <ListItemIcon>
                <ShoppingCart sx={{ color: "#903AF2" }} />
              </ListItemIcon>
              <ListItemText
                primary="Mis Compras"
                primaryTypographyProps={{
                  sx: { fontFamily: "'Merriweather Sans', sans-serif" },
                }}
              />
            </ListItem>

            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <Logout sx={{ color: "#903AF2" }} />
              </ListItemIcon>
              <ListItemText
                primary="Cerrar Sesión"
                primaryTypographyProps={{
                  sx: { fontFamily: "'Merriweather Sans', sans-serif" },
                }}
              />
            </ListItem>
          </List>
        ) : (
          <List>
            <ListItem button onClick={() => navigate("/login")}>
              <ListItemText
                primary="Iniciar Sesión"
                sx={{ color: "#903AF2" }}
                primaryTypographyProps={{
                  sx: { fontFamily: "'Merriweather Sans', sans-serif" },
                }}
              />
            </ListItem>
            <ListItem button onClick={() => navigate("/register")}>
              <ListItemText
                primary="Crear Cuenta"
                sx={{ color: "#903AF2" }}
                primaryTypographyProps={{
                  sx: { fontFamily: "'Merriweather Sans', sans-serif" },
                }}
              />
            </ListItem>
          </List>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography
          variant="subtitle2"
          fontWeight="bold"
          gutterBottom
          sx={{ fontFamily: "'Red Hat Display', sans-serif" }}
        >
          Accesos rápidos
        </Typography>
        <List>
          <ListItem button onClick={() => navigate("/precios")}>
            <ListItemText
              primary="Planes y precios"
              primaryTypographyProps={{
                sx: { fontFamily: "'Merriweather Sans', sans-serif" },
              }}
            />
          </ListItem>
          <ListItem button onClick={() => navigate("/beneficios")}>
            <ListItemText
              primary="Beneficios"
              primaryTypographyProps={{
                sx: { fontFamily: "'Merriweather Sans', sans-serif" },
              }}
            />
          </ListItem>
          <ListItem button onClick={() => navigate("/comenzar")}>
            <ListItemText
              primary="Cómo empezar"
              primaryTypographyProps={{
                sx: { fontFamily: "'Merriweather Sans', sans-serif" },
              }}
            />
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
            px: { xs: 2, sm: 4, lg: 0 }, // sacamos el px interno en lg
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              px: { lg: 30 }, // padding horizontal como container
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Logo y menú hamburguesa para XS */}
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
                  sx={{
                    color: "#903AF2",
                    ml: 2,
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Ubika
                </Typography>
              </Link>
            </Box>

            {/* Logo + navegación grande para LG y superior */}
            <Box
              display={{ xs: "none", lg: "flex" }}
              alignItems="center"
              gap={4}
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{
                    color: "#903AF2",
                    fontFamily: "'Segoe UI', sans-serif",
                  }}
                >
                  Ubika
                </Typography>
              </Link>
              {isAuthenticated ? (
                <>
                  <Button
                    onClick={() => navigate("/dashboard")}
                    sx={{ color: "#2B2B2B" }}
                  >
                    Dashboard
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => navigate("/precios")}
                    sx={{
                      color: "#903AF2",
                      fontWeight: "bold",
                      "&:hover": { color: "#702ac2" },
                    }}
                  >
                    Precios
                  </Button>
                  <Button
                    onClick={() => navigate("/beneficios")}
                    sx={{
                      color: "#903AF2",
                      fontWeight: "bold",
                      "&:hover": { color: "#702ac2" },
                    }}
                  >
                    Beneficios
                  </Button>
                  <Button
                    onClick={() => navigate("/comenzar")}
                    sx={{
                      color: "#903AF2",
                      fontWeight: "bold",
                      "&:hover": { color: "#702ac2" },
                    }}
                  >
                    Cómo empezar
                  </Button>
                </>
              )}
            </Box>

            {/* Íconos derecha */}
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
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 300,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Navbar;
