import React, { useEffect, useState } from "react";
import "../styles/Overlay.css"; // Asegúrate de tener este archivo CSS para el overlay
import { Box, Button, Typography } from "@mui/material";

const Overlay = ({ isVisible, targetRef, setIsVisible }) => {
  const [circlePosition, setCirclePosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isVisible && targetRef.current) {
      // Obtener la posición del elemento objetivo
      const rect = targetRef.current.getBoundingClientRect();
      setCirclePosition({
        top: rect.top + window.scrollY + rect.height / 2, // Centrar verticalmente
        left: rect.left + window.scrollX + rect.width / 2, // Centrar horizontalmente
      });
    }
  }, [isVisible, targetRef]);

  const handleClose = () => {
    setIsVisible(false); // Cambiar el estado de visibilidad
  };

  return (
    <>
      {isVisible && (
        <div className="overlay">
          <Box paddingTop={"10vh"} textAlign={"center"}>
            <Button color="white" sx={{ fontSize: "1.3rem" }}>
              Agrega Gente A Las Habitaciones Que Deseas Ocupar{" "}
            </Button>
          </Box>
          <Box
            onClick={handleClose} // Usa el manejador de cierre aquí
            className="overlay-content"
          >
            <div
              onClick={handleClose} // Usa el manejador de cierre aquí
              className="circle"
              style={{
                top: circlePosition.top,
                left: circlePosition.left,
              }}
            />
            <Box>
              <Button
                onClick={handleClose} // Usa el manejador de cierre aquí
                sx={{
                  fontSize: "2rem",
                  paddingLeft: "10vh",
                  paddingRight: "10vh",
                }}
              >
                Ok
              </Button>
            </Box>
          </Box>
        </div>
      )}
    </>
  );
};

export default Overlay;
