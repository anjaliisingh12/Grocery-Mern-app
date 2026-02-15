import { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../context/useAppContext";
import { assets, dummyAddress } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const [cartArray, setCartArray] = useState([]);
  const [selectedAddress] = useState(dummyAddress[0]);
  const [paymentOption, setPaymentOption] = useState("COD");

  const {
    allProducts,
    currency,
    cartItems,
    removeFromCart,
    updateCartItem,
    navigate,
    getCartAmount,
    user,
    axios, // ✅ USE CONTEXT AXIOS (VERY IMPORTANT)
  } = useAppContext();

  // ================= GET CART =================
  const getCart = useCallback(() => {
    let tempArray = [];

    for (const key in cartItems) {
      const product = allProducts.find((item) => item._id === key);
      if (product) {
        tempArray.push({ ...product, quantity: cartItems[key] });
      }
    }

    setCartArray(tempArray);
  }, [allProducts, cartItems]);

  useEffect(() => {
    if (allProducts.length > 0) {
      getCart();
    }
  }, [allProducts, cartItems, getCart]);

  // ================= PLACE ORDER =================
  const placeOrder = async () => {
    try {
      if (!user) {
        toast.error("Please login first");
        return;
      }

      const items = cartArray.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      const { data } = await axios.post(
        "/api/order/cod",
        {
          userId: user._id,
          items,
          address: selectedAddress,
        },
        {
          withCredentials: true, // ✅ Important if cookies used
        }
      );

      if (data.success) {
        toast.success("Order placed successfully");
        navigate("/orders");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Order failed"
      );
    }
  };

  // ================= EMPTY CART =================
  if (Object.keys(cartItems).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <p className="text-xl font-medium">Your cart is empty</p>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 px-6 py-2 bg-orange-400 text-white rounded"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="flex flex-col md:flex-row mt-16 gap-10">
      {/* LEFT SIDE */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">Shopping Cart</h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 font-medium">
          <p>Product</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[2fr_1fr_1fr] items-center py-4 border-b"
          >
            <div className="flex gap-4">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-20 h-20 object-cover border"
              />

              <div>
                <p className="font-medium">{product.name}</p>

                <div className="flex items-center gap-2">
                  <span>Qty:</span>
                  <select
                    value={product.quantity}
                    onChange={(e) =>
                      updateCartItem(
                        product._id,
                        Number(e.target.value)
                      )
                    }
                    className="border px-2"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <p className="text-center">
              {currency}
              {product.offerPrice * product.quantity}
            </p>

            <button
              onClick={() => removeFromCart(product._id)}
              className="mx-auto"
            >
              <img
                src={assets.remove_icon}
                className="w-6"
                alt="remove"
              />
            </button>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full max-w-[360px] border p-5">
        <h2 className="text-xl font-medium">Order Summary</h2>

        <p className="mt-4 text-sm font-medium">Delivery Address</p>
        <p className="text-gray-500 text-sm">
          {selectedAddress.street}, {selectedAddress.city},{" "}
          {selectedAddress.state}, {selectedAddress.country}
        </p>

        <p className="mt-4 text-sm font-medium">Payment Method</p>
        <select
          value={paymentOption}
          onChange={(e) => setPaymentOption(e.target.value)}
          className="w-full border px-3 py-2 mt-1"
        >
          <option value="COD">Cash On Delivery</option>
          <option value="Online">Online Payment</option>
        </select>

        <div className="mt-4 text-gray-600 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </p>

          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {(getCartAmount() * 0.02).toFixed(2)}
            </span>
          </p>

          <p className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>
              {currency}
              {(getCartAmount() * 1.02).toFixed(2)}
            </span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full mt-6 py-3 bg-orange-400 text-white font-medium hover:bg-orange-500"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;