import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3521',
  timeout: 10000,
});

export const getBanners = () => api.get('/banners');
export const getProducts = () => api.get('/products');
export const getCategories = () => api.get('/categories');
export const getManufacturers = () => api.get('/manufacturers');

export default api;