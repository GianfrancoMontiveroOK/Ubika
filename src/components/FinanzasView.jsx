import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Bar } from "react-chartjs-2";

const FinanzasView = ({ reservations }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredReservations, setFilteredReservations] =
    useState(reservations);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(value);

  const handleFilter = () => {
    const filtered = reservations.filter((reservation) => {
      const checkInDate = new Date(reservation.startDate);
      return (
        (!startDate || checkInDate >= new Date(startDate)) &&
        (!endDate || checkInDate <= new Date(endDate))
      );
    });
    setFilteredReservations(filtered);
  };

  // Calcular valores financieros
  const Caja = filteredReservations.reduce(
    (acc, res) => acc + (res.seña || 0),
    0
  );
  const paymentsPending = filteredReservations.reduce(
    (acc, res) => acc + (res.amount - res.seña || 0),
    0
  );
  const totalIncome = filteredReservations.reduce(
    (acc, res) => acc + (res.amount || 0),
    0
  );
  const ingresosGian = filteredReservations.reduce(
    (acc, res) => acc + (res.impu || 0),
    0
  );
  const amountPendingData = filteredReservations.map((res) => ({
    name: res.fullName || "Sin Nombre",
    pending: Math.max(res.amount - res.seña, 0), // Para evitar valores negativos
    paid: Math.min(res.seña, res.amount), // Muestra lo pagado hasta el total de la reserva
  }));

  const chartData = {
    labels: amountPendingData.map((item) => item.name),
    datasets: [
      {
        label: "Pagado",
        data: amountPendingData.map((item) => item.paid),
        backgroundColor: "#4CAF50", // Verde para los pagos realizados
      },
      {
        label: "Deuda",
        data: amountPendingData.map((item) => item.pending),
        backgroundColor: "#FF5722", // Naranja para pagos pendientes
      },
    ],
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#e3f2fd",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      {/* Date Filter Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          marginBottom: 3,
        }}
      >
        <TextField
          label="Fecha Inicio"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Fecha Fin"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="primary" onClick={handleFilter}>
          Filtrar
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ backgroundColor: "#C1FFC1" }}>
              <Typography variant="h6" gutterBottom>
                Dinero en Caja
              </Typography>
              <Typography variant="body1">{formatCurrency(Caja)}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ backgroundColor: "#FFC1C1" }}>
              <Typography variant="h6" gutterBottom>
                Pagos Pendientes
              </Typography>
              <Typography variant="body1">
                {formatCurrency(paymentsPending)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ingresos Totales
              </Typography>
              <Typography variant="body1">
                {formatCurrency(totalIncome)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Costo del Servicio
              </Typography>
              <Typography variant="body1">
                {formatCurrency(ingresosGian)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid item xs={12} md={4}>
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6" gutterBottom>
            Resumen Gráfico
          </Typography>
          <Bar data={chartData} />
        </Box>
      </Grid>
    </Box>
  );
};

export default FinanzasView;
