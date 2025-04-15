import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://sweeft-task-server.onrender.com",
});