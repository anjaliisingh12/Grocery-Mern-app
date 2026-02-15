import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/useAppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, axios, fetchSeller } = useAppContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ NEW: loading state
  const [loading, setLoading] = useState(false);

  // ✅ NEW: checking auth state (important for page blink fix)
  const [checkingAuth, setCheckingAuth] = useState(true);

  // 🔥 First check if seller already logged in
  useEffect(() => {
    const checkAuth = async () => {
      await fetchSeller();
      setCheckingAuth(false);
    };

    checkAuth();
  }, [fetchSeller]);

  // 🔥 Redirect if seller authenticated
  useEffect(() => {
    if (!checkingAuth && isSeller) {
      navigate("/seller", { replace: true });
    }
  }, [isSeller, checkingAuth, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        "/api/seller/login",
        { email, password }
      );

      if (data.success) {
        toast.success(data.message);

        // ✅ SAVE TOKEN
        localStorage.setItem("sellerToken", data.token);

        await fetchSeller();

        navigate("/seller");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔥 IMPORTANT: prevent blink
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  return !isSeller && (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center text-sm text-gray-600"
    >
      <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 rounded-lg shadow-xl border">
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">Seller</span> Login
        </p>

        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded w-full p-2 mt-1"
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded w-full p-2 mt-1"
          />
        </div>

        <button
          disabled={loading}
          className="bg-orange-500 text-white w-full py-2 rounded disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default SellerLogin;