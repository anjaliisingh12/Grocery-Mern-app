import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/useAppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, axios } = useAppContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "/api/seller/login",
        { email, password },
        {
          withCredentials: true, // 🔥 MOST IMPORTANT LINE
        }
      );

      if (data.success) {
        setIsSeller(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

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

        <button className="bg-orange-500 text-white w-full py-2 rounded">
          Login
        </button>
      </div>
    </form>
  );
};

export default SellerLogin;