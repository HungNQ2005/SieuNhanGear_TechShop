import { API } from "../constants/apiURL";
export const login = async (email, password) => {
    try {
        const response = await fetch(`${API.BASE_API_URL}${API.AUTH_LOGIN}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            return null;
        }

        if (result.token) {
            localStorage.setItem("token", result.token);
        }

        return result.data;
    } catch (error) {
        console.error("Login error:", error);
        return null;
    }
};

export const register = async (user) => {
    try {
        const response = await fetch(`${API.BASE_API_URL}${API.AUTH_REGISTER}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || "Registration failed");
        }

        return result.data;
    } catch (error) {
        console.error("Register error:", error);
        throw error;
    }
};