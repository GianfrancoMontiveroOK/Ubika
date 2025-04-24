import axios from "./axios";
export const dashboardReq = (user) => {
  const payload = { user };
  return axios.post("/dashboard", payload); // ✅ orden correcto
};
