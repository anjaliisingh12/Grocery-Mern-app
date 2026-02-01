import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import {
  addProduct,
  changeStock,
  productById,
  productList
} from '../controllers/productController.js';

const productRouter = express.Router();

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES (User side – NO auth)
|--------------------------------------------------------------------------
*/

// ✅ Home page / product listing (PUBLIC)
productRouter.get('/list', productList);

// ✅ Product detail page (PUBLIC)
productRouter.get('/:id', productById);


/*
|--------------------------------------------------------------------------
| SELLER ROUTES (Protected)
|--------------------------------------------------------------------------
*/

// ✅ Add product (SELLER only)
productRouter.post(
  '/add',
  authSeller,
  upload.array('images', 4),
  addProduct
);

// ✅ Change stock (SELLER only)
productRouter.post('/stock', authSeller, changeStock);

export default productRouter;