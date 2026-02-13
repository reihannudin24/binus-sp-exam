import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaQrcode, FaStar, FaHeadphones, FaHome, FaBook, FaUser } from 'react-icons/fa';
import { IoSearch } from "react-icons/io5";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white flex justify-center">
            <div className="w-full max-w-md border border-gray-200 rounded-xl overflow-hidden relative bg-white min-h-[95vh] flex flex-col">

                <div className="pt-8 px-8 pb-4 flex justify-between items-start">
                    <div className={"text-start"}>
                        <p className="text-gray-400 text-xs text-start mb-1">Good morning</p>
                        <h1 className="text-gray-900 text-2xl font-bold">Reihannudin</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="text-gray-400 hover:text-gray-600 transition">
                            <FaQrcode className="text-xl" />
                        </button>
                        <div className="bg-yellow-100 px-3 py-1 rounded-full text-xs font-bold text-yellow-600 border border-yellow-200">
                            100 PTS
                        </div>
                    </div>
                </div>

                {/* Search Bar - Styled to match Login/Register Inputs */}
                <div className="px-8 mt-2">
                    <div className="w-full px-6 py-3.5 rounded-3xl border border-gray-200 bg-white flex items-center gap-3 focus-within:ring-2 focus-within:ring-yellow-400 transition ">
                        <IoSearch className="text-gray-300 text-lg" />
                        <input
                            type="text"
                            placeholder="Search books..."
                            className="w-full focus:outline-none text-sm text-gray-700 placeholder-gray-300 bg-transparent"
                        />
                    </div>
                </div>

                <div className="px-8 mt-8 flex-1 pb-24">
                    <div className="flex justify-between items-end mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Featured</h2>
                        <span className="text-xs text-yellow-400 font-bold cursor-pointer">See All</span>
                    </div>

                    <div onClick={() => navigate('/course/1')} className="group bg-white border border-gray-100 rounded-3xl p-5 flex gap-5 cursor-pointer hover:shadow-lg hover:border-yellow-200 transition duration-300 relative overflow-hidden">

                        <div className="w-24 h-32 shrink-0 bg-gray-900 rounded-lg shadow-md flex flex-col items-center justify-center p-2 text-center text-white overflow-hidden relative group-hover:scale-105 transition duration-300">
                            <span className="text-[6px] leading-[1.1] font-serif z-10 opacity-80">
                                A <br /> <span className="italic">*New*</span> <br /> Program <br /> for <br /> Graphic <br /> Design
                            </span>
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500 blur-sm mt-2 z-10 opacity-70"></div>
                        </div>

                        <div className="flex flex-col  text-start flex-1 py-1">
                            <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1 group-hover:text-yellow-500 transition">A New Program for Graphic Design</h3>
                            <p className="text-gray-400 text-xs mb-auto">By David Reinfurt</p>

                            <div className="flex items-center gap-4 mt-3">
                                <div className="flex items-center bg-gray-50 px-2 py-1 rounded-md">
                                    <FaStar className="text-yellow-400 mr-1" size={10} />
                                    <span className="text-gray-700 font-bold text-[10px]">4.2</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaHeadphones className="text-gray-300" size={10} />
                                    <span className="text-gray-400 text-[10px] font-medium">Audiobook</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-6 left-8 right-8">
                    <div className="bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] py-4 px-8 border border-gray-100 flex justify-between items-center">
                        <div className="flex flex-col items-center gap-1 text-yellow-400 cursor-pointer">
                            <button><FaHome size={18} /></button>
                            <span className="text-[9px] font-bold">Home</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 text-gray-300 hover:text-yellow-400 transition cursor-pointer">
                            <button><IoSearch size={20} /></button>
                        </div>
                        <div className="flex flex-col items-center gap-1 text-gray-300 hover:text-yellow-400 transition cursor-pointer">
                            <button><FaBook size={16} /></button>
                        </div>
                        <div className="flex flex-col items-center gap-1 text-gray-300 hover:text-yellow-400 transition cursor-pointer">
                            <button><FaUser size={16} /></button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;