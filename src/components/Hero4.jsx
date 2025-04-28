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
    iconColor: "#903AF2",
    icon: "📅",
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
    iconColor: "#EE964B",
    icon: "🌎",
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
    iconColor: "#EAF7CF",
    icon: "⚡",
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
    iconColor: "#565254",
    icon: "🚀",
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
              <Card
                elevation={4}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  backgroundColor: "#f9f9f9",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "translateY(-8px)" },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      backgroundColor: feature.iconColor,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 4,
                    }}
                  >
                    <Typography variant="h5" sx={{ color: "#fff" }}>
                      {feature.icon}
                    </Typography>
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
                        to={link.href.replace("#", "")} // importante para sacar el "#" y que funcione con HashRouter
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
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
