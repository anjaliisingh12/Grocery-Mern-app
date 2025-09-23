import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Login Seller: /api/seller/login
export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // --- START DEBUGGING LOGS ---
        console.log('--- LOGIN ATTEMPT ---');
        console.log('Submitted Email:', email);
        console.log('Expected Email (from .env):', process.env.SELLER_EMAIL);
        console.log('Submitted Password:', password);
        console.log('Expected Password (from .env):', process.env.SELLER_PASSWORD);
        console.log('-------------------------');
        // --- END DEBUGGING LOGS ---

        // This is a direct check against plain-text passwords from .env
        // Note: This is not secure in a production environment.
        const isPasswordCorrect = (password === process.env.SELLER_PASSWORD);
        const isEmailCorrect = (email === process.env.SELLER_EMAIL);

        if (isPasswordCorrect && isEmailCorrect) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.cookie('sellerToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.json({ success: true, message: "Logged In" });
        } else {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Seller isAuth: /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
        return res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Logout Seller: /api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: "Logged Out" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};