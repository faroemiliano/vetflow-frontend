import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use((config) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzg1OTY1OTM1fQ.8vZmM15gVwtEZ5nWFg0-nJKTR0_i0pQI3twa2Y_6-lk";

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default api;
