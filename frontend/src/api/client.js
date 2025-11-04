import axios from "axios";

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_BASE_URL || "https://finza-26h9.onrender.com") + "/api"
});



export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export const getCurrencies = async () => {
  const { data } = await api.get("/config/currencies");
  return data.data;
};

export const fetchInvoices = async () => {
  const { data } = await api.get("/invoices");
  return data.data;
};

export const createInvoice = async (payload) => {
  const { data } = await api.post("/invoices", payload);
  return data.data;
};

export const fetchExpenses = async () => {
  const { data } = await api.get("/expenses");
  return data.data;
};

export const createExpense = async (payload) => {
  const { data } = await api.post("/expenses", payload);
  return data.data;
};

export const getVatReport = async (vatRate) => {
  const { data } = await api.get("/reports/vat", { params: { vatRate } });
  return data.data;
};

export const getProfitReport = async () => {
  const { data } = await api.get("/reports/profit");
  return data.data;
};

export const requestGoogleSignIn = async (redirectTo) => {
  const { data } = await api.post("/auth/google", { redirectTo });
  return data.data;
};

export default api;
