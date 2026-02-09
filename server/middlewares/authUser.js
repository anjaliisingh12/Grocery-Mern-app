import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    // ✅ Allow preflight requests
    if (req.method === "OPTIONS") {
      return next();
    }

    // ✅ Safe cookie access
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized: Token missing",
      });
    }

    // ✅ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    // ✅ Attach user id to request
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.error("Auth error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

export default authUser;