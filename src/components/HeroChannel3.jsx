import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";

function BenefitsUbika() {
  return (
    <Box
      sx={{
        backgroundImage: "url('/images/ubika-benefits-background.jpg')", // ✅ Coloca la ruta real de tu imagen
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        px: 2,
        py: 10,
        color: "#000",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          {/* Sección de Texto */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontFamily: "'Red Hat Display', sans-serif",
                color: "#000",
              }}
            >
              Impulsá tu{" "}
              <Box component="span" sx={{ color: "#EE964B" }}>
                alojamiento
              </Box>{" "}
              al siguiente nivel
            </Typography>

            <Box mt={4}>
              {/* Beneficio 1 */}
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ fontFamily: "'Red Hat Display', sans-serif" }}
              >
                Hasta 40% más reservas*
              </Typography>
              <Typography
                variant="body1"
                mb={3}
                sx={{ fontFamily: "'Merriweather Sans', sans-serif" }}
              >
                Incrementá tu ocupación conectando tu propiedad a más canales de
                venta sin costos adicionales.
              </Typography>

              {/* Beneficio 2 */}
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ fontFamily: "'Red Hat Display', sans-serif" }}
              >
                Tecnología reconocida internacionalmente
              </Typography>
              <Typography
                variant="body1"
                mb={3}
                sx={{ fontFamily: "'Merriweather Sans', sans-serif" }}
              >
                Utilizá el mejor gestor de canales del mercado y optimizá la
                distribución de tus habitaciones.
              </Typography>

              {/* Beneficio 3 */}
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ fontFamily: "'Red Hat Display', sans-serif" }}
              >
                Maximizá tus ingresos y reducí comisiones
              </Typography>
              <Typography
                variant="body1"
                mb={3}
                sx={{ fontFamily: "'Merriweather Sans', sans-serif" }}
              >
                Aplicá reglas de tarifas inteligentes para mantener siempre la
                mejor rentabilidad.
              </Typography>

              {/* Beneficio 4 */}
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ fontFamily: "'Red Hat Display', sans-serif" }}
              >
                Acceso a la red más grande de canales online
              </Typography>
              <Typography
                variant="body1"
                mb={4}
                sx={{ fontFamily: "'Merriweather Sans', sans-serif" }}
              >
                Distribuí tus habitaciones en cientos de agencias online líderes
                a nivel mundial.
              </Typography>

              {/* Nota */}
              <Typography
                variant="caption"
                display="block"
                mb={4}
                sx={{ fontFamily: "'Merriweather Sans', sans-serif" }}
              >
                *Conectarte a 6 o más canales adicionales puede aumentar tus
                reservas hasta un 40%.
              </Typography>

              {/* Botones */}
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
                    "&:hover": { backgroundColor: "#d97e3e" },
                  }}
                >
                  Empezar prueba gratis
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#ECECEC",
                    color: "#ECECEC",
                    fontWeight: "bold",
                    fontFamily: "'Red Hat Display', sans-serif",
                    px: 4,
                    py: 1.5,
                    borderRadius: "12px",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  Ver demo
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Imagenes al lado derecho */}
          <Grid item xs={12} md={6} textAlign="center">
            <Box
              component="img"
              src="/images/ubika-business-meeting.png" // ✅ Ruta real de tu imagen
              alt="Negocio Ubika"
              sx={{
                width: "100%",
                maxWidth: 500,
                borderRadius: 4,
                boxShadow: 3,
                mb: 4,
              }}
            />
            <Box
              component="img"
              src="/images/ubika-graph.png" // ✅ Ruta real de tu gráfico
              alt="Crecimiento Ubika"
              sx={{
                width: "80%",
                maxWidth: 400,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default BenefitsUbika;
