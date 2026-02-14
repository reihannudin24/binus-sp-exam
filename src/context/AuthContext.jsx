import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            setUser({ ...JSON.parse(userData), token });
        } else if (token) {
            // Fallback if only token exists
            setUser({ token });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const data = await authService.login(email, password);
            if (data.success) {
                const { token, user } = data.data;
                setUser({ ...user, token });
                return { success: true };
            } else {
                return { success: false, message: 'Login failed' };
            }
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (name, email, password) => {
        try {
            const data = await authService.register(name, email, password);
            return { success: true, data };
        } catch (error) {
            console.error("Register error:", error);
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    }

    const logout = () => {
        authService.logout();
        localStorage.removeItem('user');
        setUser(null);
    };

    const value = {
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
