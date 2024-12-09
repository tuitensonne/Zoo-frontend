import axios from 'axios';

// Cấu hình Axios base URL
const api = axios.create({
  baseURL: 'http://localhost:8088', // URL của NestJS
//   withCredentials: true, // Nếu sử dụng cookie hoặc JWT
});

export default api;
