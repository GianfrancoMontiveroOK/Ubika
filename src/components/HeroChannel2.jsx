import React from "react";
import { Box, Container, Grid, Typography, Paper } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";

function FeaturesUbika() {
  return (
    <Box
      sx={{
        background: "linear-gradient(0deg, #d2c2f2, #903AF2 50%)",

        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%", // ✅ Ocupa el alto completo de la vista
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        {/* Título */}
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          mb={8}
          sx={{
            fontFamily: "'Red Hat Display', sans-serif",
            color: "#fff",
          }}
        >
          Ubika simplifica la gestión de tu alojamiento
        </Typography>

        {/* Features */}
        <Grid container spacing={6}>
          {[
            {
              icon: <DeviceHubIcon sx={{ fontSize: 40, color: "#fff" }} />,
              bgColor: "#903AF2",
              title: "Gestioná todos tus canales de venta",
              description:
                "Centralizá reservas de Booking, Airbnb, Expedia y muchos más desde un solo lugar.",
            },
            {
              icon: <LinkIcon sx={{ fontSize: 40, color: "#fff" }} />,
              bgColor: "#EE964B",
              title: "Sincronización en tiempo real",
              description:
                "Evitá reservas duplicadas con actualizaciones instantáneas en tus canales y tu panel Ubika.",
            },
            {
              icon: (
                <AllInclusiveIcon sx={{ fontSize: 40, color: "#565254" }} />
              ),
              bgColor: "#EAF7CF",
              title: "Todo en una sola plataforma",
              description:
                "Gestioná reservas, cobros y reportes desde un mismo lugar, fácil y accesible.",
            },
            {
              icon: <PriceChangeIcon sx={{ fontSize: 40, color: "#fff" }} />,
              bgColor: "#565254",
              title: "Optimizá precios y aumentá tus ingresos",
              description:
                "Usá reportes y sugerencias inteligentes para definir tarifas competitivas en cada canal.",
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box display="flex" alignItems="flex-start" gap={3}>
                <Paper
                  sx={{
                    backgroundColor: feature.bgColor,
                    borderRadius: 2,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "64px",
                    minHeight: "64px",
                  }}
                >
                  {feature.icon}
                </Paper>
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      fontFamily: "'Red Hat Display', sans-serif",
                      color: "#fff",
                      fontSize: { xs: "1.1rem", md: "1.25rem" },
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    mt={1}
                    sx={{
                      fontFamily: "'Merriweather Sans', sans-serif",
                      color: "#fff",
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default FeaturesUbika;
