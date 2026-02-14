import api from '../api/axios';

const authService = {
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        if (response.data.success) {
            const { token, user } = response.data.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
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
