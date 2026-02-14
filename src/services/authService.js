import api from '../api/axios';

const authService = {
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        if (response.data.success) {
            localStorage.setItem('token', response.data.token);
            // Store user info if available, or fetch it
            // For now, we'll just store the token and return the data
        }
        return response.data;
    },

    register: async (name, email, password) => {
        const response = await api.post('/auth/register', { name, email, password });
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    getCurrentUser: () => {
        // This is a placeholder. Without a dedicated "get me" endpoint, 
        // we might decode the token or rely on stored user data if the login response provides it.
        // For this exam, we might just check if token exists.
        return localStorage.getItem('token');
    }
};

export default authService;
