import jwt from "jsonwebtoken";

// =======================
// SELLER LOGIN
// =======================
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.SELLER_EMAIL ||
      password !== process.env.SELLER_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      { role: "seller" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔥 IMPORTANT
    return res.json({
      success: true,
      message: "Logged In",
      token: token  // ✅ THIS LINE WAS MISSING
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// =======================
// CHECK SELLER AUTH
// =======================
export const isSellerAuth = async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store");

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ success: false });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "seller") {
      return res.status(403).json({ success: false });
    }

    return res.json({
      success: true,
      seller: true,
    });

  } catch (error) {
    return res.status(401).json({ success: false });
  }
};

// =======================
// SELLER LOGOUT
// =======================
export const sellerLogout = async (req, res) => {
  return res.json({
    success: true,
    message: "Logged out successfully",
  });
};