import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Dialog,
  DialogContent,
  IconButton,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


// Datos de las recetas
const recipes = [
  {
    title: "Paparella (queso de papa)",
    ingredients:
      "Una papa, un diente de ajo, pimienta negra, sal, comino, cúrcuma, tres cucharadas de aceite de oliva, tres cucharadas de levadura nutricional.",
    instructions:
      "Corta la papa y llévala a hervir junto con el diente de ajo. Cuando esté cocida, retírala y guarda el agua de cocción. Lleva la papa y el diente de ajo a la procesadora o minipimer junto con los condimentos y media taza de agua de cocción. Procesa hasta que quede la textura deseada. Si la quieres más cremosa, agrega un poco más de agua de cocción.",
    image:
      "https://i.pinimg.com/564x/a6/7c/18/a67c18e410a2aa22d3df52d26b3b3346.jpg",
  },
  {
    title: "Queso de maní",
    ingredients:
      "Una taza de maní crudo y pelado, un litro de agua potable, tres cucharadas de fécula de maíz, tres cucharadas de fécula de mandioca, dos cucharadas de vinagre de manzana o jugo de limón, sal pimienta a gusto, dos cucharadas de levadura nutricional (puede ser sabor queso).",
    instructions:
      "Dejar la taza de maní crudo y pelado remojando toda la noche en agua para que se active. Procesar el maní con un litro de agua y filtrarlo como si hicieras leche. Aparte, mezclar la fécula de maíz y la fécula de mandioca con un poco de agua hasta que no tenga grumos, luego incorporarlo a la leche junto con las dos cucharadas de vinagre de manzana o jugo de limón, sal, pimienta a gusto, y la levadura nutricional. Llevar la mezcla a fuego medio hasta que se espese entre 5 y 7 minutos. Retirar del fuego, transferir a un tupper para que tome forma y consistencia, dejar enfriar a temperatura ambiente y luego guardar en la heladera. Después de 3 horas, está listo para disfrutar. Clave 🔒: Si querés que se derrita más al horno, ponle menos fécula de maíz y más fécula de mandioca. Si lo querés más untable, hazlo al revés.",
    image:
      "https://yinyangargentina.com.ar/wp-content/uploads/2022/08/mani-c-cascara-tostado.jpg",
  },
  {
    title: "Cheddar Veg",
    ingredients:
      "Una papa cocida, una taza de calabaza cocida, una zanahoria cocida, tres cucharadas de levadura nutricional, un tercio de taza de aceite (de tu preferencia), sal y pimienta a gusto, media taza de agua.",
    instructions:
      "Lleva todos los ingredientes a una licuadora o minipimer y mezcla bien. Deja reposar en frío durante 30 minutos y estará listo para disfrutar.",
    image:
      "https://i.pinimg.com/564x/3a/85/3f/3a853fd576a08853073dc59fe3cf965d.jpg",
  },
  {
    title: "Ricotta de almendras",
    ingredients:
      "Dos tazas de almendras crudas (previamente remojadas en agua de 6 a 8 horas), 800 ml de agua, sal y pimienta a gusto, dos cucharadas de vinagre de manzana, dos o tres cortezas de limón.",
    instructions:
      "Tritura las almendras con el agua, sal y pimienta. Filtra y lleva la mezcla a una olla a fuego medio, removiendo suavemente para evitar que se pegue. Cocina hasta alcanzar los 90 grados centígrados (unos 15-20 minutos). Agrega el vinagre de manzana y las cortezas de limón, mezclando suavemente. Deja reposar en la olla hasta que esté a temperatura ambiente (aproximadamente una hora). Filtra la mezcla durante 3 horas, retira las cáscaras de limón y pasa a un molde. Refrigera durante 6 horas antes de disfrutar. Para más sabor, puedes combinar con un poco de aceite de oliva y orégano.",
    image:
      "https://acdn.mitiendanube.com/stores/750/800/products/almendras-non-pareil-california-peladas-temple-organico1-f8f1ab5632b562ddd815824311184205-640-0.jpeg",
  },
  {
    title: "Tortillas veganas",
    ingredients:
      "Tres tazas de harina de garbanzo, seis cucharadas de harina de linaza, seis cucharadas de levadura nutricional, dos cucharaditas de polvo de hornear, una cucharadita de cúrcuma, sal, pimienta y comino a gusto.",
    instructions:
      "Mezcla todos los ingredientes y guarda la premezcla para usar en cualquier preparación de tortilla. Para hacer una tortilla de papa, mezcla media taza de premezcla con media taza de agua, revuelve y deja reposar por 5 minutos. Pela dos papas, córtalas en cubitos y fríelas hasta que estén doradas. Agrégalas a la premezcla, junto con media cebolla morada picada si lo deseas. Cocina en una sartén con un poco de aceite de oliva durante 6-7 minutos hasta que esté completamente cocida.",
    image:
      "https://i0.wp.com/beginveganbegun.es/wp-content/uploads/2020/04/tortilla-patatas-vegana-sin-garbanzo-01.jpg?fit=1500%2C1000&ssl=1",
  },
];

// Transición de apertura para el diálogo
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RecipePage = () => {
  const [open, setOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleClickOpen = (recipe) => {
    setSelectedRecipe(recipe);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      {/* Título de la página */}
      <Typography variant="h3" gutterBottom align="center">
        Recetas{" "}
        <span
          style={{
            fontWeight: "bold",
            fontFamily: "'Segoe Script', Arial, sans-serif",
            color: "#4FA41B ",
          }}
        >
          Vital Veg
        </span>{" "}
      </Typography>

      {/* Contenedor de recetas */}
      <Grid container spacing={4}>
        {recipes.map((recipe, index) => (
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "300px",
            }}
            style={{ width: "300px" }}
            item
            xs={12}
            md={6}
            lg={4}
            xl={2}
            key={index}
          >
            <Card
              style={{
                backgroundColor: "#f0f0d4",
                width: "300px",
                height: "400px",
              }}
              onClick={() => handleClickOpen(recipe)}
              sx={{ cursor: "pointer" }}
            >
              <CardMedia
                style={{
                  backgroundImage: `url(${recipe.image})`, // Asegúrate de que la URL de la imagen esté correctamente formateada
                  backgroundPosition: "center",
                  width: "100%", // Ajusta el ancho completo
                  height: "200px", // Define una altura predeterminada
                }}
              ></CardMedia>
              <CardContent>
                <Typography
                  style={{ color: "#8B4513" }}
                  variant="h5"
                  gutterBottom
                >
                  {recipe.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {recipe.ingredients}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal para mostrar la receta en detalle */}
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          {selectedRecipe && (
            <>
              <Typography variant="h4" gutterBottom>
                {selectedRecipe.title}
              </Typography>
              <CardMedia
                component="img"
                height="200"
                image={selectedRecipe.image}
                alt={selectedRecipe.title}
                sx={{ marginBottom: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                Ingredientes
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedRecipe.ingredients}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Instrucciones
              </Typography>
              <Typography variant="body1">
                {selectedRecipe.instructions}
              </Typography>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default RecipePage;
