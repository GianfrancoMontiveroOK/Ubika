import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    await signup(values);
  });

  return (
    <Grid container sx={{ minHeight: "100vh", bgcolor: "#ECECEC" }}>
      {/* Formulario */}
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
            maxWidth: 500,
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
              Crear nueva cuenta
            </Typography>

            <form onSubmit={onSubmit}>
              <TextField
                fullWidth
                margin="normal"
                variant="filled"
                label="Nombre"
                {...register("username", { required: true })}
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#fff" } }}
              />
              {errors.username && (
                <Typography color="error">Nombre requerido</Typography>
              )}

              <TextField
                fullWidth
                margin="normal"
                variant="filled"
                label="Apellido"
                {...register("lastname", { required: true })}
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#fff" } }}
              />
              {errors.lastname && (
                <Typography color="error">Apellido requerido</Typography>
              )}

              <TextField
                fullWidth
                margin="normal"
                variant="filled"
                label="Número de teléfono"
                {...register("phone", { required: true })}
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#fff" } }}
              />
              {errors.phone && (
                <Typography color="error">Número requerido</Typography>
              )}

              <TextField
                fullWidth
                margin="normal"
                variant="filled"
                label="Ubicación de entrega"
                {...register("address", { required: true })}
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#fff" } }}
              />
              {errors.address && (
                <Typography color="error">Ubicación requerida</Typography>
              )}

              <TextField
                fullWidth
                margin="normal"
                variant="filled"
                label="Correo electrónico"
                {...register("email", { required: true })}
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#fff" } }}
              />
              {errors.email && (
                <Typography color="error">Correo requerido</Typography>
              )}

              <TextField
                fullWidth
                margin="normal"
                variant="filled"
                label="Contraseña"
                type="password"
                {...register("password", { required: true })}
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#fff" } }}
              />
              {errors.password && (
                <Typography color="error">Contraseña requerida</Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  bgcolor: "#EAF7CF",
                  color: "#565254",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "#c9e2b1" },
                }}
              >
                Registrar cuenta
              </Button>
            </form>

            {registerErrors.map((error, i) => (
              <Typography key={i} color="error" mt={2}>
                {error}
              </Typography>
            ))}

            <Typography textAlign="center" mt={3}>
              ¿Ya tienes una cuenta?
              <Link to="/login" style={{ color: "#EE964B", marginLeft: 5 }}>
                Iniciar sesión
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Sección visual derecha */}
      <Grid
        item
        xs={false}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#903AF2",
          color: "#ECECEC",
          textAlign: "center",
          p: 4,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Empezá con Ubika
          </Typography>
          <Typography>
            Accedé a herramientas que optimizan tus reservas y hacé crecer tu
            alojamiento.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
