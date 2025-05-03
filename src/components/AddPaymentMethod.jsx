import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Modal, Backdrop, Fade } from "@mui/material";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";

const AddPaymentMethod = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    initMercadoPago("APP_USR-afee0343-72e0-4f42-acef-392fbd1ebcfb", {
      locale: "es-AR",
    }); // Reemplaza con tu public key real
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Métodos de Pago
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ borderRadius: 2 }}
      >
        Agregar método de pago
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", md: 500 },
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Ingresar datos de la tarjeta
            </Typography>
            <Box sx={{ width: "100%" }} id="form-checkout">
              <Payment
                initialization={{ amount: 1000 }} // Valor referencial
                customization={{
                  paymentMethods: {
                    creditCard: "all",
                    debitCard: "all",
                  },
                  visual: {
                    style: { theme: "default" },
                  },
                }}
                onSubmit={(formData) => {
                  console.log("Método enviado:", formData);
                  handleClose();
                }}
                onReady={() => console.log("Brick listo")}
                onError={(error) => console.error("Error en Brick", error)}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default AddPaymentMethod;
