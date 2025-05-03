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
  Card,
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

const CalendarView = ({
  nextReservations,
  modalOpen,
  setModalOpen,
  selectedReservation,
  setSelectedReservation,
  selectedMonth,
  setSelectedMonth,
  expandedReservation,
  setExpandedReservation,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  isEditModalOpen,
  setIsEditModalOpen,
  modalOpen2,
  setModalOpen2,
  amount,
  setAmount,
  paymentMethod,
  setPaymentMethod,
  employee,
  setEmployee,
  generatedLink,
  setGeneratedLink,
  modalOpen3,
  setModalOpen3,
  copied,
  setCopied,
  newStartDate,
  setNewStartDate,
  newEndDate,
  setNewEndDate,
  newAmount,
  setNewAmount,
  selectedBedId,
  setSelectedBedId,
  modalOpenRoom,
  setModalOpenRoom,
  selectedRoom,
  setSelectedRoom,
}) => {
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

  const handleOpenReservation = (reservations, day) => {
    setSelectedReservation({ reservations, day });
    setModalOpen(true);
  };

  const handleExpandReservation = (reservation) => {
    setSelectedBedId(reservation.idbeds);
    setExpandedReservation(reservation);
  };

  return (
    <Box>
      <Box sx={{ mt: 1, mb: 1, ml: 1 }}>
        <Select
          value={selectedMonth.toISOString().slice(0, 7)}
          onChange={(e) => {
            const [year, month] = e.target.value.split("-");
            setSelectedMonth(new Date(parseInt(year), parseInt(month) - 1, 1));
          }}
          displayEmpty
          sx={{
            minWidth: 220,
            height: 40,
            backgroundColor: "#fff",
            color: "#565254",
            borderRadius: "8px",
            px: 2,
            fontWeight: 500,
            fontSize: "14px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            border: "1px solid #ccc",
            transition: "border 0.3s",
            "&:hover": {
              borderColor: "#903AF2",
            },
            "&.Mui-focused": {
              borderColor: "#903AF2",
            },
            "& .MuiSelect-icon": {
              color: "#565254",
            },
          }}
        >
          {[...Array(12).keys()].map((i) => {
            const month = new Date(new Date().getFullYear(), i, 1);
            return (
              <MenuItem
                key={i}
                value={month.toISOString().slice(0, 7)}
                sx={{
                  color: "#565254",
                  fontSize: "14px",
                  "&:hover": {
                    backgroundColor: "#EAF7CF",
                  },
                }}
              >
                {month.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </MenuItem>
            );
          })}
        </Select>
      </Box>

      <Box
        sx={{
          backgroundColor: "#fff",
          display: "inline-block", // ✅ Esto permite que el contenido se mida según su ancho real
          minWidth: `${daysInMonth.length * 52 + 120}px`, // ✅ Esto fuerza el ancho necesario para que no se comprima
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fff",
            height: "80vh",
            justifyContent: "space-between",
          }}
        >
          {/* Fila encabezado */}
          <Box
            sx={{
              display: "flex",
              position: "sticky",
              top: 0,
              backgroundColor: "#fff",
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                width: "120px",
                minWidth: "120px",
                textAlign: "center",
                fontWeight: "bold",
                color: "#565254",
                borderRight: "1px solid #ccc",
                alignContent: "center",
              }}
            >
              Fecha x Habitacion
            </Box>
            {daysInMonth.map((day) => (
              <Box
                key={day.toISOString()}
                sx={{
                  minWidth: "52px",
                  maxWidth: "51px",
                  height: "41px",
                  textAlign: "center",
                  fontWeight: "bold",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontSize: "10px", color: "#565254" }}
                >
                  {day
                    .toLocaleDateString("es-ES", { weekday: "short" })
                    .charAt(0)
                    .toUpperCase()}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "12px", color: "#565254" }}
                >
                  {day.getDate()}
                </Typography>
              </Box>
            ))}
          </Box>
          {Object.keys(groupedReservations).map((room) => (
            <Box
              key={room}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  minWidth: "120px",
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#903AF2",
                }}
              >
                {room}
              </Box>
              {daysInMonth.map((day) => {
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
                let statusLabel = "";

                // Entrada y salida el mismo día → mitad naranja, mitad violeta
                if (isCheckInAndCheckOut) {
                  backgroundColor =
                    "linear-gradient(90deg, #F9B27D 50%, #903AF2 50%)";
                  statusText =
                    dayReservations[0]?.fullName?.substring(0, 10) || "";
                  statusLabel = "Check-in / Check-out";

                  // Entrada → degradado de blanco a violeta
                } else if (isCheckIn) {
                  backgroundColor =
                    "linear-gradient(90deg, #F9B27D 50%, #903AF2 50%)";

                  statusText =
                    dayReservations[0]?.fullName?.substring(0, 10) || "";
                  statusLabel = "Check-in";

                  // Salida → degradado de violeta a blanco (se esfuma)
                } else if (isCheckOut) {
                  backgroundColor =
                    "linear-gradient(to right, #903AF2, #FFFFFF)";
                  statusLabel = "Check-out";

                  // Entrada nueva el mismo día de otra salida → violeta a naranja
                } else if (dayReservations.length > 1) {
                  backgroundColor =
                    "linear-gradient(to right, #903AF2, #F9B27D)";
                  statusText = "Cruzado";
                  statusLabel = "Doble flujo";

                  // Alojado completo → violeta puro
                } else if (dayReservations.length > 0) {
                  backgroundColor = "#903AF2";
                  statusText =
                    dayReservations[0]?.rooms?.[0]?.room?.substring(0, 12) ||
                    "";
                  statusLabel = "Alojado";

                  // Vacío → fondo con patrón o degradado muy claro
                } else {
                  backgroundColor =
                    "linear-gradient(to bottom, #ffffff,rgb(232, 232, 232))";
                  statusLabel = "";
                }

                return (
                  <Paper
                    key={utcDay.toISOString()}
                    sx={{
                      width: "52px", // usa el mismo ancho fijo
                      height: "40px",
                      background: backgroundColor,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "2vh",
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
                    <Typography variant="caption" sx={{ color: "#ECECEC" }}>
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
            alignItems: "flex-start",
            justifyContent: "center",
            overflow: "auto",
            p: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "1100px",
              bgcolor: "#ECECEC",
              borderRadius: 3,
              p: 3,
              boxShadow: 24,
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              color="#903AF2"
              textAlign="center"
              mb={3}
            >
              Habitación:{" "}
              {selectedReservation?.reservations?.[0]?.rooms?.[0]?.room ||
                "No Disponible"}
            </Typography>

            <Grid container spacing={3}>
              {selectedReservation.reservations.map((reservation, index) => {
                const isExpanded = expandedReservation === reservation;
                const faltaPagar = reservation.amount - reservation.seña;

                return (
                  <Grid item xs={12} key={index}>
                    <Card
                      sx={{
                        backgroundColor: "#fff",
                        borderRadius: 2,
                        p: 2,
                        boxShadow: isExpanded ? 6 : 1,
                      }}
                      onClick={() => handleExpandReservation(reservation)}
                    >
                      <Typography variant="subtitle1">
                        <strong>Huésped:</strong> {reservation.fullName}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Ingreso:</strong>{" "}
                        {reservation.startDate.slice(0, 10)}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Salida:</strong>{" "}
                        {reservation.endDate.slice(0, 10)}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Estado:</strong>{" "}
                        {reservation.estado || "Pendiente"}
                      </Typography>

                      {isExpanded && (
                        <>
                          <Divider sx={{ my: 2 }} />
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                              <Typography variant="body2">
                                <strong>Origen:</strong>{" "}
                                {reservation.ingresoX || "No especificado"}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Creada el:</strong>{" "}
                                {new Date(
                                  reservation.createdAt
                                ).toLocaleDateString()}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Teléfono:</strong>{" "}
                                {reservation.numberphone || "N/A"}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Habitación:</strong>{" "}
                                {reservation.rooms[0]?.room || "N/A"}
                              </Typography>

                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => setModalOpenRoom(true)}
                                sx={{
                                  mt: 2,
                                  fontWeight: "bold",
                                  color: "#903AF2",
                                  borderColor: "#903AF2",
                                }}
                              >
                                Cambiar Habitación
                              </Button>
                            </Grid>

                            <Grid item xs={12} md={6}>
                              <Typography variant="body2">
                                <strong>Ingreso:</strong>{" "}
                                {reservation.startDate.slice(0, 10)}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Salida:</strong>{" "}
                                {reservation.endDate.slice(0, 10)}
                              </Typography>
                              <Button
                                size="small"
                                variant="outlined"
                                sx={{
                                  mt: 2,
                                  fontWeight: "bold",
                                  color: "#EE964B",
                                  borderColor: "#EE964B",
                                }}
                                onClick={() =>
                                  handleOpenEditModal(reservation.idbeds)
                                }
                              >
                                Modificar Fechas
                              </Button>
                            </Grid>

                            <Grid item xs={12}>
                              <Divider sx={{ my: 2 }} />
                              <Typography variant="body2">
                                <strong>Precio Total:</strong> $
                                {reservation.amount}{" "}
                                <span
                                  style={{ color: "red", fontWeight: "bold" }}
                                >
                                  (Falta pagar: ${faltaPagar})
                                </span>
                              </Typography>
                              <Typography variant="body2">
                                <strong>Seña Pagada:</strong> $
                                {reservation.seña}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Impuestos Web:</strong> $
                                {reservation.impu}
                              </Typography>

                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 2,
                                  mt: 2,
                                }}
                              >
                                <Button
                                  variant="outlined"
                                  color="success"
                                  size="small"
                                  onClick={() => setModalOpen2(true)}
                                >
                                  Pago Manual
                                </Button>
                                <Button
                                  variant="contained"
                                  color="success"
                                  size="small"
                                  onClick={() =>
                                    handleGenerateLink(reservation.idbeds)
                                  }
                                >
                                  QR / LINK
                                </Button>
                              </Box>
                            </Grid>

                            <Grid
                              sx={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                                justifyItems: "center",
                              }}
                              item
                              xs={12}
                            >
                              <Divider sx={{ my: 2 }} />
                              <Typography
                                variant="caption"
                                color="textSecondary"
                              >
                                <strong>ID Reserva:</strong>{" "}
                                {reservation.reservationId} |{" "}
                                <strong>ID Beds:</strong> {reservation.idbeds}
                              </Typography>

                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() =>
                                  handleOpenDeleteModal(reservation.idbeds)
                                }
                              >
                                Eliminar Reserva
                              </Button>
                            </Grid>
                          </Grid>
                        </>
                      )}
                    </Card>
                  </Grid>
                );
              })}
            </Grid>

            <Button
              fullWidth
              variant="contained"
              sx={{
                marginTop: "30px",
                padding: "12px",
                fontWeight: "bold",
                backgroundColor: "#903AF2",
                "&:hover": { backgroundColor: "#6e2bc1" },
              }}
              onClick={() => setModalOpen(false)}
            >
              Cerrar
            </Button>
          </Box>
        </Modal>
      )}

      <Modal
        open={modalOpenRoom}
        onClose={() => setModalOpenRoom(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
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
          <Typography variant="h6">Cambiar Habitación</Typography>
          <FormControl fullWidth>
            <InputLabel>Seleccione Habitación</InputLabel>
            <Select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
            >
              {[7, 9, 10, 12, 14, 15, 16, 18, 19, 20, 21, 22].map((room) => (
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
      <Modal
        open={modalOpen3}
        onClose={() => setModalOpen3(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
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
          <Typography variant="h6">Link de Pago Generado</Typography>

          {generatedLink && <QRCodeCanvas value={generatedLink} size={200} />}

          <TextField
            value={generatedLink}
            fullWidth
            InputProps={{ readOnly: true }}
            sx={{ marginTop: "10px" }}
          />

          <Button
            variant="contained"
            color={copied ? "success" : "primary"}
            sx={{ marginTop: "10px" }}
            onClick={handleCopyLink}
          >
            {copied ? "Copiado ✅" : "Copiar Enlace"}
          </Button>

          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: "10px" }}
            onClick={() => window.open(generatedLink, "_blank")}
          >
            Ir a la Página de Pago
          </Button>

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
      <Modal
        open={modalOpen2}
        onClose={() => setModalOpen2(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
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
          <Typography variant="h6">Cargar Pago</Typography>

          <TextField
            label="Monto"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
          />

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

          <Button
            variant="contained"
            color="primary"
            onClick={handleChargePayment}
          >
            Guardar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setModalOpen2(false)}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
      <Modal open={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
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
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            ¿Eliminar esta reserva?
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "gray", marginBottom: "20px" }}
          >
            Esta acción no se puede deshacer.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCloseDeleteModal}
            >
              Cancelar
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Confirmar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CalendarView;
