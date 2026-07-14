import { API } from "../constants/apiURL";

export const login = async (email, password) => {
    const response = await fetch(`${API.BASE_API_URL}${API.LOGIN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    return result.data;

    const handleLoginSubmit = async () => {
        try {
            const user = await login(
                loginForm.email.trim(),
                loginForm.password.trim()
            );
            onLoginSuccess?.(user);
            console.log("Đăng nhập thành công", user);
            setFormError("");
            resetAndClose();
        } catch (error) {
            setFormError(error.message || t(TEXT_LOGIN_ERROR));
        }
    };
};

export const register = async (user) => {
    const response = await fetch(`${API.BASE_API_URL}${API.REGISTER}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    return result.data;

    const handleRegisterSubmit = async () => {
        try {
            if (!isRegisterFormComplete) {
                setFormError(t(TEXT_REGISTER_ERROR));
                return;
            }
            if (registerForm.password !== registerForm.confirmPassword) {
                setFormError(t(TEXT_PASSWORD_MISMATCH));
                return;
            }

            const user = await register({
                name: registerForm.name.trim(),
                email: registerForm.email.trim(),
                password: registerForm.password.trim(),
            });
            console.log("Đăng ký thành công", user);
            setFormError("");
            resetAndClose();
        } catch (error) {
            setFormError(error.message || t(TEXT_REGISTER_ERROR));
        }
    };
};