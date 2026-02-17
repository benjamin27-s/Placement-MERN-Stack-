import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    headers: { "Content-Type": "application/json" },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("proconnect_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// If 401 response, clear token and redirect to login
api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem("proconnect_token");
            // Only redirect if we're not already on auth pages
            if (
                !window.location.pathname.startsWith("/login") &&
                !window.location.pathname.startsWith("/signup")
            ) {
                window.location.href = "/login";
            }
        }
        return Promise.reject(err);
    }
);

export default api;
