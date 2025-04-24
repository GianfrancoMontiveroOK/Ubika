import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const data = [
  {
    title: "WEB PERSONALIZADA DE TU ALOJAMIENTO",
    description:
      "Diseñamos y desplegamos un sitio web a medida con el estilo y la identidad de tu alojamiento, optimizado para convertir visitas en reservas.",
  },
  {
    title: "MOTOR DE RESERVAS INTEGRADO",
    description:
      "Incluye un sistema de reservas, listo para aceptar pagos y confirmar habitaciones al instante, vengan de donde vengan.",
  },
  {
    title: "PANEL ADMINISTRATIVO PRIVADO",
    description:
      "Un dashboard exclusivo donde gestionás todas tus reservas (con un calendario), clientes y estadísticas en un solo lugar, con total seguridad.",
  },
  {
    title: "ALOJAMIENTO EN SERVIDOR SEGURO",
    description:
      "Tu web y datos residen en un entorno protegido y con alta disponibilidad, garantizando velocidad y acceso continuo.",
  },
  {
    title: "SOPORTE TÉCNICO",
    description:
      "Te enseñamos a usar la plataforma y estamos disponibles para resolver tus dudas o inconvenientes con asistencia rápida, asegurando que siempre saques el máximo provecho de Ubika.",
  },
  {
    title: "ACTUALIZACIONES DEL SISTEMA",
    description:
      "Recibís mejoras constantes y nuevas funcionalidades sin costo extra, para que Ubika evolucione junto a las necesidades de tu alojamiento.",
  },
];

const CarruselUbika = () => {
  return (
    <Box sx={{ px: { xs: 2, lg: 15 }, bgcolor: "transparent" }}>
      <Carousel
        additionalTransfrom={0}
        arrows={false}
        showDots={false}
        autoPlay
        autoPlaySpeed={2000}
        centerMode={false}
        infinite
        keyBoardControl
        minimumTouchDrag={80}
        responsive={{
          desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
          tablet: { breakpoint: { max: 1024, min: 600 }, items: 2 },
          mobile: { breakpoint: { max: 600, min: 0 }, items: 1 },
        }}
        slidesToSlide={1}
        swipeable
      >
        {data.map((item, index) => (
          <Card
            key={index}
            elevation={7}
            sx={{ m: 2, borderRadius: 4, height: "100%", bgcolor: "white" }}
          >
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  color: "#903AF2",
                  mb: 2,
                  fontFamily: "'Red Hat Display', sans-serif",
                }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#2B2B2B",
                  fontFamily: "'Merriweather Sans', sans-serif",
                }}
              >
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Carousel>
    </Box>
  );
};

export default CarruselUbika;
