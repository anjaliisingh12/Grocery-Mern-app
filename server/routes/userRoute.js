import express from "express";
import {
  register,
  login,
  isAuth,
  logout,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

/* ======================
   AUTH ROUTES
   ====================== */

// ✅ Preflight support (VERY IMPORTANT for CORS)
userRouter.options("*", (req, res) => {
  res.sendStatus(200);
});

userRouter.post("/register", register);
userRouter.post("/login", login);

// ✅ Protected route (correct)
userRouter.get("/is-auth", authUser, isAuth);

// ✅ Logout WITHOUT auth middleware (important)
userRouter.post("/logout", logout);

export default userRouter;