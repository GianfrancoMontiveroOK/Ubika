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
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="center"
          textAlign="center"
        >
          {/* Soluciones */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Soluciones
            </Typography>
            {["Software hotelero", "Gestor de canales para AirBnB"].map((text) => (
              <Link href="#" underline="hover" color="inherit" display="block" key={text}>
                {text}
              </Link>
            ))}
          </Grid>

          {/* Comercio hotelero */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
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
              <Link href="#" underline="hover" color="inherit" display="block" key={text}>
                {text}
              </Link>
            ))}
          </Grid>

          {/* Recursos */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
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
              <Link href="#" underline="hover" color="inherit" display="block" key={text}>
                {text}
              </Link>
            ))}
          </Grid>

          {/* Integraciones */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Integraciones
            </Typography>
            {[
              "Aplicación de asociados integrados",
              "Encuentra a un experto",
              "Buscador de PMS",
              "Programas de asociados",
            ].map((text) => (
              <Link href="#" underline="hover" color="inherit" display="block" key={text}>
                {text}
              </Link>
            ))}
          </Grid>

          {/* Empresa */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
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
              <Link href="#" underline="hover" color="inherit" display="block" key={text}>
                {text}
              </Link>
            ))}
          </Grid>
        </Grid>

        {/* Línea separadora */}
        <Box mt={5} borderTop="1px solid #ECECEC" pt={3} textAlign="center">
          <Typography variant="body2" color="#ECECEC">
            © Ubika 2025 |{" "}
            <Link
              href="https://drive.google.com/file/d/1sqeyB3MRJbD8yStOOGXMGq9PTS4EoPmJ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="inherit"
            >
              Términos y Condiciones de Uso
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

          {/* Íconos sociales */}
          <Box mt={2}>
            {[InstagramIcon, FacebookIcon, TwitterIcon, LinkedInIcon, YouTubeIcon].map((Icon, index) => (
              <IconButton key={index} href="#" color="inherit">
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
