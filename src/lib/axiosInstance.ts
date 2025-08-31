import axios from 'axios';
import { error } from 'console';

export const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL || 'https://thailandcircuitgpsapi.onrender.com/api',
  timeout: 5000
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);