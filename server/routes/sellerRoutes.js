import express from 'express';
import { isSellerAuth, sellerLogin, sellerLogout } from '../controllers/sellerController.js';
import authSeller from '../middlewares/authSeller.js';

const sellerRouter = express.Router();

sellerRouter.post('/login', sellerLogin); // No authSeller middleware here
sellerRouter.get('/is-auth',  isSellerAuth); // Middleware is here
sellerRouter.get('/logout', sellerLogout); // Middleware is not needed here if cookies are cleared by the controller

export default sellerRouter;