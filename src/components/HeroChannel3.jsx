import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";

function Hero3Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmitContact = () => {
    setLoading(true);

    // Simulación de envío (puedes reemplazar con un POST a tu API)
    setTimeout(() => {
      alert("Mensaje enviado correctamente");
      setFormData({ name: "", email: "", message: "" });
      setLoading(false);
    }, 2000);
  };

  return (
    <Box
      component="section"
      sx={{
        scrollSnapAlign: "start",
        background: "linear-gradient(180deg, #d2c2f2, #903AF2 50%)",
        height: "100vh",
        color: "white",
        py: 8,
        px: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} justifyContent="center">
          {/* Formulario de Contacto */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={4}
              sx={{
                padding: 4,
                borderRadius: "12px",
                backgroundColor: "#ECECEC", // Fondo claro
                color: "#333",
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "#903AF2", textAlign: "center" }} // Color principal de Ubika
              >
                Contáctanos
              </Typography>

              <TextField
                fullWidth
                label="Nombre"
                sx={{
                  mb: 2,
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                }}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Correo Electrónico"
                sx={{
                  mb: 2,
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                }}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <TextField
                fullWidth
                multiline
                minRows={4}
                label="Mensaje"
                sx={{
                  mb: 2,
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                }}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />

              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmitContact}
                disabled={loading}
                sx={{
                  backgroundColor: "#903AF2",
                  color: "#ECECEC",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#7029b3" },
                  borderRadius: "8px",
                }}
              >
                {loading ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </Paper>
          </Grid>

          {/* Mapa de Ubicación */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#ffffff", mb: 2 }}  
            >
              Nuestras Oficinas
            </Typography>

            <Box
              component="iframe"
              src="https://www.google.com/maps?q=Av+Mitre+1362,+San+Rafael,+Mendoza,+Argentina&output=embed"
              width="100%"
              height="300"
              style={{
                border: 0,
                borderRadius: "12px",
                maxWidth: "500px",
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Hero3Contact;
