import React, { useState } from "react";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Hero1 from "../components/Hero1";
import Hero2 from "../components/Hero2";
import Hero3 from "../components/Hero3";
import Hero4 from "../components/Hero4";
import Footer from "../components/Footer";

function HomePage({
  products,
  searchbarVisible,
  setDrawerOpenCart,
  drawerOpenCart,
  checkedTACC,
  setCheckedTACC,
  checkedGluten,
  setCheckedGluten,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  cartItems,
  setCartItems,
  play,
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationData, setAnimationData] = useState({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
      }}
    >
      {/* Sección 1 - Hero1 */}
      <Box
        sx={(theme) => ({
          scrollSnapAlign: "start",
          height: "70vh",
          [theme.customBreakpoints.mobileShort]: {
            height: "100vh", // iPhone SE u otros móviles bajos
          },
          [theme.customBreakpoints.mobileTall]: {
            height: "70vh", // iPhone 14 o móviles altos
          },
        })}
      >
        <Hero1 />
      </Box>

      {/* Sección 2 - Hero2 */}
      <Box
        sx={(theme) => ({
          scrollSnapAlign: "start",
          height: "100vh",
          [theme.customBreakpoints.mobileShort]: {
            height: "100vh", // iPhone SE u otros móviles bajos
          },
          [theme.customBreakpoints.mobileTall]: {
            height: "70vh", // iPhone 14 o móviles altos
          },
        })}
      >
        <Hero2 />
      </Box>

      {/* Sección 3 - Hero3 */}
      <Box
        sx={(theme) => ({
          scrollSnapAlign: "start",
          height: "100vh",
          overflow: "hidden",
          [theme.breakpoints.down("md")]: {
            overflow: "hidden", // Sigue ocultando en pantallas chicas
          },
        })}
      >
        <Box
          sx={(theme) => ({
            height: "100%",
            overflowY: "visible", // Visible por defecto (computadoras)
            [theme.breakpoints.down("md")]: {
              overflowY: "100%", // Solo en móviles permitir scroll interno
            },
          })}
        >
          <Hero3 />
        </Box>
      </Box>

      {/* Sección 4 - Hero4 */}

      <Box
        sx={{
          scrollSnapAlign: "start",
        }}
      >
        <Hero4 />
      </Box>
      <Box
        sx={{
          scrollSnapAlign: "start",
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}

export default HomePage;
