import axios from "./axios";

// Función para realizar una solicitud POST al endpoint de reservas
export const getData = (body) => axios.post("/getdata", body);
export const getDatabyID = (body) => axios.post("/getdatabyid", body);
export const getReservesHB = (body) => axios.post("/reservehb", body);
export const updateReservation = (body) =>
  axios.post("/updatereservation", body);
export const deleteReserve = (body) => axios.post("/deletereserve", body);
export const notificationSuscription = (body) =>
  axios.post("/notificationsus", body);
export const getReservesHB2 = (body) => axios.post("/reservehb2", body);
export const ReservationFormAxios = (body) =>
  axios.post("/manualreserve", body);
export const InMark = (payload) => axios.post("/updatereservation", payload);
export const ChargePayment = (payload) =>
  axios.post("/updatereservation", payload);
export const createReservationHB = (reservationData) =>
  axios.post("/create-reservehb", reservationData);
export const completePay = (reservationData) =>
  axios.post("/complete-reservehb", reservationData);
