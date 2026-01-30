import Address from "../models/Address.js";

// ================= ADD ADDRESS =================
// POST : /api/address/add
export const addAddress = async (req, res) => {
  try {
    const userId = req.userId; // ✅ auth middleware se aayega
    const { address } = req.body;

    if (!address) {
      return res.json({
        success: false,
        message: "Address data is missing",
      });
    }

    await Address.create({
      ...address,
      userId,
    });

    res.json({
      success: true,
      message: "Address added successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ADDRESS =================
// GET : /api/address/get
export const getAddress = async (req, res) => {
  try {
    const userId = req.userId; // ✅ body se nahi, auth se

    const addresses = await Address.find({ userId }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      addresses,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};