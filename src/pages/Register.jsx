import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        const result = await register(name, email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="bg-white flex justify-center ">
            <div className="w-full max-w-md border border-gray-200 rounded-xl overflow-hidden items-center relative bg-white h-fit">
                <div className="px-8 mt-4 flex-1 flex flex-col">
                    <h2 className="text-2xl text-left font-bold text-gray-900 mt-4 mb-6">Register</h2>

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
                            <label className="block text-left text-gray-400 text-xs mb-2">Username</label>
                            <input
                                type="text"
                                placeholder="Buat username anda"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-6 py-3.5 rounded-3xl  border border-gray-100 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent placeholder-gray-300 text-xs"
                            />
                        </div>
                        <div>
                            <label className="block text-left text-gray-400 text-xs mb-2">Password</label>
                            <div className="flex gap-2">
                                <input
                                    type="password"
                                    placeholder="Masukan password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-6 py-3.5 rounded-3xl  border border-gray-100 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent placeholder-gray-300 text-xs"
                                />
                                <input
                                    type="password"
                                    placeholder="Konfirmasi password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-6 py-3.5 rounded-3xl  border border-gray-100 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent placeholder-gray-300 text-xs"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 space-y-3">
                        <button
                            onClick={handleRegister}
                            className="w-full cursor-pointer py-3.5 rounded-full bg-yellow-400 text-white font-bold text-sm hover:bg-yellow-500 transition transform active:scale-95"
                        >
                            Sign-up
                        </button>

                        <div className="relative flex items-center justify-center">
                            <div className="absolute border-t border-gray-200 w-full"></div>
                            <span className="relative bg-white px-4 text-gray-400 text-sm">Or</span>
                        </div>

                        <div className="text-center text-sm text-gray-400 pb-8">
                            Already have an account ? <button onClick={() => navigate('/')} className="text-yellow-400 font-bold ml-1">Login here</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
