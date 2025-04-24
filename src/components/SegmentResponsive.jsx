import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import cocinando2 from "../images/Botones/botonAventuraActive.svg";
import cocinando3 from "../images/Botones/botonAventuraActive.svg";
import { useNavigate } from "react-router-dom";

function SegmentResponsive() {
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate("/recipe");
  };

  const handleClick2 = () => {
    navigate("/catalog");
  };

  const handleResumeButtonClick = () => {
    const resume = document.getElementById("promos");
    resume.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={12} mb={6} lg={6} xl={6}>
          <Box display="flex" justifyContent={"center"}>
            <Button
              onClick={handleResumeButtonClick}
              variant="contained"
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "2rem",
                  md: "2rem",
                  lg: "2rem",
                  xl: "1.8rem",
                },
                marginTop: {
                  xs: "0vh",
                  sm: "0vh",
                  md: "0vh",
                  lg: "0vh",
                  xl: "5vh",
                },
                opacity: 0,
                animation: "fadeIn 1s ease-out forwards",
                animationDelay: "3s",
                alignItems: "center",
                justifyContent: "center",
                justifyItems: "center",
                alignContent: "center",
              }}
            >
              Ver Promociones 👇
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} mb={6} lg={6} xl={6}>
          <Box
            sx={{
              marginTop: {
                xs: "3vh",
                sm: "3vh",
                md: "3vh",
                lg: "3vh",
                xl: "5vh",
              },
              marginRight: {
                xs: "2vh",
                sm: "2rem",
                md: "2rem",
                lg: "2rem",
                xl: "2rem",
              },
              marginLeft: {
                xs: "2vh",
                sm: "2rem",
                md: "2rem",
                lg: "2rem",
                xl: "2rem",
              },
              opacity: 0,
              animation: "fadeIn 1s ease-out forwards",
              animationDelay: "0.5s",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "48%",
                  opacity: 0,
                  animation: "fadeInMove 1s ease-in forwards",
                  animationDelay: "1.5s",
                }}
                style={{
                  filter: hover1
                    ? "brightness(1.2) grayscale(0.3)"
                    : "brightness(1) grayscale(0)",
                }}
                onMouseOver={() => setHover1(true)}
                onMouseOut={() => setHover1(false)}
                onClick={handleClick1}
              >
                <img
                  src={cocinando2}
                  alt="Descubre VitalVeg"
                  style={{
                    width: "100%",
                    borderRadius: "12px",
                    filter: hover1
                      ? "brightness(1.2) grayscale(0.3)"
                      : "brightness(1) grayscale(0)",
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.5)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: hover1 ? 1 : 0,
                    transition: "opacity 0.3s, transform 0.3s",
                    transform: hover1 ? "translateY(0)" : "translateY(100%)",
                    textAlign: "center",
                    borderRadius: "12px",
                    padding: "1em",
                    boxSizing: "border-box",
                    animation: "fadeInMove 1s ease-in forwards",
                    animationDelay: "2s",
                  }}
                >
                  <div>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "1.4rem",
                          sm: "2rem",
                          md: "2rem",
                          lg: "2rem",
                          xl: "3rem",
                        },
                      }}
                    >
                      Recetas Saludables
                    </Typography>
                  </div>
                </Box>
              </Box>

              <Box
                sx={{
                  position: "relative",
                  width: "48%",
                  opacity: 0,
                  animation: "fadeInMove 1s ease-in forwards",
                  animationDelay: "1.5s",
                }}
                style={{
                  filter: hover2
                    ? "brightness(1.2) grayscale(0.3)"
                    : "brightness(1) grayscale(0)",
                }}
                onMouseOver={() => setHover2(true)}
                onMouseOut={() => setHover2(false)}
                onClick={handleClick2}
              >
                <img
                  src={cocinando3}
                  alt="Descubre VitalVeg"
                  style={{
                    width: "100%",
                    borderRadius: "12px",
                    filter: hover2
                      ? "brightness(1.2) grayscale(0.3)"
                      : "brightness(1) grayscale(0)",
                  }}
                />
                <Box
                  className="overlay1"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.5)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: hover2 ? 1 : 0,
                    transition: "opacity 0.3s, transform 0.3s",
                    transform: hover2 ? "translateY(0)" : "translateY(100%)",
                    textAlign: "center",
                    borderRadius: "12px",
                    padding: "1em",
                    boxSizing: "border-box",
                    animation: "fadeInMove 1s ease-in forwards",
                    animationDelay: "2.5s",
                  }}
                >
                  <div>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "1.4rem",
                          sm: "2rem",
                          md: "2rem",
                          lg: "2rem",
                          xl: "3rem",
                        },
                      }}
                    >
                      Nuestras Productos Veganos
                    </Typography>
                  </div>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default SegmentResponsive;
