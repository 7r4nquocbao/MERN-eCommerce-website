import express from 'express';

import { createProduct, deleteProduct, getProducts } from '../controllers/product-controller.js'

const router = express.Router();

router.get('/', getProducts);
router.post('/create', createProduct);
router.delete('/delete/:id', deleteProduct);

export default router;