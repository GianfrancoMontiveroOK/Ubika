import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import PanelPage2 from "../pages/PanelPage2";

const DashboardPage = () => {
  const [alojamiento, setAlojamiento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getDashboardData } = useAuth();

  useEffect(() => {
    const cargarDashboard = async () => {
      try {
        const data = await getDashboardData();
        if (data) {
          setAlojamiento(data);
        } else {
          setError("No se encontró información del alojamiento.");
        }
      } catch (err) {
        setError("Error al cargar el dashboard.");
      } finally {
        setLoading(false);
      }
    };

    cargarDashboard();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box m={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return <PanelPage2 data={alojamiento} />;
};

export default DashboardPage;
