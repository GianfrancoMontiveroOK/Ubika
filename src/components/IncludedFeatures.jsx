import React, { useState } from "react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import image1 from "../images/Carrusel1.webp";
import image2 from "../images/Carrusel2.webp";
import image3 from "../images/Carrusel3.webp";
import image4 from "../images/Carrusel4.webp";
import image5 from "../images/Carrusel5.webp";
import image6 from "../images/Carrusel6.webp";

const features = [
  { id: "channel", label: "Gestor de Canales" },
  { id: "booking", label: "Motor de Reservas" },
  { id: "insights", label: "Estadísticas y Reportes" },
  { id: "payments", label: "Pagos Integrados" },
  { id: "reservations", label: "Gestión de Reservas" },
  { id: "multi", label: "Multi Propiedad" },
];

const featureDetails = {
  channel: {
    title: "Gestor de Canales",
    description:
      "Conecta tu alojamiento con múltiples plataformas de venta de forma sincronizada y sin errores.",
    image: image1,
  },
  booking: {
    title: "Motor de Reservas",
    description:
      "Recibe reservas directas desde tu sitio web, sin comisiones externas, y maximiza tus ingresos.",
    image: image2,
  },
  insights: {
    title: "Estadísticas y Reportes",
    description:
      "Accede a informes de ocupación, ingresos, y más, para tomar decisiones estratégicas.",
    image: image3,
  },
  payments: {
    title: "Pagos Integrados",
    description:
      "Cobra de forma segura utilizando múltiples opciones de pago integradas en tu sistema.",
    image: image5,
  },
  reservations: {
    title: "Gestión de Reservas",
    description:
      "Administra todas tus reservas en un único panel, incluyendo reservas directas y de OTAs.",
    image: image4,
  },
  multi: {
    title: "Multi Propiedad",
    description:
      "Gestiona varios alojamientos desde un solo panel de control, con estadísticas consolidadas.",
    image: image6,
  },
};

export default function IncludedFeatures() {
  const [selected, setSelected] = useState("insights");

  return (
    <Box sx={{ px: 4, textAlign: "center" }}>
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        {features.map((feat) => (
          <Grid item key={feat.id}>
            <Button
              onClick={() => setSelected(feat.id)}
              variant={selected === feat.id ? "contained" : "outlined"}
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                backgroundColor: selected === feat.id ? "#903af2" : "white",
                color: selected === feat.id ? "white" : "black",
                fontFamily: "'Merriweather Sans', sans-serif",
                fontWeight: "bold",
                fontSize: {
                  xs: "0.75rem",
                  sm: "0.9rem",
                  md: "1rem",
                  lg: "0.75rem",
                  xl: "1.1rem",
                },
              }}
            >
              {feat.label}
            </Button>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Paper
          elevation={3}
          sx={{
            mx: "auto",
            p: 4,
            borderRadius: 4,
          }}
        >
          <Grid container spacing={4} alignItems="center">
            {/* Columna izquierda - Texto */}
            <Grid item xs={12} md={6}>
              <Typography
                fontWeight="bold"
                gutterBottom
                sx={{
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontSize: {
                    xs: "1.4rem",
                    sm: "1.6rem",
                    md: "1.8rem",
                    lg: "2rem",
                    xl: "2.2rem",
                  },
                }}
              >
                {featureDetails[selected].title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Merriweather Sans', sans-serif",
                  fontSize: {
                    xs: "0.95rem",
                    sm: "1rem",
                    md: "1.05rem",
                    lg: "1.1rem",
                    xl: "1.15rem",
                  },
                }}
              >
                {featureDetails[selected].description}
              </Typography>
            </Grid>

            {/* Columna derecha - Imagen */}
            <Grid item xs={12} md={6}>
              {featureDetails[selected].image && (
                <Box
                  component="img"
                  src={featureDetails[selected].image}
                  alt={featureDetails[selected].title}
                  sx={{
                    width: "80%",
                    borderRadius: 2,
                  }}
                />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}
