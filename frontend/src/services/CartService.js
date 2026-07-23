import { API } from "../constants/apiURL";

const getAuthHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (typeof localStorage !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return headers;
};

export const getCartByAccount = async (accountId) => {
  const url = accountId
    ? `${API.BASE_API_URL}${API.GET_CART_BY_ACCOUNT(accountId)}`
    : `${API.BASE_API_URL}${API.GET_CART}`;

  const response = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return await response.json();
};

export const createCart = async (accountId, items) => {
  const response = await fetch(`${API.BASE_API_URL}${API.CREATE_CART}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ accountId, items }),
  });
  return await response.json();
};

export const updateCart = async (accountId, items) => {
  const response = await fetch(`${API.BASE_API_URL}api/cart/${accountId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ accountId, items }),
  });
  return await response.json();
};

export const addItemToCart = async (accountId, productId, quantity = 1) => {
  const response = await fetch(`${API.BASE_API_URL}api/cart/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ accountId, productId, quantity }),
  });
  return await response.json();
};

export const updateCartItem = async (itemId, quantity, accountId) => {
  const response = await fetch(`${API.BASE_API_URL}api/cart/items/${itemId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ quantity, accountId }),
  });
  return await response.json();
};

export const removeCartItem = async (itemId, accountId) => {
  const response = await fetch(`${API.BASE_API_URL}api/cart/items/${itemId}?accountId=${accountId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return await response.json();
};

export const clearCartByAccount = async (accountId) => {
  const response = await fetch(`${API.BASE_API_URL}api/cart?accountId=${accountId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return await response.json();
};
