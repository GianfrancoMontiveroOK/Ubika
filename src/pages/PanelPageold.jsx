import React, { useState, useEffect } from "react";
import { getData, deleteReserve, ChargePayment, InMark } from "../api/reserves"; // Asume que este controlador está exportado
import {
  Typography,
  Box,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Divider,
  Button,
  Modal,
  AppBar,
  Toolbar,
  ListItemIcon,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Avatar,
  TableContainer,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Collapse,
} from "@mui/material";
import PushNotificationButton from "../components/PushNotificationButton";
import { QRCodeCanvas } from "qrcode.react"; // Cambié la importación aquí
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HistoryIcon from "@mui/icons-material/History";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Bar } from "react-chartjs-2"; // Ejemplo de gráfico de barras, si lo necesitas
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { format, parseISO, startOfWeek, addDays, isSameDay } from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,message
  Tooltip,
  Legend,
} from "chart.js";
import ReservationForm from "../components/ReservationForm";
import WeeklyView from "../components/WeklyView";
import TodayIcon from "@mui/icons-material/Today"; // Importa el ícono
import FinanzasView from "../components/FinanzasView";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function PanelPage2({ data }) {
  const [view, setView] = useState(""); // Estado para almacenar los datos
  const [loading, setLoading] = useState(true); // Estado para gestionar la carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // Estado del drawer
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [employee, setEmployee] = useState("");
  const theme = useTheme();
  const [confirmOpen, setConfirmOpen] = useState(false); // Estado para abrir/cerrar e
  const [confirmOpen4, setConfirmOpen4] = useState(false); // Estado para abrir/cerrar e
  const [selectedBedId, setSelectedBedId] = useState(null); // Guarda el ID de la reserva seleccionad
  const [roomSelect, setRoomSelect] = useState(null); // Guarda el ID de la reserva seleccionad
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [openRow, setOpenRow] = useState(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const parseCurrency = (value) => {
    if (typeof value === "string") {
      return parseFloat(value.replace(/[^0-9.-]+/g, "")) || 0;
    } else if (typeof value === "number") {
      return value;
    }
    return 0;
  };

  const getBackgroundColor = (estado, diferencia, seña) => {
    if (estado === "processing") return "#40E0D0";
    if (isNaN(diferencia) || seña === "none") return "#FF7F7F";
    if (diferencia > 0) return "#FFE066";
    if (diferencia === 0) return "#70DB70";
    return "transparent";
  };

  const filterReservations = (res) => {
    const fullName = res.fullName?.toLowerCase() || "";
    const seña = parseCurrency(res["seña"]);
    const total = parseCurrency(res["amount"]);
    const diferencia = total - seña;
    const matchesSearch = fullName.includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === "paid") return diferencia === 0;
    if (filter === "owed") return diferencia > 0;
    if (filter === "unpaid") return seña === 0 || seña === "none";
    return true;
  };
  const roomSelectList = [
    "7",
    "9",
    "10",
    "12",
    "14",
    "15",
    "16",
    "18",
    "19",
    "20",
    "21",
    "22",
  ]; // Lista dinámica de empleados

  const modalStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const modalContentStyles = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    maxWidth: "400px",
    margin: "0 auto",
  };
  useEffect(() => {
    console.log("📦 Data recibida en PanelPage2:", data);
  }, [data]);

  useEffect(() => {
    // Simular una carga de datos
    const timer = setTimeout(() => setLoading(false), 3000); // 3 segundos
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#f5f5f5", // Fondo claro opcional
        }}
      >
        <Box textAlign="center">
          <CircularProgress />
          <Typography sx={{ marginTop: 2 }}>Cargando datos...</Typography>
        </Box>
      </Box>
    );
  }
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getUTCDate()).padStart(2, "0");
    const month = String(d.getUTCMonth() + 1).padStart(2, "0"); // Meses en JS van de 0 a 11
    const year = d.getUTCFullYear();
    return `${day}-${month}-${year}`;
  };
  const handleGenerateLink = (bedsidselect) => {
    console.log(bedsidselect);
    // Generamos el enlace utilizando el bedsid
    const baseUrl = `${window.location.origin}/#/completepay`;
    const params = new URLSearchParams({
      bedsid: bedsidselect, // Solo añadimos el bedsid al enlace
    });

    const fullUrl = `${baseUrl}?${params.toString()}`;
    setGeneratedLink(fullUrl);
    setModalOpen(true);
    setCopied(false);
  };

  // Abre el diálogo de confirmación
  const handleConfirmOpen = (bedsid) => {
    setSelectedBedId(bedsid); // Guarda el ID de la reserva
    setConfirmOpen(true);
  };

  // Cierra el diálogo de confirmación
  const handleConfirmClose = () => {
    setConfirmOpen(false);
    setSelectedBedId(null);
  };
  // Abre el diálogo de confirmación
  const handleConfirmOpen4 = (bedsid) => {
    setSelectedBedId(bedsid); // Guarda el ID de la reserva
    setConfirmOpen4(true);
  };

  // Cierra el diálogo de confirmación
  const handleConfirmClose4 = () => {
    setConfirmOpen4(false);
    setSelectedBedId(null);
  };

  // Elimina la reserva después de confirmar
  const handleDelete = async () => {
    setLoading(true);
    try {
      const result = await deleteReserve({ body: selectedBedId }); // Llamada a la función deleteReservationByID
      setMessage(result.message || "Reserva eliminada correctamente.");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
      setConfirmOpen(false); // Cierra el diálogo después de la eliminación
      window.location.reload();
    }
  };

  const chartData = {
    labels: ["Ingresos Totales", "Pagos Pendientes", "Dinero en Caja"],
    datasets: [
      {
        label: "total",
        data: [
          data.totalIncome,
          data.paymentsPending,
          data.totalIncome - data.paymentsPending,
        ],
        backgroundColor: ["#4caf50", "#ff9800", "#2196f3"],
      },
    ],
  };
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(generatedLink)
      .then(() => alert("Enlace copiado al portapapeles: " + generatedLink))
      .catch((err) => console.error("Error al copiar el enlace:", err));
  };
  const handleGoToPayment = () => {
    // Redirige a la página de pago
    window.location.href = generatedLink; // Sustituye con la URL de la página de pago
  };
  // Mostrar mensaje de error si ocurre alguno
  if (error) {
    return <div>Error: {error}</div>;
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(value);
  };

  const handleOpenModal2 = (idbeds) => {
    setSelectedBedId(idbeds); // Almacena el idbeds seleccionado
    setModalOpen2(true);
  };
  const handleOpenModal3 = (idbeds) => {
    setSelectedBedId(idbeds); // Almacena el idbeds seleccionado
    setModalOpen3(true);
  };

  const handleSubmitModal = async () => {
    if (!amount || !paymentMethod || !employee) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const payload = {
      bedsid: selectedBedId, // ID de la cama
      updates: {
        seña: amount, // Monto de la seña
        Pago: paymentMethod, // Método de pago
        "ingreso x": employee, // Valor que actualiza la columna 'ingreso x'
      },
    };

    try {
      const response = await ChargePayment(payload);
      console.log(response);
      if (response?.status === 200 || response?.success) {
        setModalOpen2(false); // Cierra el modal después de una operación exitosa
        alert("Pago cargado exitosamente.");
      } else {
        const message =
          response?.message || "Ocurrió un error al cargar el pago.";
        alert(message);
      }
    } catch (error) {
      console.error("Error al enviar el pago:", error);
      alert(
        "Hubo un problema al conectar con el servidor. Intente nuevamente."
      );
    }
  };
  const handleSubmitModal3 = async () => {
    console.log(roomSelect);
    const payload = {
      bedsid: selectedBedId,
      updates: {
        estadoIn: true,
        "nombre habitación": roomSelect,
      },
    };

    try {
      const response = await InMark(payload);
      console.log(response);

      if (response?.status === 200 || response?.success) {
        setModalOpen3(false);
        window.location.reload();
      } else {
        const message =
          response?.message || "Ocurrió un error al cargar el pago.";
        setErrorMessage(message); // Guarda el mensaje de error
      }
    } catch (error) {
      console.error("Error al enviar el pago:", error);

      if (error.response?.status === 400) {
        // Captura el mensaje de error del estado 400
        setErrorMessage(error.response?.data?.message || "Error desconocido.");
      } else {
        setErrorMessage("Hubo un problema al conectar con el servidor.");
      }
    }
  };
  const buttonStyle = (backgroundColor) => ({
    backgroundColor,
    color: "#000",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  });

  const handleOut = async () => {
    const payload = {
      bedsid: selectedBedId, // ID de la cama
      updates: {
        estadoIn: "out", // Monto de la seña
      },
    };

    try {
      const response = await InMark(payload);
      console.log(response);
      if (response?.status === 200 || response?.success) {
        setModalOpen3(false); // Cierra el modal después de una operación exitosa
        window.location.reload();
      } else {
        const message =
          response?.message || "Ocurrió un error al cargar el pago.";
        alert(message);
      }
    } catch (error) {
      console.error("Error al enviar el pago:", error);
      alert(
        "Hubo un problema al conectar con el servidor. Intente nuevamente."
      );
    }
  };
  return (
    <Box sx={{ backgroundColor: "#FF5733." }}>
      <Box sx={{ flexGrow: 1 }}>
        {/* Diálogo de confirmación */}
        <Dialog open={confirmOpen} onClose={handleConfirmClose}>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Estás seguro de que deseas eliminar esta reserva? Esta acción no
              se puede deshacer.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={handleConfirmClose} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleDelete} color="error" autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={confirmOpen4} onClose={handleConfirmClose4}>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Estás seguro que quieres marcar el egreso del huesped? Esta
              acción no se puede deshacer.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={handleConfirmClose4} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleOut} color="error" autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
        <Box
          sx={{
            backgroundColor: "#FF5733",
            padding: "2vh",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            variant="contained"
            onClick={() => setView("")} // Aquí se cambia el estado de la vista a "new"
            startIcon={<TodayIcon />} // Agrega el ícono al inicio del texto
          >
            Hoy
          </Button>
          <PushNotificationButton />
        </Box>
        <AppBar
          className="appbar"
          position="static"
          sx={{
            backgroundColor: "#FF5733",
            padding: "2vh",

            justifyContent: "center",
          }}
        >
          <Toolbar
            sx={{
              backgroundColor: "#FF5733",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              variant="contained"
              sx={{
                display: { xs: "block", sm: "flex", lg: "flex", xl: "flex" },
                fontSize: { xs: "1rem", xl: "1.5rem" },
                marginLeft: "1vh",
                marginRight: "1vh",
                color: "#000",
                backgroundColor: "#fff",
                borderRadius: "5vh",
              }}
              edge="end"
              aria-label="new-guest"
              onClick={() => setView("new")} // Aquí se cambia el estado de la vista a "new"
            >
              <Typography
                sx={{
                  display: { xs: "none", sm: "flex", lg: "flex", xl: "flex" },
                }}
              >
                Nuevo Huesped
              </Typography>
              <AddIcon sx={{ Size: "large" }} />
            </Button>

            <Button
              variant="contained"
              sx={{
                display: { xs: "block", sm: "flex", lg: "flex", xl: "flex" },
                fontSize: { xs: "1rem", xl: "1.5rem" },
                marginLeft: "1vh",
                marginRight: "1vh",
                color: "#000",
                backgroundColor: "#fff",
                borderRadius: "5vh",
              }}
              edge="end"
              aria-label="active-reservations"
              onClick={() => setView("reserve")} // Aquí se cambia el estado de la vista a "new"
            >
              <Typography
                sx={{
                  display: { xs: "none", sm: "flex", lg: "flex", xl: "flex" },
                }}
              >
                Reservas
              </Typography>
              <CalendarTodayIcon sx={{ Size: "large" }} />
            </Button>

            <Button
              variant="contained"
              sx={{
                display: { xs: "block", sm: "flex", lg: "flex", xl: "flex" },
                fontSize: { xs: "1rem", xl: "1.5rem" },
                marginLeft: "1vh",
                marginRight: "1vh",
                color: "#000",
                backgroundColor: "#fff",
                borderRadius: "5vh",
              }}
              edge="end"
              aria-label="reservation-history"
              onClick={() => setView("history")} // Aquí se cambia el estado de la vista a "new"
            >
              <Typography
                sx={{
                  display: { xs: "none", sm: "flex", lg: "flex", xl: "flex" },
                }}
              >
                Historial de Reservas
              </Typography>
              <HistoryIcon sx={{ Size: "large" }} />
            </Button>

            <Button
              variant="contained"
              sx={{
                display: { xs: "block", sm: "flex", lg: "flex", xl: "flex" },
                fontSize: { xs: "1rem", xl: "1.5rem" },
                marginLeft: "1vh",
                marginRight: "1vh",
                color: "#000",
                backgroundColor: "#fff",
                borderRadius: "5vh",
              }}
              edge="end"
              aria-label="financial-summary"
              onClick={() => setView("finanzas")} // Aquí se cambia el estado de la vista a "new"
            >
              <Typography
                sx={{
                  display: { xs: "none", sm: "flex", lg: "flex", xl: "flex" },
                }}
              >
                Resumen Financiero
              </Typography>
              <AttachMoneyIcon sx={{ Size: "large" }} />
            </Button>
          </Toolbar>
        </AppBar>

        <Modal
          open={modalOpen2}
          onClose={() => setModalOpen(false)}
          style={modalStyles}
        >
          <Box style={modalContentStyles}>
            <Typography variant="h6" gutterBottom>
              Cargar Pago
            </Typography>

            {/* Campo para ingresar el monto */}
            <TextField
              label="Monto"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
            />

            {/* Selector para método de pago */}
            <FormControl fullWidth>
              <InputLabel>Método de Pago</InputLabel>
              <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <MenuItem value="transferencia">Transferencia</MenuItem>
                <MenuItem value="efectivo">Efectivo</MenuItem>
              </Select>
            </FormControl>

            {/* Selector para elegir empleado */}
            <FormControl fullWidth>
              <InputLabel>Empleado</InputLabel>
              <Select
                value={employee}
                onChange={(e) => setEmployee(e.target.value)}
              >
                <MenuItem value="Gian">Gian</MenuItem>
                <MenuItem value="Vale">Vale</MenuItem>
                <MenuItem value="AirBnB">AirBnB</MenuItem>
              </Select>
            </FormControl>

            {/* Botón para enviar */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitModal}
            >
              Guardar
            </Button>

            {/* Botón para cerrar */}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setModalOpen2(false)}
            >
              Cerrar
            </Button>
          </Box>
        </Modal>
        {/* Modal con QRCode */}

        <Modal
          open={modalOpen3}
          onClose={() => setModalOpen3(false)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            {!errorMessage && (
              <>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ marginBottom: "20px" }}
                >
                  Huesped Ubicado en la Habitacion...
                </Typography>

                {/* Selector para elegir habitación */}
                <FormControl fullWidth style={{ marginBottom: "20px" }}>
                  <InputLabel>Habitación</InputLabel>
                  <Select
                    value={roomSelect}
                    onChange={(e) => setRoomSelect(e.target.value)}
                    style={{ borderRadius: "8px" }}
                  >
                    {roomSelectList.map((room, index) => (
                      <MenuItem key={index} value={room}>
                        {room}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Botón para enviar */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmitModal3(selectedBedId)}
                  style={{
                    marginRight: "10px",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                  }}
                >
                  Guardar
                </Button>
              </>
            )}

            {/* Mostrar error si existe */}
            {errorMessage && (
              <Typography variant="h6" color="error">
                {errorMessage}
              </Typography>
            )}

            {/* Botón para cerrar */}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setModalOpen3(false);
                setErrorMessage("");
              }}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              Cerrar
            </Button>
          </Box>
        </Modal>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          style={modalStyles}
        >
          <Box style={modalContentStyles}>
            <Typography variant="h6">Enlace Generado</Typography>
            {/* Usamos QRCodeCanvas */}
            <QRCodeCanvas value={generatedLink} size={200} />
            <Typography variant="body1" style={{ margin: "10px 0" }}>
              {generatedLink}
            </Typography>

            {/* Botón para copiar enlace */}
            <Button
              variant="outlined"
              color="primary"
              onClick={handleCopyLink}
              style={{ margin: "10px" }}
            >
              Copiar Enlace
            </Button>

            {copied && (
              <Typography
                variant="body2"
                style={{ color: "green", fontWeight: "bold" }}
              >
                ¡Enlace copiado al portapapeles!
              </Typography>
            )}

            {/* Botón para ir a la página de pago */}
            <Button
              variant="contained"
              color="secondary"
              onClick={handleGoToPayment}
              style={{ margin: "10px" }}
            >
              Ir a la Página de Pago
            </Button>

            {/* Botón para cerrar modal */}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setModalOpen(false)}
              style={{ margin: "10px" }}
            >
              Cerrar
            </Button>
          </Box>
        </Modal>

        {view === "new" ? (
          <div>
            <ReservationForm />
          </div>
        ) : (
          ""
        )}
        {view === "" && (
          <div>
            {/* Reservas Activas */}
            <section>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
                  gap: 2,
                  padding: "2vh",
                  backgroundColor: "#ffff",
                }}
              >
                {roomSelectList.map((room) => {
                  const isOccupied =
                    Array.isArray(data.activeReservations) &&
                    data.activeReservations.some(
                      (res) =>
                        res.rooms?.[0]?.room === room &&
                        res.estadoIn?.toLowerCase() === "true"
                    );

                  return (
                    <Box
                      key={room}
                      sx={{
                        padding: "10px",
                        borderRadius: "5px",
                        backgroundColor: isOccupied ? "#FFC1C1" : "#C1FFC1",
                        color: "#000",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {room}
                    </Box>
                  );
                })}
              </Box>

              <Paper elevation={3} sx={{ overflowX: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Estado</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Estado del Pago</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Habitación</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Hora de llegada</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Nombre</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Fecha Retiro</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Opciones de Pago</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.activeReservations?.length > 0 ? (
                      data.activeReservations
                        .filter(
                          (res) => res["estadoIn"]?.toLowerCase() !== "out"
                        )
                        .map((res, idx) => {
                          const seña = res.seña || 0;
                          const total = res.amount || 0;
                          const diferencia = total - seña;

                          let backgroundColor;
                          if (seña === 0)
                            backgroundColor = "#FFC1C1"; // Rojo pastel
                          else if (diferencia > 0)
                            backgroundColor = "#FFFACD"; // Amarillo pastel
                          else backgroundColor = "#C1FFC1"; // Verde pastel

                          return (
                            <TableRow key={idx}>
                              <TableCell
                                style={{
                                  backgroundColor:
                                    res["estadoIn"]?.toLowerCase() === "true"
                                      ? "#C1FFC1"
                                      : "#FFC1C1",
                                  color: "black",
                                }}
                              >
                                {res["estadoIn"]?.toLowerCase() === "true" ? (
                                  <Box
                                    sx={{
                                      textAlign: "center",
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    IN
                                    <button
                                      style={buttonStyle("#FFC1C1")}
                                      onClick={() =>
                                        handleConfirmOpen4(res.idbeds)
                                      }
                                    >
                                      OUT
                                    </button>
                                  </Box>
                                ) : (
                                  <button
                                    style={buttonStyle("#f0f0f0")}
                                    onClick={() => handleOpenModal3(res.idbeds)}
                                  >
                                    Marcar Ingreso
                                  </button>
                                )}
                              </TableCell>
                              <TableCell sx={{ backgroundColor }}>
                                {diferencia !== ""
                                  ? `$${diferencia.toLocaleString()}`
                                  : "-"}
                              </TableCell>
                              <TableCell>
                                {res.rooms[0]?.room || "Desconocido"}
                              </TableCell>
                              <TableCell>{res.horaing || "N/A"}</TableCell>
                              <TableCell>{res.fullName}</TableCell>
                              <TableCell>{formatDate(res.endDate)}</TableCell>
                              <TableCell>
                                <Box display="flex" flexDirection="column">
                                  <Button
                                    sx={{ margin: "1vh" }}
                                    onClick={() =>
                                      handleGenerateLink(res.idbeds)
                                    }
                                    variant="contained"
                                    color="success"
                                  >
                                    Link De Pago
                                  </Button>
                                  <Button
                                    sx={{ margin: "1vh" }}
                                    onClick={() => handleOpenModal2(res.idbeds)}
                                    variant="contained"
                                    color="info"
                                  >
                                    Registrar Pago Manualmente
                                  </Button>
                                  <Button
                                    sx={{ margin: "1vh" }}
                                    variant="contained"
                                    color="error"
                                    onClick={() =>
                                      handleConfirmOpen(res.idbeds)
                                    }
                                    disabled={loading}
                                  >
                                    {loading
                                      ? "Eliminando..."
                                      : "Eliminar Reserva"}
                                  </Button>
                                  {message && <Box mt={2}>{message}</Box>}
                                </Box>
                              </TableCell>
                            </TableRow>
                          );
                        })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          No hay reservas activas.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Paper>
            </section>
          </div>
        )}

        {view === "history" ? (
          <div>
            {/* Buscador y Filtro */}
            <Box
              p={2}
              backgroundColor="#fff"
              display="flex"
              justifyContent="space-around"
            >
              <TextField
                label="Buscar por nombre"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                <InputLabel>Filtrar por estado</InputLabel>
                <Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  label="Filtrar por estado"
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="paid">Pagado</MenuItem>
                  <MenuItem value="owed">Falta pagar</MenuItem>
                  <MenuItem value="unpaid">No pagó</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Reservas Activas */}
            <section>
              <Paper elevation={3} sx={{ overflowX: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Nombre</strong>
                      </TableCell>
                      <TableCell>
                        <strong>In</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Out</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Habitación</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Noches</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Total</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Abonado</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Diferencia</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Comisión</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Fuente</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Opciones</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.allReservations2 &&
                    data.allReservations2.filter(filterReservations).length >
                      0 ? (
                      [...data.allReservations2]
                        .filter(filterReservations)
                        .reverse()
                        .map((res, idx) => {
                          const seña = parseCurrency(res["seña"]);
                          const total = parseCurrency(res["amount"]);
                          const diferencia = total - seña;
                          const backgroundColor = getBackgroundColor(
                            res["estado"],
                            diferencia,
                            res["seña"]
                          );

                          return (
                            <TableRow
                              key={idx}
                              sx={{
                                backgroundColor,
                                borderRadius: 2,
                                boxShadow: 3,
                                position: "relative",
                                zIndex: 1,
                                overflow: "hidden",
                                m: 1,
                                transition:
                                  "transform 0.2s ease, box-shadow 0.2s ease",
                                "&:hover": {
                                  transform: "scale(1.01)",
                                  boxShadow: 6,
                                },
                              }}
                            >
                              <TableCell>
                                {res["fullName"] || "No especificado"}
                              </TableCell>
                              <TableCell>{formatDate(res.startDate)}</TableCell>
                              <TableCell>{formatDate(res.endDate)}</TableCell>
                              <TableCell>
                                {res["rooms"]?.[0]?.room || "No especificada"}
                              </TableCell>
                              <TableCell>
                                {res["rooms"]?.[0]?.totalNights || 1}
                              </TableCell>
                              <TableCell>{`$${total.toLocaleString()}`}</TableCell>
                              <TableCell>{`$${seña.toLocaleString()}`}</TableCell>
                              <TableCell>{`$${diferencia.toLocaleString()}`}</TableCell>
                              <TableCell>
                                {res["commission"]
                                  ? `$${parseCurrency(
                                      res["commission"]
                                    ).toLocaleString()}`
                                  : "0"}
                              </TableCell>
                              <TableCell>
                                {res["ingresoX"] || "No especificada"}
                              </TableCell>
                              <TableCell>
                                <Box display="flex" flexDirection="column">
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() =>
                                      setOpenRow(openRow === idx ? null : idx)
                                    }
                                  >
                                    {openRow === idx
                                      ? "Ocultar Opciones"
                                      : "Mostrar Opciones"}
                                  </Button>

                                  <Collapse
                                    sx={{ color: "#fff" }}
                                    in={openRow === idx}
                                  >
                                    <Box
                                      mt={1}
                                      display="flex"
                                      flexDirection="column"
                                    >
                                      <Button
                                        sx={{ my: "0.5vh" }}
                                        onClick={() =>
                                          handleGenerateLink(res["idbeds"])
                                        }
                                        variant="contained"
                                        color="success"
                                      >
                                        Link De Pago
                                      </Button>
                                      <Button
                                        sx={{ my: "0.5vh" }}
                                        onClick={() =>
                                          handleOpenModal2(res["idbeds"])
                                        }
                                        variant="contained"
                                        color="info"
                                      >
                                        Registrar Pago Manualmente
                                      </Button>
                                      <Button
                                        sx={{ my: "0.5vh" }}
                                        variant="contained"
                                        color="error"
                                        onClick={() =>
                                          handleConfirmOpen(res["idbeds"])
                                        }
                                        disabled={loading}
                                      >
                                        {loading
                                          ? "Eliminando..."
                                          : "Eliminar Reserva"}
                                      </Button>
                                      {message && <Box mt={2}>{message}</Box>}
                                    </Box>
                                  </Collapse>
                                </Box>
                              </TableCell>
                            </TableRow>
                          );
                        })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={12} align="center">
                          No hay reservas activas.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Paper>
            </section>
          </div>
        ) : (
          ""
        )}

        {view === "reserve" ? (
          <div>
            {/* Reservas Próximas */}

            {/* Calendario de Reservas */}
            <WeeklyView nextReservations={data.allReservations}></WeeklyView>
          </div>
        ) : (
          ""
        )}

        {view === "finanzas" ? (
          // Renderiza este contenido si view es igual a "finanzas"
          <FinanzasView reservations={data.allReservations} />
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}

export default PanelPage2;
