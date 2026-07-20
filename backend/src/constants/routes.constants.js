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
  },

  CART: {
    BASE: "/api/cart",
  },

  PRODUCT: {
    BASE: "/api/products",
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
  },
};

module.exports = { ROUTES };
