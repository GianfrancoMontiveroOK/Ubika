import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Divider,
  Drawer,
  Container,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Link,
} from "@mui/material";

import { Fab } from "@mui/material";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/homepage.css";
import { useNavigate } from "react-router-dom";
import Hero1 from "../components/Hero1";
import Hero2 from "../components/Hero2";
// Componente ShoppingCart

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
  // Datos de ejemplo de itemos
  const navigate = useNavigate();

  const cartbuttonfab = () => {
    navigate("/pay");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        backgroundColor: "#eff0d0",
      }}
    >
      <Box sx={{ scrollSnapAlign: "start" }}>
        <Hero1 />
      </Box>
      <Box sx={{ scrollSnapAlign: "start" }}>
        <Hero2 />
      </Box>
    </Box>
  );
}

export default HomePage;
