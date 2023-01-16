import axios from "axios";
import { getCookie, TOKEN_COOKIE_NAME } from "./cookie.service";

export const axiosClient = axios.create({
  baseURL: process.env.BASE_URL
    ? `${process.env.BASE_URL}/api`
    : "http://localhost:3000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: getCookie(TOKEN_COOKIE_NAME) ?? "",
    "Access-Control-Allow-Credentials": true,
  },
  withCredentials: true,
});
