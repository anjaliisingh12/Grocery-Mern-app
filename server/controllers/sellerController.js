import jwt from "jsonwebtoken";

// =======================
// SELLER LOGIN
// =======================
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const cleanEmail = email?.trim();
    const cleanPassword = password?.trim();

    if (
      cleanEmail !== process.env.SELLER_EMAIL ||
      cleanPassword !== process.env.SELLER_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      { role: "seller", email: cleanEmail },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ ONLY CORRECT COOKIE CONFIG FOR S3 + EC2
    res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: true,        // ✅ MUST
      sameSite: "none",    // ✅ MUST
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Seller logged in successfully",
    });
  } catch (error) {
    console.error("Seller login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// =======================
// SELLER IS AUTH
// =======================
export const isSellerAuth = async (req, res) => {
  try {
    const token = req.cookies.sellerToken;

    if (!token) {
      return res.status(401).json({ success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "seller") {
      return res.status(403).json({ success: false });
    }

    return res.json({ success: true });
  } catch {
    return res.status(401).json({ success: false });
  }
};

// =======================
// SELLER LOGOUT
// =======================
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: true,     // ✅ SAME AS LOGIN
      sameSite: "none", // ✅ SAME AS LOGIN
    });

    return res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};