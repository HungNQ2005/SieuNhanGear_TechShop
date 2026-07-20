export const API = {
  //Navigate to back-end
  BASE_API_URL: "http://localhost:3521/",
  // Showroom
  GET_SHOWROOM: "api/showroom",
  GET_SHOWROOM_BY_ID: (id) => `api/showroom/${id}`,
  CREATE_SHOWROOM: "api/showroom",
  UPDATE_SHOWROOM: (id) => `api/showroom/${id}`,
  DELETE_SHOWROOM: (id) => `api/showroom/${id}`,

  GET_CATEGORY: "api/categories",
  GET_CATEGORY_BY_ID: (id) => `api/categories/${id}`,
  CREATE_CATEGORY: "api/categories",
  UPDATE_CATEGORY: (id) => `api/categories/${id}`,
  DELETE_CATEGORY: (id) => `api/categories/${id}`,

  GET_MANUFACTURER: "api/manufacturers",
  GET_MANUFACTURE_BY_ID: (id) => `api/manufacturers/${id}`,
  GET_BANNER: "api/banners",
  GET_BANNER_BY_ID: (id) => `api/banners/${id}`,
  GET_PRODUCT: "api/products",
  GET_PRODUCT_BY_ID: (id) => `api/products/${id}`,
  CREATE_PRODUCT: "api/products",
  UPDATE_PRODUCT: (id) => `api/products/${id}`,
  DELETE_PRODUCT: (id) => `api/products/${id}`,
  GET_NEWS: "api/news",
  GET_NEWS_BY_ID: (id) => `api/news/${id}`,

  // Account
  GET_ACCOUNTS: "api/accounts",
  GET_ACCOUNT_BY_ID: (id) => `api/accounts/${id}`,
  CREATE_ACCOUNT: "api/accounts",
  UPDATE_ACCOUNT: (id) => `api/accounts/${id}`,
  DELETE_ACCOUNT: (id) => `api/accounts/${id}`,

  // Auth
  AUTH_LOGIN: "api/auth/login",
  AUTH_LOGOUT: "api/auth/logout",
  AUTH_REGISTER: "api/auth/register",

  GET_COMMENTS: "api/comments",
  GET_COMMENT_BY_ID: (id) => `api/comments/${id}`,
  //Cart
  GET_CART: "api/cart",
  GET_CART_BY_ID: (id) => `api/cart/${id}`,
  GET_CART_BY_ACCOUNT: (accountId) => `api/cart?accountId=${accountId}`,
  CREATE_CART: "api/cart",
  UPDATE_CART: (id) => `api/cart/${id}`,
  DELETE_CART: (id) => `api/cart/${id}`,

  // Order
  GET_ORDERS: "api/orders",
  GET_ORDER_BY_ID: (id) => `api/orders/${id}`,

  CREATE_ORDER: "api/orders",
  UPDATE_ORDER: (id) => `api/orders/${id}`,
  DELETE_ORDER: (id) => `api/orders/${id}`,

  // Order Item
  GET_ORDER_ITEMS: "api/orderItems",
  GET_ORDER_ITEMS_BY_ORDER: (orderId) => `api/orderItems?orderId=${orderId}`,

  // Timeline
  GET_ORDER_TIMELINE: "api/orderTimeline",
  GET_ORDER_TIMELINE_BY_ORDER: (orderId) =>
    `api/orderTimeline?orderId=${orderId}`,

  // Status
  GET_ORDER_STATUS: "api/orders/statuses",

  // Shipping
  GET_SHIPPING_COMPANIES: "api/shippingCompanies",

  // Checkout
  GET_ORDERS: "api/orders",
  GET_ORDER_BY_ID: (id) => `api/orders/${id}`,
  GET_ORDER_BY_ACCOUNT: (accountId) => `api/orders?accountId=${accountId}`,
  CREATE_ORDER: "api/orders",
  UPDATE_ORDER: (id) => `api/orders/${id}`,
  DELETE_ORDER: (id) => `api/orders/${id}`,
  // Payment Methods
  GET_PAYMENT_METHODS: "api/paymentMethods",
  GET_PAYMENT_METHOD_BY_ID: (id) => `api/paymentMethods/${id}`,
  // Vouchers
  GET_VOUCHERS: "api/vouchers",
  GET_VOUCHER_BY_ID: (id) => `api/vouchers/${id}`,
  GET_VOUCHER_BY_CODE: (code) => `api/vouchers?code=${code}`,
  CREATE_VOUCHER: "api/vouchers",
  UPDATE_VOUCHER: (id) => `api/vouchers/${id}`,
  DELETE_VOUCHER: (id) => `api/vouchers/${id}`,
  // Shipping Address
  GET_SHIPPING_ADDRESS: "api/shippingAddresses",
  GET_SHIPPING_ADDRESS_BY_ACCOUNT: (accountId) =>
    `api/shippingAddresses?accountId=${accountId}`,
  //Order
  GET_ORDER: "api/orders",
  GET_ORDER_BY_ID: (id) => `api/orders/${id}`,
  GET_ORDER_BY_CODE: (code) => `api/orders?code=${code}`,

  // ==========================
  // Inventory / Warehouses
  // ==========================
  GET_WAREHOUSES: "api/warehouses",
  GET_WAREHOUSE_BY_ID: (id) => `api/warehouses/${id}`,

  GET_STOCK: "api/stock",
  GET_STOCK_BY_ID: (id) => `api/stock/${id}`,
  GET_STOCK_BY_PRODUCT: (productId) => `api/stock?productId=${productId}`,
  GET_STOCK_BY_WAREHOUSE: (warehouseId) =>
    `api/stock?warehouseId=${warehouseId}`,
  UPDATE_STOCK: (id) => `api/stock/${id}`,

  GET_STOCK_HISTORY: "api/stock-history",
  GET_STOCK_HISTORY_BY_PRODUCT: (productId) =>
    `api/stock-history?productId=${productId}`,
  CREATE_STOCK_HISTORY: "api/stock-history",

  // ==========================
  // Specification Templates (Attribute Groups & Attributes)
  // ==========================
  GET_ATTRIBUTE_GROUPS: "api/attributeGroups",
  GET_ATTRIBUTE_GROUP_BY_ID: (id) => `api/attributeGroups/${id}`,
  CREATE_ATTRIBUTE_GROUP: "api/attributeGroups",
  UPDATE_ATTRIBUTE_GROUP: (id) => `api/attributeGroups/${id}`,
  DELETE_ATTRIBUTE_GROUP: (id) => `api/attributeGroups/${id}`,

  GET_ATTRIBUTES: "api/attributes",
  GET_ATTRIBUTE_BY_ID: (id) => `api/attributes/${id}`,
  GET_ATTRIBUTES_BY_GROUP: (groupId) => `api/attributes?groupId=${groupId}`,
  CREATE_ATTRIBUTE: "api/attributes",
  UPDATE_ATTRIBUTE: (id) => `api/attributes/${id}`,
  DELETE_ATTRIBUTE: (id) => `api/attributes/${id}`,
};
