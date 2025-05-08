import React from "react";
import { Box, Typography, Grid, Paper, Container } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShieldIcon from "@mui/icons-material/Shield";
import IncludedFeatures from "./IncludedFeatures";
import IncludedFeaturesCarousel from "./IncludedFeaturesCarousel";

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
        height: "100%",
        scrollSnapAlign: "start",
        position: "relative", // Necesario para ubicar la cuña
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        bgcolor: "#fff",
        px: { xs: 3, lg: 15 },
        overflow: "hidden", // Por si la cuña se sale del borde
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          color: "#903AF2",
          textAlign: "center",
          fontFamily: "'Red Hat Display', sans-serif",
          fontSize: {
            xs: "2rem",
            sm: "2rem",
            md: "2rem",
            lg: "2rem",
            xl: "3rem",
          },
        }}
      >
        ¿Que incluye Ubika?
      </Typography>

      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <IncludedFeatures />
      </Box>
      <Box sx={{ display: { xs: "block", lg: "none" } }}>
        <IncludedFeaturesCarousel />
      </Box>
    </Box>
  );
};

export default Hero2;
