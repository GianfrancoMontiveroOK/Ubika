import React, { useState, useMemo } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Divider,
  Modal,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import {
  Today as TodayIcon,
  CalendarToday as CalendarTodayIcon,
  History as HistoryIcon,
  AttachMoney as AttachMoneyIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  ReceiptLong as ReceiptLongIcon,
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import WeeklyView from "../components/WeklyView";
import ReservationForm from "../components/ReservationForm";
import ReservationHistory from "../components/ReservationHistory";
import { QRCodeCanvas } from "qrcode.react";

const drawerWidth = 240;

export default function PanelPage2Ubika({ data }) {
  const [view, setView] = useState("reservas");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [expandedReservation, setExpandedReservation] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [employee, setEmployee] = useState("");
  const [generatedLink, setGeneratedLink] = useState(""); // Guarda el enlace generado
  const [modalOpen3, setModalOpen3] = useState(false); // Controla la visibilidad del modal
  const [copied, setCopied] = useState(false); // Indica si el enlace se copió correctamente
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [newAmount, setNewAmount] = useState(0);
  const [selectedBedId, setSelectedBedId] = useState(null);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const handleGenerateLink = (bedsidselect) => {
    if (!bedsidselect) {
      console.error("Error: No se recibió un ID válido para la reserva.");
      return;
    }
    console.log("Generando link para bedsid:", bedsidselect);

    const baseUrl = `${window.location.origin}/#/completepay`;
    const params = new URLSearchParams({ bedsid: bedsidselect });

    const fullUrl = `${baseUrl}?${params.toString()}`;
    setGeneratedLink(fullUrl);
    setModalOpen3(true);
    setCopied(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(generatedLink)
      .then(() => alert("Enlace copiado al portapapeles: " + generatedLink))
      .catch((err) => console.error("Error al copiar el enlace:", err));
  };
  // 📌 Elimina la reserva después de confirmar
  const handleDelete = async () => {
    try {
      const result = await deleteReserve({ body: selectedBedId }); // 📌 Llamada a la API con el ID correcto
      alert(result.message || "Reserva eliminada correctamente.");
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsDeleteModalOpen(false); // 📌 Cierra el modal
      window.location.reload(); // 📌 Recarga la página
    }
  };
  const handleUpdateReservation = async () => {
    try {
      const updateData = {
        bedsid: selectedBedId, // Recibir el ID de la reserva desde el botón
        updates: {
          startDate: newStartDate,
          endDate: newEndDate,
          amount: newAmount,
        },
      };

      const result = await updateReservation(updateData); // Llamada a la API consolidada
      console.log(result);
      if (result.data.success === true) {
        handleCloseEditModal(); // Cerrar el modal
        window.location.reload(); // Reiniciar la página
      } else {
        alert(`Error: ${result.message}`); // Mostrar mensaje de error
      }
    } catch (error) {
      console.error("Error en la actualización:", error);
      alert("Ocurrió un error al actualizar la reserva."); // Mostrar error genérico
    }
  };
  // Función para manejar la actualización del nombre de la habitación
  const handleUpdateRoomName = async () => {
    try {
      const updateData = {
        bedsid: selectedBedId, // ID de la reserva seleccionado
        updates: {
          "nombre habitación": selectedRoom, // Nueva habitación seleccionada
        },
      };

      const result = await updateReservation(updateData); // Llamada a la API

      if (result.data.success) {
        setModalOpenRoom(false); // Cerrar el modal si la actualización fue exitosa
        window.location.reload(); // Recargar la página
      } else {
        alert(`Error: ${result.message}`); // Mostrar mensaje de error si falla
      }
    } catch (error) {
      console.error("Error al actualizar la habitación:", error);
      alert("Ocurrió un error al actualizar la habitación."); // Mostrar mensaje genérico de error
    }
  };

  // Función para manejar el pago manual y enviar los datos al backend
  const handleChargePayment = async () => {
    try {
      const paymentData = {
        bedsid: selectedBedId, // ID de la reserva seleccionado
        updates: {
          seña: amount, // Monto ingresado
          Pago: paymentMethod, // Método de pago seleccionado
          "ingreso x": employee, // Empleado que registra el pago
        },
      };

      const result = await ChargePayment(paymentData); // Llamada a la API

      if (result.data.success) {
        setModalOpen2(false); // Cerrar el modal si el pago se realizó con éxito
        window.location.reload(); // Recargar la página
      } else {
        alert(`Error: ${result.message}`); // Mostrar mensaje de error si falla
      }
    } catch (error) {
      console.error("Error en el pago manual:", error);
      alert("Ocurrió un error al procesar el pago."); // Mostrar mensaje genérico de error
    }
  };
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          background: {
            default: darkMode ? "#1e1e1e" : "#ECECEC",
          },
          primary: {
            main: "#903AF2",
          },
          secondary: {
            main: "#565254",
          },
        },
        typography: {
          fontFamily: "'Red Hat Display', sans-serif",
        },
      }),
    [darkMode]
  );

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box
      sx={{
        background: darkMode
          ? "linear-gradient(to top, #2c2c2c, #903AF2)"
          : "linear-gradient(to top, #ECECEC, #903AF2)",
        height: "100%",
      }}
    >
      <Toolbar>
        <Typography variant="h6" color="#fff">
          Ubika Panel
        </Typography>
      </Toolbar>
      <Divider sx={{ bgcolor: "#903AF2" }} />
      <List>
        {[
          {
            text: "Nueva Reserva",
            icon: <AddCircleOutlineIcon />,
            view: "new",
          },
          { text: "Hoy", icon: <TodayIcon />, view: "hoy" },
          { text: "Reservas", icon: <CalendarTodayIcon />, view: "reservas" },
          { text: "Historial", icon: <HistoryIcon />, view: "history" },
          { text: "Finanzas", icon: <AttachMoneyIcon />, view: "finanzas" },
          { text: "Facturación", icon: <ReceiptLongIcon />, view: "billing" },
        ].map(({ text, icon, view }) => (
          <ListItem
            button
            key={text}
            onClick={() => setView(view)}
            sx={{
              color: "#fff",
              "&:hover": { bgcolor: "#903AF2", color: "#fff" },
              borderRadius: 2,
              my: 0.5,
              transition: "all 0.3s",
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <ListItem
          button
          onClick={() => setDarkMode(!darkMode)}
          sx={{
            color: "#fff",
            borderRadius: 2,
            mt: 2,
            "&:hover": {
              bgcolor: "#903AF2",
              color: "#fff",
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </ListItemIcon>
          <ListItemText primary={darkMode ? "Tema Claro" : "Tema Oscuro"} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ display: "flex", bgcolor: "background.default", height: "100vh" }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            background: "linear-gradient(to left, #ECECEC, #903AF2)",
          }}
          elevation={0}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              sx={{ fontWeight: "bold", flexGrow: 1 }}
              color={"#fff"}
              variant="h6"
              noWrap
              component="div"
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="sidebar menu"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                bgcolor: "#565254",
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                bgcolor: "#565254",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            overflow: "auto",
            p: 3,
          }}
        >
          {view === "new" && <ReservationForm />}
          {view === "reservas" && (
            <Box sx={{ width: "100%", overflowX: "auto" }}>
              <Box sx={{ width: "max-content", maxWidth: "100%" }}>
                <WeeklyView
                  nextReservations={data?.allReservations || []}
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  selectedReservation={selectedReservation}
                  setSelectedReservation={setSelectedReservation}
                  selectedMonth={selectedMonth}
                  setSelectedMonth={setSelectedMonth}
                  expandedReservation={expandedReservation}
                  setExpandedReservation={setExpandedReservation}
                  isDeleteModalOpen={isDeleteModalOpen}
                  setIsDeleteModalOpen={setIsDeleteModalOpen}
                  isEditModalOpen={isEditModalOpen}
                  setIsEditModalOpen={setIsEditModalOpen}
                  modalOpen2={modalOpen2}
                  setModalOpen2={setModalOpen2}
                  amount={amount}
                  setAmount={setAmount}
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  employee={employee}
                  setEmployee={setEmployee}
                  generatedLink={generatedLink}
                  setGeneratedLink={setGeneratedLink}
                  modalOpen3={modalOpen3}
                  setModalOpen3={setModalOpen3}
                  copied={copied}
                  setCopied={setCopied}
                  newStartDate={newStartDate}
                  setNewStartDate={setNewStartDate}
                  newEndDate={newEndDate}
                  setNewEndDate={setNewEndDate}
                  newAmount={newAmount}
                  setNewAmount={setNewAmount}
                  selectedBedId={selectedBedId}
                  setSelectedBedId={setSelectedBedId}
                  modalOpenRoom={modalOpenRoom}
                  setModalOpenRoom={setModalOpenRoom}
                  selectedRoom={selectedRoom}
                  setSelectedRoom={setSelectedRoom}
                  nextReservations={data?.allReservations || []}
                />
              </Box>
            </Box>
          )}
          {view === "history" && <ReservationHistory data={data} />}
          {view === "finanzas" && <Box>Finanzas</Box>}
          {view === "billing" && <Box>Facturación</Box>}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
