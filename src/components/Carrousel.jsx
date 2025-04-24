import React, { useState } from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import products from "../states/productsData";
import buyEffect from "../sound/buyEffect.mp3";
import { useSound } from "use-sound";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import caja1png from "../images/FeedIG/caja33_11zon.webp";

function Carrousel({ cartItems, setCartItems }) {
  const [play] = useSound(buyEffect);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationData, setAnimationData] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1536 }, items: 3 },
    desktop: { breakpoint: { max: 1536, min: 1024 }, items: 2 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const handleAnimationStart = () => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };
  const handleCountBuy = (id, e) => {
    if (isAnimating) return;
    const productToAdd = products.find((product) => product.id === id);
    const existingItemIndex = cartItems.findIndex((item) => item.id === id);

    if (existingItemIndex !== -1) {
      setCartItems((prevCartItems) => {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingItemIndex].quantity += 1;
        return updatedCartItems;
      });
    } else {
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...productToAdd, quantity: 1 },
      ]);
    }

    // Captura la posición y tamaño del ítem clicado
    const rect = e.currentTarget.getBoundingClientRect();
    setAnimationData({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });

    // Activa la animación
    setIsAnimating(true);
    play();

    // Desactiva la animación después de 1 segundo
  };

  return (
    <Box id="promos" >
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        containerClass="carousel-container"
        showDots={false}
        arrows={false}
        renderButtonGroupOutside={false}
        ssr={true}
        swipeable={true}
        draggable={true}
        shouldResetAutoplay={true}
        focusOnSelect={false}
      >
        {products.map((product) => (
          <Box
            display={"flex"}
            justifyContent={"center"}
            key={product.id}
            sx={{ paddingTop: "30px", paddingBottom: "30px" }}
          >
            <Card
              elevation={0}
              style={{ backgroundColor: "transparent" }}
              sx={{
                maxWidth: {
                  xs: 300,
                  sm: 300,
                  md: 400,
                  lg: 300,
                  xl: 300,
                },
                maxHeight: "100%",
                position: "relative",
              }}
              className="cardProduct"
              onClick={(e) => handleCountBuy(product.id, e)}
            >
              <CardMedia
                sx={{
                  height: {
                    xs: 300,
                    sm: 300,
                    md: 400,
                    lg: 300,
                    xl: 400,
                  },
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                {isAnimating &&
                  createPortal(
                    <motion.div
                      initial={{
                        scale: 0.6,
                      }}
                      animate={{
                        scale: 0.3,
                        x: window.innerWidth - animationData.width - 20,
                        y: window.innerHeight - animationData.height - 20,
                        opacity: 0,
                      }}
                      transition={{
                        delay: 0.3,
                        duration: isAnimating ? 1.2 : 0.5, // Aumenta la duración si ya está animando
                        ease: [0.4, 0.0, 0.2, 1.3],
                      }}
                      style={{
                        willChange: "transform",
                        width: animationData.width,
                        height: animationData.height,
                        backgroundImage: `url(${caja1png})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "fixed",
                        top: animationData.y,
                        left: animationData.x,
                        transform: "translate(-50%, -50%)",
                      }}
                      onAnimationStart={handleAnimationStart}
                      onAnimationComplete={handleAnimationComplete}
                    />,
                    document.body
                  )}
                <img
                  className="imgproduct"
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </CardMedia>

              <CardContent style={{ backgroundColor: "transparent" }}>
                <Typography
                  style={{ color: "white" }}
                  sx={{
                    fontSize: "1.2rem",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {product.name}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}

export default Carrousel;
