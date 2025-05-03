import React, { useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Collapse,
  Typography,
} from "@mui/material";

const ReservationHistory = ({
  data = {},
  handleGenerateLink,
  handleOpenModal2,
  handleConfirmOpen,
  loading,
  message,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [openRow, setOpenRow] = useState(null);

  const parseCurrency = (value) => {
    if (typeof value === "string") {
      return parseFloat(value.replace(/[^0-9.-]+/g, "")) || 0;
    } else if (typeof value === "number") {
      return value;
    }
    return 0;
  };

  const getBackgroundColor = (estado, diferencia, seña) => {
    if (estado === "processing") return "#40E0D0";
    if (isNaN(diferencia) || seña === "none") return "#FF7F7F";
    if (diferencia > 0) return "#FFE066";
    if (diferencia === 0) return "#70DB70";
    return "transparent";
  };

  const formatDate = (date) => {
    try {
      const d = new Date(date);
      const day = String(d.getUTCDate()).padStart(2, "0");
      const month = String(d.getUTCMonth() + 1).padStart(2, "0");
      const year = d.getUTCFullYear();
      return `${day}-${month}-${year}`;
    } catch {
      return "Fecha inválida";
    }
  };

  const filterReservations = (res) => {
    const fullName = res.fullName?.toLowerCase() || "";
    const seña = parseCurrency(res["seña"]);
    const total = parseCurrency(res["amount"]);
    const diferencia = total - seña;
    const matchesSearch = fullName.includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === "paid") return diferencia === 0;
    if (filter === "owed") return diferencia > 0;
    if (filter === "unpaid") return seña === 0 || seña === "none";
    return true;
  };

  return (
    <Box
      sx={{
        maxHeight: "calc(100vh - 140px)",
        overflowY: "auto",
        backgroundColor: "#ECECEC",
        fontFamily: "'Red Hat Display', sans-serif",
      }}
    >
      {/* Buscador y Filtro */}
      <Box
        p={2}
        backgroundColor="#fff"
        display="flex"
        justifyContent="space-around"
        flexWrap="wrap"
        gap={2}
        borderRadius={2}
        mb={2}
      >
        <TextField
          label="Buscar por nombre"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel>Filtrar por estado</InputLabel>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Filtrar por estado"
          >
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="paid">Pagado</MenuItem>
            <MenuItem value="owed">Falta pagar</MenuItem>
            <MenuItem value="unpaid">No pagó</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Tabla */}
      <Paper elevation={3} sx={{ minWidth: "1000px" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[
                "Nombre",
                "In",
                "Out",
                "Habitación",
                "Noches",
                "Total",
                "Abonado",
                "Diferencia",
                "Comisión",
                "Fuente",
                "Opciones",
              ].map((title) => (
                <TableCell
                  key={title}
                  sx={{ fontWeight: "bold", fontFamily: "'Red Hat Display'" }}
                >
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.allReservations2 &&
            data.allReservations2.filter(filterReservations).length > 0 ? (
              [...data.allReservations2]
                .filter(filterReservations)
                .reverse()
                .map((res, idx) => {
                  const seña = parseCurrency(res.seña);
                  const total = parseCurrency(res.amount);
                  const diferencia = total - seña;
                  const bg = getBackgroundColor(
                    res.estado,
                    diferencia,
                    res.seña
                  );

                  return (
                    <TableRow
                      key={idx}
                      sx={{
                        backgroundColor: bg,
                        borderRadius: 2,
                        transition: "transform 0.2s ease",
                        fontFamily: "'Red Hat Display', sans-serif",
                        fontWeight: "bold",
                        "&:hover": {
                          transform: "scale(1.005)",
                          boxShadow: 3,
                        },
                      }}
                    >
                      <TableCell
                        sx={{
                          fontFamily: "'Red Hat Display', sans-serif",
                          fontWeight: "bold",
                        }}
                      >
                        {res.fullName || "No especificado"}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "'Red Hat Display', sans-serif",
                          fontWeight: "bold",
                        }}
                      >
                        {formatDate(res.startDate)}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "'Red Hat Display', sans-serif",
                          fontWeight: "bold",
                        }}
                      >
                        {formatDate(res.endDate)}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "'Red Hat Display', sans-serif",
                          fontWeight: "bold",
                        }}
                      >
                        {res.rooms?.[0]?.room || "N/A"}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "'Red Hat Display', sans-serif",
                          fontWeight: "bold",
                        }}
                      >
                        {res.rooms?.[0]?.totalNights || 1}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "'Red Hat Display', sans-serif",
                          fontWeight: "bold",
                        }}
                      >
                        {`$${total.toLocaleString()}`}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "'Red Hat Display', sans-serif",
                          fontWeight: "bold",
                        }}
                      >
                        {`$${seña.toLocaleString()}`}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "'Red Hat Display', sans-serif",
                          fontWeight: "bold",
                        }}
                      >
                        {`$${diferencia.toLocaleString()}`}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "'Red Hat Display', sans-serif",
                          fontWeight: "bold",
                        }}
                      >
                        {res.commission
                          ? `$${parseCurrency(res.commission).toLocaleString()}`
                          : "0"}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "'Red Hat Display', sans-serif",
                          fontWeight: "bold",
                        }}
                      >
                        {res.ingresoX || "N/A"}
                      </TableCell>
                      <TableCell>
                        <Box display="flex" flexDirection="column">
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() =>
                              setOpenRow(openRow === idx ? null : idx)
                            }
                            sx={{
                              fontFamily: "'Red Hat Display', sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            {openRow === idx
                              ? "Ocultar Opciones"
                              : "Mostrar Opciones"}
                          </Button>

                          <Collapse in={openRow === idx}>
                            <Box mt={1} display="flex" flexDirection="column">
                              <Button
                                sx={{
                                  my: "0.5vh",
                                  fontFamily: "'Red Hat Display', sans-serif",
                                  fontWeight: "bold",
                                }}
                                onClick={() => handleGenerateLink(res.idbeds)}
                                variant="contained"
                                color="success"
                              >
                                Link De Pago
                              </Button>
                              <Button
                                sx={{
                                  my: "0.5vh",
                                  fontFamily: "'Red Hat Display', sans-serif",
                                  fontWeight: "bold",
                                }}
                                onClick={() => handleOpenModal2(res.idbeds)}
                                variant="contained"
                                color="info"
                              >
                                Registrar Pago Manualmente
                              </Button>
                              <Button
                                sx={{
                                  my: "0.5vh",
                                  fontFamily: "'Red Hat Display', sans-serif",
                                  fontWeight: "bold",
                                }}
                                variant="contained"
                                color="error"
                                onClick={() => handleConfirmOpen(res.idbeds)}
                                disabled={loading}
                              >
                                {loading ? "Eliminando..." : "Eliminar Reserva"}
                              </Button>
                              {message && (
                                <Typography
                                  variant="body2"
                                  mt={2}
                                  sx={{
                                    fontFamily: "'Red Hat Display', sans-serif",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {message}
                                </Typography>
                              )}
                            </Box>
                          </Collapse>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  No hay reservas encontradas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default ReservationHistory;
