import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9984/api",
  withCredentials: true,
});

export default axiosInstance;
