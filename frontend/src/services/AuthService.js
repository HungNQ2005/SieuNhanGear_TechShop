import { API } from "../constants/apiURL";

export const login = async (email, password) => {
    const url = API.AUTH_LOGIN ? `${API.BASE_API_URL}${API.AUTH_LOGIN}` : `${API.BASE_API_URL}api/auth/login`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || "Email hoặc mật khẩu không chính xác");
    }

    if (data && data.token && typeof localStorage !== "undefined") {
        localStorage.setItem("token", data.token);
    }

    return (data && (data.account || data.data)) ? (data.account || data.data) : null;
};

export const register = async (user) => {
    const url = API.AUTH_REGISTER ? `${API.BASE_API_URL}${API.AUTH_REGISTER}` : `${API.BASE_API_URL}api/auth/register`;
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || "Registration failed");
    }

    if (data && data.token && typeof localStorage !== "undefined") {
        localStorage.setItem("token", data.token);
    }

    return (data && (data.account || data.data)) ? (data.account || data.data) : null;
};

export const forgotPassword = async (email, newPassword) => {
    const url = API.AUTH_FORGOT_PASSWORD ? `${API.BASE_API_URL}${API.AUTH_FORGOT_PASSWORD}` : `${API.BASE_API_URL}api/auth/forgot-password`;
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || "Đặt lại mật khẩu thất bại");
    }

    return data;
};