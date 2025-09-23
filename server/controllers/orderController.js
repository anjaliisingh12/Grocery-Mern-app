import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Place Order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        if (!address || items.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid data. Address and items are required." });
        }

        // Calculate the total amount for the order
        let totalAmount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ success: false, message: `Product with ID ${item.product} not found.` });
            }
            totalAmount += product.offerPrice * item.quantity;
        }

        // Add Tax Charge (2%)
        totalAmount += Math.floor(totalAmount * 0.02);

        await Order.create({
            userId,
            items,
            amount: totalAmount,
            address,
            paymentType: "COD",
        });

        return res.status(201).json({ success: true, message: "Order Placed Successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get Orders by User ID : /api/order/user
export const getUserOrders = async (req, res)=>{
    try {
        const { userId } = req.body
        const orders = await Order.find({
            userId,
            $or: [{"paymentType": "COD"}, {"isPaid": true}]
        }).populate("items.product").populate("address").sort({createdAt: -1});
        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
   }
}

// Get All Orders ( for seller / admin) : /api/order/seller
export const getAllOrders = async (req, res)=>{
    try {
        const orders = await Order.find({
            $or: [{"paymentType": "COD"}, {"isPaid": true}]
        }).populate("items.product address");
        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
   }
}