import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useAppContext } from "../context/useAppContext";
import { assets } from "../assets/assets";

const Orders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/order/seller", {
        withCredentials: true,
      });

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="flex-1 h-[95vh] overflow-y-scroll p-6">
      <h2 className="text-xl font-medium mb-6">Orders List</h2>

      {orders.length === 0 && (
        <p className="text-gray-500">No orders found</p>
      )}

      {orders.map((order) => (
        <div
          key={order._id}
          className="border border-gray-300 rounded-md p-5 mb-6 max-w-5xl"
        >
          {/* ===== ORDER HEADER ===== */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">
              <span className="font-medium text-black">Order ID:</span>{" "}
              {order._id}
            </p>

            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* ===== PRODUCTS ===== */}
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-5 border-b pb-4 last:border-b-0"
              >
                <img
                  src={
                    item.product?.images?.[0] || assets.box_icon
                  }
                  alt={item.product?.name}
                  className="w-16 h-16 object-cover rounded"
                />

                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {item.product?.name}
                    <span className="text-orange-500">
                      {" "}x{item.quantity}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Category: {item.product?.category}
                  </p>
                </div>

                <p className="font-medium text-gray-700">
                  {currency}
                  {item.product?.offerPrice * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* ===== PAYMENT INFO ===== */}
          <div className="flex justify-between items-center mt-5">
            <div className="text-sm text-gray-600">
              <p>Method: {order.paymentType}</p>
              <p>
                Payment:{" "}
                {order.isPaid ? (
                  <span className="text-green-600">Paid</span>
                ) : (
                  <span className="text-red-500">Pending</span>
                )}
              </p>
            </div>

            <p className="text-lg font-medium text-black">
              Total: {currency}{order.amount}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;