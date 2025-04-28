import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";

function HeroUbika() {
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #fff 0%, #903AF2 150%)",
        color: "#222",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        py: 10,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Primer Grid: Texto y Botones */}
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
                  color: "#ECECEC",
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
                  borderColor: "#903AF2",
                  color: "#903AF2",
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

          {/* Segundo Grid: Imagen / Video / Badge */}
          <Grid item xs={12} md={6} textAlign="center">
            <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: 4,
                overflow: "hidden",
                position: "relative",
                p: 2,
                display: {
                  xs: "none",
                  sm: "none",
                  md: "none",
                  lg: "block",
                  xl: "block",
                },
                opacity: 0,
              }}
            >
              <img
                src="/images/ubika-demo.png" // 🔥 Usa tu propia imagen real aquí
                alt="Ubika plataforma"
                style={{ width: "100%", borderRadius: "12px" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "#903AF2",
                  borderRadius: "50%",
                  width: "64px",
                  height: "64px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Typography variant="h4" color="white">
                  ▶
                </Typography>
              </Box>
            </Box>

            {/* Badge de reconocimiento */}
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "none",
                  lg: "block",
                  xl: "block",
                },
              }}
              mt={3}
            >
              <img
                src="/images/ubika-badge.png" // 🔥 Usa tu propio badge aquí
                alt="Ubika Award"
                style={{ width: "120px" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HeroUbika;
