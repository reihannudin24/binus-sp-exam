import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(email, password);
        if (result.success) {
            navigate('/home');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="bg-white flex justify-center">
            <div className="w-full max-w-md border border-gray-200 rounded-xl overflow-hidden items-center relative bg-white h-fit">
                <div className="px-8 mt-4 flex-1 flex flex-col">
                    <h2 className="text-2xl text-left font-bold text-gray-900 mt-4 mb-6">Login</h2>

                    <div className="space-y-5">
                        {error && <div className="text-red-500 text-xs text-center">{error}</div>}
                        <div>
                            <label className="block text-left text-gray-400 text-xs mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="Masukan alamat email anda"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-6 py-3.5 rounded-3xl border border-gray-100 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent placeholder-gray-300 text-xs"
                            />
                        </div>
                        <div>
                            <label className="block text-left text-gray-400 text-xs mb-2">Password</label>
                            <input
                                type="password"
                                placeholder="Masukan password anda"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-6 py-3.5 rounded-3xl border border-gray-100 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent placeholder-gray-300 text-xs"
                            />
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex justify-end">
                            <button className="text-gray-400 hover:text-yellow-400 text-xs font-medium transition">
                                Forgot Password?
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 space-y-3">
                        <button
                            onClick={handleLogin}
                            className="w-full cursor-pointer py-3.5 rounded-full bg-yellow-400 text-white font-bold text-sm hover:bg-yellow-500 transition transform active:scale-95"
                        >
                            Login
                        </button>

                        <div className="relative flex items-center justify-center py-2">
                            <div className="absolute border-t border-gray-200 w-full"></div>
                            <span className="relative bg-white px-4 text-gray-400 text-sm">Or</span>
                        </div>

                        <button className="w-full cursor-pointer py-3.5 rounded-full border border-gray-100 text-gray-500 font-medium text-xs flex items-center justify-center gap-3 hover:bg-gray-50 transition active:scale-95">
                            <FcGoogle size={20} />
                            Continue with Google
                        </button>

                        <div className="text-center text-sm text-gray-400 pb-8 pt-2">
                            Don't have an account?
                            <button onClick={() => navigate('/register')} className="text-yellow-400 font-bold ml-1">
                                Register here
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;