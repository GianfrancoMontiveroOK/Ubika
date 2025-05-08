import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Link,
  Typography,
  Container,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PublicIcon from "@mui/icons-material/Public";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Link as RouterLink } from "react-router-dom";

const features = [
  {
    title: "Gestioná todas tus reservas",
    description:
      "Centralizá reservas, tarifas y disponibilidad desde un solo lugar. Sincronizá todos tus canales de venta fácilmente.",
    links: [
      { text: "Gestor de Canales", href: "/channel-manager" },
      { text: "Motor de Reservas", href: "/booking-engine" },
      { text: "Panel Administrativo", href: "/admin-panel" },
    ],
    icon: <CalendarTodayIcon sx={{ color: "#903AF2" }} />,
    solapaColor: "#EE964B", // naranja
  },
  {
    title: "Conseguí más huéspedes",
    description:
      "Conectá tu alojamiento a cientos de agencias de viaje online y redes de búsqueda para aumentar tus reservas.",
    links: [
      { text: "Distribución Global", href: "/global-distribution" },
      { text: "Metabuscadores", href: "/metasearch" },
      { text: "Marketing Digital", href: "/marketing" },
    ],
    icon: <PublicIcon sx={{ color: "#903AF2" }} />,
    solapaColor: "#EAF7CF", // verde claro
  },
  {
    title: "Automatizá tareas clave",
    description:
      "Ahorrá tiempo con confirmaciones automáticas, pagos online y recordatorios a huéspedes.",
    links: [
      { text: "Automatización", href: "/automation" },
      { text: "Pagos Online", href: "/payments" },
      { text: "Atención al Cliente", href: "/customer-support" },
    ],
    icon: <FlashOnIcon sx={{ color: "#903AF2" }} />,
    solapaColor: "#D1C4E9", // lila claro opcional
  },
  {
    title: "Escalá tu alojamiento",
    description:
      "Recibí actualizaciones gratuitas y sumá nuevas herramientas a medida que tu negocio crece.",
    links: [
      { text: "Actualizaciones del Sistema", href: "/updates" },
      { text: "Expansión de Canales", href: "/channel-expansion" },
      { text: "Soporte Personalizado", href: "/support" },
    ],
    icon: <RocketLaunchIcon sx={{ color: "#903AF2" }} />,
    solapaColor: "#B2DFDB", // verde agua opcional
  },
];

export default function FeaturesSection() {
  return (
    <Box sx={{ backgroundColor: "#FFFFFF", py: 10 }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8} maxWidth="800px" mx="auto">
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: "#903AF2",
              fontFamily: "'Red Hat Display', sans-serif",
              mb: 2,
            }}
          >
            ¿Qué incluye Ubika?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#565254",
              fontFamily: "'Merriweather Sans', sans-serif",
            }}
          >
            Todo lo que tu alojamiento necesita para crecer, centralizar y
            simplificar su gestión.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 8, md: 10 }} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Box
                sx={{
                  position: "relative",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "translateY(-8px)" },
                }}
              >
                {/* Solapa decorativa */}
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 8,
                    backgroundColor: feature.solapaColor,
                    borderTopLeftRadius: 16,
                    borderBottomLeftRadius: 16,
                  }}
                />

                <Card
                  elevation={4}
                  sx={{
                    pl: 3,
                    pr: { xs: 3, md: 4 },
                    py: { xs: 3, md: 4 },
                    ml: 1,
                    borderTopRightRadius: 16,
                    borderBottomRightRadius: 16,
                    backgroundColor: "#f9f9f9",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        backgroundColor: "#F3E8FD", // violeta claro de fondo
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                      }}
                    >
                      {feature.icon}
                    </Box>

                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        color: "#903AF2",
                        mb: 2,
                        fontFamily: "'Red Hat Display', sans-serif",
                      }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "#565254",
                        mb: 3,
                        fontFamily: "'Merriweather Sans', sans-serif",
                      }}
                    >
                      {feature.description}
                    </Typography>

                    {feature.links.map((link, i) => (
                      <Box key={i} mb={1}>
                        <Link
                          component={RouterLink}
                          to={link.href.replace("#", "")}
                          underline="none"
                          sx={{
                            color: "#565254",
                            fontWeight: "medium",
                            display: "flex",
                            alignItems: "center",
                            "&:hover": { color: "#903AF2" },
                          }}
                        >
                          {link.text}
                          <ArrowForwardIcon sx={{ fontSize: 20, ml: 1 }} />
                        </Link>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
