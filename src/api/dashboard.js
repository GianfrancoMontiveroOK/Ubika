import axios from "./axios";
export const dashboardReq = (user) => {
  const payload = { user };
  return axios.post("/dashboard", payload); // ✅ orden correcto
};
export const BillingData = () => {
  return axios.get("/getbillingdata");
};
export const addPaymentMethod = () => {
  return axios.get("/addPaymentMethod");
};
