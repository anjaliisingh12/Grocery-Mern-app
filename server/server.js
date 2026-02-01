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
const port = process.env.PORT || 4000;

// ===== CORS (SABSE PEHLE – FIXED) =====
app.use(
  cors({
    origin: [
      "https://greencart-frontend-anjali-01.s3-website.us-east-2.amazonaws.com"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// ✅ Preflight
app.options("*", cors());

// ===== MIDDLEWARES =====
app.use(express.json());
app.use(cookieParser());

// ===== DB & CLOUDINARY =====
connectDB();
connectCloudinary();

// ===== ROUTES =====
app.get("/", (req, res) => {
  res.send("API is Working");
});

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

// ===== SERVER =====
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});