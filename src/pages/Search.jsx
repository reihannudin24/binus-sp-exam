import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaStar, FaBook } from 'react-icons/fa';
import bookService from '../services/bookService';

const Search = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await bookService.getAllBooks();
                const data = response.data || [];
                setBooks(data);
                setFilteredBooks(data);
            } catch (err) {
                console.error("Failed to fetch books", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    useEffect(() => {
        if (!query) {
            setFilteredBooks(books);
        } else {
            const lowerQuery = query.toLowerCase();
            const filtered = books.filter(book =>
                book.title.toLowerCase().includes(lowerQuery) ||
                book.author.toLowerCase().includes(lowerQuery) ||
                book.category?.toLowerCase().includes(lowerQuery)
            );
            setFilteredBooks(filtered);
        }
    }, [query, books]);

    const getRandomColor = (id) => {
        const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
        return colors[(id || 0) % colors.length] || 'bg-gray-500';
    }

    return (
        <div className="bg-white flex justify-center">
            <div className="w-full max-w-md border border-gray-200 rounded-xl overflow-hidden relative bg-white min-h-[95vh] flex flex-col">

                {/* Header with Search Input */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100 bg-white sticky top-0 z-20">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 -ml-2 rounded-full hover:bg-gray-50 transition text-gray-600"
                    >
                        <FaArrowLeft />
                    </button>
                    <div className="flex-1 relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
                        <input
                            autoFocus
                            type="text"
                            placeholder="Search title, author..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                        />
                    </div>
                </div>

                <div className="px-6 py-4 flex-1 overflow-y-auto custom-scrollbar">
                    {loading ? (
                        <div className="text-center text-gray-400 py-10">Loading...</div>
                    ) : filteredBooks.length > 0 ? (
                        <div className="space-y-4">
                            {filteredBooks.map((book, index) => (
                                <div
                                    key={book._id || index}
                                    onClick={() => navigate(`/book/${book.slug || book._id}`)}
                                    className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition cursor-pointer border border-transparent hover:border-gray-100"
                                >
                                    <div className={`w-16 h-20 shrink-0 ${getRandomColor(index)} rounded-md shadow-sm flex items-center justify-center p-1 text-center text-white overflow-hidden`}>
                                        <span className="text-[8px] leading-tight font-serif font-bold line-clamp-3">
                                            {book.title}
                                        </span>
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{book.title}</h4>
                                        <p className="text-xs text-gray-400 mb-2">{book.author}</p>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded flex items-center gap-1 font-bold">
                                                <FaStar size={8} /> 4.5
                                            </span>
                                            <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                                                {book.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                <FaSearch size={20} />
                            </div>
                            <h3 className="text-gray-900 font-bold mb-1">No results found</h3>
                            <p className="text-gray-400 text-xs">Try searching for a different keyword</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
