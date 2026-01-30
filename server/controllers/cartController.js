import User from "../models/User.js"

// Update User CartData: /api/cart/update
export const updateCart = async (req, res) => {
    try {
        // Get the authenticated user's ID from the request object (set by middleware)
        const { userId } = req;
        // Get the cart items from the request body (sent from the frontend)
        const { cartItems } = req.body;

        // Find the user by their ID
        const user = await User.findById(userId);

        // Check if the user was found
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Update the cartItems field on the user document
        user.cartItems = cartItems;

        // Save the updated user document to the database
        await user.save();

        res.json({ success: true, message: "Cart Updated" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}