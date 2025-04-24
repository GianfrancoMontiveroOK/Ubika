import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Paper,
  Modal,
  Button,
  Select,
  MenuItem,
  Divider,
  Grid,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import { eachDayOfInterval, startOfMonth, endOfMonth } from "date-fns";
import { QRCodeCanvas } from "qrcode.react"; // Cambié la importación aquí
import {
  getData,
  deleteReserve,
  ChargePayment,
  InMark,
  updateReservation,
} from "../api/reserves"; // Asume que este controlador está exportado

const convertToUTCDate = (isoString) => {
  const date = new Date(isoString);
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
};

const CalendarView = ({ nextReservations }) => {
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
  const [modalOpenRoom, setModalOpenRoom] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");

  useEffect(() => {
    if (selectedReservation) {
      setNewStartDate(selectedReservation?.startDate || "");
      setNewEndDate(selectedReservation?.endDate?.slice(0, 10) || "");
      setNewAmount(selectedReservation?.amount || 0);
    }
  }, [selectedReservation]);

  const groupedReservations = nextReservations.reduce((acc, res) => {
    const room = res["rooms"]?.[0]?.room || "Habitación Desconocida";
    if (!acc[room]) acc[room] = [];
    acc[room].push(res);
    return acc;
  }, {});
  // Estilos para el modal
  const modalStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const modalContentStyles = {
    width: "400px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };
  // Generar el rango de días del mes seleccionado
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(selectedMonth),
    end: endOfMonth(selectedMonth),
  });
  // Funciones para manejar la apertura y cierre del modal de edición de fechas
  const handleOpenEditModal = (bedsid) => {
    setSelectedBedId(bedsid); // Setear el bedsid seleccionado al abrir el modal
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  // 📌 Abre el modal de confirmación y guarda el ID de la reserva a eliminar
  const handleOpenDeleteModal = (bedId) => {
    setSelectedBedId(bedId);
    setIsDeleteModalOpen(true);
  };

  // 📌 Cierra el modal sin eliminar
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
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

  const handleOpenReservation = (reservations, day) => {
    setSelectedReservation({ reservations, day });
    setModalOpen(true);
  };
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

  const handleExpandReservation = (reservation) => {
    setSelectedBedId(reservation.idbeds);
    setExpandedReservation(reservation);
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
  return (
    <Box sx={{ backgroundColor: "#fff" }}>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Calendario de Reservas
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        <Select
          value={selectedMonth.toISOString().slice(0, 7)}
          onChange={(e) => {
            const [year, month] = e.target.value.split("-");
            setSelectedMonth(new Date(parseInt(year), parseInt(month) - 1, 1));
          }}
          sx={{ minWidth: 200 }}
        >
          {[...Array(12).keys()].map((i) => {
            const month = new Date(new Date().getFullYear(), i, 1);
            return (
              <MenuItem key={i} value={month.toISOString().slice(0, 7)}>
                {month.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </MenuItem>
            );
          })}
        </Select>
      </Box>

      <Box sx={{ overflowX: "auto", whiteSpace: "nowrap" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            border: "1px solid #ccc",
            backgroundColor: "#f9f9f9",
            overflowX: "auto",
            height: "100vh",
            width: "100%",
            overflowY: "auto",
          }}
        >
          {/* Encabezado con días del mes */}
          <Box
            sx={{
              display: "flex",
              position: "sticky",
              top: 0,
              backgroundColor: "#f9f9f9",
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                minWidth: "120px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Habitación
            </Box>
            {daysInMonth.map((day, index) => (
              <Box
                key={day.toISOString()}
                sx={{
                  minWidth: "52px",
                  maxWidth: "51px",
                  height: "41px",
                  textAlign: "center",
                  fontWeight: "bold",
                  borderBottom: "1px solid #ccc",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="caption" sx={{ fontSize: "10px" }}>
                  {day
                    .toLocaleDateString("es-ES", { weekday: "short" })
                    .charAt(0)
                    .toUpperCase()}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "12px" }}>
                  {day.getDate()}
                </Typography>
              </Box>
            ))}
          </Box>
          {/* Filas de habitaciones */}
          {Object.keys(groupedReservations).map((room) => (
            <Box key={room} sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  minWidth: "120px",
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#2E8B57",
                }}
              >
                {room}
              </Box>
              {daysInMonth.map((day, index) => {
                const utcDay = new Date(
                  Date.UTC(day.getFullYear(), day.getMonth(), day.getDate())
                );

                const dayReservations = groupedReservations[room].filter(
                  (res) => {
                    const checkIn = convertToUTCDate(res["startDate"]);
                    const checkOut = convertToUTCDate(res["endDate"]);
                    return utcDay >= checkIn && utcDay <= checkOut;
                  }
                );

                const isCheckIn = dayReservations.some(
                  (res) =>
                    convertToUTCDate(res["startDate"]).getTime() ===
                    utcDay.getTime()
                );
                const isCheckOut = dayReservations.some(
                  (res) =>
                    convertToUTCDate(res["endDate"]).getTime() ===
                    utcDay.getTime()
                );
                const isOverlapping = dayReservations.length > 1;
                const isCheckInAndCheckOut = dayReservations.some((res) =>
                  dayReservations.some(
                    (otherRes) =>
                      res !== otherRes &&
                      convertToUTCDate(res["endDate"]).getTime() ===
                        convertToUTCDate(otherRes["startDate"]).getTime()
                  )
                );

                let backgroundColor;
                let statusText = "";
                if (isCheckInAndCheckOut) {
                  backgroundColor =
                    "linear-gradient(90deg, #FF6347 50%, #2E8B57 50%)";
                  statusText =
                    dayReservations.length > 0
                      ? `${dayReservations[0]["fullName"].substring(0, 12)}`
                      : "";
                } else if (isOverlapping) {
                  backgroundColor = "#FFD700";
                  statusText = "Sobreventa";
                } else if (isCheckIn) {
                  backgroundColor = "#2E8B57";
                  statusText =
                    dayReservations.length > 0
                      ? `${dayReservations[0]["fullName"].substring(0, 12)}`
                      : "";
                } else if (isCheckOut) {
                  backgroundColor = "#FF6347";
                  statusText = "";
                } else if (dayReservations.length > 0) {
                  backgroundColor = "#87CEFA";
                  statusText =
                    dayReservations.length > 0 &&
                    dayReservations[0].rooms?.length > 0
                      ? `${dayReservations[0].rooms[0].room.substring(0, 12)}`
                      : "";
                } else {
                  backgroundColor = "#A9A9A9";
                }

                return (
                  <Paper
                    key={utcDay.toISOString()}
                    sx={{
                      minWidth: "50px",
                      maxWidth: "50px",
                      height: "40px",
                      background: backgroundColor,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "2px",
                      border: "1px solid #ccc",
                      boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
                      cursor:
                        dayReservations.length > 0 ? "pointer" : "default",
                      "&:hover": {
                        transform:
                          dayReservations.length > 0 ? "scale(1.05)" : "none",
                      },
                    }}
                    onClick={() =>
                      dayReservations.length > 0 &&
                      handleOpenReservation(dayReservations, utcDay)
                    }
                  >
                    <Typography variant="caption" sx={{ color: "#fff" }}>
                      {statusText}
                    </Typography>
                  </Paper>
                );
              })}
            </Box>
          ))}
        </Box>
      </Box>

      {selectedReservation && (
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "90%",
              maxWidth: "600px",
              bgcolor: "#fff",
              borderRadius: "12px",
              boxShadow: 24,
              p: 3,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {/* 📌 Número de la Habitación en Grande y Centrado */}
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#1976d2",
                marginBottom: "16px",
              }}
            >
              Habitacion:{" "} 
              {selectedReservation?.reservations?.[0]?.rooms?.[0]?.room ||
                "No Disponible"}
            </Typography>

            {/* 📌 Listado de Reservas */}
            <Grid container spacing={2}>
              {selectedReservation.reservations.map((reservation, index) => {
                const isExpanded = expandedReservation === reservation;

                return (
                  <Grid item xs={12} key={index}>
                    <Box
                      onClick={() => handleExpandReservation(reservation)}
                      sx={{
                        cursor: "pointer",
                        padding: "12px",
                        borderRadius: "8px",
                        backgroundColor: "#f0f0f0",
                        "&:hover": { backgroundColor: "#e0e0e0" },
                        transition: "0.3s",
                      }}
                    >
                      <Typography variant="body1">
                        <strong>Huésped:</strong> {reservation["fullName"]}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Ingreso:</strong>{" "}
                        {reservation["startDate"].slice(0, 10)}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Salida:</strong>{" "}
                        {reservation["endDate"].slice(0, 10)}
                      </Typography>
                      {isExpanded && (
                        <Box
                          sx={{
                            marginTop: "8px",
                            padding: "12px",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            backgroundColor: "#fafafa",
                          }}
                        >
                          <Typography variant="body2">
                            <strong>Origen:</strong>{" "}
                            {reservation["ingresoX"] || "No especificado"}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Creada el:</strong>{" "}
                            {new Date(
                              reservation["createdAt"]
                            ).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Estado:</strong>{" "}
                            {reservation["estado"] || "Pendiente"}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Telefono:</strong>{" "}
                            {reservation["numberphone"] || "none"}
                          </Typography>
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                           <Typography variant="body2">
                             <strong>Habitación:</strong> {reservation.rooms[0]?.room || "none"}
                           </Typography>
                           <Button
                            variant="contained"
                            size="small"
                            sx={{
                              fontSize: "12px",
                              color: "#000", // Texto blanco
                              borderColor: "#FFFFFF", // Borde blanco
                              "&:hover": { backgroundColor: "#E0E0E0", borderColor: "#FFFFFF" }, // Fondo gris claro al pasar el mouse
                              ml: "auto",
                            }}
                            onClick={() => setModalOpenRoom(true)}
                           >
                              Cambiar Habitación
                            </Button>
                          </Box>

                          <Divider sx={{ marginY: "8px" }} />
                          {/* Fechas de ingreso y salida con botones de modificación */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography variant="body2">
                              <strong>Fecha de Ingreso:</strong>{" "}
                              {reservation["startDate"].slice(0, 10)}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >

                            <Typography variant="body2">
                              <strong>Fecha de Salida:</strong> {reservation["endDate"].slice(0, 10)}
                            </Typography>
                            <Button
                              size="small"
                              variant="contained"
                              sx={{
                                fontSize: "12px",
                                color: "#000", // Texto blanco
                                borderColor: "#FFFFFF", // Borde blanco
                                "&:hover": { backgroundColor: "#E0E0E0", borderColor: "#FFFFFF" }, // Fondo gris claro al pasar el mouse
                                ml: "auto",
                              }}
                              onClick={() => handleOpenEditModal(expandedReservation.idbeds)}
                            >
                                Modificar fechas
                            </Button>
                          </Box>

                          

                          <Divider sx={{ marginY: "8px" }} />
                          {/* Información de pagos con diferencia de saldo */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography variant="body2">
                              <strong>Precio Total:</strong> $
                              {reservation["amount"]}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "bold", color: "red" }}
                            >
                              (Falta pagar: $
                              {reservation["amount"] - reservation["seña"]})
                            </Typography>
                            <Button
                              size="small"
                              variant="outlined"
                              color="success"
                              onClick={() => setModalOpen2(true)}
                            >
                              Pago Manual
                            </Button>
                            <Button
                              variant="contained"
                              color="success"
                              sx={{ marginTop: "10px", fontWeight: "bold" }}
                              onClick={() =>
                                handleGenerateLink(expandedReservation.idbeds)
                              }
                            >
                              QR / LINK
                            </Button>
                          </Box>
                          <Typography variant="body2">
                            <strong>Seña Pagada:</strong> ${reservation["seña"]}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Impuestos Web:</strong> $
                            {reservation["impu"]}
                          </Typography>
                          <Divider sx={{ marginY: "8px" }} />
                          {/* ID de la reserva */}
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "10px", color: "#666" }}
                          >
                            <strong>ID de Reserva:</strong>{" "}
                            {reservation["reservationId"]}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "10px", color: "#666" }}
                          >
                            <strong>ID Beds:</strong> {reservation["idbeds"]}
                          </Typography>
                          <Divider sx={{ marginY: "8px" }} />
                          {/* Botón de eliminar reserva */}
                          <Button
                            sx={{
                              margin: "1vh",
                              backgroundColor: "red",
                              color: "white",
                              "&:hover": { backgroundColor: "darkred" },
                            }}
                            variant="contained"
                            onClick={() =>
                              handleOpenDeleteModal(expandedReservation.idbeds)
                            } // 📌 Obtiene el `idbeds`
                          >
                            Eliminar Reserva
                          </Button>
                          {/* MODAL PARA QR Y LINK DE PAGO */}
                          <Modal
                            open={modalOpenRoom}
                            onClose={() => setModalOpenRoom(false)}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Box
                              sx={{
                                width: "400px",
                                padding: "20px",
                                backgroundColor: "#fff",
                                borderRadius: "8px",
                                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px",
                              }}
                            >
                              <Typography variant="h6" gutterBottom>
                                Cambiar Habitación
                              </Typography>
                              <FormControl fullWidth>
                                <InputLabel>Seleccione Habitación</InputLabel>
                                <Select
                                  value={selectedRoom}
                                  onChange={(e) =>
                                    setSelectedRoom(e.target.value)
                                  }
                                >
                                  {[
                                    7, 9, 10, 12, 14, 15, 16, 18, 19, 20, 21,
                                    22,
                                  ].map((room) => (
                                    <MenuItem key={room} value={room}>
                                      {room}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleUpdateRoomName}
                              >
                                Guardar
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => setModalOpenRoom(false)}
                              >
                                Cerrar
                              </Button>
                            </Box>
                          </Modal>
                          {/* MODAL PARA QR Y LINK DE PAGO */}
                          <Modal
                            open={modalOpen3}
                            onClose={() => setModalOpen3(false)}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Box
                              sx={{
                                width: "400px",
                                padding: "20px",
                                backgroundColor: "#fff",
                                borderRadius: "8px",
                                textAlign: "center",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <Typography variant="h6" gutterBottom>
                                Link de Pago Generado
                              </Typography>

                              {/* QR Code generado con el enlace */}
                              {generatedLink && (
                                <QRCodeCanvas
                                  value={generatedLink}
                                  size={200}
                                />
                              )}

                              {/* Campo de texto con el enlace */}
                              <TextField
                                value={generatedLink}
                                fullWidth
                                InputProps={{ readOnly: true }}
                                sx={{ marginTop: "10px" }}
                              />

                              {/* Botón para copiar el enlace */}
                              <Button
                                variant="contained"
                                color={copied ? "success" : "primary"}
                                sx={{ marginTop: "10px" }}
                                onClick={handleCopyLink}
                              >
                                {copied ? "Copiado ✅" : "Copiar Enlace"}
                              </Button>

                              {/* Botón para ir a la página de pago */}
                              <Button
                                variant="contained"
                                color="secondary"
                                sx={{ marginTop: "10px" }}
                                onClick={() =>
                                  window.open(generatedLink, "_blank")
                                }
                              >
                                Ir a la Página de Pago
                              </Button>

                              {/* Botón para cerrar el modal */}
                              <Button
                                variant="contained"
                                color="secondary"
                                sx={{ marginTop: "10px" }}
                                onClick={() => setModalOpen3(false)}
                              >
                                Cerrar
                              </Button>
                            </Box>
                          </Modal>
                          {/* MODAL PARA PAGO MANUAL */}
                          <Modal
                            open={modalOpen2}
                            onClose={() => setModalOpen2(false)}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Box
                              sx={{
                                width: "400px",
                                padding: "20px",
                                backgroundColor: "#fff",
                                borderRadius: "8px",
                                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px",
                              }}
                            >
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
                                  onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                  }
                                >
                                  <MenuItem value="transferencia">
                                    Transferencia
                                  </MenuItem>
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
                                onClick={handleChargePayment}
                              >
                                Guardar
                              </Button>
                              ;{/* Botón para cerrar */}
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => setModalOpen2(false)}
                              >
                                Cerrar
                              </Button>
                            </Box>
                          </Modal>
                          {/* MODAL PARA EDITAR FECHAS Y MONTO */}
                          <Modal
                            open={isEditModalOpen}
                            onClose={handleCloseEditModal}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                maxWidth: "80vh",
                                backgroundColor: "#fff",
                                boxShadow: 24,
                                p: 4,
                                borderRadius: 2,
                              }}
                            >
                              <Typography variant="h6">
                                Modificar Reserva
                              </Typography>
                              <TextField
                                label="Fecha de Ingreso"
                                type="date"
                                fullWidth
                                margin="normal"
                                value={newStartDate}
                                onChange={(e) =>
                                  setNewStartDate(e.target.value)
                                }
                                InputLabelProps={{ shrink: true }}
                              />
                              <TextField
                                label="Fecha de Salida"
                                type="date"
                                fullWidth
                                margin="normal"
                                value={newEndDate}
                                onChange={(e) => setNewEndDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                              />
                              <TextField
                                label="Monto Total"
                                type="number"
                                fullWidth
                                margin="normal"
                                value={newAmount}
                                onChange={(e) => setNewAmount(e.target.value)}
                              />
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  marginTop: 2,
                                }}
                              >
                                <Button
                                  variant="contained"
                                  onClick={handleCloseEditModal}
                                >
                                  Cancelar
                                </Button>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={handleUpdateReservation}
                                >
                                  Guardar
                                </Button>
                              </Box>
                            </Box>
                          </Modal>
                          {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
                          <Modal
                            open={isDeleteModalOpen}
                            onClose={handleCloseDeleteModal}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 300,
                                backgroundColor: "whitesmoke",
                                boxShadow: 24,
                                p: 4,
                                borderRadius: 2,
                                textAlign: "center",
                              }}
                            >
                              <Typography
                                variant="h6"
                                sx={{ marginBottom: "10px" }}
                              >
                                ¿Eliminar esta reserva?
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "gray", marginBottom: "20px" }}
                              >
                                Esta acción no se puede deshacer.
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  onClick={handleCloseDeleteModal}
                                >
                                  Cancelar
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={handleDelete} // 📌 Llama a la función de eliminación
                                >
                                  Confirmar
                                </Button>
                              </Box>
                            </Box>
                          </Modal>
                        </Box>
                      )}
                    </Box>

                    {/* 📌 Información Detallada al hacer Clic */}

                    <Divider sx={{ marginY: "8px" }} />
                  </Grid>
                );
              })}
            </Grid>

            {/* 📌 Botón para Cerrar */}
            <Button
              onClick={() => setModalOpen(false)}
              variant="contained"
              fullWidth
              sx={{
                marginTop: "20px",
                padding: "10px",
                fontWeight: "bold",
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              Cerrar
            </Button>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default CalendarView;
