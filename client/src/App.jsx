import React from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
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
  const location = useLocation();
  const { showUserLogin, isSeller, loading } = useAppContext();

  // Detect seller routes
  const isSellerPath = location.pathname.includes('/seller');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      
      {/* Hide Navbar on Seller Pages */}
      {!isSellerPath && <Navbar />}

      {showUserLogin && <Login />}
      <Toaster />

      <div className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 cl:px-32'}`}>
        <Routes>

          {/* ================= USER ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/AllProducts" element={<AllProducts />} />
          <Route path="/Products/:category" element={<ProductCategory />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/cart" element={<Cart />} />

          {/* ================= SELLER LOGIN ================= */}
          <Route
            path="/seller/login"
            element={
              isSeller
                ? <Navigate to="/seller" replace />
                : <SellerLogin />
            }
          />

          {/* ================= PROTECTED SELLER ROUTES ================= */}
          <Route
            path="/seller/*"
            element={
              isSeller
                ? <SellerLayout />
                : <Navigate to="/seller/login" replace />
            }
          >
            <Route index element={<AddProduct />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>

        </Routes>
      </div>

      {/* Hide Footer on Seller Pages */}
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;