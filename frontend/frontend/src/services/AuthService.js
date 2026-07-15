import { API } from "../constants/apiURL";
export const login = async (email, password) => {
    const response = await fetch(
        `${API.BASE_API_URL}${API.GET_ACCOUNTS}?email=${email}&password=${password}`
    );

    if (!response.ok) {
        throw new Error("Cannot connect to server");
    }

    const users = await response.json();

    return users.length > 0 ? users[0] : null;
};

export const register = async (user) => {
    const response = await fetch(
        `${API.BASE_API_URL}${API.GET_ACCOUNTS}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }
    );

    return await response.json();
};