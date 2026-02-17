import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../utils/api.js";

const AuthContext = createContext(null);

const TOKEN_KEY = "proconnect_token";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch current user from stored token
    const fetchMe = useCallback(async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }
        try {
            const { data } = await api.get("/auth/me");
            setUser(data.user);
        } catch {
            localStorage.removeItem(TOKEN_KEY);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMe();
    }, [fetchMe]);

    const signup = async (username, email, password) => {
        setError(null);
        try {
            const { data } = await api.post("/auth/signup", { username, email, password });
            localStorage.setItem(TOKEN_KEY, data.token);
            setUser(data.user);
            return data.user;
        } catch (err) {
            const msg = err.response?.data?.message || "Signup failed";
            setError(msg);
            throw new Error(msg);
        }
    };

    const login = async (email, password) => {
        setError(null);
        try {
            const { data } = await api.post("/auth/login", { email, password });
            localStorage.setItem(TOKEN_KEY, data.token);
            setUser(data.user);
            return data.user;
        } catch (err) {
            const msg = err.response?.data?.message || "Login failed";
            setError(msg);
            throw new Error(msg);
        }
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
    };

    const updateProfile = async (profileData) => {
        setError(null);
        try {
            const { data } = await api.put("/profile", profileData);
            setUser(data.user);
            return data.user;
        } catch (err) {
            const msg = err.response?.data?.message || "Profile update failed";
            setError(msg);
            throw new Error(msg);
        }
    };

    const clearError = () => setError(null);

    return (
        <AuthContext.Provider
            value={{ user, loading, error, signup, login, logout, updateProfile, clearError }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
