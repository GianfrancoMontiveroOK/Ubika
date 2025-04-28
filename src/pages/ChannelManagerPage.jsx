import React, { useState } from "react";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import HeroChannel1 from "../components/HeroChannel1";
import HeroChannel2 from "../components/HeroChannel2";

function ChannelManagerPage({}) {
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
        <HeroChannel1 />
      </Box>
      {/* Sección 2 - Hero2 */}
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
        <HeroChannel2 />
      </Box>
    </Box>
  );
}

export default ChannelManagerPage;
