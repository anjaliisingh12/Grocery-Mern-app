import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/useAppContext';
import { assets, dummyOrders } from '../assets/assets';

const Orders = () => {
    const { currency } = useAppContext();
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        setOrders(dummyOrders);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
            <div className="md:p-10 p-4 space-y-4">
                <h2 className="text-lg font-medium">Orders List</h2>
                {orders.map((order) => (
                    // Main order container with flexbox for a two-column layout
                    <div key={order._id} className="flex flex-col gap-5 p-5 max-w-4xl rounded-md border border-gray-300">
                        {/* Product details */}
                        <div className="flex gap-5">
                            <img className="w-12 h-12 object-cover" src={assets.box_icon} alt="boxIcon" />
                            <div className="flex flex-col">
                                {order.items.map((item) => (
                                    <div key={item.product._id}>
                                        <p className="font-medium">
                                            {item.product.name}
                                            <span className="text-orange-500"> x {item.quantity}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Flex container for address (left) and payment details (right) */}
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            {/* Address Information (Left) */}
                            <div className="text-sm md:text-base text-black/60">
                                {/* The change is here: "Grocery App" replaces the dynamic name */}
                                <p className='text-black/80'>Grocery App</p>
                                <p>{order.address.street}, {order.address.city},</p>
                                <p>{order.address.state},{order.address.zipcode}, {order.address.country}</p>
                                <p>{order.address.phone}</p>
                            </div>

                            {/* Order Amount and Payment Details (Right) */}
                            <div className="flex flex-col md:text-right gap-2">
                                <p className="font-medium text-lg">{currency}{order.amount}</p>
                                <div className="text-sm md:text-base text-black/60">
                                    <p>Method: {order.paymentType}</p>
                                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                    <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;