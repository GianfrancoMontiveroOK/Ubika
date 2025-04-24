import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Link,
  IconButton,
  Grid,
  Divider,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import VisaIcon from "@mui/icons-material/CreditCard"; // You may need to import an appropriate icon
import MasterCardIcon from "@mui/icons-material/CreditCard"; // You may need to import an appropriate icon
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function Footer() {
  const handleWhatsAppClick = () => {
    window.location.href = "https://wa.me/message/HOYXZTTFNXNZH1";
  };

  return (
    <Box
      sx={{
        backgroundColor: "#6dbdb2 ",
        color: "#fff",
        padding: "2rem",
        fontFamily: "Microsoft New Tai Lue",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            sx={{
              fontFamily: "Microsoft New Tai Lue",
            }}
            v
            variant="h6"
          >
            Síguenos
          </Typography>
          <IconButton
            href="https://www.facebook.com/profile.php?id=100079304161207&locale=es_LA"
            target="_blank"
            color="inherit"
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            href="https://www.instagram.com/hostalbichon.chile/"
            target="_blank"
            color="inherit"
          >
            <InstagramIcon />
          </IconButton>

          <IconButton
            href="https://wa.me/56930138680?text=¡Hola!%20Vengo%20desde%20la%20web%20y%20me%20gustaría%20recibir%20ayuda.%20¿Podrías%20asistirme%3F"
            color="inherit"
          >
            <WhatsAppIcon />
          </IconButton>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography
            sx={{
              fontFamily: "Microsoft New Tai Lue",
            }}
            variant="h6"
          >
            Medios de Pago
          </Typography>
          <IconButton color="inherit">
            <VisaIcon />
            Visa
          </IconButton>
          <IconButton color="inherit">
            <MasterCardIcon />
            Mastercard
          </IconButton>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6">Atención al Cliente</Typography>
          <Typography>+56930138680</Typography>
          <Typography>Chile, O'Higgins, Pichilemu </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ margin: "2rem 0", backgroundColor: "white" }} />
      <Link
        href="https://hostalbichon.com/#/43748641"
        color="secondary"
        underline="none"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Typography variant="body2" align="center" sx={{ color: "#fff" }}>
          &copy; 2024 Powered By Webprofit
        </Typography>
      </Link> 
    </Box>
  );
}

export default Footer;
