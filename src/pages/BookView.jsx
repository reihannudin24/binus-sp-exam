import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSun } from 'react-icons/fa';
import { MdGraphicEq } from "react-icons/md";

const BookView = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white flex justify-center">
            <div className="w-full max-w-md text-start bg-white rounded-3xl overflow-hidden relative h-[90vh] flex flex-col border border-gray-200">
                <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-20">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 -ml-2 rounded-full hover:bg-gray-50 transition text-gray-600"
                    >
                        <FaArrowLeft />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-14 bg-black rounded shadow-md flex flex-col items-center justify-center p-1 overflow-hidden shrink-0">
                            <span className="text-[4px] text-white text-center leading-tight font-serif">
                                A <br /> *New* <br /> Program <br /> for <br /> Graphic <br /> Design
                            </span>
                            <div className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500 blur-[1px] mt-1"></div>
                        </div>

                        <div className="flex flex-col">
                            <h3 className="text-sm font-bold text-gray-900 leading-tight line-clamp-1">A New Program for Graphic Design</h3>
                            <p className="text-xs text-gray-400 mt-0.5">By David Reinfurt</p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
                    <div className="px-6 pt-6 pb-48"> {/* pb-48 memberi ruang agar teks terbawah tidak tertutup player */}

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-8">
                            <div className="bg-yellow-400 h-1.5 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]" style={{ width: '45%' }}></div>
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Chapter 1</h1>

                        <div className="space-y-6 text-gray-600 leading-relaxed text-[15px]">
                            <p>
                                <span className="text-yellow-500 font-bold bg-yellow-50 px-1 rounded">Our Last Summer: The Beginning of the End"</span> follows the story of Jake and Emily, two college sweethearts who are faced with the <span className="text-yellow-500 font-bold bg-yellow-50 px-1 rounded">challenge</span> of maintaining a long-distance relationship after graduation. As they navigate the ups and downs of their relationship, they must confront the realities of distance...
                            </p>
                            <p>
                                Our Last Summer: The Beginning of the End" follows the story of Jake and Emily, two college sweethearts who are faced with the challenge of maintaining a long-distance relationship after graduation. As they navigate the ups and downs of their relationship, they must confront the realities of distance...
                            </p>
                            <p>
                                They promised to talk every day, but as new jobs and time zones got in the way, the calls became less frequent. The silence grew louder than their words ever did. It was a slow drift, not a sudden break.
                            </p>
                            <p>
                                Emily found herself staring at her phone, waiting for a text that used to come automatically. Jake was buried in work, trying to prove himself in a city that didn't know his name.
                            </p>
                            <p>
                                <span className="text-yellow-500 font-bold bg-yellow-50 px-1 rounded">Our Last Summer: The Beginning of the End"</span> follows the story of Jake and Emily, two college sweethearts who are faced with the <span className="text-yellow-500 font-bold bg-yellow-50 px-1 rounded">challenge</span> of maintaining a long-distance relationship after graduation. As they navigate the ups and downs of their relationship, they must confront the realities of distance...
                            </p>
                            <p>
                                Emily found herself staring at her phone, waiting for a text that used to come automatically. Jake was buried in work, trying to prove himself in a city that didn't know his name.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-6 left-5 right-5 z-30">
                    <div className="bg-white/90 backdrop-blur-md rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-5 border border-white/20 ring-1 ring-black/5">
                        {/* Drag handle */}
                        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4 opacity-50"></div>

                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">AI Summary</h3>
                            <div className="flex gap-2">
                                <button className="p-2 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition">
                                    <MdGraphicEq size={14} />
                                </button>
                                <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition">
                                    <FaSun size={14} />
                                </button>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                            <span className="font-semibold text-yellow-500">Key Insight:</span> "Our Last Summer" explores the emotional drift between Jake and Emily as career ambitions and distance erode their connection.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BookView;