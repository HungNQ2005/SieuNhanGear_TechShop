const ROUTES = {
  HEALTH: {
    BASE: "/health",
    STATUS: "/", // GET /health/
  },

  CATALOG: {
    BASE: "/api/catalog",
    BANNERS: "/banners",
    PRODUCTS: "/products",
    CATEGORIES: "/categories",
    MANUFACTURERS: "/manufacturers",
  },

  AUTH: {
    BASE: "/api/auth",
    LOGIN: "/login",
    LOGOUT: "/logout",
    REGISTER: "/register",
  },

  CART: {
    BASE: "/api/cart",
  },

  PRODUCT: {
    BASE: "/api/products",
    NULL: "/",
    GET_PRODUCT_BY_ID: "/:id",
  },

  MANUFACTURER: {
    BASE: "/api/manufacturers",
    NULL: "/",
    GET_MANUFACTURER_BY_ID: "/:id",
  },

  HOME: {
    BASE: "/api/home",
  },

  SHOWROOM: {
    BASE: "/api/showroom",
  },

  VOUCHER: {
    BASE: "/api/vouchers",
  },

  CATEGORY: {
    BASE: "/api/categories",
    NULL: "/",
    GET_CATEGORY_BY_ID: "/:id",
  },

  WAREHOUSE: {
    BASE: "/api/warehouses",
  },

  STOCK: {
    BASE: "/api/stock",
  },

  STOCK_HISTORY: {
    BASE: "/api/stock-history",
  },

  ACCOUNT: {
    BASE: "/api/accounts",
    NULL: "/",
    GET_ACCOUNT_BY_ID: "/:id",
  },

  COMMENT: {
    BASE: "/api/comments",
  },

  ORDER: {
    BASE: "/api/orders",
  },

  PROMOTION: {
    BASE: "/api/promotions",
  },

  SPECIFICATION: {
    BASE: "/api/specifications",
  },

  BANNER: {
    BASE: "/api/banners",
    NULL: "/",
    GET_BANNER_BY_ID: "/:id",
  },

  STATISTIC: {
    BASE: "/api/statistics",
  },
};

module.exports = { ROUTES };
