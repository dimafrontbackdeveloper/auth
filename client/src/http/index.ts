import axios from 'axios';
import { AuthResponce } from '../store/types/auth-types';

const API_URL: string = 'http://localhost:5000/api/';

export const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  withCredentials: true, // к каждому запросу цепляеться кука
});

// к каждому запросу цепляеться в headers.Authorization наш access token
axiosInstance.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
});
