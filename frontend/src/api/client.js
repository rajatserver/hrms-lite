import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://hrms-lite-xwv3.onrender.com",
});

export default API;
