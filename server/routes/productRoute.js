import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add', upload.array('images', 4), authSeller, addProduct);
productRouter.get('/list', authSeller, productList);
// FIX: Changed route to accept a dynamic parameter in the URL
productRouter.get('/:id', productById);
productRouter.post('/stock', authSeller, changeStock);

export default productRouter;