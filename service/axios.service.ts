import axios from "axios";

const BASE_URL = process.env.BASE_URL;

export const axiosClient = axios.create({
  baseURL: BASE_URL ? `${BASE_URL}/api` : "http://localhost:3000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    // Authorization: "",
    "Access-Control-Allow-Credentials": true,
  },
  withCredentials: true,
});
