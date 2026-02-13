import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEllipsisV, FaStar, FaHeadphones, FaRegClock, FaBookOpen } from 'react-icons/fa';

const CourseDetail = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white flex justify-center">
            <div className="w-full max-w-md border border-gray-200 rounded-xl overflow-hidden relative bg-white min-h-[85vh] flex flex-col">

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
                        <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center text-center p-3 border-r-4 border-gray-800">
                            <h1 className="text-white text-xl font-serif font-bold leading-tight opacity-90">
                                A <br/> <span className="text-yellow-400 italic">*New*</span> <br/> Program <br/> for <br/> Graphic <br/> Design
                            </h1>
                            <div className="mt-4 flex items-center justify-center">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500 blur-sm opacity-80"></div>
                            </div>
                            <p className="text-gray-400 text-[10px] mt-auto font-light tracking-widest uppercase">David Reinfurt</p>
                        </div>
                    </div>
                    {/* Shadow underneath */}
                    <div className="w-32 h-3 bg-black/10 blur-lg rounded-[100%] mt-4"></div>
                </div>

                {/* Content Section (Bottom Sheet) */}
                <div className="relative z-20 bg-white flex-1 rounded-t-[3rem] px-8 pt-10 pb-8 -mt-6 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] flex flex-col">

                    <div className="flex justify-between  text-start items-start mb-2">
                        <h2 className="text-xl font-bold text-gray-900 leading-tight w-3/4">
                            A New Program for Graphic Design
                        </h2>
                        <div className="flex items-center bg-yellow-50 border border-yellow-100 px-2 py-1 rounded-lg">
                            <FaStar className="text-yellow-400 mr-1" size={12} />
                            <span className="text-gray-700 font-bold text-xs">4.2</span>
                        </div>
                    </div>

                    <p className="text-gray-400  text-start  text-xs mb-6 font-medium">By David Reinfurt</p>

                    <p className="text-gray-500  text-start  text-sm leading-relaxed mb-8 line-clamp-3">
                        A New Program for Graphic Design is the first communication-design textbook expressly of and for the 21st century.
                    </p>

                    <div className="flex items-center  text-start  justify-between gap-2 mb-8 border-b border-gray-50 pb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-gray-50 rounded-full text-yellow-500">
                                <FaHeadphones size={14} />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400">Type</p>
                                <span className="text-gray-700 text-xs font-bold">Audiobook</span>
                            </div>
                        </div>
                        <div className="w-px h-8 bg-gray-100"></div>
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-gray-50 rounded-full text-yellow-500">
                                <FaRegClock size={14} />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400">Duration</p>
                                <span className="text-gray-700 text-xs font-bold">32 mins</span>
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
                        <button
                            onClick={() => navigate('/book/1/read')}
                            className="w-full cursor-pointer py-3.5 rounded-full bg-yellow-400 text-white font-bold text-sm shadow-md hover:bg-yellow-500 hover:shadow-lg transition transform active:scale-95"
                        >
                            Open the book
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;