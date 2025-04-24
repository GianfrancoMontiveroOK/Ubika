import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Drawer,
  Box,
  Backdrop,
  Modal,
  Fade,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

// Componente para el modal de confirmación de pedido
const OrderModal = ({ open, onClose, onConfirm, loading }) => (
  <Backdrop open={open} onClick={onClose}>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: "3vh",
            width: "50%",
            borderRadius: "10px",
            outline: "none",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" id="transition-modal-title">
            Confirmar Estado del Envio
          </Typography>
          <Typography id="transition-modal-description" paragraph>
            ¿Ya completaste el envio sin problemas?
          </Typography>
          <Button
            sx={{ margin: "2vh" }}
            onClick={onConfirm}
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Confirmar"}
          </Button>
          <Button
            color="warning"
            onClick={onClose}
            variant="outlined"
            disabled={loading}
          >
            <Typography sx={{ fontSize: "0.8rem" }}>Cancelar</Typography>
          </Button>
        </Box>
      </Fade>
    </Modal>
  </Backdrop>
);

// Componente para mostrar alertas con Snackbar
const SnackbarAlert = ({ open, message, severity, onClose }) => (
  <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
    <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
      {message}
    </Alert>
  </Snackbar>
);

// Componente principal de la página de pedidos
const OrdersPage = () => {
  const { getPendingUsers, finishOrderapi } = useAuth();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmId, setConfirmId] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getPendingUsers();
        console.log(users); // Verificar los datos recibidos
        setPendingUsers(users);
      } catch (error) {
        console.error("Error al obtener usuarios pendientes:", error);
      }
    };

    fetchData();
  }, [getPendingUsers]);

  const handleOpenDrawer = (userSelect) => {
    setSelectedUser(userSelect);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleCancelConfirm = () => {
    setOpenBackdrop(false);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await finishOrderapi(confirmId);
      setOpenBackdrop(false);
      setSnackbarMessage("Pedido completado exitosamente.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      const updatedUsers = await getPendingUsers();
      setPendingUsers(updatedUsers);
    } catch (error) {
      console.error("Error al completar el pedido:", error);
      setSnackbarMessage("Error al completar el pedido.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAsk = (id) => {
    setConfirmId(id);
    setOpenBackdrop(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Función para calcular el total de los productos
  const calculateTotal = (products) => {
    if (!Array.isArray(products)) {
      // Si no es un array, conviértelo a un array usando Object.values()
      products = Array.isArray(products) ? products : Object.values(products || {});
    }
    return products.reduce(
      (total, product) => total + (product.price || 0) * (product.quantity || 0),
      0
    );
  };

  // Filtrar usuarios pendientes
  const filteredUsers = pendingUsers.filter(
    (user) => user.status === "envioPendiente" || user.status === "PagaRetira"
  );

  return (
    <>
      <OrderModal
        open={openBackdrop}
        onClose={handleCancelConfirm}
        onConfirm={handleConfirm}
        loading={loading}
      />
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Datos</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Productos</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <Typography color="grey">
                    Nombre:{" "}
                    <Typography
                      component="span"
                      sx={{ color: "black", fontWeight: "bold" }}
                    >
                      {user.username}
                    </Typography>
                  </Typography>
                  <Typography color="grey">
                    Apellido:{" "}
                    <Typography
                      component="span"
                      sx={{ color: "black", fontWeight: "bold" }}
                    >
                      {user.lastname}
                    </Typography>
                  </Typography>
                  <Typography color="grey">
                    Teléfono:{" "}
                    <Typography
                      component="span"
                      sx={{ color: "black", fontWeight: "bold" }}
                    >
                      {user.phone}
                    </Typography>
                  </Typography>
                  <Typography color="grey">
                    Dirección de Envío:{" "}
                    <Typography
                      component="span"
                      sx={{ color: "black", fontWeight: "bold" }}
                    >
                      {user.address}
                    </Typography>
                  </Typography>
                </TableCell>
                <TableCell>
                  {user.status === "envioPendiente" && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "red",
                          marginRight: 10,
                        }}
                      />
                      <Typography sx={{ color: "red" }}>
                        ENVIO PENDIENTE
                      </Typography>
                    </div>
                  )}
                  {user.status === "PagaRetira" && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "blue",
                          marginRight: 10,
                        }}
                      />
                      <Typography sx={{ color: "blue" }}>
                        PAGA Y RETIRA
                      </Typography>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenDrawer(user)}>
                    Ver Pedido
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    sx={{ marginRight: "1vh", marginLeft: "1vh" }}
                    variant="outlined"
                    onClick={() => handleConfirmAsk(user._id)}
                  >
                    Completado
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
        <Box sx={{ width: 300, padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Resumen del Pedido
          </Typography>
          <ul>
            {/* Asegúrate de que selectedUser.products es un array */}
            {Array.isArray(selectedUser?.products) ? (
              selectedUser.products.map((product) => (
                <li key={product.id}>
                  <Typography color="black" variant="body1">
                    Nombre: {product.name}
                    <br />
                    Marca: {product.brand}
                    <br />
                    Categoría: {product.category}
                    <br />
                    Contenido Neto: {product.contenidoNeto}
                    <br />
                    Precio: ${product.price}
                    <br />
                    Cantidad: {product.quantity}
                    <br />
                    Veggie: {product.Veggie ? "Sí" : "No"}
                    <br />
                    Gluten: {product.gluten ? "Sí" : "No"}
                    <br />
                    TACC: {product.tacc ? "Sí" : "No"}
                    <br />
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: "100px", height: "auto" }}
                    />
                  </Typography>
                </li>
              ))
            ) : (
              Object.values(selectedUser?.products || {}).map((product) => (
                <li key={product.id}>
                  <Typography color="black" variant="body1">
                    Nombre: {product.name}
                    <br />
                    Marca: {product.brand}
                    <br />
                    Categoría: {product.category}
                    <br />
                    Contenido Neto: {product.contenidoNeto}
                    <br />
                    Precio: ${product.price}
                    <br />
                    Cantidad: {product.quantity}
                    <br />
                    Veggie: {product.Veggie ? "Sí" : "No"}
                    <br />
                    Gluten: {product.gluten ? "Sí" : "No"}
                    <br />
                    TACC: {product.tacc ? "Sí" : "No"}
                    <br />
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: "100px", height: "auto" }}
                    />
                  </Typography>
                </li>
              ))
            )}
          </ul>
          <Typography variant="h6">
            Total: ${calculateTotal(selectedUser?.products || {})}
          </Typography>
        </Box>
      </Drawer>
    </>
  );
};

export default OrdersPage;
