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
        background: "linear-gradient(to bottom, #fff 0%, #903AF2 150%)",
        color: "#222",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
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
            color: "#903AF2",
          }}
        >
          Ubika simplifica la gestión de tu alojamiento
        </Typography>

        {/* Features */}
        <Grid container spacing={6}>
          {/* Feature 1 */}
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="flex-start" gap={3}>
              <Paper
                sx={{
                  backgroundColor: "#903AF2",
                  borderRadius: 2,
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DeviceHubIcon sx={{ fontSize: 40, color: "#fff" }} />
              </Paper>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    fontFamily: "'Red Hat Display', sans-serif",
                    color: "#565254",
                  }}
                >
                  Gestioná todos tus canales de venta
                </Typography>
                <Typography
                  variant="body2"
                  mt={1}
                  sx={{
                    fontFamily: "'Merriweather Sans', sans-serif",
                    color: "#565254",
                  }}
                >
                  Centralizá reservas de Booking, Airbnb, Expedia y muchos más
                  desde un solo lugar.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Feature 2 */}
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="flex-start" gap={3}>
              <Paper
                sx={{
                  backgroundColor: "#EE964B",
                  borderRadius: 2,
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LinkIcon sx={{ fontSize: 40, color: "#fff" }} />
              </Paper>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    fontFamily: "'Red Hat Display', sans-serif",
                    color: "#565254",
                  }}
                >
                  Sincronización en tiempo real
                </Typography>
                <Typography
                  variant="body2"
                  mt={1}
                  sx={{
                    fontFamily: "'Merriweather Sans', sans-serif",
                    color: "#565254",
                  }}
                >
                  Evitá reservas duplicadas con actualizaciones instantáneas en
                  tus canales y tu panel Ubika.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Feature 3 */}
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="flex-start" gap={3}>
              <Paper
                sx={{
                  backgroundColor: "#EAF7CF",
                  borderRadius: 2,
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AllInclusiveIcon sx={{ fontSize: 40, color: "#565254" }} />
              </Paper>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    fontFamily: "'Red Hat Display', sans-serif",
                    color: "#565254",
                  }}
                >
                  Todo en una sola plataforma
                </Typography>
                <Typography
                  variant="body2"
                  mt={1}
                  sx={{
                    fontFamily: "'Merriweather Sans', sans-serif",
                    color: "#565254",
                  }}
                >
                  Gestioná reservas, cobros y reportes desde un mismo lugar,
                  fácil y accesible.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Feature 4 */}
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="flex-start" gap={3}>
              <Paper
                sx={{
                  backgroundColor: "#565254",
                  borderRadius: 2,
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PriceChangeIcon sx={{ fontSize: 40, color: "#fff" }} />
              </Paper>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    fontFamily: "'Red Hat Display', sans-serif",
                    color: "#565254",
                  }}
                >
                  Optimizá precios y aumentá tus ingresos
                </Typography>
                <Typography
                  variant="body2"
                  mt={1}
                  sx={{
                    fontFamily: "'Merriweather Sans', sans-serif",
                    color: "#565254",
                  }}
                >
                  Usá reportes y sugerencias inteligentes para definir tarifas
                  competitivas en cada canal.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default FeaturesUbika;
