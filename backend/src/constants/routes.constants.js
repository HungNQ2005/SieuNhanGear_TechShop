const express = require("express");
const router = express.Router();

const ROUTES = {
  HEALTH: {
    BASE: '/health',
    STATUS: '/', // GET /health/
  },

  CATALOG: {
    BASE: '/api/catalog',
    BANNERS: '/banners',
    PRODUCTS: '/products',
    CATEGORIES: '/categories',
    MANUFACTURERS: '/manufacturers',
  },

  AUTH: {
    BASE: '/api/auth',
    LOGIN: '/login',
    LOGOUT: '/logout',
    REGISTER: '/register',
  },

  CART: {
    BASE: '/api/cart',
  },

  PRODUCT: {
    BASE: '/api/products',
    NULL: '/',
    GET_PRODUCT_BY_ID: '/:id',
  },

  MANUFACTURER: {
    BASE: '/api/manufacturers',
    NULL: '/',
    GET_MANUFACTURER_BY_ID: '/:id',
  },

  CATEGORY: {
    BASE: '/api/categories',
    NULL: '/',
    GET_CATEGORY_BY_ID: '/:id',
  },

  BANNER: {
    BASE: '/api/banners',
    NULL: '/',
    GET_BANNER_BY_ID: '/:id',
  },

  HOME: {
    BASE: '/api/home',
  },

  ACCOUNT: {
    BASE: '/api/accounts',
    NULL: '/',
    GET_ACCOUNT_BY_ID: '/:id',
  },
};

module.exports = { ROUTES };