import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShieldIcon from "@mui/icons-material/Shield";

const benefits = [
  {
    title: "Automatización Total",
    icon: <BoltIcon sx={{ fontSize: 40, color: "#903AF2" }} />,
    description:
      "Gestiona reservas, pagos y disponibilidad sin mover un dedo. Enfócate en lo importante: tus huéspedes.",
  },
  {
    title: "Panel Centralizado",
    icon: <DashboardCustomizeIcon sx={{ fontSize: 40, color: "#903AF2" }} />,
    description:
      "Accede a toda la información de tu alojamiento desde un solo lugar, incluso desde tu celular.",
  },
  {
    title: "Aumenta tus Ingresos",
    icon: <AttachMoneyIcon sx={{ fontSize: 40, color: "#903AF2" }} />,
    description:
      "Reduce las comisiones de plataformas externas y aumenta tus reservas directas con tu sitio personalizado.",
  },
  {
    title: "Protección de Datos",
    icon: <ShieldIcon sx={{ fontSize: 40, color: "#903AF2" }} />,
    description:
      "Tus clientes y tus datos están seguros. Cumplimos con los estándares modernos de seguridad.",
  },
];

const Hero2 = () => {
  return (
    <Box
      id="snap-section-2"
      sx={{
        height: "100vh",
        scrollSnapAlign: "start",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#fff",
        px: 3,
        py: 6,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: "#903AF2", mb: 4 }}
      >
        Por qué elegir Ubika
      </Typography>

      <Grid container spacing={4} maxWidth="lg" justifyContent="center">
        {benefits.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: "100%",
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                bgcolor: "#F8F8F8",
              }}
            >
              {item.icon}
              <Typography variant="h6" fontWeight="bold" color="#2B2B2B">
                {item.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Hero2;
