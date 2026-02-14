import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import bookService from '../services/bookService';

const AdminBooks = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [currentBookId, setCurrentBookId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        stock: 0,
        category: ''
    });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await bookService.getAllBooks();
            setBooks(response.data || []);
        } catch (error) {
            console.error("Failed to fetch books", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'stock' ? parseInt(value) || 0 : value
        }));
    };

    const openAddModal = () => {
        setIsEditing(false);
        setFormData({ title: '', author: '', description: '', stock: 0, category: '' });
        setShowModal(true);
    };

    const openEditModal = (book) => {
        setIsEditing(true);
        setCurrentBookId(book.id);
        setFormData({
            title: book.title,
            author: book.author,
            description: book.description,
            stock: book.stock,
            category: book.category
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await bookService.updateBook(currentBookId, formData);
            } else {
                await bookService.createBook(formData);
            }
            setShowModal(false);
            fetchBooks();
        } catch (error) {
            console.error("Failed to save book", error);
            alert("Failed to save book");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            try {
                await bookService.deleteBook(id);
                fetchBooks();
            } catch (error) {
                console.error("Failed to delete book", error);
                alert("Failed to delete book");
            }
        }
    };

    return (
        <div className="bg-white flex justify-center">
            <div className="w-full max-w-md border border-gray-200 rounded-xl overflow-hidden relative bg-white min-h-[95vh] flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-white sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/home')}
                            className="p-2 -ml-2 rounded-full hover:bg-gray-50 transition text-gray-600"
                        >
                            <FaArrowLeft />
                        </button>
                        <h3 className="text-lg font-bold text-gray-900">Admin Books</h3>
                    </div>
                    <button
                        onClick={openAddModal}
                        className="bg-yellow-400 text-white p-2 rounded-full hover:bg-yellow-500 transition shadow-md"
                    >
                        <FaPlus size={14} />
                    </button>
                </div>

                <div className="px-6 py-4 flex-1 overflow-y-auto custom-scrollbar">
                    {loading ? (
                        <div className="text-center py-10">Loading...</div>
                    ) : (
                        <div className="space-y-4 pb-20">
                            {books.map(book => (
                                <div key={book.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 hover:shadow-md transition">
                                    <div className="w-16 h-20 bg-gray-200 rounded-lg shrink-0 flex items-center justify-center">
                                        <span className="text-xs text-center p-1 font-bold text-gray-500">{book.category}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{book.title}</h4>
                                        <p className="text-xs text-gray-400">{book.author}</p>
                                        <div className="text-xs font-bold text-yellow-500 mt-1">Stock: {book.stock}</div>
                                    </div>
                                    <div className="flex flex-col gap-2 justify-center">
                                        <button
                                            onClick={() => openEditModal(book)}
                                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition"
                                        >
                                            <FaEdit size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(book.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="bg-white w-full h-[85vh] sm:h-auto sm:max-w-sm rounded-t-3xl sm:rounded-2xl p-6 flex flex-col shadow-2xl animate-slide-up sm:animate-none">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900">{isEditing ? 'Edit Book' : 'Add Book'}</h3>
                                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition">
                                    <FaTimes />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4 flex-1 overflow-y-auto pb-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Title</label>
                                    <input
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400 text-sm"
                                        placeholder="Book Title"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Author</label>
                                    <input
                                        name="author"
                                        value={formData.author}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400 text-sm"
                                        placeholder="Author Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400 text-sm resize-none"
                                        placeholder="Book Synopsis"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Stock</label>
                                        <input
                                            type="number"
                                            name="stock"
                                            value={formData.stock}
                                            onChange={handleInputChange}
                                            required
                                            min="0"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400 text-sm"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Category</label>
                                        <input
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400 text-sm"
                                            placeholder="Genre"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-yellow-400 text-white font-bold py-4 rounded-xl mt-4 hover:bg-yellow-500 transition shadow-lg active:scale-95"
                                >
                                    {isEditing ? 'Update Book' : 'Create Book'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminBooks;
