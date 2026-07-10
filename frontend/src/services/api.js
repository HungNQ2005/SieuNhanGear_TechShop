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


// ==========================
// Orders
// ==========================

export const getOrders = () =>
    api.get(API.GET_ORDERS);

export const getOrderById = (id) =>
    api.get(API.GET_ORDER_BY_ID(id));

export const createOrder = (data) =>
    api.post(API.CREATE_ORDER, data);

export const updateOrder = (id, data) =>
    api.patch(API.UPDATE_ORDER(id), data);

export const deleteOrder = (id) =>
    api.delete(API.DELETE_ORDER(id));

// ==========================
// Order Items
// ==========================

export const getOrderItems = () =>
    api.get(API.GET_ORDER_ITEMS);

export const getOrderItemsByOrder = (orderId) =>
    api.get(API.GET_ORDER_ITEMS_BY_ORDER(orderId));

// ==========================
// Timeline
// ==========================

export const getOrderTimeline = () =>
    api.get(API.GET_ORDER_TIMELINE);

export const getOrderTimelineByOrder = (orderId) =>
    api.get(API.GET_ORDER_TIMELINE_BY_ORDER(orderId));

// ==========================
// Order Status
// ==========================

export const getOrderStatus = () =>
    api.get(API.GET_ORDER_STATUS);

// ==========================
// Shipping
// ==========================

export const getShippingCompanies = () =>
    api.get(API.GET_SHIPPING_COMPANIES);
export default api;