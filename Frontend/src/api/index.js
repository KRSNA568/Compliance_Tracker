import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
});

// Add a simple response interceptor for universal error handling if needed
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getClients = () => api.get('/clients');
export const createClient = (payload) => api.post('/clients', payload);
export const updateClient = (clientId, payload) => api.put(`/clients/${clientId}`, payload);
export const deleteClient = (clientId) => api.delete(`/clients/${clientId}`);

export const getTasks = (clientId, params) => api.get(`/clients/${clientId}/tasks`, { params });
export const createTask = (clientId, payload) => api.post(`/clients/${clientId}/tasks`, payload);
export const updateTask = (taskId, payload) => api.put(`/tasks/${taskId}`, payload);
export const updateTaskStatus = (taskId, status) => api.patch(`/tasks/${taskId}/status`, { status });
export const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`);

export default api;
