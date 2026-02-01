/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { dummyProducts } from "../assets/assets";

// ================= CONTEXT =================
export const AppContext = createContext();

// ================= AXIOS SETUP =================
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

// ================= PROVIDER =================
const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY || "₹";

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
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) setUser(data.user);
      else setUser(null);
    } catch (err) {
      console.log(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // ================= SELLER AUTH =================
  const fetchSeller = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(!!data.success);
    } catch (err) {
      console.log(err);
      setIsSeller(false);
    }
  }, []);

  // ================= PRODUCTS =================
  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setAllProducts(data.products);
        setBestSellerProducts(data.products.slice(0, 5));
      } else {
        throw new Error("Product fetch failed");
      }
    } catch (err) {
      console.log(err);
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
  }, [fetchUser, fetchSeller, fetchProducts]);

  // ================= SYNC CART FROM USER =================
  useEffect(() => {
    if (user?.cartItems) setCartItems(user.cartItems);
    else setCartItems({});
  }, [user]);

  // ================= SYNC CART TO SERVER =================
  useEffect(() => {
    if (!user) return;

    const timer = setTimeout(async () => {
      try {
        await axios.post("/api/cart/update", { cartItems });
      } catch (err) {
        console.log(err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [cartItems, user]);

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
    axios,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// ✅ ONLY NAMED EXPORT (NO DEFAULT)
export { AppContextProvider };