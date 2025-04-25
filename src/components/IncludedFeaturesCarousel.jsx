import React, { useState } from "react";
import { Box, Typography, MobileStepper, Paper, Button } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import HubIcon from "@mui/icons-material/Hub";
import HotelIcon from "@mui/icons-material/Hotel";
import InsightsIcon from "@mui/icons-material/Insights";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ApartmentIcon from "@mui/icons-material/Apartment";

const features = [
  {
    title: "Gestor de Canales",
    description:
      "Conecta tu alojamiento con múltiples plataformas de venta de forma sincronizada y sin errores.",
    icon: <HubIcon sx={{ fontSize: 50, color: "#903af2" }} />,
  },
  {
    title: "Motor de Reservas",
    description:
      "Recibe reservas directas desde tu sitio web, sin comisiones externas, y maximiza tus ingresos.",
    icon: <HotelIcon sx={{ fontSize: 50, color: "#903af2" }} />,
  },
  {
    title: "Estadísticas y Reportes",
    description:
      "Accede a informes de ocupación, ingresos, y más, para tomar decisiones estratégicas.",
    icon: <InsightsIcon sx={{ fontSize: 50, color: "#903af2" }} />,
  },
  {
    title: "Pagos Integrados",
    description:
      "Cobra de forma segura utilizando múltiples opciones de pago integradas en tu sistema.",
    icon: <CreditCardIcon sx={{ fontSize: 50, color: "#903af2" }} />,
  },
  {
    title: "Gestión de Reservas",
    description:
      "Administra todas tus reservas en un único panel, incluyendo reservas directas y de OTAs.",
    icon: <CalendarMonthIcon sx={{ fontSize: 50, color: "#903af2" }} />,
  },
  {
    title: "Multi Propiedad",
    description:
      "Gestiona varios alojamientos desde un solo panel de control, con estadísticas consolidadas.",
    icon: <ApartmentIcon sx={{ fontSize: 50, color: "#903af2" }} />,
  },
];

export default function IncludedFeaturesCarousel() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % features.length);
  };

  const handleBack = () => {
    setActiveStep((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <Box sx={{ display: { xs: "block", lg: "none" }, px: 2, py: 6 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 4,
          minHeight: 280,
          backgroundColor: "#f9f9f9",
          textAlign: "center",
          fontFamily: "'Merriweather Sans', sans-serif",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box>{features[activeStep].icon}</Box>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            mt: 2,
            fontSize: "1.2rem",
            color: "#262626",
            fontFamily: "'Red Hat Display', sans-serif",
          }}
        >
          {features[activeStep].title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            fontSize: "1rem",
            color: "#444",
            fontFamily: "'Merriweather Sans', sans-serif",
          }}
        >
          {features[activeStep].description}
        </Typography>
      </Paper>

      <MobileStepper
        variant="dots"
        steps={features.length}
        position="static"
        activeStep={activeStep}
        sx={{ mt: 3, backgroundColor: "transparent" }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            sx={{ color: "#4FA41B", fontWeight: "bold" }}
          >
            SIGUIENTE
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            sx={{ color: "#4FA41B", fontWeight: "bold" }}
          >
            <KeyboardArrowLeft />
            ATRÁS
          </Button>
        }
      />
    </Box>
  );
}
