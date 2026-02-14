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

    const decoded = jwt.verify(
      sellerToken,
      process.env.JWT_SECRET
    );

    if (decoded.role !== "seller") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

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