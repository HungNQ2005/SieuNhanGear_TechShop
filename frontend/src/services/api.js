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
// Checkout
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
  const response = await fetch(`${PROVINCE_API_BASE}/p/`);
  const data = await response.json();
  return { data };
};
export const getWardsByProvince = async (provinceCode) => {
  const response = await fetch(
    `${PROVINCE_API_BASE}/p/${provinceCode}?depth=2`,
  );
  const data = await response.json();
  return { data: data.wards || [] };
};
// Shipping Address
export const getShippingAddresses = () => api.get(API.GET_SHIPPING_ADDRESS);
export const getShippingAddressByAccount = (accountId) =>
  api.get(API.GET_SHIPPING_ADDRESS_BY_ACCOUNT(accountId));
// Orders

export const getOrderByCode = async (code) => {
  const orderRes = await api.get(API.GET_ORDER_BY_CODE(code));

  if (!orderRes.data.length) return null;

  const order = orderRes.data[0];

  // Lấy order items
  const orderItemsRes = await api.get(
    API.GET_ORDER_ITEMS_BY_ORDER(order.id)
  );

  // Lấy products
  const productsRes = await api.get(API.GET_PRODUCT);

  // Ghép thông tin sản phẩm
  order.items = orderItemsRes.data.map((item) => {
    const product = productsRes.data.find(
      (p) => p.id === item.productId
    );

    return {
      ...item,
      name: product?.name,
      image: product?.img_URL,
      brand: "",        // nếu chưa có manufacturer thì để tạm
      specs: "",        // nếu chưa có specs thì để tạm
      price: item.price ?? product?.price
    };
  });

  return order;
};
// ==========================
// Inventory / Warehouses
// ==========================

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

// ==========================
// Specification Templates (Attribute Groups & Attributes)
// ==========================

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

export default api;
