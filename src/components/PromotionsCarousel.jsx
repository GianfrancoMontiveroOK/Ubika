import React from "react";
import { Box, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import { useNavigate } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import escuela1 from "../images/escuela1.jpg";
import escuela2 from "../images/escuela2.jpg";
import logoescuela from "../images/logoescuela.jpg";

function PromotionsCarousel() {
  const navigate = useNavigate();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1536 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1536, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleClick = () => {
    navigate("/Catuel");
  };

  return (
    <Box sx={{ width: "100%", height: "auto" }}>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        showDots={false}
        arrows={true}
        renderButtonGroupOutside={false}
        ssr={true}
        swipeable={true}
        draggable={true}
        shouldResetAutoplay={false}
        focusOnSelect={false}
      >
        <Box
          sx={{
            width: "100%",
            height: "400px",
            position: "relative",
            "&:hover": {
              cursor: "pointer",
              filter: "brightness(0.8)",
            },
          }}
          onClick={handleClick}
        >
          <img
            src={escuela1}
            alt="Promoción 2"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "400px",
            position: "relative",
            "&:hover": {
              cursor: "pointer",
              filter: "brightness(0.8)",
            },
          }}
          onClick={handleClick}
        >
          <img
            src={escuela2}
            alt="Promoción 3"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "400px",
            position: "relative",
            "&:hover": {
              cursor: "pointer",
              filter: "brightness(0.8)",
            },
          }}
          onClick={handleClick}
        >
          <img
            src={logoescuela}
            alt="Promoción 4"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      </Carousel>
    </Box>
  );
}

export default PromotionsCarousel;
