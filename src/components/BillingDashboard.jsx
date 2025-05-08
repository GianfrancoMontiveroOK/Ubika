import React, { useState, useEffect } from "react";
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
  Chip,
  Divider,
  Backdrop,
  Fade,
} from "@mui/material";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { addPaymentMethod } from "../api/dashboard"; // tu función de llamada al backend

const BillingDashboard = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);

  const {
    invoices = [],
    totalServicio = 0,
    totalMulta = 0,
  } = data?.billing || {};
  const ingresosGian = Number(data?.ingresosGian || 0);
  const totalDeuda = totalServicio + totalMulta + ingresosGian;

  useEffect(() => {
    initMercadoPago("APP_USR-afee0343-72e0-4f42-acef-392fbd1ebcfb", {
      locale: "es-CL",
    });
  }, []);

  const handlePaymentSubmit = async (formData) => {
    try {
      const res = await addPaymentMethod(formData);
      console.log("Respuesta del backend:", res);
      alert("Método de pago guardado correctamente");
    } catch (err) {
      console.error("Error al guardar método de pago:", err);
      alert("Ocurrió un error al guardar el método de pago.");
    } finally {
      setOpenModal(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="#903AF2">
        Panel de Facturación
      </Typography>

      <Box
        sx={{
          p: 2,
          backgroundColor: "#f7f7f7",
          borderRadius: 2,
          mb: 3,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography variant="subtitle2" color="text.secondary">
          Deuda actual: <strong>${totalDeuda.toLocaleString("es-CL")}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Deuda por servicio: ${totalServicio.toLocaleString("es-CL")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Multas por suspensión: ${totalMulta.toLocaleString("es-CL")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Comisión Ubika (5%): ${ingresosGian.toLocaleString("es-CL")}
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenModal(true)}
          sx={{ mt: 1, alignSelf: "flex-end" }}
        >
          Agregar método de pago
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#903AF2" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Fecha
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
            {invoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No hay facturas registradas.
                </TableCell>
              </TableRow>
            ) : (
              invoices
                .slice()
                .reverse()
                .map((invoice) => {
                  const today = new Date();
                  const dueDate = new Date(invoice.dueDate);
                  const daysLate =
                    invoice.status === "PENDIENTE"
                      ? Math.floor((today - dueDate) / (1000 * 60 * 60 * 24))
                      : null;
                  const formattedDate = new Date(invoice.date).toLocaleDateString("es-CL");

                  return (
                    <TableRow key={invoice._id}>
                      <TableCell>{formattedDate}</TableCell>
                      <TableCell>
                        ${invoice.amount.toLocaleString("es-CL")}
                        <Typography
                          variant="caption"
                          display="block"
                          color="text.secondary"
                        >
                          {invoice.status === "PENDIENTE" && daysLate > 0
                            ? `Hace ${daysLate} día(s)`
                            : invoice.status === "PAGADO"
                            ? "Pagado a tiempo"
                            : "Sin información"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={invoice.status}
                          color={invoice.status === "PAGADO" ? "success" : "warning"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="text"
                          color="primary"
                          onClick={() => alert(`Descargando factura ${invoice._id}`)}
                        >
                          Descargar
                        </Button>
                        <Button
                          size="small"
                          variant="text"
                          color="secondary"
                          onClick={() => alert(`Enviando factura ${invoice._id}`)}
                        >
                          Enviar Email
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal con Brick de Mercado Pago */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" mb={2}>
              Ingresar datos de la tarjeta
            </Typography>
            <Payment
              initialization={{ amount: totalDeuda || 1000 }}
              customization={{
                paymentMethods: {
                  creditCard: "all",
                  debitCard: "all",
                },
                visual: {
                  style: { theme: "default" },
                },
              }}
              onSubmit={handlePaymentSubmit}
              onReady={() => console.log("Brick cargado")}
              onError={(error) =>
                console.error("Error en Brick de Mercado Pago", error)
              }
            />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default BillingDashboard;
