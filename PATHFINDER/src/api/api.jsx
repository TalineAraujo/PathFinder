import axios from 'axios';

// Cria uma instância do axios com configurações padrão
const api = axios.create({
  baseURL: 'http://localhost:9000', // URL base para todas as requisições
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adiciona um interceptor para adicionar o token de autorização em todas as requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;


