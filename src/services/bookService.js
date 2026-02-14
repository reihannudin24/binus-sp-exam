import api from '../api/axios';

const bookService = {
    getAllBooks: async () => {
        const response = await api.get('/books');
        return response.data;
    },

    getBookBySlug: async (slug) => {
        const response = await api.get(`/books/${slug}`);
        return response.data;
    },

    rentBook: async (id) => {
        const response = await api.post(`/books/${id}/rent`);
        return response.data;
    },

    getMyRentals: async () => {
        const response = await api.get('/books/user/my-rentals');
        return response.data;
    },

    createBook: async (data) => {
        const response = await api.post('/books', data);
        return response.data;
    },

    updateBook: async (id, data) => {
        const response = await api.put(`/books/${id}`, data);
        return response.data;
    },

    deleteBook: async (id) => {
        const response = await api.delete(`/books/${id}`);
        return response.data;
    }
};

export default bookService;
