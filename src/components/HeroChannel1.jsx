import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import image1 from "../images/Carrusel1.webp";

function HeroUbika() {
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #d2c2f2, #903AF2 50%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="center"
          sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}
        >
          {/* Grid Izquierdo: Texto y Botones */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontFamily: "'Red Hat Display', sans-serif",
                color: "#FFFFFF",
                textShadow: "1px 1px 4px rgba(0, 0, 0, 0.3)",
                fontSize: { xs: "2rem", md: "3rem" }, // Adaptación de tamaño
              }}
            >
              Centralizá y potenciá tu alojamiento con Ubika
            </Typography>
            <Typography
              variant="body1"
              mb={4}
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "block",
                  lg: "block",
                  xl: "block",
                },
                fontFamily: "'Merriweather Sans', sans-serif",
                color: "#ECECEC",
                textShadow: "0.5px 0.5px 2px rgba(0, 0, 0, 0.2)",
                fontSize: { xs: "1rem", md: "1.2rem" }, // Tamaño ajustado
              }}
            >
              Gestioná reservas, canales de venta y pagos desde un solo lugar.
              Automatizá tareas clave y hacé crecer tu negocio con la plataforma
              más completa para alojamientos independientes.
            </Typography>

            <Box
              display="flex"
              gap={2}
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#EE964B",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontFamily: "'Red Hat Display', sans-serif",
                  px: 4,
                  py: 1.5,
                  borderRadius: "12px",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                  "&:hover": {
                    backgroundColor: "#d97e3e",
                  },
                  fontSize: { xs: "0.9rem", md: "1rem" },
                }}
              >
                Empezar prueba gratis
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#FFFFFF",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontFamily: "'Red Hat Display', sans-serif",
                  px: 4,
                  py: 1.5,
                  borderRadius: "12px",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                  fontSize: { xs: "0.9rem", md: "1rem" },
                }}
              >
                Ver demo
              </Button>
            </Box>
          </Grid>

          {/* Grid Derecho: Solo Imagen */}
          <Grid sx={{}} item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "transparent",
                borderRadius: 4,
                overflow: "hidden",
                maxWidth: { xs: "100%", md: "500px" },
                margin: "0 auto",
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
