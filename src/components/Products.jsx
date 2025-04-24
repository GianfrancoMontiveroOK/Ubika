import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Divider,
} from "@mui/material";

import "../styles/homepage.css";

import products from "../states/productsData";

function Products({
  searchTerm,
  selectedCategory,
  cartItems,
  setCartItems,
}) {
  const filteredProducts = products.filter((product) => {
    // Verifica si el nombre del producto incluye el término de búsqueda
    const nameMatches = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Verifica si la categoría seleccionada es "all" o si coincide con la categoría del producto
    const categoryMatches =
      selectedCategory === "all" ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();

    // Retorna true si todas las condiciones se cumplen
    return nameMatches && categoryMatches;
  });

  const handleCountBuy = (id) => {
    // Encuentra el producto correspondiente al ID
    const productToAdd = products.find((product) => product.id === id);
    // Verifica si el producto ya está en el carrito
    const existingItemIndex = cartItems.findIndex((item) => item.id === id);
    // Si el producto ya está en el carrito, actualiza su cantidad
    if (existingItemIndex !== -1) {
      setCartItems((prevCartItems) => {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingItemIndex].quantity += 1;
        return updatedCartItems;
      });
    } else {
      // Si el producto no está en el carrito, agrégalo
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...productToAdd, quantity: 1 },
      ]);
    }
  };
  return (
    
    <Box className="cardContainer">
      {filteredProducts.map((product) => (
        <Card
          sx={{
            background: "linear-gradient(135deg, #4FA41B, #F4FEC1)", // #####################    PRIMER MAPEO FILTRO DE CATEGORIAS VISTA GENERAL #######################################3
            borderRadius: "10px",
            maxWidth: 300,
            maxHeight: "100%",
            position: "relative",
            borderColor: "white", // Color del borde en focus
            borderWidth: "3px",
            borderStyle: "solid",
          }}
          className="cardProduct"
        >
          <CardMedia
            component="img"
            height="330px"
            image={product.image}
            style={{
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
          <Divider orientation="vertical" flexItem />
          <CardContent style={{ backgroundColor: "transparent" }}>
            <Divider style={{ fontSize: ".7rem", color: "black" }}></Divider>

            <Typography
              sx={{
                fontSize: "1rem",
                textAlign: "center",
                color: "black",
                fontWeight: "bold",
              }}
            >
              {product.name}
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
                fontSize: "0.9rem",
                color: "#666666",
                marginTop: "4vh",
              }}
            >
              Marca: {product.brand}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.9rem",
                color: "#666666",
              }}
            >
              Categoría: {product.category}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.9rem",
                marginBottom: "1vh",
                color: "#666666",
              }}
            >
              Neto: {product.contenidoNeto}
            </Typography>
            <Box>
              {product.tacc && (
                <img
                  alt="Producto con TACC"
                  style={{ width: "40px", height: "40px" }}
                />
              )}
              {product.alcohol && (
                <img
                  alt="Producto con Alcohol"
                  style={{ width: "40px", height: "40px" }}
                />
              )}
            </Box>
          </CardContent>
          <Divider style={{ fontSize: ".7rem", color: "#666666" }}>
            www.VitalVeg.shop
          </Divider>

          <CardActions
            sx={{
              justifyContent: "center",
              backgroundColor: "transparent",
            }}
          >
            <Button
              variant="contained"
              sx={{
                fontSize: "0.8rem",
                color: "#666666",
                backgroundColor: "#FFC800", // Cambio de color de fondo
                borderRadius: "30px",
                fontWeight: "bold",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Sombra suave
                transition: "box-shadow 0.3s ease-in-out", // Animación de transición de la sombra
                "&:hover": {
                  boxShadow: "0px 8px 20px rgba(255, 200, 0, 0.7)",
                  color: "white", // Aumento de la sombra al pasar el mouse
                },
              }}
              onClick={() => handleCountBuy(product.id)}
            >
              + Agregar
            </Button>
            <Typography
              sx={{
                fontSize: "1.2rem",
                color: "#2E8B57",
              }}
            >
              <span style={{ fontWeight: "bold" }}> ${product.price} </span>
            </Typography>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

export default Products;
