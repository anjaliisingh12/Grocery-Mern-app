import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "seller") {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    req.userId = decoded.id;   // ✅ IMPORTANT
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default authSeller;