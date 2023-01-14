import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.BASE_URL
    ? `${process.env.BASE_URL}/api`
    : "http://localhost:3000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    // Authorization: "",
    "Access-Control-Allow-Credentials": true,
  },
  withCredentials: true,
});
