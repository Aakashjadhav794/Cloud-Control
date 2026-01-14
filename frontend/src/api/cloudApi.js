import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Token har request ke sath bhejne ke liye
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* ---------------- AUTH ---------------- */

export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);

/* ------------- CLOUD ACCOUNTS ------------- */

export const addCloudAccount = (data) =>
  API.post("/cloud/add", data);

export const getCloudAccounts = () =>
  API.get("/cloud/list");

/* ------------------ VMs ------------------ */

export const getAllVMs = () =>
  API.get("/vm/list");

export const startVM = (provider, vmId) =>
  API.post(`/vm/start`, { provider, vmId });

export const stopVM = (provider, vmId) =>
  API.post(`/vm/stop`, { provider, vmId });

export const restartVM = (provider, vmId) =>
  API.post(`/vm/restart`, { provider, vmId });
