import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000', // напрямую на бэкенд
});

// Автоматическая подстановка токена из localStorage
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- AUTH ---
export async function login(email: string, password: string) {
  console.log('Отправляем на:', 'http://localhost:3000/auth/login', { email, password });
  const res = await api.post('/auth/login', { email, password });
  return res.data;
}

export async function register(name: string, email: string, password: string) {
  console.log('Отправляем на:', 'http://localhost:3000/auth/register', { name, email, password });
  const res = await api.post('/auth/register', { name, email, password });
  return res.data;
}
