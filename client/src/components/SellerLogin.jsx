import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/useAppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SellerLogin = () => {
    // Assuming useAppContext and useNavigate are properly set up
    const { isSeller, setIsSeller, axios } = useAppContext(); // Destructure setIsSeller
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // This effect runs whenever isSeller or navigate changes.
    // It redirects if the user is a seller.
    useEffect(() => {
        if (isSeller) {
            navigate("/seller");
        }
    }, [isSeller, navigate]);
    
    const onSubmitHandler = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const { data } = await axios.post('/api/seller/login', { email, password });
            
            if (data.success) {
                setIsSeller(true);
                // The useEffect hook will handle navigation
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            // Access the error message from the response data
            toast.error(error.response?.data?.message || 'Login failed.');
        }
    };

    // The form is rendered only if the user is NOT a seller.
    return !isSeller && (
        <form onSubmit={onSubmitHandler} className="min-h-screen flex items-center text-sm text-gray-600">
            <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
                <p className="text-2xl font-medium m-auto">
                    <span className="text-primary">Seller</span> Login
                </p>
                <div className="w-full">
                    <p>Email</p>
                    <input 
                        type="email" 
                        placeholder="enter your email"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input 
                        type="password" 
                        placeholder="enter your password"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className='bg-orange-300 hover:bg-orange-500 transition text-white w-full py-2 rounded-md cursor-pointer'>Login</button>
            </div>
        </form>
    );
};

export default SellerLogin;