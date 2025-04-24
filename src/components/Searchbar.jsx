import {
  Box,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Divider,
  Drawer,
  Container,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import FilterListIcon from "@mui/icons-material/FilterList";
import CheckIcon from "@mui/icons-material/Check";

function Searchbar({
  checkedTACC,
  setCheckedTACC,
  checkedGluten,
  setCheckedGluten,
  products,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  cartItems,
  setCartItems,
  play,
}) {
  const categories = [
    { label: "None", value: "none" },
    { label: "Todo", value: "all" }, // Opción "Todo" especial
    { label: "Medallones Veggies", value: "MedallonesVeggies" },
    { label: "Tartas Veggies", value: "TartasVeggies" },
    { label: "Empanadas Veggies", value: "EmpanadasVeggies" },
  ];
  // Función para manejar cambios en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedCategory("all");
  };

  const handleTACCChange = (event) => {
    setCheckedTACC(event.target.checked);
  };

  const handleGlutenChange = (event) => {
    setCheckedGluten(event.target.checked);
  };
  
  // Función para manejar la selección de categoría
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  return (
    <div>
      <Box
        sx={{
          paddingTop: "10px",
          paddingBottom: "10px",
          paddingLeft: "20px",
          paddingRight: "20px",
          backgroundColor: "#FFE066", // Fondo suave verde claro
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <InputBase
          className="imputbase"
          style={{ backgroundColor: "#F8F4F9" }}
          sx={{
            padding: "10px 20px",
            width: "100%",
            "&::placeholder": {
              color: "#2B4141", // Color del placeholder
              opacity: 1, // Opacidad del placeholder
            },
            "& .MuiInputBase-input": {
              color: "#2B4141", // Color del texto del input
            },

            "&:hover": {
              backgroundColor: "#4FA41B", // Fondo en hover
            },
            "&.Mui-focused": {
              backgroundColor: "#4FA41B", // Fondo blanco en focus
              borderColor: "#4FA41B", // Color del borde en focus
              borderWidth: "1px",
              borderStyle: "solid",
            },
          }}
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          id="fullWidth"
          inputProps={{
            style: { color: "#2B4141" },
            placeholder: "Buscar productos...", // Alternativa para asegurar el placeholder
          }}
          InputLabelProps={{
            style: { color: "#2B4141" },
          }}
        />
        <FormControl
          size="small"
          variant="outlined"
          sx={{
            m: 1,
            minWidth: "20%",
            "& .MuiInputBase-root": {
              backgroundColor: "#FFE066",
            },
            "& .Mui-focused .MuiInputLabel-root": {
              color: "#4FA41B",
            },
            "& .MuiSelect-icon": {
              color: "#2B4141 ",
            },
          }}
        >
          <Select
            value={selectedCategory || ""}
            onChange={(event) => handleCategorySelect(event.target.value)}
            inputProps={{
              name: "category",
              id: "category-selector",
            }}
            sx={{
              borderColor: "#2B4141",
              color: "#2B4141",
              "& .MuiSelect-select": {
                backgroundColor: "#F8F4F9",
              },
            }}
          >
            {categories.map((category) => (
              <MenuItem
                key={category.value}
                value={category.value}
                sx={{
                  display: category.value === "none" ? "none" : "flex",
                  justifyContent: "space-between",
                  "&.Mui-selected": {
                    backgroundColor: "#4FA41B",
                    
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "#1C5D3A",
                  },
                }}
              >
                {category.value === "none" ? (
                  <Box display={"flex"}>
                    <FilterListIcon
                      sx={{ color: "#2B4141", marginRight: "5px" }}
                    />
                    <Typography sx={{ display: { xs: "none", sm: "block" } }}>
                      Categorias
                    </Typography>
                  </Box>
                ) : (
                  <>
                    {category.label}
                    {selectedCategory === category.value && (
                      <CheckIcon fontSize="small" />
                    )}
                  </>
                )}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          paddingLeft: "30px",
          paddingRight: "20px",
          backgroundColor: "#FFE066", // Fondo suave verde claro
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox checked={checkedTACC} onChange={handleTACCChange} />
            }
            label=" Sin TACC"
          />
          <Divider
            sx={{ marginRight: "1vh" }}
            orientation="vertical"
            variant="middle"
            flexItem
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedGluten}
                onChange={handleGlutenChange}
              />
            }
            label="Sin Gluten"
          />
        </FormGroup>
        <Divider
          sx={{ marginRight: "1vh" }}
          orientation="vertical"
          variant="middle"
          flexItem //################################################################### PRODUCTOS ##########################################################
        />
      </Box>
    </div>
  );
}

export default Searchbar;
