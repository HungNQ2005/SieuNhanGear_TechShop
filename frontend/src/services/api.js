// api.js
import axios from 'axios';
import { API } from '../constants/apiURL';

const api = axios.create({
  baseURL: API.BASE_API_URL,
  timeout: 10000,
});

// Banners
export const getBanners = () => api.get(API.GET_BANNER);
export const getBannerById = (id) => api.get(API.GET_BANNER_BY_ID(id));

// Products
export const getProducts = () => api.get(API.GET_PRODUCT);
export const getProductById = (id) => api.get(API.GET_PRODUCT_BY_ID(id));

// Categories
export const getCategories = () => api.get(API.GET_CATEGORY);
export const getCategoryById = (id) => api.get(API.GET_CATEGORY_BY_ID(id));

// Manufacturers
export const getManufacturers = () => api.get(API.GET_MANUFACTURER);
export const getManufacturerById = (id) => api.get(API.GET_MANUFACTURE_BY_ID(id));

// News
export const getNews = () => api.get(API.GET_NEWS);
export const getNewsById = (id) => api.get(API.GET_NEWS_BY_ID(id));

// Accounts
export const getAccounts = () => api.get(API.GET_ACCOUNTS);
export const getAccountById = (id) => api.get(API.GET_ACCOUNT_BY_ID(id));

// Comments
export const getComments = () => api.get(API.GET_COMMENTS);
export const getCommentById = (id) => api.get(API.GET_COMMENT_BY_ID(id));

export default api;