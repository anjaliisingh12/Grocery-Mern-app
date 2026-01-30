import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";

// ================= ADD PRODUCT =================
// POST : /api/product/add
export const addProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData);
    const images = req.files || [];

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    if (imagesUrl.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "At least one image is required." });
    }

    await Product.create({
      ...productData,
      images: imagesUrl,
      sellerId: req.userId,
      inStock: true, // ✅ default
    });

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= USER PRODUCT LIST =================
// GET : /api/product/list
// ✅ ONLY IN-STOCK PRODUCTS
export const productList = async (req, res) => {
  try {
    const products = await Product.find({ inStock: true });
    res.json({ success: true, products });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= SINGLE PRODUCT =================
// GET : /api/product/:id
export const productById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json({ success: true, product });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= CHANGE STOCK (ADMIN) =================
// POST : /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    await Product.findByIdAndUpdate(id, { inStock });

    res.json({ success: true, message: "Stock Updated" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};