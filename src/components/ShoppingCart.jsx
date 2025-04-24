import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Divider,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Backdrop,
  Modal,
  Fade,
} from "@mui/material";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import "../styles/homepage.css";
import products from "../states/productsData";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ShoppingCart({
  checkedTACC,
  setCheckedTACC,
  checkedAlcohol,
  setCheckedAlcohol,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  cartItems,
  setCartItems,
  drawerOpen,
  setDrawerOpen,
  play,
}) {
  const [backdropText, setBackdropText] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const groupedItems = cartItems.reduce((acc, item) => {
    if (acc[item.id]) {
      acc[item.id].quantity += item.quantity;
    } else {
      acc[item.id] = { ...item };
    }
    return acc;
  }, {});

  // Calcular el total del carrito
  const calculateTotal = () => {
    return Object.values(groupedItems)
      .reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleCountBuyNeg = (id) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === id);

    if (existingItemIndex !== -1) {
      setCartItems((prevCartItems) => {
        const updatedCartItems = [...prevCartItems];
        if (updatedCartItems[existingItemIndex].quantity > 1) {
          updatedCartItems[existingItemIndex].quantity -= 1;
        } else {
          updatedCartItems.splice(existingItemIndex, 1);
        }
        return updatedCartItems;
      });
    }
    play();
  };

  const handleCountBuyPos = (id) => {
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
    play();
  };

  const handlepay = () => {
  
    // Verifica si el usuario está autenticado
    if (!isAuthenticated) {
      // Si no está autenticado, redirige a la página de inicio de sesión
      navigate('/login');
      return;
    }
  
    // Si está autenticado, abre el backdrop
    handleBackdrop();
    setOpenBackdrop(true);
  };

  const handleBackdrop = () => {
    setBackdropText(`${user.address}`);
  };

  function handleCancelPay() {
    // Lógica para cancelar el pago
  }

  function handleConfirmPay() {
    navigate("/pay", { state: { total: calculateTotal(), products: groupedItems } });
  }
 
  return (
    <div>
      <Backdrop open={openBackdrop} onClick={handleCancelPay}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openBackdrop}
          onClose={handleCancelPay}
          closeAfterTransition
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Fade in={openBackdrop}>
            <div
              style={{
                backgroundColor: "#fff",
                padding: "3vh",
                width: "50%",
                borderRadius: "10px",
                outline: "none",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <h2 id="transition-modal-title">Confirmar Direccion De Envio</h2>
              <p id="transition-modal-description">
                ¿Esta es la direccion de envio?{" "}
              </p>
              <p id="transition-modal-description">
                Recuerda que solo se hacen envios dentro de PINAMAR{" "}
              </p>
              <p
                style={{ fontWeight: "bold" }}
                id="transition-modal-description"
              >
                {backdropText}
              </p>
              <Button
                style={{ margin: "2vh" }}
                onClick={handleConfirmPay}
                variant="contained"
              >
                Confirmar
              </Button>
              <Button
                color="warning"
                onClick={handleCancelPay}
                variant="outlined"
              >
                <Typography style={{ fontSize: "0.8rem" }}>
                  Cambiar direccion de envio
                </Typography>
              </Button>
            </div>
          </Fade>
        </Modal>
      </Backdrop>
      <Box>
        {Object.values(groupedItems).map((item, index) => (
          <Box key={index} textAlign={"center"}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #5CB85C, #FFFFFF)",
                borderRadius: "10px",
                maxWidth: "100%",
                maxHeight: "100%",
                position: "relative",
              }}
              className="carditem"
            >
              <CardMedia
                component="img"
                height="200px"
                image={item.image}
                style={{
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
              <Divider orientation="vertical" flexItem />
              <CardContent style={{ backgroundColor: "transparent" }}>
                <Divider
                  style={{ fontSize: ".7rem", color: "black" }}
                ></Divider>

                <Typography
                  sx={{
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1rem",
                      md: "1.5rem",
                      lg: "1.5rem",
                      xl: "1.5rem",
                    },
                    textAlign: "center",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {item.name}
                </Typography>
                <Divider
                  style={{
                    fontWeight: "bold",
                    fontSize: ".9rem",
                    color: "black",
                  }}
                ></Divider>

                <Typography
                  sx={{
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1rem",
                      md: "1.5rem",
                      lg: "1.5rem",
                      xl: "1.5rem",
                    },
                    color: "#666666",
                    marginTop: "1vh",
                  }}
                >
                  Marca: {item.brand}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1rem",
                      md: "1.5rem",
                      lg: "1.5rem",
                      xl: "1.5rem",
                    },
                    color: "#666666",
                    marginTop: "1vh",
                  }}
                >
                  Cantidad: {item.quantity}
                </Typography>
              </CardContent>
              <Divider style={{ fontSize: ".7rem", color: "#666666" }}>
                www.loloonline.com
              </Divider>

              <CardActions
                sx={{
                  justifyContent: "center",
                  backgroundColor: "transparent",
                }}
              >
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ margin: "1vh" }}
                  onClick={() => handleCountBuyNeg(item.id)}
                >
                  -1
                </Button>
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    color: "#2E8B57",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>
                    {" "}
                    ${item.price * item.quantity}{" "}
                  </span>
                </Typography>
                <Button
                  variant="contained"
                  sx={{ margin: "1vh" }}
                  onClick={() => handleCountBuyPos(item.id)}
                >
                  +1
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
        <Box display={"flex"} sx={{ justifyContent:"space-between", textAlign: "center", boxShadow: "1vh" }}>
          <Typography
            sx={{
              marginTop: {
                xs: "3vh",
              },
              marginBottom: {
                xs: "3vh",
              },
              fontWeight: "bold",

              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
                md: "1.5rem",
                lg: "1.5rem",
                xl: "1.5rem",
              },
            }}
            textAlign={"center"}
          >
            Total: ${calculateTotal()}
          </Typography>
          <Button
            sx={{ marginBottom: "2.5vh", marginTop:"2.5vh" }}
            style={{ fontSize: "1rem" }}
            variant="contained"
            color="primary"
            onClick={handlepay}
          >
            Pagar
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default ShoppingCart;
