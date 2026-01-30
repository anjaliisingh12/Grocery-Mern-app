import React, { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../context/useAppContext";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios } = useAppContext();

  // ✅ Correct API + stable function
  const fetchMyOrders = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/order/user", {
        withCredentials: true,
      });

      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    }
  }, [axios]);

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  return (
    <div className="mt-16 pb-16">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-orange-500 rounded-full"></div>
      </div>

      {myOrders.length === 0 && (
        <p className="text-gray-500 text-center">No orders found.</p>
      )}

      {myOrders.map((order) => (
        <div
          key={order._id}
          className="border border-gray-300 rounded-lg mb-10 p-4 max-w-4xl"
        >
          {/* ORDER INFO */}
          <div className="flex justify-between text-gray-400 mb-4 text-sm md:text-base">
            <span>Order ID: {order._id}</span>
            <span>
              Payment: {order.isPaid ? "Paid" : "Pending"}
            </span>
            <span>
              Total: {currency}{order.amount}
            </span>
          </div>

          {/* ITEMS */}
          {order.items.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row justify-between items-center border-gray-300 ${
                index !== order.items.length - 1 ? "border-b" : ""
              } py-4`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product?.images?.[0]}
                  alt={item.product?.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {item.product?.name}
                  </p>
                  <p className="text-gray-500">
                    Category: {item.product?.category}
                  </p>
                  <p className="text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>

              <div className="text-right mt-3 md:mt-0">
                <p className="text-orange-500 font-medium">
                  {currency}
                  {item.product?.offerPrice * item.quantity}
                </p>
                <p className="text-gray-500 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;