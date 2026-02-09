import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoutes.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoutes.js";
import addressRouter from "./routes/addressRoutes.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;

/* ======================
   ✅ FINAL CORS — 100% FIX
   ====================== */

const FRONTEND_ORIGIN =
  "http://greencart-frontend-anjali-01.s3-website.us-east-2.amazonaws.com";

const corsOptions = {
  origin: FRONTEND_ORIGIN,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

/* ======================
   MIDDLEWARES
   ====================== */
app.use(cookieParser());
app.use(express.json());

/* ======================
   DB & CLOUDINARY
   ====================== */
connectDB();
connectCloudinary();

/* ======================
   ROUTES
   ====================== */
app.get("/", (req, res) => {
  res.send("GreenCart backend running 🚀");
});

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

/* ======================
   SERVER START
   ====================== */
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});