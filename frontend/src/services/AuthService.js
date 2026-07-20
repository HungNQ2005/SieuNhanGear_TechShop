import { API } from "../constants/apiURL";
export const login = async (email, password) => {
    const response = await fetch(
        `${API.BASE_API_URL}api/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        }
    );

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Email hoặc mật khẩu không chính xác");
    }

    const data = await response.json();

    if (data && data.token && typeof localStorage !== "undefined") {
        localStorage.setItem("token", data.token);
    }

    return data && data.account ? data.account : null;
};

export const register = async (user) => {
    const response = await fetch(
        `${API.BASE_API_URL}api/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }
    );

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();

    if (data && data.token && typeof localStorage !== "undefined") {
        localStorage.setItem("token", data.token);
    }

    return data && data.account ? data.account : null;
};