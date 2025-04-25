import React, { useState } from "react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import image1 from "../images/Mustang.jpg";

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
  },
  booking: {
    title: "Motor de Reservas",
    description:
      "Recibe reservas directas desde tu sitio web, sin comisiones externas, y maximiza tus ingresos.",
  },
  insights: {
    title: "Estadísticas y Reportes",
    description:
      "Accede a informes de ocupación, ingresos, y más, para tomar decisiones estratégicas.",
  },
  payments: {
    title: "Pagos Integrados",
    description:
      "Cobra de forma segura utilizando múltiples opciones de pago integradas en tu sistema.",
  },
  reservations: {
    title: "Gestión de Reservas",
    description:
      "Administra todas tus reservas en un único panel, incluyendo reservas directas y de OTAs.",
  },
  multi: {
    title: "Multi Propiedad",
    description:
      "Gestiona varios alojamientos desde un solo panel de control, con estadísticas consolidadas.",
    image: image1,
  },
};

export default function IncludedFeatures() {
  const [selected, setSelected] = useState("insights");

  return (
    <Box sx={{ px: 4, py: 6, textAlign: "center" }}>
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
            maxWidth: 800,
            mx: "auto",
            p: 4,
            borderRadius: 4,
          }}
        >
          <Grid container spacing={4} alignItems="center">
            {/* Columna izquierda - Texto */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{ fontFamily: "'Red Hat Display', sans-serif" }}
              >
                {featureDetails[selected].title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontFamily: "'Merriweather Sans', sans-serif" }}
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
                    width: "100%",
                    borderRadius: 2,
                    boxShadow: 3,
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
