import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Hero1 = () => {
  const scrollToNext = () => {
    const next = document.getElementById("snap-section-2");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      id="snap-section-1"
      sx={{
        height: "100vh",
        scrollSnapAlign: "start",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#EAF7CF",
        px: 3,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h2"
        fontWeight="bold"
        sx={{
          color: "#903AF2",
          fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
          mb: 2,
        }}
      >
        Automatiza y haz crecer tu alojamiento
      </Typography>

      <Typography
        variant="h6"
        sx={{
          color: "#2B2B2B",
          maxWidth: "600px",
          mb: 4,
        }}
      >
        Con Ubika centralizas reservas, cobros y clientes desde una plataforma
        profesional. Diseñado para hostales, hoteles y
        alojamientos con visión de futuro.
      </Typography>

      <Button
        variant="contained"
        onClick={scrollToNext}
        sx={{
          backgroundColor: "#903AF2",
          color: "white",
          borderRadius: "24px",
          px: 4,
          py: 1,
          fontSize: "1rem",
          "&:hover": {
            backgroundColor: "#702ac2",
          },
        }}
        endIcon={<ArrowDownwardIcon />}
      >
        Descubre cómo funciona
      </Button>
    </Box>
  );
};

export default Hero1;
