/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// ================= CONTEXT =================
export const AppContext = createContext();

// ================= AXIOS INSTANCE =================
export const axiosInstance = axios.create({
  baseURL: "http://3.142.92.137:4000",
});

// ================= INTERCEPTOR =================
axiosInstance.interceptors.request.use((config) => {
  const sellerToken = localStorage.getItem("sellerToken");
  const userToken = localStorage.getItem("token");

  if (sellerToken) {
    config.headers.Authorization = `Bearer ${sellerToken}`;
  } else if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  return config;
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

  // ================= LOAD CART FROM LOCALSTORAGE =================
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // ================= SAVE CART TO LOCALSTORAGE =================
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ================= USER AUTH =================
  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    try {
      const { data } = await axiosInstance.get("/api/user/profile");

      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.log(error)
      setUser(null);
      localStorage.removeItem("token");
    }
  }, []);

  // ================= SELLER AUTH =================
  const fetchSeller = useCallback(async () => {
    const token = localStorage.getItem("sellerToken");

    if (!token) {
      setIsSeller(false);
      return;
    }

    try {
      const { data } = await axiosInstance.get("/api/seller/is-auth");

      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
        localStorage.removeItem("sellerToken");
      }
    } catch (error) {
      console.log(error)
      setIsSeller(false);
      localStorage.removeItem("sellerToken");
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
    } catch (error) {
      console.log("PRODUCT FETCH ERROR:", error);
    }
  }, []);

  // ================= CART FUNCTIONS =================
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
    const init = async () => {
      await fetchUser();
      await fetchSeller();
      await fetchProducts();
      setLoading(false);
    };

    init();
  }, [fetchUser, fetchSeller, fetchProducts]);

  // ================= CONTEXT VALUE =================
  const value = {
    navigate,
    user,
    setUser,
    loading,
    setLoading,
    isSeller,
    setIsSeller,
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
    axios: axiosInstance,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider };