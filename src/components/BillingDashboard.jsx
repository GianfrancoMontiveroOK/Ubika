import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TextField,
  Grid,
} from "@mui/material";
import AddPaymentMethod from "./AddPaymentMethod";

const BillingDashboard = ({ invoices = [] }) => {
  const [openModal, setOpenModal] = useState(false);
  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleDownload = (invoiceId) => {
    alert(`Descargando factura ${invoiceId}`);
  };

  const handleSendEmail = (invoiceId) => {
    alert(`Enviando factura ${invoiceId} por correo`);
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardSubmit = () => {
    // Aquí iría la integración real con pasarela de pago
    console.log("Tarjeta cargada:", cardData);
    alert("Método de pago agregado exitosamente.");
    handleCloseModal();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Facturación
      </Typography>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Facturación
        </Typography>

        <AddPaymentMethod />
        {/* ...resto del dashboard */}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#903AF2" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Fecha
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Cliente
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Monto
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Estado
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Opciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => handleDownload(invoice.id)}
                  >
                    Descargar
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => handleSendEmail(invoice.id)}
                  >
                    Enviar Email
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {invoices.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No hay facturas registradas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para agregar tarjeta */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            p: 4,
            width: 400,
            mx: "auto",
            mt: "10vh",
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" mb={2}>
            Agregar Tarjeta de Débito o Crédito
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre del Titular"
                fullWidth
                name="name"
                value={cardData.name}
                onChange={handleCardChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Número de Tarjeta"
                fullWidth
                name="number"
                value={cardData.number}
                onChange={handleCardChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Vencimiento (MM/AA)"
                fullWidth
                name="expiry"
                value={cardData.expiry}
                onChange={handleCardChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CVV"
                fullWidth
                name="cvv"
                value={cardData.cvv}
                onChange={handleCardChange}
              />
            </Grid>
          </Grid>
          <Box mt={3} display="flex" justifyContent="space-between">
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCardSubmit}
            >
              Agregar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default BillingDashboard;
