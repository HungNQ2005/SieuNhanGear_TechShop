import { API } from "../constants/apiURL";

export const createCart = async (accountId, items) => {
  const response = await fetch(API.BASE_API_URL + API.CREATE_CART, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accountId, items }),
  });

  return await response.json();
};

export const updateCart = async (accountId, items) => {
  const response = await fetch(API.BASE_API_URL + API.GET_CART_BY_ACCOUNT(accountId), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accountId, items }),
  });

  return await response.json();
};

export const getCartByAccount = async (accountId) => {
  const response = await fetch(
    API.BASE_API_URL + API.GET_CART_BY_ACCOUNT(accountId)
  );

  return await response.json();
};
