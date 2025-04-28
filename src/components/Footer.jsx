import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";

function Footer() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #903AF2 0%, #6A1FBF 100%)",
        color: "#ECECEC",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} justifyContent="center" textAlign="center">
          {/* Soluciones */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Soluciones
            </Typography>
            {["Software hotelero", "Gestor de canales para AirBnB"].map((text) => (
              <Link
                href="#"
                underline="hover"
                color="inherit"
                display="block"
                key={text}
                sx={{ fontSize: "14px", mb: 1 }}
              >
                {text}
              </Link>
            ))}
          </Grid>

          {/* Comercio hotelero */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Comercio hotelero
            </Typography>
            {[
              "Gestor de canales para hoteles",
              "Motor de reservas para hoteles",
              "Creador de sitios web para hoteles",
              "Gestión inteligente de tarifas hoteleras",
              "Metabuscadores para hoteles",
              "Procesamiento de pagos hoteleros",
              "Sistema de distribución global (GDS)",
              "Tienda de aplicaciones para hoteles",
            ].map((text) => (
              <Link
                href="#"
                underline="hover"
                color="inherit"
                display="block"
                key={text}
                sx={{ fontSize: "14px", mb: 1 }}
              >
                {text}
              </Link>
            ))}
          </Grid>

          {/* Recursos */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Recursos
            </Typography>
            {[
              "Distribución",
              "Tecnología",
              "Mercadotecnia",
              "Grupos hoteleros",
              "Casos de éxito",
              "AWS",
              "Vídeos evento Sync",
            ].map((text) => (
              <Link
                href="#"
                underline="hover"
                color="inherit"
                display="block"
                key={text}
                sx={{ fontSize: "14px", mb: 1 }}
              >
                {text}
              </Link>
            ))}
          </Grid>

          {/* Integraciones */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Integraciones
            </Typography>
            {[
              "Aplicación de asociados integrados",
              "Encuentra a un experto",
              "Buscador de PMS",
              "Programas de asociados",
            ].map((text) => (
              <Link
                href="#"
                underline="hover"
                color="inherit"
                display="block"
                key={text}
                sx={{ fontSize: "14px", mb: 1 }}
              >
                {text}
              </Link>
            ))}
          </Grid>

          {/* Empresa */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Empresa
            </Typography>
            {[
              "Contáctanos",
              "Soporte",
              "Facturación y pagos",
              "Empleo",
              "Últimas noticias",
              "Eventos",
              "Avisos legales",
            ].map((text) => (
              <Link
                href="#"
                underline="hover"
                color="inherit"
                display="block"
                key={text}
                sx={{ fontSize: "14px", mb: 1 }}
              >
                {text}
              </Link>
            ))}
          </Grid>
        </Grid>

        {/* Línea separadora y social icons */}
        <Box mt={8} borderTop="1px solid #ECECEC" pt={4} textAlign="center">
          <Typography
            variant="body2"
            color="#ECECEC"
            sx={{ fontFamily: "'Merriweather Sans', sans-serif", mb: 2 }}
          >
            © Ubika 2025 |{" "}
            <Link
              href="https://drive.google.com/file/d/1sqeyB3MRJbD8yStOOGXMGq9PTS4EoPmJ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="inherit"
            >
              Términos y Condiciones
            </Link>{" "}
            |{" "}
            <Link
              href="https://www.webprofitdesign.com/"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="inherit"
            >
              Preferencias
            </Link>
          </Typography>

          {/* Íconos Sociales */}
          <Box mt={1} display="flex" justifyContent="center" gap={1}>
            {[InstagramIcon, FacebookIcon, TwitterIcon, LinkedInIcon, YouTubeIcon].map((Icon, index) => (
              <IconButton key={index} href="#" color="inherit" size="large">
                <Icon />
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
