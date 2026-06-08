import axios from 'axios';
import { API } from '../constants/apiURL' 

const api = axios.create({
  baseURL: (API.BASE_API_URL),
  timeout: 10000,
});

export const getBanners = () => api.get(API.GET_BANNER);
export const getProducts = () => api.get(API.GET_PRODUCT);
export const getProductById = (id) => api.get(API.GET_PRODUCT_BY_ID);
export const getCategories = () => api.get(API.GET_CATEGORY);
export const getManufacturers = () => api.get(API.GET_MANUFACTURER);
export const getNews = () => api.get(API.GET_NEWS);

export default api;