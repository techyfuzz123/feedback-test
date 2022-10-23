import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  crossDomain: true,
});

module.exports = instance;
