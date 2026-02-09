/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { dummyProducts } from "../assets/assets";

// ================= CONTEXT =================
export const AppContext = createContext();

// ================= AXIOS INSTANCE =================
export const axiosInstance = axios.create({
  baseURL: "http://3.142.92.137:4000", // ✅ backend only
  withCredentials: true,
});

// ================= PROVIDER =================
const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // ================= USER AUTH =================
  const fetchUser = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get("/api/user/is-auth",
        { withCredentials: true}
      );
      if (data.success) setUser(data.user);
      else setUser(null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // ================= SELLER AUTH =================
  const fetchSeller = useCallback(async () => {
  try {
    const { data } = await axiosInstance.get("/api/seller/is-auth", {
      withCredentials: true,
    });

    if (data.success) {
      setIsSeller(true);
    } else {
      setIsSeller(false);
    }
  } catch (error) {
     console.log(error)
    setIsSeller(false); // ✅ FAIL = NOT LOGGED IN
  }
}, []);

  // ================= PRODUCTS =================
  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get("/api/product/list");
      if (data.success) {
        setAllProducts(data.products);
        setBestSellerProducts(data.products.slice(0, 5));
      }
    } catch {
      setAllProducts(dummyProducts);
      setBestSellerProducts(dummyProducts.slice(0, 5));
    }
  }, []);

  // ================= CART =================
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    toast.success("Added to cart");
  };

  const updateCartItem = (itemId, quantity) => {
    setCartItems((prev) => ({ ...prev, [itemId]: quantity }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) updated[itemId]--;
      else delete updated[itemId];
      return updated;
    });
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((a, b) => a + b, 0);

  const getCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const product = allProducts.find((p) => p._id === id);
      if (product) total += product.offerPrice * cartItems[id];
    }
    return Math.round(total * 100) / 100;
  };

  // ================= INITIAL LOAD =================
  useEffect(() => {
  fetchUser();
  fetchSeller();
  fetchProducts();
}, [ fetchUser, fetchSeller, fetchProducts]);

  // ================= SYNC CART =================
  useEffect(() => {
    if (user?.cartItems) setCartItems(user.cartItems);
    else setCartItems({});
  }, [user]);

  // ================= CONTEXT VALUE =================
  const value = {
    navigate,
    user,
    setUser,
    loading,
    isSeller,
    showUserLogin,
    setShowUserLogin,
    allProducts,
    bestSellerProducts,
    currency,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    getCartCount,
    getCartAmount,
    searchQuery,
    setSearchQuery,
    fetchUser,
    fetchSeller,
    fetchProducts,
    axios: axiosInstance, // ✅ use this everywhere
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider };