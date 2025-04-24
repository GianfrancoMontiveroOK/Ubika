import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
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
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import products from "../states/productsData";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StoreIcon from "@mui/icons-material/Store";
import LogoTacc from "../images/LogoTacc.svg";
import vegganlogo from "../images/FeedIG/veganlogo.png";
import logomp from "../images/FeedIG/logompsvgg.png";

function PayPage({
  setAddress,
  address,
  cartItems,
  setCartItems,
  editingAddress,
  setEditingAddress,
}) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openBackdropDel, setOpenBackdropDel] = useState(false);
  const [openBackdropRet, setOpenBackdropRet] = useState(false);
  const { isAuthenticated, recharge, generateOrderRL, updateaddress, user } =
    useAuth();
  const navigate = useNavigate();
 const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1536 }, items: 3 },
    desktop: { breakpoint: { max: 1536, min: 1024 }, items: 2 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };
  // Agrupa los ítems del carrito
  const groupedItems = cartItems.reduce((acc, item) => {
    if (acc[item.id]) {
      acc[item.id].quantity += item.quantity;
    } else {
      acc[item.id] = { ...item };
    }
    return acc;
  }, {});

  // Inicializa MercadoPago SDK
  useEffect(() => {
    initMercadoPago("APP_USR-7d064401-2a7c-49c9-9a43-4718e9fbf1e5", {
      locale: "es-AR",
    });
  }, []);

  // Calcular el total del carrito
  const calculateTotal = () => {
    return Object.values(groupedItems)
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };
  const changeAddress = () => {
    updateaddress(address);
  };
  const handleWhatsAppClick = () => {
    // Reemplaza 'tu-enlace-de-whatsapp' con el enlace real de WhatsApp
    window.location.href = "https://wa.me/message/FIS5AUGAHMJPO1";
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
  };
  const greeting = user
    ? `Hola ${user.username || ""} ${user.lastname || ""},`
    : "Hola,";
  const handleCountBuyPos = (id) => {
    const itemToAdd = products.find((item) => item.id === id);
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
        { ...itemToAdd, quantity: 1 },
      ]);
    }
  };

  const handlepayDel = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setOpenBackdropDel(true);
  };

  const handlepayRet = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setOpenBackdropRet(true);
  };
  const handlecatalog = () => {
    navigate("/catalog");
    return;
  };

  const handleOrder = async () => {
    try {
      // Verificar si el usuario está autenticado
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }

      // Log para verificar el estado del usuario
      console.log("User object:", user);

      // Asegurarse de que el user y user.id estén disponibles antes de usarlos
      if (!user || !user.id) {
        throw new Error("User ID is not available");
      }

      console.log("User ID:", user.id); // Confirmar que user.id está disponible

      // Verificar que cartItems no esté vacío
      if (!groupedItems || groupedItems.length === 0) {
        throw new Error("Cart is empty");
      }

      // Llamar a generateOrderRL con user.id y cartItems
      await generateOrderRL({ items: groupedItems });

      // Mostrar el snackbar y cerrar el backdrop después de una orden exitosa
      setOpenSnackbar(true);
      setOpenBackdropRet(false);
    } catch (error) {
      console.error("Error handling order:", error.message);
      // Manejo adicional del error si es necesario, como mostrar un mensaje al usuario
      // Ejemplo: setErrorMessage(error.message);
    }
  };

  function handleCancelPay() {
    setOpenBackdropDel(false);
    setOpenBackdropRet(false);
  }
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleOrderMP = async () => {
    try {
      // Verificar autenticación
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }
      console.log(groupedItems);
      // Asegurarse de que el user.id esté disponible
      if (!user || !user.id) {
        throw new Error("User ID is not available");
      }

      // Calcular el precio y obtener el ID de preferencia
      const price = calculateTotal(cartItems);
      const preference_id = await recharge({ price, items: groupedItems });
      console.log(preference_id);
      // Redirigir al usuario a la página de pago (descomentado si se necesita)
      const paymentUrl = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference_id=${preference_id}`;
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Error handling order:", error.message);
      // Mostrar un mensaje al usuario o tomar alguna otra acción
      alert(
        "Hubo un problema procesando tu pedido. Por favor, intenta nuevamente."
      );
    }
  };

  return (
    <Box style={{ backgroundColor: "#FFE066" }} className="container" p={2}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          ¡Tu pedido se tomó con éxito! Nos comunicaremos al número registrado
          con tu cuenta: {user.phoneNumber}.
        </Alert>
      </Snackbar>
      <Grid container >
        {/* Bloque de ítems */}
        <Grid
          style={{ justifyContent: "center" }}
          item
          display={{ xs: "none", md: "flex" }}
          md={7}
          lg={7}
          xl={7}
        >
          {Object.values(groupedItems).map((item) => (
            <Box
              display={"flex"}
              justifyContent={"center"}
              key={item.id}
              sx={{ paddingTop: "30px", paddingBottom: "30px" }}
            >
              <Card
                elevation={24}
                sx={{
                  background: "transparent",
                  maxWidth: {
                    xs: 300,
                    sm: 300,
                    md: 400,
                    lg: 300,
                    xl: 500,
                  },
                  maxHeight: "100%",
                  position: "relative",
                }}
                className="carditem"
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: {
                      xs: 300,
                      sm: 300,
                      md: 400,
                      lg: 300,
                      xl: 500,
                    },
                  }}
                  image={item.image}
                  style={{
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />

                <CardContent style={{ backgroundColor: "transparent" }}>
                  <Divider
                    style={{ fontSize: ".7rem", color: "black" }}
                  ></Divider>

                  <Typography
                    sx={{
                      fontSize: "1rem",
                      textAlign: "center",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Divider
                    style={{ fontSize: ".7rem", color: "black" }}
                  ></Divider>
                  <Box>
                    {item.tacc && (
                      <img
                        src={LogoTacc}
                        alt="itemo con TACC"
                        style={{ width: "40px", height: "40px" }}
                      />
                    )}
                    {item.Veggie && (
                      <img
                        src={vegganlogo}
                        style={{ width: "40px", height: "40px" }}
                      />
                    )}
                  </Box>
                </CardContent>

                <CardActions
                  sx={{
                    justifyContent: "center",
                    backgroundColor: "transparent",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      color: "black",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}> ${item.price} </span>
                  </Typography>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Grid>

        {/* Bloque de resumen y total */}
        <Grid style={{ justifyContent: "center" }} item xs={12} md={3}>
          <Box
            sx={{
              backgroundColor: "#fff",
              border: "2px solid #ddd",
              borderRadius: "10px",
              boxShadow: 10,
              p: 2,
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: {
                  xs: "1.2rem",
                  sm: "1.4rem",
                  md: "1.6rem",
                  lg: "1.8rem",
                  xl: "2rem",
                },
                mb: 2,
              }}
            >
              Resumen de Compra
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {Object.keys(groupedItems).length > 0 ? (
              Object.values(groupedItems).map((item, index) => (
                <Box flexDirection={"column"} key={index} sx={{ mb: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      fontSize: {
                        xs: "0.9rem",
                        sm: "1rem",
                        md: "1.1rem",
                        lg: "1.2rem",
                        xl: "1.3rem",
                      },
                    }}
                  >
                    {item.name} (X2)
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      fontSize: {
                        xs: "0.9rem",
                        sm: "1rem",
                        md: "1.1rem",
                        lg: "1.2rem",
                        xl: "1.3rem",
                      },
                    }}
                  >
                    X {item.quantity}
                  </Typography>

                  <Box justifyContent={"center"} display={"flex"}>
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
                        fontSize: "1.4rem",
                        color: "#2E8B57",
                        ml: 3,
                        mr: 3,
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
                  </Box>
                  <Divider sx={{ mt: 1, mb: 1 }} />
                </Box>
              ))
            ) : (
              <Box>
                <Typography color="textSecondary">
                  No hay ítems en el carrito.
                </Typography>
                <Button sx={{ mb: 2, mt: 3 }} variant="outlined">
                  Volver al Catalogo
                </Button>
              </Box>
            )}

            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mt: 2,
                mb: 2,
              }}
            >
              Total: ${calculateTotal()}
            </Typography>
            <Box
              sx={{ mt: 2, mb: 2 }}
              display={"flex"}
              flexDirection={"column"}
            >
              <Button variant="outlined" onClick={handlecatalog}>
                Volver al Catalogo
              </Button>
              <Button
                sx={{ mt: 2, mb: 2 }}
                variant="contained"
                color="primary"
                startIcon={<StoreIcon />}
                onClick={handlepayRet}
              >
                Retiro en Local
              </Button>
              <Button
                disabled
                variant="contained"
                color="primary"
                onClick={handlepayDel}
                startIcon={<LocalShippingIcon />}
              >
                Delivery (Proximamente)
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Modal de confirmación */}
      <Modal
        open={openBackdropDel}
        onClose={() => setOpenBackdropDel(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openBackdropDel}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" component="h2">
              ¿Desea confirmar el pago?
            </Typography>
            <Typography sx={{ mt: 2 }}>
              {editingAddress ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  value={address} // Use a temporary state for the address
                  onChange={(e) => setAddress(e.target.value)}
                  onBlur={() => {
                    setAddress(address); // Update address on blur
                    setEditingAddress(false);
                  }}
                  autoFocus
                />
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      Vamos a enviar el pedido a:
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography>
                        {" "}
                        {user ? user.address : "Dirección no disponible"}
                      </Typography>
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={() => setEditingAddress(true)}
                      >
                        ✏️
                      </Button>
                    </Box>
                  </Box>
                </>
              )}
            </Typography>
            {!editingAddress ? (
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mr: 2 }}
                  onClick={handleCancelPay}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    // Llama a la función onSubmit pasando los valores requeridos.
                    handleOrderMP();
                    setEditingAddress(false); // Esto cierra el formulario de edición de dirección, si es necesario.
                  }}
                >
                  Confirmar Compra
                </Button>
              </Box>
            ) : (
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mr: 2 }}
                  onClick={() => {
                    setEditingAddress(false);
                    setAddress(user.address); // Restaurar la dirección original si se cancela
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    changeAddress(address); // Cambiar la dirección con el nuevo valor
                    setEditingAddress(false);
                  }}
                >
                  Cambiar Direccion
                </Button>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
      <Modal
        open={openBackdropRet}
        onClose={() => setOpenBackdropRet(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openBackdropRet}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="body1" component="p">
              {greeting}
              <br />
              <br />
              ¿Está listo para confirmar su pedido en VitalVeg? Puede elegir
              entre:
              <ul>
                <li>
                  <strong>Pagar ahora</strong> mediante MercadoPago para una
                  transacción rápida y segura.
                </li>
                <li>
                  <strong>Pagar en el local</strong> cuando retire su pedido.
                </li>
              </ul>
              Verifique los detalles y elija la opción que prefiera.
              <br />
              Si necesita ayuda, no dude en{" "}
              <span
                style={{
                  color: "#00A3E0",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={handleWhatsAppClick}
              >
                contactarnos
              </span>
              por WhatsApp.
              <br />
              <br />
              Gracias por confiar en VitalVeg.
            </Typography>
            <Box display={"flex"} flexDirection={"column"} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="mp"
                onClick={() => {
                  // Llama a la función onSubmit pasando los valores requeridos.
                  handleOrderMP();
                  setEditingAddress(false); // Cierra el formulario de edición de dirección, si es necesario.
                }}
              >
                <img
                  style={{ width: "70px", height: "70px" }}
                  src={logomp}
                  alt=""
                />
                <Typography style={{ color: "white" }} sx={{ ml: 2 }}>
                  Mercado Pago
                </Typography>
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={() => {
                  handleOrder();

                  setEditingAddress(false); // Cierra el formulario de edición de dirección, si es necesario.
                }}
              >
                <Typography style={{ color: "white" }} sx={{ ml: 3 }}>
                  Pagar al retirar
                </Typography>
              </Button>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 3 }}
                onClick={() => {
                  handleCancelPay();
                }}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

export default PayPage;
