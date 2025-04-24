import React, { useState } from "react";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Hero1 from "../components/Hero1";
import Hero2 from "../components/Hero2";

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
          height: "100vh",
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
        sx={{
          scrollSnapAlign: "start",
          height: "100vh",
        }}
      >
        <Hero2 />
      </Box>
    </Box>
  );
}

export default HomePage;
