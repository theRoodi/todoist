import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "0fcfa52c-cba5-484d-ae0d-56dac03d5456",
  },
});
