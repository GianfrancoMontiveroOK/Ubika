import axios from "./axios";

export const registerRequest = (user) => axios.post("/register", user);

export const loginRequest = (user) => axios.post("/login", user);

export const logoutRequest = (user) => axios.post("/logout", user);

export const orderRequest = (body) => axios.post("/createorder", body);

export const verifyTokenRequest = () => axios.get("/verify");

export const keepAliveRequest = () => axios.get("/keep-alive");
