import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBook, FaCalendarAlt } from 'react-icons/fa';
import bookService from '../services/bookService';

const MyRentals = () => {
    const navigate = useNavigate();
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const response = await bookService.getMyRentals();
                setRentals(response.data || []);
            } catch (err) {
                console.error("Failed to fetch rentals", err);
                setError('Failed to load rentals');
            } finally {
                setLoading(false);
            }
        };

        fetchRentals();
    }, []);

    // Helper to get random color for book cover placeholder
    const getRandomColor = (id) => {
        const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
        return colors[id % colors.length] || 'bg-gray-500';
    }

    return (
        <div className="bg-white flex justify-center">
            <div className="w-full max-w-md border border-gray-200 rounded-xl overflow-hidden relative bg-white min-h-[95vh] flex flex-col">

                {/* Header */}
                <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100 bg-white sticky top-0 z-20">
                    <button
                        onClick={() => navigate('/home')}
                        className="p-2 -ml-2 rounded-full hover:bg-gray-50 transition text-gray-600"
                    >
                        <FaArrowLeft />
                    </button>
                    <h3 className="text-lg font-bold text-gray-900">My Rentals</h3>
                </div>

                <div className="px-6 py-6 flex-1 overflow-y-auto custom-scrollbar">
                    {loading ? (
                        <div className="text-center text-gray-400 py-10">Loading rentals...</div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-10">{error}</div>
                    ) : rentals.length > 0 ? (
                        <div className="space-y-4">
                            {rentals.map((rental, index) => (
                                <div key={rental.id || index} className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 hover:shadow-md transition">
                                    <div className={`w-20 h-28 shrink-0 ${getRandomColor(index)} rounded-lg shadow-sm flex items-center justify-center p-2 text-center text-white overflow-hidden`}>
                                        <span className="text-[9px] font-bold font-serif line-clamp-3">
                                            {rental.book?.title || rental.title || 'Book Title'}
                                        </span>
                                    </div>
                                    <div className="flex flex-col justify-between flex-1 py-1">
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm line-clamp-2">{rental.book?.title || rental.title}</h4>
                                            <p className="text-xs text-gray-400 mt-1">{rental.book?.author || rental.author}</p>
                                        </div>

                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                                                <FaBook size={10} />
                                                <span>Rented</span>
                                            </div>
                                            {/* If we had rent date, we could show it */}
                                            {/* <div className="text-gray-400 text-[10px] flex items-center gap-1">
                                                <FaCalendarAlt size={10} />
                                                <span>{new Date(rental.rented_at).toLocaleDateString()}</span>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                <FaBook size={24} />
                            </div>
                            <h3 className="text-gray-900 font-bold mb-1">No rentals yet</h3>
                            <p className="text-gray-400 text-xs">Books you rent will appear here</p>
                            <button
                                onClick={() => navigate('/home')}
                                className="mt-6 px-6 py-2 bg-yellow-400 text-white text-xs font-bold rounded-full hover:bg-yellow-500 transition"
                            >
                                Browse Books
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyRentals;
