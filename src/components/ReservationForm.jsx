import React, { useState, useEffect } from "react";
import {
  Grid,
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
  Checkbox,
  FormControlLabel,
  Modal,
} from "@mui/material";
import { ReservationFormAxios, getReservesHB } from "../api/reserves";

const ReservationForm = () => {
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [employeeName, setEmployeeName] = useState("Vale");
  const [customerName, setCustomerName] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [señado, setSeñado] = useState(0);
  const [dniOrRut, setDniOrRut] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [origin, setOrigin] = useState("whatsapp");
  const [paymentStatus, setPaymentStatus] = useState("pendiente");
  const [specialRequests, setSpecialRequests] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const employees = ["Vale", "Gian", "Automático"];
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
    const selected = e.target.value;
    setRoomNumber(selected);
    setTotalAmount(roomPrices[selected] || "");
  };
  const handleGenerateLink = (bedsidselect) => {
    const baseUrl = `${window.location.origin}/#/completepay`;
    const params = new URLSearchParams({ bedsid: bedsidselect });
    const fullUrl = `${baseUrl}?${params.toString()}`;
    setGeneratedLink(fullUrl);
    setModalOpen(true);
    setCopied(false);
  };

  const fetchAvailableRooms = async (start, end) => {
    if (!start || !end || new Date(start) >= new Date(end)) return;
    try {
      const res = await getReservesHB({ startDate: start, endDate: end });
      if (res.status === 200) {
        const disponibles = res.data
          .filter((r) => r.available > 0)
          .map((r) => r.room);
        setAvailableRooms([...disponibles, 10, 7]);
      }
    } catch {
      setErrorMessage("Error al obtener habitaciones disponibles.");
    }
  };

  useEffect(() => {
    if (arrival && departure) fetchAvailableRooms(arrival, departure);
  }, [arrival, departure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const required = [
      employeeName,
      customerName,
      numberOfGuests,
      roomNumber,
      dniOrRut,
      totalAmount,
      arrival,
      departure,
    ];

    if (required.some((f) => !f)) {
      setErrorMessage("Completa los campos obligatorios.");
      setLoading(false);
      return;
    }

    const data = {
      employeeName,
      paymentMethod,
      customerName,
      numberOfGuests,
      roomNumber,
      dniOrRut,
      phoneNumber,
      email,
      origin,
      paymentStatus,
      totalAmount,
      arrival,
      departure,
      specialRequests,
      señado,
    };

    try {
      const res = await ReservationFormAxios(data);

      if (res.status === 200 && res.data?.reservation?.idbeds) {
        setSuccessMessage("Reserva registrada.");
        setAlertOpen(true);
        handleGenerateLink(res.data.reservation.idbeds); // ✅ usa correctamente el idbeds
      } else {
        setErrorMessage("Error: no se recibió un ID válido.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("No se pudo guardar la reserva.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ bgcolor: "#fff", p: 3, borderRadius: 2 }}>
      <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
        Reserva Manual
      </Typography>

      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert severity="success">Reserva creada</Alert>
      </Snackbar>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Fecha Ingreso / Salida */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Ingreso"
              type="date"
              size="small"
              margin="dense"
              InputLabelProps={{ shrink: true }}
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Salida"
              type="date"
              size="small"
              margin="dense"
              InputLabelProps={{ shrink: true }}
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              required
            />
          </Grid>

          {/* Habitación y Monto */}
          <Grid item xs={6}>
            <FormControl fullWidth size="small" margin="dense">
              <InputLabel>Habitación</InputLabel>
              <Select value={roomNumber} onChange={handleRoomChange} required>
                {availableRooms.map((room) => (
                  <MenuItem key={room} value={room}>
                    {room}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Tarifa"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              size="small"
              margin="dense"
              required
            />
          </Grid>

          {/* Cliente y DNI */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Cliente"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              size="small"
              margin="dense"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="DNI o RUT"
              value={dniOrRut}
              onChange={(e) => setDniOrRut(e.target.value)}
              size="small"
              margin="dense"
              required
            />
          </Grid>

          {/* Teléfono / Email */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Teléfono"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              size="small"
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="small"
              margin="dense"
            />
          </Grid>

          {/* Número de Personas y Empleado */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="N° Personas"
              type="number"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
              size="small"
              margin="dense"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth size="small" margin="dense">
              <InputLabel>Empleado</InputLabel>
              <Select
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                required
              >
                {employees.map((emp) => (
                  <MenuItem key={emp} value={emp}>
                    {emp}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Origen y Método de Pago */}
          <Grid item xs={6}>
            <FormControl fullWidth size="small" margin="dense">
              <InputLabel>Origen</InputLabel>
              <Select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
              >
                <MenuItem value="web">Web</MenuItem>
                <MenuItem value="booking">Booking</MenuItem>
                <MenuItem value="whatsapp">WhatsApp</MenuItem>
                <MenuItem value="presencial">Presencial</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth size="small" margin="dense">
              <InputLabel>Método de Pago</InputLabel>
              <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <MenuItem value="efectivo">Efectivo</MenuItem>
                <MenuItem value="transferencia">Transferencia</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Estado de pago y señado */}
          <Grid item xs={6}>
            <FormControl fullWidth size="small" margin="dense">
              <InputLabel>Estado del Pago</InputLabel>
              <Select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                required
              >
                <MenuItem value="pendiente">Pendiente</MenuItem>
                <MenuItem value="parcial">Parcial</MenuItem>
                <MenuItem value="pagado">Pagado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Seña"
              value={señado}
              onChange={(e) => setSeñado(e.target.value)}
              size="small"
              margin="dense"
            />
          </Grid>

          {/* Comentarios */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Solicitudes Especiales"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              multiline
              rows={2}
              size="small"
              margin="dense"
            />
          </Grid>

          {/* Aceptación */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  required
                />
              }
              label="Acepto los términos y condiciones"
            />
          </Grid>

          {/* Botón */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
              Confirmar Reserva
            </Button>
          </Grid>
        </Grid>
      </form>

      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255,255,255,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            bgcolor: "#fff",
            p: 4,
            borderRadius: 2,
            maxWidth: 400,
            mx: "auto",
            mt: "15vh",
            boxShadow: 24,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom color="success.main">
            ¡Reserva confirmada!
          </Typography>
          <Typography variant="body1" mb={2}>
            Escanea el QR o usa el enlace para pagar:
          </Typography>

          <TextField
            value={generatedLink}
            fullWidth
            InputProps={{ readOnly: true }}
            sx={{ mb: 2 }}
          />

          <Box sx={{ textAlign: "center", mb: 2 }}>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                generatedLink
              )}&size=200x200`}
              alt="QR de pago"
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              navigator.clipboard.writeText(generatedLink);
              setCopied(true);
            }}
          >
            {copied ? "¡Enlace copiado!" : "Copiar enlace"}
          </Button>

          <Button fullWidth sx={{ mt: 2 }} onClick={() => setModalOpen(false)}>
            Cerrar
          </Button>
        </Box>
      </Modal>

      {errorMessage && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      )}
    </Container>
  );
};

export default ReservationForm;
