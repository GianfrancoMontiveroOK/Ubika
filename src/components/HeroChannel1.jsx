import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import image1 from "../images/Carrusel1.webp";

function HeroUbika() {
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #ffffff 0%, #903AF2 150%)",
        color: "#222",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Grid Izquierdo: Texto y Botones */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontFamily: "'Red Hat Display', sans-serif",
                color: "#903AF2",
              }}
            >
              Centralizá y potenciá tu alojamiento con Ubika
            </Typography>
            <Typography
              variant="body1"
              mb={4}
              sx={{
                fontFamily: "'Merriweather Sans', sans-serif",
                color: "#565254",
              }}
            >
              Gestioná reservas, canales de venta y pagos desde un solo lugar.
              Automatizá tareas clave y hacé crecer tu negocio con la plataforma
              más completa para alojamientos independientes.
            </Typography>

            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#EE964B",
                  color: "#fff",
                  fontWeight: "bold",
                  fontFamily: "'Red Hat Display', sans-serif",
                  px: 4,
                  py: 1.5,
                  borderRadius: "12px",
                  "&:hover": {
                    backgroundColor: "#d97e3e",
                  },
                }}
              >
                Empezar prueba gratis
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#fff",
                  color: "#fff",
                  fontWeight: "bold",
                  fontFamily: "'Red Hat Display', sans-serif",
                  px: 4,
                  py: 1.5,
                  borderRadius: "12px",
                  "&:hover": {
                    backgroundColor: "#f3e6fd",
                  },
                }}
              >
                Ver demo
              </Button>
            </Box>
          </Grid>

          {/* Grid Derecho: Solo Imagen */}
          <Grid item xs={12} md={6} textAlign="center">
            <Box
              sx={{
                backgroundColor: "transparent",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <img
                src={image1}
                alt="Ubika plataforma"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "12px",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HeroUbika;
