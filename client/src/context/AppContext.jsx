import { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://greencart-backend.onrender.com";

// eslint-disable-next-line
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ ADD THIS (VERY IMPORTANT)
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // ================= SELLER AUTH =================
  const fetchSeller = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(data.success ? true : false);
    } catch (error) {
      console.error("Failed to fetch seller status:", error);
      setIsSeller(false);
    }
  }, []);

  // ================= USER AUTH =================
  const fetchUser = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");

      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setUser(null);
    } finally {
      setLoading(false); // ✅ THIS FIXES BLANK SCREEN AFTER LOGIN
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
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch products. Using dummy data.", error);
      setAllProducts(dummyProducts);
      setBestSellerProducts(dummyProducts.slice(0, 5));
    }
  }, []);

  // ================= CART =================
  const addToCart = (itemId) => {
    const cartData = { ...cartItems };
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  const updateCartItem = (itemId, quantity) => {
    const cartData = { ...cartItems };
    cartData[itemId] = quantity;
    setCartItems(cartData);
  };

  const removeFromCart = (itemId) => {
    const cartData = { ...cartItems };
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) delete cartData[itemId];
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let total = 0;
    for (const id in cartItems) total += cartItems[id];
    return total;
  };

  const getCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const product = allProducts.find((p) => p._id === id);
      if (product) total += product.offerPrice * cartItems[id];
    }
    return Math.floor(total * 100) / 100;
  };

  // ================= INITIAL LOAD =================
  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, [fetchUser, fetchSeller, fetchProducts]);

  // ================= SYNC CART =================
  useEffect(() => {
    if (user?.cartItems) {
      setCartItems(user.cartItems);
    } else {
      setCartItems({});
    }
  }, [user]);

  useEffect(() => {
    const updateCart = async () => {
      try {
        await axios.post("/api/cart/update", { cartItems });
      } catch (error) {
        console.error(error.message);
      }
    };

    if (user) updateCart();
  }, [cartItems, user]);

  // ================= CONTEXT VALUE =================
  const value = {
    navigate,
    user,
    setUser,
    loading, // ✅ EXPOSE LOADING
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    allProducts,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    bestSellerProducts,
    setBestSellerProducts,
    getCartAmount,
    getCartCount,
    axios,
    fetchProducts,
    fetchUser,
    fetchSeller,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;