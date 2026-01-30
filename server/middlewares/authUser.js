import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken || !decodedToken.id) {
            return res.json({ success: false, message: 'Invalid token' });
        }

        req.userId = decodedToken.id; // Correctly setting the user ID on the request object
        next();
    } catch (error) {
        console.error(error); // Log the actual error for debugging
        return res.json({ success: false, message: 'Authentication failed' });
    }
};

export default authUser;