import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use((config) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzg2MjA4NDg0fQ.75-i8_q6ZAbn-uLvv-4pLKK6jMryZ8IQi9JoY8AQKY8";

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default api;
