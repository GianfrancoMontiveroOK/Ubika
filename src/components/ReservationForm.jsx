import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Container,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import { ReservationFormAxios, getReservesHB } from "../api/reserves";
import { useNavigate } from "react-router-dom";

// Función para generar un ID de reserva aleatorio
const generateReservationId = () => {
  return "RES-" + Math.random().toString(36).substr(2, 9).toUpperCase();
};

const ReservationForm = () => {
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [señado, setSeñado] = useState(0);
  const [dniOrRut, setDniOrRut] = useState(""); // Nuevo estado para DNI o RUT
  const [phoneNumber, setPhoneNumber] = useState(""); // Nuevo estado para Teléfono
  const [specialRequests, setSpecialRequests] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [reservationId, setReservationId] = useState(""); // Si necesitas manejar un ID de reserva
  const [availableRooms, setAvailableRooms] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false); // Estado para el Snackbar
  const employees = ["Vale", "Gian"];
  const customers = ["12345678", "98765432", "11223344"];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Estado para el indicador de carga


  const validateDates = (arrivalDate, departureDate) => {
    if (!arrivalDate || !departureDate) {
      setErrorMessage("Las fechas de llegada y salida son obligatorias.");
      return false;
    }
    if (new Date(arrivalDate) >= new Date(departureDate)) {
      setErrorMessage(
        "La fecha de llegada debe ser anterior a la fecha de salida."
      );
      return false;
    }
    return true;
  };
  const handleCloseAlert = () => setAlertOpen(false); // Cierra la alerta

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Activa el indicador de carga

    const requiredFields = [
      employeeName,
      customerName,
      numberOfGuests,
      roomNumber,
      dniOrRut, // DNI o RUT es obligatorio
      totalAmount,
      arrival,
      departure,
    ];

    if (requiredFields.some((field) => !field)) {
      setErrorMessage("Todos los campos obligatorios deben completarse.");
      setSuccessMessage(""); // Limpia el mensaje de éxito, si existe
      setLoading(false); // Detiene el indicador de carga
      return;
    }

    const reservationData = {
      reservationId,
      employeeName,
      paymentMethod,
      customerName,
      numberOfGuests,
      roomNumber,
      dniOrRut,
      phoneNumber, // Teléfono opcional
      totalAmount,
      arrival,
      departure,
      specialRequests,
      señado,
    };

    try {
      const response = await ReservationFormAxios(reservationData);

      // Verifica si la respuesta es válida
      if (response.status === 200) {
        setSuccessMessage("Reserva procesada exitosamente.");
        setErrorMessage(""); // Limpia el mensaje de error
        setAlertOpen(true); // Muestra la alerta
        setTimeout(() => window.location.reload(), 2000); // Recarga la página después de 2s
      } else {
        const data = await response.json(); // Suponiendo que es JSON
        setErrorMessage(data.message || "Error al procesar la reserva.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error al procesar la reserva. Intente nuevamente.");
      setSuccessMessage("");
    } finally {
      setLoading(false); // Detiene el indicador de carga
    }
  };

  const fetchAvailableRooms = async (arrivalDate, departureDate) => {
    console.log("fechAvailableRooms", arrivalDate, departureDate);
    if (!validateDates(arrivalDate, departureDate)) return;
    try {
      const response = await getReservesHB({
        startDate: arrivalDate,
        endDate: departureDate,
      });
      if (response.status === 200) {
        // Definir la función para filtrar habitaciones disponibles
        const filterAvailableRooms = (rooms) =>
          rooms.filter((room) => room.available > 0);

        // Filtrar habitaciones y extraer sus números
        const availableRoomNumbers = filterAvailableRooms(response.data).map(
          (room) => room.room
        );
        // 1️⃣ Agregar el número 10 y el símbolo #
        availableRoomNumbers.push(10, 7);
        setAvailableRooms(availableRoomNumbers);
      } else {
        setErrorMessage("No se pudieron obtener las habitaciones disponibles.");
      }
    } catch (error) {
      setErrorMessage(
        "Error al verificar la disponibilidad de las habitaciones."
      );
    }
  };

  const roomPrices = {
    7: 17000,
    9: 40000,
    10: 45000,
    12: 45000,
    14: 45000,
    15: 45000,
    16: 50000,
    18: 50000,
    19: 40000,
    20: 50000,
    21: 50000,
    22: 40000,
  };

  const handleRoomChange = (e) => {
    const selectedRoom = e.target.value;
    setRoomNumber(selectedRoom);

    // Actualizar el precio automáticamente según la habitación seleccionada
    const price = roomPrices[selectedRoom] || "";
    setTotalAmount(price);
  };
  useEffect(() => {
    if (arrival && departure) {
      fetchAvailableRooms(arrival, departure);
    }
  }, [arrival, departure]);

  return (
    <Container sx={{ backgroundColor: "#fff" }} maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Formulario de Reserva Manual
      </Typography>
      {/* Snackbar para alertas */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          Alerta creada exitosamente!
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit}>
        {/* Fecha de llegada */}
        <TextField
          fullWidth
          label="Fecha de Llegada"
          type="date"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
          required
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />

        {/* Fecha de salida */}
        <TextField
          fullWidth
          label="Fecha de Salida"
          type="date"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          required
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />

        {/* Habitaciones disponibles */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Número de Habitación</InputLabel>
          <Select
            value={roomNumber}
            onChange={handleRoomChange}
            label="Número de Habitación"
            required
          >
            {availableRooms.length > 0 ? (
              availableRooms.map((room) => (
                <MenuItem key={room} value={room}>
                  {room}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">No hay habitaciones disponibles</MenuItem>
            )}
          </Select>
        </FormControl>

        {/* Monto total */}
        <TextField
          fullWidth
          label="Tarifa de la Habitacion"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)} // Permite editar manualmente si es necesario
          required
          margin="normal"
        />

        {/* Otros campos del formulario */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Empleado</InputLabel>
          <Select
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            label="Empleado"
            required
          >
            {employees.map((employee) => (
              <MenuItem key={employee} value={employee}>
                {employee}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Nombre del Cliente"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          margin="normal"
        />

        <TextField
          fullWidth
          label="Número de personas"
          type="number"
          value={numberOfGuests}
          onChange={(e) => setNumberOfGuests(e.target.value)}
          min="1"
          required
          margin="normal"
        />

        <TextField
          fullWidth
          label="DNI o RUT"
          value={dniOrRut}
          onChange={(e) => setDniOrRut(e.target.value)}
          required
          margin="normal"
        />

        <TextField
          fullWidth
          label="Teléfono (Opcional)"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Metodo de Pago</InputLabel>
          <Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            label="Metodo de Pago"
          >
            <MenuItem value="efectivo">Efectivo</MenuItem>
            <MenuItem value="transferencia">Transferencia</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Cantidad Abonado de forma Externa"
          value={señado}
          onChange={(e) => setSeñado(e.target.value)}
          margin="normal"
        />
        {loading && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(255, 255, 255, 0.7)", // Fondo semitransparente
              zIndex: 9999, // Encima de otros elementos
            }}
          >
            <CircularProgress />
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Confirmar Reserva
        </Button>
      </form>

      {errorMessage && (
        <Typography variant="body1" color="error" align="center" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      )}
    </Container>
  );
};

export default ReservationForm;
