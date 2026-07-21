// api.js
import axios from 'axios';
import { API } from '../constants/apiURL';

const api = axios.create({
  baseURL: API.BASE_API_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    try {
      if (typeof localStorage !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (_) {}
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Banners
export const getBanners = () => api.get(API.GET_BANNER);
export const getBannerById = (id) => api.get(API.GET_BANNER_BY_ID(id));

// Products
export const getProducts = () => api.get(API.GET_PRODUCT);
export const getProductById = (id) => api.get(API.GET_PRODUCT_BY_ID(id));
export const createProduct = (data) => api.post(API.CREATE_PRODUCT, data);
export const updateProduct = (id, data) =>
  api.patch(API.UPDATE_PRODUCT(id), data);
export const deleteProduct = (id) => api.delete(API.DELETE_PRODUCT(id));

// Manufacturers
export const getManufacturers = () => api.get(API.GET_MANUFACTURER);
export const getManufacturerById = (id) => api.get(API.GET_MANUFACTURE_BY_ID(id));

// News
export const getNews = () => api.get(API.GET_NEWS);
export const getNewsById = (id) => api.get(API.GET_NEWS_BY_ID(id));

// Accounts
export const getAccounts = () => api.get(API.GET_ACCOUNTS);
export const getAccountById = (id) => api.get(API.GET_ACCOUNT_BY_ID(id));
export const createAccount = (data) => api.post(API.GET_ACCOUNTS, data);
export const updateAccount = (id, data) =>
  api.put(`${API.GET_ACCOUNTS}/${id}`, data);
export const deleteAccount = (id) => api.delete(`${API.GET_ACCOUNTS}/${id}`);

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
  api.put(API.UPDATE_ORDER(id), data);

export const updateOrderStatus = (id, statusId) =>
  api.put(`${API.GET_ORDERS}/${id}/status`, { statusId });

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

export const getOrdersByAccount = (accountId) =>
  api.get(API.GET_ORDER_BY_ACCOUNT(accountId));

// Vouchers
export const getVouchers = () => api.get(API.GET_VOUCHERS);
export const getVoucherById = (id) => api.get(API.GET_VOUCHER_BY_ID(id));
export const getVoucherByCode = (code) =>
  api.get(API.GET_VOUCHER_BY_CODE(code));
export const createVoucher = (voucher) => api.post(API.CREATE_VOUCHER, voucher);
export const updateVoucher = (id, voucher) =>
  api.put(API.UPDATE_VOUCHER(id), voucher);
export const deleteVoucher = (id) => api.delete(API.DELETE_VOUCHER(id));

// Payment Methods
export const getPaymentMethods = () => api.get(API.GET_PAYMENT_METHODS);
export const getPaymentMethodById = (id) =>
  api.get(API.GET_PAYMENT_METHOD_BY_ID(id));

// Address
const PROVINCE_API_BASE = "https://provinces.open-api.vn/api/v2";
export const getProvinces = async () => {
  try {
    try {
      const prox = await api.get('/api/provinces');
      return { data: prox.data };
    } catch (_) {
      const response = await axios.get(`${PROVINCE_API_BASE}/p/`, { timeout: 8000 });
      return { data: response.data };
    }
  } catch (error) {
    console.error('getProvinces error:', error?.message || error);
    return { data: [] };
  }
};

export const getWardsByProvince = async (provinceCode) => {
  try {
    try {
      const prox = await api.get(`/api/provinces/${provinceCode}/wards`);
      return { data: prox.data };
    } catch (_) {
      const response = await axios.get(`${PROVINCE_API_BASE}/p/${provinceCode}?depth=2`, { timeout: 8000 });
      const data = response.data;
      return { data: data.wards || [] };
    }
  } catch (error) {
    console.error('getWardsByProvince error:', error?.message || error);
    return { data: [] };
  }
};

// Shipping Address
export const getShippingAddresses = () => api.get(API.GET_SHIPPING_ADDRESS);
export const getShippingAddressByAccount = (accountId) =>
  api.get(API.GET_SHIPPING_ADDRESS_BY_ACCOUNT(accountId));

// Orders lookup by code
export const getOrderByCode = async (code) => {
  try {
    const orderRes = await api.get(API.GET_ORDER_BY_CODE(code));
    const orders = Array.isArray(orderRes.data)
      ? orderRes.data
      : (orderRes.data?.data ? orderRes.data.data : (orderRes.data ? [orderRes.data] : []));

    if (!orders || !orders.length || !orders[0]) return null;

    const order = orders[0];

    let orderItems = order.items || [];
    try {
      const orderItemsRes = await api.get(
        API.GET_ORDER_ITEMS_BY_ORDER(order.id)
      );
      if (Array.isArray(orderItemsRes.data) && orderItemsRes.data.length > 0) {
        orderItems = orderItemsRes.data;
      }
    } catch (e) {
      console.log("No extra order items endpoint, using embedded items", e);
    }

    let products = [];
    try {
      const productsRes = await api.get(API.GET_PRODUCT);
      products = Array.isArray(productsRes.data) ? productsRes.data : [];
    } catch (e) {
      console.log("Fetch products failed", e);
    }

    order.items = orderItems.map((item) => {
      const product = products.find(
        (p) => String(p.id || p._id) === String(item.productId || item.product_id)
      );

      return {
        ...item,
        name: item.name || product?.name || "Sản phẩm",
        image: item.image || product?.img_URL || "",
        brand: item.brand || "",
        specs: item.specs || "",
        price: item.price ?? product?.price ?? 0,
      };
    });

    return order;
  } catch (err) {
    console.error("getOrderByCode failed:", err);
    return null;
  }
};

// Inventory / Warehouses
export const getWarehouses = () => api.get(API.GET_WAREHOUSES);
export const getWarehouseById = (id) => api.get(API.GET_WAREHOUSE_BY_ID(id));

export const getStock = () => api.get(API.GET_STOCK);
export const getStockByProduct = (productId) =>
  api.get(API.GET_STOCK_BY_PRODUCT(productId));
export const getStockByWarehouse = (warehouseId) =>
  api.get(API.GET_STOCK_BY_WAREHOUSE(warehouseId));
export const updateStock = (id, data) =>
  api.patch(API.UPDATE_STOCK(id), data);

export const getStockHistory = () => api.get(API.GET_STOCK_HISTORY);
export const getStockHistoryByProduct = (productId) =>
  api.get(API.GET_STOCK_HISTORY_BY_PRODUCT(productId));
export const createStockHistory = (data) =>
  api.post(API.CREATE_STOCK_HISTORY, data);

// Specification Templates (Attribute Groups & Attributes)
export const getAttributeGroups = () => api.get(API.GET_ATTRIBUTE_GROUPS);
export const getAttributeGroupById = (id) =>
  api.get(API.GET_ATTRIBUTE_GROUP_BY_ID(id));
export const createAttributeGroup = (data) =>
  api.post(API.CREATE_ATTRIBUTE_GROUP, data);
export const updateAttributeGroup = (id, data) =>
  api.patch(API.UPDATE_ATTRIBUTE_GROUP(id), data);
export const deleteAttributeGroup = (id) =>
  api.delete(API.DELETE_ATTRIBUTE_GROUP(id));

export const getAttributes = () => api.get(API.GET_ATTRIBUTES);
export const getAttributeById = (id) => api.get(API.GET_ATTRIBUTE_BY_ID(id));
export const getAttributesByGroup = (groupId) =>
  api.get(API.GET_ATTRIBUTES_BY_GROUP(groupId));
export const createAttribute = (data) => api.post(API.CREATE_ATTRIBUTE, data);
export const updateAttribute = (id, data) =>
  api.patch(API.UPDATE_ATTRIBUTE(id), data);
export const deleteAttribute = (id) => api.delete(API.DELETE_ATTRIBUTE(id));

// Manage Showroom
export const getShowrooms = () => api.get(API.GET_SHOWROOM);
export const getShowroomById = (id) => api.get(`${API.GET_SHOWROOM}/${id}`);
export const createShowroom = (data) => api.post(API.GET_SHOWROOM, data);
export const updateShowroom = (id, data) =>
  api.put(`${API.GET_SHOWROOM}/${id}`, data);
export const deleteShowroom = (id) => api.delete(`${API.GET_SHOWROOM}/${id}`);

// Categories
export const getCategories = () => api.get(API.GET_CATEGORY);
export const getCategoryById = (id) => api.get(API.GET_CATEGORY_BY_ID(id));
export const createCategory = (data) => api.post(API.CREATE_CATEGORY, data);
export const updateCategory = (id, data) =>
  api.patch(API.UPDATE_CATEGORY(id), data);
export const deleteCategory = (id) => api.delete(API.DELETE_CATEGORY(id));

export default api;
