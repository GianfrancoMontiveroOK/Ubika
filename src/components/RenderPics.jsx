import React from "react";
import { Box, Divider } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import IMG1 from "../images/FeedIG/1.png";
import IMG2 from "../images/FeedIG/2.png";
import IMG3 from "../images/FeedIG/3.png";

function RenderPics() {
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

  return (
    <Box sx={{ marginTop: "5vh", marginBottom: "5vh" }}>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={6000}
        keyBoardControl={true}
        showDots={false}
        arrows={false}
        renderButtonGroupOutside={false}
        ssr={true}
        animationDuration={300}
        customTransition="transform 2000ms ease-in-out"
        swipeable={true}
        draggable={true}
        shouldResetAutoplay={false}
        focusOnSelect={false}
      >
        <Box>
          <img src={IMG1} style={{ maxWidth: "100%" }} />
        </Box>
        <Box>
          <img src={IMG2} style={{ maxWidth: "100%" }} />
        </Box>
        <Box>
          <img src={IMG3} style={{ maxWidth: "100%" }} />
        </Box>
        <Box>
          <img src={IMG4} style={{ maxWidth: "100%" }} />
        </Box>
        <Box>
          <img src={IMG5} style={{ maxWidth: "100%" }} />
        </Box>
        <Box>
          <img src={IMG6} style={{ maxWidth: "100%" }} />
        </Box>
      </Carousel>
      <Divider sx={{ margin: "2rem 0", backgroundColor: "white" }} />
    </Box>
  );
}

export default RenderPics;
