import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaEllipsisV, FaStar, FaHeadphones, FaRegClock, FaBookOpen, FaBoxOpen, FaLayerGroup } from 'react-icons/fa';
import bookService from '../services/bookService';

const BookDetail = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [renting, setRenting] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await bookService.getBookBySlug(slug);
                setBook(response.data);
            } catch (err) {
                console.error("Failed to fetch book", err);
                setMessage('Failed to load book details');
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [slug]);

    const handleRent = async () => {
        if (!book) return;
        setRenting(true);
        setMessage('');
        try {
            const response = await bookService.rentBook(book.id);
            if (response.success) {
                setMessage('Book rented successfully!');
                setTimeout(() => navigate('/my-rentals'), 1500);
            } else {
                setMessage(response.message || 'Failed to rent book');
            }
        } catch (err) {
            console.error("Rent error", err);
            setMessage(err.response?.data?.message || 'Failed to rent book');
        } finally {
            setRenting(false);
        }
    };

    const getRandomColor = (id) => {
        const colors = ['bg-gray-800', 'bg-indigo-900', 'bg-blue-900', 'bg-slate-800', 'bg-stone-800'];
        return colors[(id || 0) % colors.length] || 'bg-gray-900';
    }

    if (loading) return <div className="flex justify-center items-center h-screen bg-white">Loading...</div>;
    if (!book) return <div className="flex justify-center items-center h-screen bg-white">Book not found</div>;

    return (
        <div className="bg-white flex justify-center">
            <div className="w-full max-w-md border border-gray-200 rounded-xl overflow-hidden relative bg-white min-h-[95vh] flex flex-col">

                <div className="absolute top-0 left-0 w-full h-[50%] bg-gray-50 z-0"></div>

                <div className="relative z-10 flex justify-between items-center px-8 pt-8 pb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-white p-3 rounded-full border border-gray-100 shadow-sm hover:bg-gray-50 transition text-gray-700"
                    >
                        <FaArrowLeft size={14} />
                    </button>
                    <button className="bg-white p-3 rounded-full border border-gray-100 shadow-sm hover:bg-gray-50 transition text-gray-700">
                        <FaEllipsisV size={14} />
                    </button>
                </div>

                <div className="relative z-10 flex flex-col items-center mt-4 mb-8">
                    <div className="relative w-40 h-60 shadow-2xl rounded-lg overflow-hidden transform transition hover:scale-105 duration-300">
                        <div className={`w-full h-full ${getRandomColor(book.id)} flex flex-col items-center justify-center text-center p-4 border-r-4 border-black/20`}>
                            <h1 className="text-white text-xl font-serif font-bold leading-tight opacity-90 line-clamp-4">
                                {book.title}
                            </h1>
                            <div className="mt-4 flex items-center justify-center">
                                <div className="w-6 h-6 rounded-full bg-white/10 blur-sm"></div>
                            </div>
                            <p className="text-white/60 text-[10px] mt-auto font-light tracking-widest uppercase line-clamp-1">{book.author}</p>
                        </div>
                    </div>
                    {/* Shadow underneath */}
                    <div className="w-32 h-3 bg-black/10 blur-lg rounded-[100%] mt-4"></div>
                </div>

                {/* Content Section (Bottom Sheet) */}
                <div className="relative z-20 bg-white flex-1 rounded-t-[3rem] px-8 pt-10 pb-8 -mt-6 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] flex flex-col">

                    <div className="flex justify-between text-start items-start mb-2">
                        <h2 className="text-xl font-bold text-gray-900 leading-tight w-3/4 line-clamp-2">
                            {book.title}
                        </h2>
                        <div className="flex items-center bg-yellow-50 border border-yellow-100 px-2 py-1 rounded-lg">
                            <FaStar className="text-yellow-400 mr-1" size={12} />
                            <span className="text-gray-700 font-bold text-xs">4.2</span>
                        </div>
                    </div>

                    <p className="text-gray-400 text-start text-xs mb-6 font-medium">By {book.author}</p>

                    <p className="text-gray-500 text-start text-sm leading-relaxed mb-8 line-clamp-3">
                        {book.description || "No description available for this book."}
                    </p>

                    <div className="flex items-center text-start justify-between gap-2 mb-8 border-b border-gray-50 pb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-gray-50 rounded-full text-yellow-500">
                                <FaLayerGroup size={14} />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400">Category</p>
                                <span className="text-gray-700 text-xs font-bold line-clamp-1 w-16">{book.category}</span>
                            </div>
                        </div>
                        <div className="w-px h-8 bg-gray-100"></div>
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-gray-50 rounded-full text-yellow-500">
                                <FaBoxOpen size={14} />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400">Stock</p>
                                <span className="text-gray-700 text-xs font-bold">{book.stock} Units</span>
                            </div>
                        </div>
                        <div className="w-px h-8 bg-gray-100"></div>
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-gray-50 rounded-full text-yellow-500">
                                <FaBookOpen size={14} />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400">Price</p>
                                <span className="text-gray-700 text-xs font-bold">Free</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto flex flex-col gap-3">
                        {message && (
                            <div className={`text-center text-xs font-bold ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                                {message}
                            </div>
                        )}
                        <button
                            onClick={handleRent}
                            disabled={renting || book.stock <= 0}
                            className={`w-full cursor-pointer py-3.5 rounded-full font-bold text-sm shadow-md transition transform active:scale-95 ${book.stock > 0
                                    ? 'bg-yellow-400 text-white hover:bg-yellow-500 hover:shadow-lg'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            {renting ? 'Processing...' : book.stock > 0 ? 'Rent Now' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
