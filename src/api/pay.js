import axios from "./axios";

export const createPreference = (body) => axios.post("/createorder", body);

export const datapay = (payload) => axios.post("/datapay", payload);

export const finishOrder = (payload) => axios.post("/finishorder", payload);

export const getOrders = (body) => axios.get("/orders", body);

export const generateOrderRLaxios = (body) => axios.post("/createorderRL", body);
