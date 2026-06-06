import axios from 'axios';
import { ROUTES } from '../constants/routes' 

const api = axios.create({
  baseURL: (ROUTES.BASE_API_URL),
  timeout: 10000,
});

export const getBanners = () => api.get(ROUTES.GET_BANNER);
export const getProducts = () => api.get(ROUTES.GET_PRODUCT);
export const getProductById = (id) => api.get(ROUTES.GET_PRODUCT_BY_ID);
export const getCategories = () => api.get(ROUTES.GET_CATEGORY);
export const getManufacturers = () => api.get(ROUTES.GET_MANUFACTURER);
export const getNews = () => api.get(ROUTES.GET_NEWS);

export default api;