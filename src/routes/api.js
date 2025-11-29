import express from 'express';
import * as ProductController from '../controller/ProductsController.js';

const router = express.Router();
router.get('/ProductList/:pageNo/:perPage/:searchKeyword', ProductController.ProductList);
router.post('/CreateProduct', ProductController.CreateProduct);

export default router;

