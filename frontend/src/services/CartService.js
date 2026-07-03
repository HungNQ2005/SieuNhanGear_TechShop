import { API } from "../constants/apiURL";

export const updateCart = async (id, data) => {
  const response = await fetch(API.BASE_API_URL + API.UPDATE_CART(id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
  export const getCartByAccount = async (accountId) => {
    const response = await fetch(
      API.BASE_API_URL + API.GET_CART_BY_ACCOUNT(accountId),
    );

    return response.json();
  };
};
