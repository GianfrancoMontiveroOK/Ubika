import React from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Link,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function HeroPrices1() {
  const featuresPlanStart = [
    { text: "Motor de reservas integrado" },
    { text: "Panel de gestión de reservas" },
    { text: "Soporte técnico básico" },
  ];

  const featuresPlanPro = [
    { text: "Motor de reservas avanzado" },
    { text: "Conexión con OTAs principales" },
    {
      text: "Métricas de desempeño",
      help: "Visualiza el rendimiento de tu alojamiento.",
    },
    {
      text: "Soporte técnico 24/7",
      help: "Asistencia continua disponible todo el día.",
    },
  ];

  const featuresPlanEnterprise = [
    { text: "Gestión de múltiples propiedades" },
    { text: "Tarifas y paquetes personalizados" },
    { text: "Integraciones avanzadas con sistemas externos" },
    { text: "Reportes de rendimiento en tiempo real" },
  ];

  return (
    <Box sx={{ py: 10, backgroundColor: "#f9f9f9" }}>
      <Container maxWidth="lg">
        {/* Cabecera */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{
              color: "#262626",
              fontFamily: "'Red Hat Display', sans-serif",
            }}
          >
            Potencia la gestión de tu alojamiento con Ubika
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#666",
              fontFamily: "'Merriweather Sans', sans-serif",
            }}
          >
            Prueba todas las funciones gratis durante 14 días. Sin compromiso.
          </Typography>
        </Box>

        {/* Sección de planes */}
        <Grid container spacing={4} justifyContent="center">
          {/* Plan Start */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={paperStyle}>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    color: "#903af2",
                    fontFamily: "'Red Hat Display', sans-serif",
                  }}
                >
                  Ubika Start
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    color: "#262626",
                    fontFamily: "'Red Hat Display', sans-serif",
                  }}
                >
                  Desde $24
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#666",
                    mb: 3,
                    fontFamily: "'Merriweather Sans', sans-serif",
                  }}
                >
                  USD al mes
                </Typography>

                <Button variant="contained" fullWidth sx={buttonStyle}>
                  Comenzar prueba gratis
                </Button>

                <List>
                  {featuresPlanStart.map((feature, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemIcon>
                        <CheckCircleIcon sx={{ color: "#903af2" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              fontFamily: "'Merriweather Sans', sans-serif",
                            }}
                          >
                            {feature.text}
                            {feature.help && (
                              <Tooltip title={feature.help} arrow>
                                <HelpOutlineIcon
                                  sx={{ fontSize: 16, ml: 1, color: "#999" }}
                                />
                              </Tooltip>
                            )}
                          </Box>
                        }
                        sx={{ color: "#262626" }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Paper>
          </Grid>

          {/* Plan Pro */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={paperStyle}>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    color: "#903af2",
                    fontFamily: "'Red Hat Display', sans-serif",
                  }}
                >
                  Ubika Pro
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    color: "#262626",
                    fontFamily: "'Red Hat Display', sans-serif",
                  }}
                >
                  Desde $49
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#666",
                    mb: 3,
                    fontFamily: "'Merriweather Sans', sans-serif",
                  }}
                >
                  USD al mes
                </Typography>

                <Button variant="contained" fullWidth sx={buttonStyle}>
                  Probar Ubika Pro
                </Button>

                <List>
                  {featuresPlanPro.map((feature, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemIcon>
                        <CheckCircleIcon sx={{ color: "#903af2" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              fontFamily: "'Merriweather Sans', sans-serif",
                            }}
                          >
                            {feature.text}
                            {feature.help && (
                              <Tooltip title={feature.help} arrow>
                                <HelpOutlineIcon
                                  sx={{ fontSize: 16, ml: 1, color: "#999" }}
                                />
                              </Tooltip>
                            )}
                          </Box>
                        }
                        sx={{ color: "#262626" }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Paper>
          </Grid>

          {/* Plan Enterprise */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={paperStyle}>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    color: "#903af2",
                    fontFamily: "'Red Hat Display', sans-serif",
                  }}
                >
                  Ubika Enterprise
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    color: "#262626",
                    fontFamily: "'Red Hat Display', sans-serif",
                  }}
                >
                  Consultar
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#666",
                    mb: 3,
                    fontFamily: "'Merriweather Sans', sans-serif",
                  }}
                >
                  Planes personalizados
                </Typography>

                <Button variant="contained" fullWidth sx={buttonStyle}>
                  Solicitar asesoría personalizada
                </Button>

                <List>
                  {featuresPlanEnterprise.map((feature, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemIcon>
                        <CheckCircleIcon sx={{ color: "#903af2" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={feature.text}
                        sx={{
                          color: "#262626",
                          fontFamily: "'Merriweather Sans', sans-serif",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Notas aclaratorias */}
        <Box sx={{ mt: 10, pt: 6, textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{
              color: "#999",
              mb: 1,
              fontFamily: "'Merriweather Sans', sans-serif",
            }}
          >
            * Los precios dependen del tamaño y características del alojamiento.
            Valor estimado para propiedades de hasta 5 habitaciones.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#999",
              mb: 4,
              fontFamily: "'Merriweather Sans', sans-serif",
            }}
          >
            * Algunos servicios, como el procesamiento de pagos, podrían generar
            costos adicionales por transacción.
          </Typography>

          <Link
            href="#"
            underline="none"
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#903af2",
              fontFamily: "'Red Hat Display', sans-serif",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Ver todas las funcionalidades disponibles →
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

const paperStyle = {
  p: 4,
  minHeight: 500,
  borderRadius: 4,
  backgroundColor: "#fff",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  border: "1px solid #e0e0e0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const buttonStyle = {
  mb: 3,
  backgroundColor: "#903af2",
  color: "#fff",
  borderRadius: 2,
  textTransform: "none",
  fontWeight: "bold",
  fontFamily: "'Red Hat Display', sans-serif",
  "&:hover": { backgroundColor: "#7d2bd4" },
};
