import React from "react";
import { Box } from "@mui/material";
import HeroChannel1 from "../components/HeroChannel1";
import HeroChannel2 from "../components/HeroChannel2";
import HeroChannel3 from "../components/HeroChannel3";
import Footer from "../components/Footer";

function ChannelManagerPage() {
  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
      }}
    >
      {/* Sección 1 - HeroChannel1 */}
      <Box
        sx={{
          scrollSnapAlign: "start",
          height: "100vh",
          minHeight: "100vh",
          overflow: "hidden", // 👈 Evita que se solape
          position: "relative",
          zIndex: 1, // 👈 Asegura la superposición correcta
        }}
      >
        <HeroChannel1 />
      </Box>

      {/* Sección 2 - HeroChannel2 */}
      <Box
        sx={{
          scrollSnapAlign: "start",
          height: {
            xs: "auto",
            sm: "auto",
            md: "100vh",
            lg: "100vh",
            xl: "100vh",
          },
          minHeight: "100vh",
          overflow: "auto",
          position: "relative",
          zIndex: 1,
          mt: 0, // 👈 Evita saltos
        }}
      >
        <HeroChannel2 />
      </Box>

      {/* Sección 3 - HeroChannel3 */}
      <Box
        sx={{
          scrollSnapAlign: "start",
          height: {
            xs: "auto",
            sm: "auto",
            md: "100vh",
            lg: "100vh",
            xl: "100vh",
          },
          minHeight: "100vh",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
          mt: 0, // 👈 Evita saltos
        }}
      >
        <HeroChannel3 />
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

export default ChannelManagerPage;
