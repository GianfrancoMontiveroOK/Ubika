import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Box,
  Fade,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [showFade, setShowFade] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: loginErrors, isAuthenticated, loading } = useAuth();

  const onSubmit = handleSubmit(async (data) => signin(data));

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <Grid container sx={{ minHeight: "100vh", bgcolor: "#ECECEC" }}>
      {/* Columna del formulario */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 450,
            bgcolor: "#903AF2",
            color: "#fff",
            borderRadius: 4,
            boxShadow: 8,
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{ textAlign: "center" }}
            >
              Ingresá a tu Cuenta
            </Typography>

            <form onSubmit={onSubmit}>
              <TextField
                fullWidth
                margin="normal"
                variant="filled"
                label="ejemplo@mail.com"
                {...register("email", { required: true })}
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#fff" } }}
              />
              {errors.email && (
                <Typography color="error">El correo es obligatorio</Typography>
              )}

              <TextField
                fullWidth
                margin="normal"
                variant="filled"
                label="Ingresa tu contraseña"
                type="password"
                {...register("password", { required: true })}
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#fff" } }}
              />
              {errors.password && (
                <Typography color="error">
                  La contraseña es obligatoria
                </Typography>
              )}

              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  mt: 2,
                  bgcolor: "#EAF7CF",
                  color: "#565254",
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#d0e9b5",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
            </form>

            {loginErrors.map((error, i) => (
              <Typography key={i} color="error" mt={2}>
                {error}
              </Typography>
            ))}

            <Typography textAlign="center" mt={3}>
              ¿Aún no tienes una cuenta?
              <Link to="/register" style={{ color: "#EE964B", marginLeft: 5 }}>
                Registrarse
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Columna visual o mensaje */}
      <Grid
        item
        xs={false}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#903AF2",
          color: "#ECECEC",
          textAlign: "center",
          p: 4,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            ¡Gestiona tu alojamiento de forma inteligente!
          </Typography>
          <Typography>
            Con Ubika, optimizá tus reservas y brindá una experiencia
            profesional a tus huéspedes.
          </Typography>
        </Box>
      </Grid>

      {/* Fade motivacional */}
      <Fade in={showFade}>
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "70%", md: "50%" },
            bgcolor: "#fff",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            zIndex: 10,
          }}
        >
          <Typography variant="h6" mb={2}>
            ¿Por qué necesitas registrarte?
          </Typography>
          <Typography>
            Al iniciar sesión o crear una cuenta, podrás acceder a todas
            nuestras funciones, guardar tus preferencias y realizar compras de
            manera rápida y segura.
          </Typography>
          <Button
            variant="contained"
            onClick={() => setShowFade(false)}
            sx={{
              mt: 3,
              bgcolor: "#903AF2",
              "&:hover": {
                bgcolor: "#702ac2",
              },
            }}
          >
            Entendido
          </Button>
        </Box>
      </Fade>
    </Grid>
  );
}
