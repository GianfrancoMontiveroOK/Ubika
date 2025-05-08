import React from "react";
import { Box, Container, Grid, Typography, Button, Paper } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function HeroBeds24() {
  return (
    <Box
      sx={{
        scrollSnapAlign: "start",
        background: "linear-gradient(180deg, #d2c2f2, #903AF2 50%)",
        height: "100%",
        color: "white",
        py: 8,
        px: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Información principal */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              color={"#fff"}
              sx={{ fontFamily: "'Red Hat Display', sans-serif" }}
            >
              Simplifica la gestión de tus alojamientos
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                fontFamily: "'Merriweather Sans', sans-serif",
                color: "#fff",
              }}
            >
              Gestiona todas tus reservas desde una sola plataforma.
              Sincronización automática con más de 60 OTAs, incluyendo Airbnb,
              Booking.com, Expedia y VRBO.
            </Typography>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#EE964B",
                color: "#ffffff",
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
              Ver Demo
            </Button>
          </Grid>

          {/* Beneficios principales */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: "12px",
                    backgroundColor: "#565254",
                    color: "#ffffff",
                  }}
                >
                  <SyncIcon sx={{ fontSize: 40, mb: 2, color: "#EE964B" }} />
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Sincronización en Tiempo Real
                  </Typography>
                  <Typography variant="body2">
                    Evita sobreventas y actualiza calendarios al instante.
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: "12px",
                    backgroundColor: "#565254",
                    color: "#ffffff",
                  }}
                >
                  <IntegrationInstructionsIcon
                    sx={{ fontSize: 40, mb: 2, color: "#EE964B" }}
                  />
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Integraciones Avanzadas
                  </Typography>
                  <Typography variant="body2">
                    Conecta con más de 60 OTAs, servicios de pago y CRM.
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: "12px",
                    backgroundColor: "#565254",
                    color: "#ffffff",
                  }}
                >
                  <HomeWorkIcon
                    sx={{ fontSize: 40, mb: 2, color: "#EE964B" }}
                  />
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Gestión Centralizada
                  </Typography>
                  <Typography variant="body2">
                    Administra múltiples propiedades desde un solo lugar.
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: "12px",
                    backgroundColor: "#565254",
                    color: "#ffffff",
                  }}
                >
                  <AttachMoneyIcon
                    sx={{ fontSize: 40, mb: 2, color: "#EE964B" }}
                  />
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Aumenta tus Ingresos
                  </Typography>
                  <Typography variant="body2">
                    Ajusta precios automáticamente para maximizar ganancias.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HeroBeds24;
