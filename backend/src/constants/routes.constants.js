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
  },

  CART: {
    BASE: '/api/cart',
  },

  PRODUCT: {
    BASE: '/api/products',
  },

  HOME: {
    BASE: '/api/home',
  },
};


module.exports = { ROUTES };

