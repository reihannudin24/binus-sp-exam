import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaQrcode, FaStar, FaHome, FaBook, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { IoSearch } from "react-icons/io5";
import bookService from '../services/bookService';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await bookService.getAllBooks();
                setBooks(response.data || []);
            } catch (err) {
                console.error("Failed to fetch books", err);
                setError('Failed to load books');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Helper to get random color for book cover placeholder
    const getRandomColor = (id) => {
        const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
        return colors[id % colors.length] || 'bg-gray-500';
    }

    return (
        <div className="bg-white flex justify-center">
            <div className="w-full max-w-md border border-gray-200 rounded-xl overflow-hidden relative bg-white min-h-[95vh] flex flex-col">

                <div className="pt-8 px-8 pb-4 flex justify-between items-start relative">
                    <div className={"text-start"}>
                        <p className="text-gray-400 text-xs text-start mb-1">Good morning</p>
                        <h1 className="text-gray-900 text-2xl font-bold">{user?.name || 'User'}</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="text-gray-400 hover:text-gray-600 transition">
                            <FaQrcode className="text-xl" />
                        </button>
                        <div
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="bg-yellow-100 px-3 py-1 rounded-full text-xs font-bold text-yellow-600 border border-yellow-200 cursor-pointer hover:bg-yellow-200 transition"
                        >
                            {user?.points || 100} PTS
                        </div>
                    </div>

                    {/* Profile Dropdown */}
                    {showProfileMenu && (
                        <div className="absolute top-16 right-8 text-left bg-white shadow-xl rounded-2xl border border-gray-100 p-4 w-64 z-50 animate-fade-in-down">
                            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-50">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                    <FaUser />
                                </div>
                                <div className="overflow-hidden">
                                    <h4 className="font-bold text-gray-900 text-sm truncate">{user?.name || 'User'}</h4>
                                    <p className="text-xs text-gray-400 truncate">{user?.email || 'user@example.com'}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600 flex items-center gap-2 transition">
                                    <FaCog className="text-gray-400" /> Settings
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-sm text-red-500 flex items-center gap-2 transition"
                                >
                                    <FaSignOutAlt /> Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Search Bar */}
                <div className="px-8 mt-2">
                    <div
                        onClick={() => navigate('/search')}
                        className="w-full px-6 py-3.5 rounded-3xl border border-gray-200 bg-white flex items-center gap-3 hover:border-yellow-400 cursor-pointer transition group"
                    >
                        <IoSearch className="text-gray-300 text-lg group-hover:text-yellow-400 transition" />
                        <span className="text-sm text-gray-400">Search books...</span>
                    </div>
                </div>

                <div
                    onClick={() => setShowProfileMenu(false)} // Close menu when clicking outside
                    className="px-8 mt-8 flex-1 pb-24 overflow-y-auto custom-scrollbar"
                >
                    <div className="flex justify-between items-end mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Featured</h2>
                        <span className="text-xs text-yellow-400 font-bold cursor-pointer">See All</span>
                    </div>

                    {loading ? (
                        <div className="text-center text-gray-400 py-10">Loading books...</div>
                    ) : error ? (
                        <div className="text-center text-red-400 py-10">{error}</div>
                    ) : (
                        <div className="space-y-4">
                            {books.length > 0 ? (
                                books.map((book, index) => (
                                    <div
                                        key={book._id || index}
                                        onClick={() => navigate(`/book/${book.slug || book._id}`)}
                                        className="group bg-white border border-gray-100 rounded-3xl p-5 flex gap-5 cursor-pointer hover:shadow-lg hover:border-yellow-200 transition duration-300 relative overflow-hidden"
                                    >
                                        <div className={`w-24 h-32 shrink-0 ${getRandomColor(index)} rounded-lg shadow-md flex flex-col items-center justify-center p-2 text-center text-white overflow-hidden relative group-hover:scale-105 transition duration-300`}>
                                            <span className="text-[10px] leading-[1.2] font-serif z-10 opacity-90 font-bold line-clamp-4">
                                                {book.title}
                                            </span>
                                        </div>

                                        <div className="flex flex-col text-start flex-1 py-1">
                                            <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1 group-hover:text-yellow-500 transition line-clamp-2">{book.title}</h3>
                                            <p className="text-gray-400 text-xs mb-auto">{book.author}</p>

                                            <div className="flex items-center gap-4 mt-3">
                                                <div className="flex items-center bg-gray-50 px-2 py-1 rounded-md">
                                                    <FaStar className="text-yellow-400 mr-1" size={10} />
                                                    <span className="text-gray-700 font-bold text-[10px]">{book.stock > 0 ? `${book.stock} Stock` : 'Out of Stock'}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <FaBook className="text-gray-300" size={10} />
                                                    <span className="text-gray-400 text-[10px] font-medium">{book.category}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-400 py-10">No books found.</div>
                            )}
                        </div>
                    )}
                </div>

                <div className="absolute bottom-6 left-8 right-8 bg-white pt-2">
                    <div className="bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] py-4 px-8 border border-gray-100 flex justify-between items-center">
                        <div className="flex flex-col   items-center gap-1 text-yellow-400 cursor-pointer">
                            <button onClick={() => navigate('/home')}><FaHome size={18} /></button>
                            <span className="text-[9px] font-bold">Home</span>
                        </div>
                        <div className="flex flex-col  items-center gap-1 text-gray-300 hover:text-yellow-400 transition cursor-pointer">
                            <button><IoSearch size={20} /></button>
                            <span className="text-[9px] font-bold hover:text-yellow-400 text-gray-400">Search</span>

                        </div>
                        <div className="flex flex-col items-center gap-1 text-gray-300 hover:text-yellow-400 transition cursor-pointer">
                            <button ><FaBook size={16} /></button>
                            <span className="text-[9px] font-bold hover:text-yellow-400 text-gray-400">My Books</span>
                        </div>
                        {/* Linked Profile Icon to Toggle Menu */}
                        <div className="flex flex-col items-center gap-1 text-gray-300 hover:text-yellow-400 transition cursor-pointer relative">
                            <button onClick={() => setShowProfileMenu(!showProfileMenu)}><FaUser size={16} /></button>
                            <span className="text-[9px] font-bold hover:text-yellow-400 text-gray-400">Profile</span>

                            {showProfileMenu && <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full absolute -bottom-2"></div>}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;