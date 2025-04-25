import React from "react";
import { Box, Typography, Button, TextField } from "@mui/material";

const Hero1 = () => {
  return (
    <Box
      id="snap-section-1"
      sx={{
        height: "100%",
        scrollSnapAlign: "start",
        bgcolor: "#903AF2",
        px: { xs: 3, mb:20, lg: 40, xl: 40 }, // padding horizontal como container
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        position: "relative",
        color: "white",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-20%", // empieza desde fuera del lado izquierdo
          width: "60%",
          height: "100%",
          background:
            "radial-gradient(circle at left, rgba(255,255,255,0.15) 0%, transparent 80%)",
          filter: "blur(80px)",
          zIndex: 0,
        },
        zIndex: 1,
      }}
    >
      {/* Contenido central */}
      <Box textAlign="center">
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            color: "#fff",
            mb: 2,
            fontSize: { xs: "1.5rem", sm: "2rem" },
            fontFamily: "'Red Hat Display', sans-serif",
            fontWeight: 700,
          }}
        >
          GESTIONÁ TU ALOJAMIENTO SIN COMPLICACIONES
        </Typography>

        <Typography
          sx={{
            mb: 3,
            color: "#fff",
            fontFamily: "'Merriweather Sans', sans-serif",
          }}
        >
          Centralizá todas tus reservas, pagos y atención al cliente en una
          plataforma intuitiva y profesional.
        </Typography>
        <Box
          sx={{
            display: { xs: "none", sm: "flex", lg: "flex" },
            justifyContent: "center",
            mt: 4,
            mb: 2,
          }}
        >
          <TextField
            variant="outlined"
            placeholder="¿Cuál es tu email de trabajo?"
            type="mail"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              width: "50%",
              input: {
                paddingY: 1.5,
                paddingX: 2,
              },
            }}
          />
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ee964b",
            color: "#fff",
            borderRadius: "24px",
            px: 4,
            py: 1,
            fontWeight: "bold",
            mb: 2,
            fontFamily: "'Red Hat Display', sans-serif",
          }}
        >
          Tu demo gratis
        </Button>

        <Typography
          sx={{
            mb: 4,
            fontWeight: 500,
            fontSize: { xs: "0.95rem", sm: "1rem" },
            color: "#fff",
            fontFamily: "'Merriweather Sans', sans-serif",
          }}
        >
          Más información
        </Typography>
      </Box>

      {/* Cuña blanca inferior izquierda */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%", // Mitad izquierda horizontal
          height: "20%", // Altura deseada
          backgroundColor: "#fff", // Color blanco
          clipPath: "polygon(0 0, 100% 100%, 0% 100%)", // Triángulo desde arriba a la izquierda
          zIndex: 2,
        }}
      />
    </Box>
  );
};

export default Hero1;
