import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Grid, Paper, Link } from "@mui/material";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

const rotatingTexts = [
  "Resultados reales",
  "Soluciones confiables",
  "Tecnología pensada para tu hotel",
];

const cards = [
  {
    title: "Automatización",
    description:
      "Ahorra tiempo y evita errores con procesos automáticos para reservas y pagos.",
    icon: <AutoModeIcon sx={{ fontSize: 50, color: "#903af2", mb: 2 }} />,
  },
  {
    title: "Aumento de reservas",
    description:
      "Impulsa tus ventas directas con un motor de reservas optimizado.",
    icon: <TrendingUpIcon sx={{ fontSize: 50, color: "#903af2", mb: 2 }} />,
  },
  {
    title: "Gestión simplificada",
    description:
      "Controlá tu alojamiento desde un solo panel con acceso seguro y en tiempo real.",
    icon: (
      <DashboardCustomizeIcon sx={{ fontSize: 50, color: "#903af2", mb: 2 }} />
    ),
  },
];

export default function BenefitsShowcase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        height: "100%",
        alignContent: "center",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <Typography
            fontWeight="bold"
            sx={{
              color: "#903af2",
              fontFamily: "'Red Hat Display', sans-serif",
              fontSize: {
                xs: "1.8rem",
                sm: "2rem",
                md: "2.2rem",
                lg: "2.4rem",
                xl: "2.6rem",
              },
            }}
          >
            {rotatingTexts[index]}
          </Typography>
          <Typography
            fontWeight="bold"
            sx={{
              mt: 1,
              color: "#262626",
              fontFamily: "'Red Hat Display', sans-serif",
              fontSize: {
                xs: "1.5rem",
                sm: "1.7rem",
                md: "1.9rem",
                lg: "2.1rem",
                xl: "2.3rem",
              },
            }}
          >
            Solo con Ubika
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {cards.map((card, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Link href="#/beneficios" underline="none">
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    borderRadius: 3,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                    fontFamily: "'Merriweather Sans', sans-serif",
                    backgroundColor: "#f9f9f9",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  {card.icon}
                  <Typography
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                      color: "#262626",
                      fontFamily: "'Red Hat Display', sans-serif",
                      fontSize: {
                        xs: "1.2rem",
                        sm: "1.3rem",
                        md: "1.4rem",
                        lg: "1.5rem",
                        xl: "1.6rem",
                      },
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#444",
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
                    {card.description}
                  </Typography>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
