import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Fab,
} from "@mui/material";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { useNavigate } from "react-router-dom";

function Catalog({ products, cartItems, setCartItems }) {
  const navigate = useNavigate();

  const handleAddToCart = (id) => {
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
  };
  const cartbuttonfab = () => {
    navigate("/pay");
  };
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Fab
        size="large"
        color="inherit"
        aria-label="whatsapp"
        style={{ position: "fixed", bottom: 20, right: 20 }}
        onClick={cartbuttonfab}
      >
        <LocalGroceryStoreIcon />
        {cartItems.length > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "red",
              borderRadius: "50%",
              padding: "0px 7px",
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            <Typography style={{ color: "white" }}>
              {cartItems.length}
            </Typography>
          </Box>
        )}
      </Fab>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Box
              display="flex"
              justifyContent="center"
              sx={{ padding: "20px" }}
            >
              <Card
                elevation={10}
                style={{ backgroundColor: "#FFE066" }}
                sx={{
                  maxWidth: 300,
                  maxHeight: "100%",
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => handleAddToCart(product.id)}
              >
                <CardMedia
                  sx={{
                    height: 300,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <img
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
                    style={{ color: "#2B4141" }}
                    sx={{
                      fontSize: "1.2rem",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    style={{ color: "#2B4141" }}
                    sx={{
                      fontSize: "1rem",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {product.category}
                  </Typography>
                  <Typography
                    style={{ color: "#2B4141" }}
                    sx={{
                      fontSize: "1rem",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {product.contenidoNeto}
                  </Typography>
                  <Typography
                    style={{ color: "#2B4141" }}
                    sx={{
                      fontSize: "1rem",
                      textAlign: "center",
                      marginTop: "5px",
                    }}
                  >
                    ${product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Catalog;
