import Order from "../models/Order.js";
import Product from "../models/Product.js";

// ================= PLACE ORDER (COD) =================
// POST : /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.userId;

    if (!items || items.length === 0 || !address) {
      return res.status(400).json({
        success: false,
        message: "Items and address are required",
      });
    }

    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      totalAmount += product.offerPrice * item.quantity;
    }

    // 2% tax
    totalAmount += Math.round(totalAmount * 0.02);

    await Order.create({
      userId,
      items,
      amount: totalAmount,
      address,
      paymentType: "COD",
      isPaid: false,
    });

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= USER ORDERS =================
// GET : /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= ADMIN / SELLER ORDERS =================
// GET : /api/order/seller
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.product")   // ✅ product name + image
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};