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
import "../styles/loginpage.css";
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

  const onSubmit = handleSubmit(async (data) => {
    console.log(loading);
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  // Handler to close the fade and proceed with address update
  const handleCloseFade = () => {
    setShowFade(false);
  };

  return (
    <Grid xs={12} container className="layoutlogin">
      <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box className="containerHomePage">
          <Box className="backgroundlogin">
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
                <CardContent className="cardlogin">
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
                    Ingresá a tu Cuenta
                  </Typography>

                  <form className="formlogin" onSubmit={onSubmit}>
                    <TextField
                      className="itemlogin"
                      {...register("email", { required: true })}
                      variant="filled"
                      label="ejemplo@mail.com"
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                    />
                    {errors.email && (
                      <Typography my={1} color={"error"}>
                        Email is required
                      </Typography>
                    )}
                    <TextField
                      className="itemlogin"
                      {...register("password", { required: true })}
                      variant="filled"
                      label="Ingresa Tu Contraseña"
                      type="password"
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                    />
                    {errors.password && (
                      <Typography variant="body2" color={"error"}>
                        Password is required
                      </Typography>
                    )}
                    <Button
                      className="buttonlogin"
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      {loading ? (
                        <CircularProgress color="inherit" size={24} />
                      ) : (
                        "Iniciar Sesion"
                      )}
                    </Button>
                  </form>
                  {loginErrors.map((error, i) => (
                    <Typography key={i} className="errorlogin" color={"error"}>
                      {error}
                    </Typography>
                  ))}
                  <Typography style={{ color: "white", textAlign: "center" }}>
                    ¿Aún no tienes una cuenta?
                    <Link className="linklogin" to="/register">
                      {" "}
                      Registrarse
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              className="hero1"
              xs={12}
              sm={3}
            >
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
        <Fade in={showFade}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" component="h2">
              ¿Por qué necesitas registrarte?
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Al iniciar sesion o crear una cuenta, puedes acceder a todas
              nuestras funcionalidades, guardar tus preferencias y realizar
              compras de manera más rápida y segura. ¡Regístrate para disfrutar
              de una mejor experiencia!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleCloseFade}
            >
              Entendido
            </Button>
          </Box>
        </Fade>
      </Grid>
    </Grid>
  );
}
