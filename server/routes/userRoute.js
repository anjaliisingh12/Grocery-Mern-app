import express from 'express';
import { register, login, isAuth, logout } from '../controllers/userController.js';

const userRouter = express.Router();

// Register
userRouter.post('/register', register);

// Login
userRouter.post('/login', login);

// 🔥 IMPORTANT: NO authUser here
userRouter.get('/is-auth', isAuth);

// Logout (no need authUser here)
userRouter.post('/logout', logout);

export default userRouter;