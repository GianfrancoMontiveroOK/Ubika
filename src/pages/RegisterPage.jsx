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
import "../styles/registerpage.css";

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
    <Grid container className="layoutregister">
      <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box className="containerHomePage">
          <Box className="backgroundregister">
            <Grid
              sx={{
                marginTop: {
                  xs: "2vh",
                  sm: "2vh",
                  md: "3vh",
                  lg: "7vh",
                  xl: "10vh",
                },
                marginBottom: {
                  xs: "2vh",
                  sm: "2vh",
                  md: "3vh",
                  lg: "7vh",
                  xl: "10vh",
                },
              }}
              item
              className="hero1-2"
              xs={12}
              sm={12}
              md={12}
              lg={6}
              xl={6}
            >
              <Card className="cardconteiner">
                <CardContent className="cardregister">
                  <Typography
                    style={{ color: "white", marginBottom: "2vh" }}
                    sx={{
                      fontSize: {
                        xs: "2rem",
                        sm: "2rem",
                        md: "3rem",
                        lg: "3rem",
                        xl: "4rem",
                      },
                    }}
                  >
                    Crear nueva cuenta
                  </Typography>

                  <form className="formregister" onSubmit={onSubmit}>
                    <TextField
                      className="itemregister"
                      {...register("username", { required: true })}
                      variant="filled"
                      label="Nombre"
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      fullWidth
                      margin="normal"
                    />
                    {errors.username && (
                      <Typography my={1} color={"error"}>
                        Nombre es requerido
                      </Typography>
                    )}
                    <TextField
                      className="itemregister"
                      {...register("lastname", { required: true })}
                      variant="filled"
                      label="Apellido"
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      fullWidth
                      margin="normal"
                    />
                    {errors.lastname && (
                      <Typography my={1} color={"error"}>
                        Apellido es requerido
                      </Typography>
                    )}
                    <TextField
                      className="itemregister"
                      {...register("phone", { required: true })}
                      variant="filled"
                      label="Número de teléfono"
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      fullWidth
                      margin="normal"
                    />
                    {errors.phone && (
                      <Typography my={1} color={"error"}>
                        Número de teléfono es requerido
                      </Typography>
                    )}
                    <TextField
                      className="itemregister"
                      {...register("address", { required: true })}
                      variant="filled"
                      label="Ubicación de entrega"
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      fullWidth
                      margin="normal"
                    />
                    {errors.address && (
                      <Typography my={1} color={"error"}>
                        Ubicación de entrega es requerida
                      </Typography>
                    )}
                    <TextField
                      className="itemregister"
                      {...register("email", { required: true })}
                      variant="filled"
                      label="Correo electrónico"
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      fullWidth
                      margin="normal"
                    />
                    {errors.email && (
                      <Typography my={1} color={"error"}>
                        Correo electrónico es requerido
                      </Typography>
                    )}
                    <TextField
                      className="itemregister"
                      {...register("password", { required: true })}
                      variant="filled"
                      label="Contraseña"
                      type="password"
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      fullWidth
                      margin="normal"
                    />
                    {errors.password && (
                      <Typography my={1} color={"error"}>
                        Contraseña es requerida
                      </Typography>
                    )}
                    <Button
                      className="buttonregister"
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                      style={{ marginTop: "16px" }}
                    >
                      Registrar cuenta
                    </Button>
                  </form>
                  {registerErrors.map((error, i) => (
                    <Typography
                      key={i}
                      className="errorregister"
                      color={"error"}
                    >
                      {error}
                    </Typography>
                  ))}
                  <Typography style={{ color: "white", textAlign: "center" }}>
                    ¿Ya tienes una cuenta?
                    <Link className="linkregister" to="/login">
                      {" "}
                      Iniciar sesión
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item className="hero1" xs={12} sm={6}>
              <Box className="backgroundHero1">
                <Box
                  sx={{
                    margin: {
                      xs: "4vh",
                      sm: "5vh",
                      md: "5vh",
                      lg: "5vh",
                      xl: "20vh",
                    },
                    padding: {
                      xs: "4vh",
                      sm: "5vh",
                      md: "5vh",
                      lg: "5vh",
                      xl: "10vh",
                    },
                  }}
                  style={{ backgroundColor: "transparent" }}
                  className="containerItemshero1"
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "2rem",
                        sm: "2rem",
                        md: "3rem",
                        lg: "3rem",
                        xl: "3rem",
                      },
                    }}
                    color={"transparent"}
                  >
                    ¡Texto normal {""}
                    <span style={{ fontWeight: "bold" }}>Texto Resaltado </span>
                    texto normal!
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
