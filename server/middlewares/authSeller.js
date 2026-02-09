import jwt from "jsonwebtoken";

const authSeller = (req, res, next) => {
  try {
    const sellerToken = req.cookies?.sellerToken;

    if (!sellerToken) {
      return res.status(401).json({
        success: false,
        message: "Seller not logged in",
      });
    }

    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

    // ✅ Role check (MOST IMPORTANT)
    if (decoded.role !== "seller") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    // ✅ Optional extra safety
    if (decoded.email !== process.env.SELLER_EMAIL) {
      return res.status(403).json({
        success: false,
        message: "Invalid seller",
      });
    }

    // attach seller info if needed later
    req.seller = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authSeller;