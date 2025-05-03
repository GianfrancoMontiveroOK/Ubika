import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const roomStatusColors = {
  available: "#C8E6C9", // Verde claro
  occupied: "#FFCDD2", // Rojo claro
  cleaning: "#FFF9C4", // Amarillo claro
};

const RoomStatusCard = ({ room, status, onAction }) => {
  const statusColor = roomStatusColors[status] || "#E0E0E0";
  const statusIcon = {
    available: <HotelIcon color="success" />,
    occupied: <CheckCircleIcon color="error" />,
    cleaning: <CancelIcon color="warning" />,
  }[status];

  return (
    <Paper elevation={3} sx={{ padding: 2, backgroundColor: statusColor }}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>{statusIcon}</Grid>
        <Grid item xs>
          <Typography variant="h6">{room}</Typography>
          <Typography variant="body2" color="textSecondary">
            Estado: {status}
          </Typography>
        </Grid>
        <Grid item>
          <Tooltip title="Acciones">
            <Button variant="contained" onClick={() => onAction(room)}>
              Gestionar
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Paper>
  );
};

const RoomOccupancyDashboard = ({
  roomSelectList = [],
  activeReservations = [],
  handleConfirmOpen4,
  handleOpenModal3,
  handleOpenModal2,
  handleConfirmOpen,
  loading,
  message,
}) => {
  const getRoomStatus = (room) => {
    const active = activeReservations.some(
      (res) =>
        res.rooms?.[0]?.room === room && res.estadoIn?.toLowerCase() === "true"
    );
    return active ? "occupied" : "available";
  };

  const onRoomAction = (room) => {
    const res = activeReservations.find((res) => res.rooms?.[0]?.room === room);
    if (res) {
      if (res.estadoIn?.toLowerCase() === "true") {
        handleConfirmOpen4(res.idbeds);
      } else {
        handleOpenModal3(res.idbeds);
      }
    }
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("es-CL") : "N/A";

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Estado de Habitaciones
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {roomSelectList.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room}>
            <RoomStatusCard
              room={room}
              status={getRoomStatus(room)}
              onAction={onRoomAction}
            />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" gutterBottom>
        Detalles de Reservas Activas
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#eeeeee" }}>
            <TableRow>
              <TableCell>Estado</TableCell>
              <TableCell>Pago Pendiente</TableCell>
              <TableCell>Habitación</TableCell>
              <TableCell>Hora de llegada</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Fecha Retiro</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeReservations.length > 0 ? (
              activeReservations
                .filter((res) => res.estadoIn?.toLowerCase() !== "out")
                .map((res, idx) => {
                  const seña = res.seña || 0;
                  const total = res.amount || 0;
                  const diferencia = total - seña;

                  let bgColor = "#C1FFC1";
                  if (seña === 0) bgColor = "#FFC1C1";
                  else if (diferencia > 0) bgColor = "#FFFACD";

                  return (
                    <TableRow key={idx}>
                      <TableCell
                        sx={{
                          backgroundColor:
                            res.estadoIn?.toLowerCase() === "true"
                              ? "#C1FFC1"
                              : "#FFC1C1",
                        }}
                      >
                        {res.estadoIn?.toLowerCase() === "true" ? (
                          <Box textAlign="center">
                            IN
                            <Button
                              variant="outlined"
                              size="small"
                              sx={{ mt: 1 }}
                              onClick={() => handleConfirmOpen4(res.idbeds)}
                            >
                              OUT
                            </Button>
                          </Box>
                        ) : (
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleOpenModal3(res.idbeds)}
                          >
                            Marcar Ingreso
                          </Button>
                        )}
                      </TableCell>
                      <TableCell sx={{ backgroundColor: bgColor }}>
                        ${diferencia.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {res.rooms[0]?.room || "Desconocido"}
                      </TableCell>
                      <TableCell>{res.horaing || "N/A"}</TableCell>
                      <TableCell>{res.fullName}</TableCell>
                      <TableCell>{formatDate(res.endDate)}</TableCell>
                      <TableCell>
                        <Button
                          sx={{ m: 0.5 }}
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() => handleOpenModal2(res.idbeds)}
                        >
                          Pago Manual
                        </Button>
                        <Button
                          sx={{ m: 0.5 }}
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() => handleConfirmOpen(res.idbeds)}
                          disabled={loading}
                        >
                          {loading ? "..." : "Eliminar"}
                        </Button>
                        {message && (
                          <Typography variant="caption" color="textSecondary">
                            {message}
                          </Typography>
                        )}
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
      </TableContainer>
    </Box>
  );
};

export default RoomOccupancyDashboard;
