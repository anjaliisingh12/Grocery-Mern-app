import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/useAppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const {
    user,
    loading,                 // 🔑 VERY IMPORTANT
    setUser,
    setShowUserLogin,
    searchQuery,
    setSearchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  const navigate = useNavigate();

  // ================= LOGOUT =================
  const logout = async () => {
  try {
    await axios.post(
      "/api/user/logout",
      {},
      { withCredentials: true }
    );
  } catch (error) {
    // ignore backend error
    console.log("Logout API error ignored", error.message);
  } finally {
    // FORCE logout on frontend
    setUser(null);
    setShowProfileMenu(false);
    toast.success("Logged out successfully");
    navigate("/");
  }
};

  // ================= SEARCH =================
  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/AllProducts");
    }
  }, [searchQuery, navigate]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative">
      
      {/* LOGO */}
      <NavLink to="/">
        <img className="h-9" src={assets.logo} alt="logo" />
      </NavLink>

      {/* DESKTOP MENU */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/AllProducts">AllProducts</NavLink>
        <NavLink to="/">Contact</NavLink>

        {/* SEARCH */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        {/* CART */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
          <span className="absolute -top-2 -right-3 text-xs text-white bg-orange-500 w-[18px] h-[18px] rounded-full flex items-center justify-center">
            {getCartCount()}
          </span>
        </div>

        {/* AUTH (MOST IMPORTANT FIX) */}
        {!loading && !user && (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-8 py-2 bg-orange-300 hover:bg-orange-500 text-white rounded-full"
          >
            Login
          </button>
        )}

        {!loading && user && (
          <div className="relative">
            <img
              src={assets.profile_icon}
              className="w-8 h-8 rounded-full cursor-pointer"
              alt="profile"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            />

            {showProfileMenu && (
              <ul className="absolute top-10 right-0 bg-white shadow border py-2 rounded-md text-sm z-40">
                <li
                  onClick={() => {
                    navigate("/myorders");
                    setShowProfileMenu(false);
                  }}
                  className="px-4 py-2 hover:bg-orange-100 cursor-pointer"
                >
                  MyOrders
                </li>
                <li
                  onClick={logout}
                  className="px-4 py-2 hover:bg-orange-100 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* MOBILE */}
      <div className="flex items-center gap-4 sm:hidden">
        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt="cart" className="w-6" />
          <span className="absolute -top-2 -right-3 text-xs text-white bg-orange-500 w-[18px] h-[18px] rounded-full flex items-center justify-center">
            {getCartCount()}
          </span>
        </div>

        <button onClick={() => setOpen(!open)}>
          <img src={assets.menu_icon} alt="menu" />
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow py-4 flex flex-col gap-3 px-5 text-sm sm:hidden z-40">
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/AllProducts" onClick={() => setOpen(false)}>AllProducts</NavLink>
          <NavLink to="/" onClick={() => setOpen(false)}>Contact</NavLink>

          {!loading && !user && (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="px-6 py-2 bg-orange-300 text-white rounded-full"
            >
              Login
            </button>
          )}

          {!loading && user && (
            <button
              onClick={logout}
              className="px-6 py-2 bg-orange-300 text-white rounded-full"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;