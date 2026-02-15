import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import { useAppContext } from './context/useAppContext';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import SellerLogin from './components/SellerLogin';
import SellerLayout from './pages/SellerLayout';
import AddProduct from './pages/AddProduct';
import Orders from './pages/Orders';
import ProductList from './pages/ProductList';


const App = () => {
    const isSellerPath = useLocation().pathname.includes('seller');
    const { showUserLogin, isSeller } = useAppContext();
    console.log("App isSeller:", isSeller);
    
    return (
        <div className='text-default min-h-screen text-gray-700 bg-white'>
            {!isSellerPath && <Navbar />}
            {showUserLogin && <Login />}
            <Toaster />

            <div className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 cl:px-32'}`}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/AllProducts" element={<AllProducts />} />
                    <Route path="/Products/:category" element={<ProductCategory />} />
                    {/* FIX: Use a unique path for the ProductDetails component */}
                    <Route path="/product-details/:id" element={<ProductDetails />} />
                    <Route path="/add-address" element={<AddAddress />} />
                    <Route path="/myorders" element={<MyOrders />} />
                    <Route path="/cart" element={<Cart/>} />
                    
                    
                    {/* Seller Routes */}

                    <Route path="/seller/*" element={isSeller ? <SellerLayout /> : <SellerLogin />}>
                        <Route index element={<AddProduct />} />
                        <Route path="product-list" element={<ProductList />} />
                        <Route path="orders" element={<Orders />} />
                    </Route>
                </Routes>
            </div>
            
            {!isSellerPath && <Footer />}
        </div>
    );
};

export default App;