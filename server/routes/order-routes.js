import express from 'express';

import { cancelOrder, changeStatusOrder, createOrder, getOrders } from '../controllers/order-controller.js'

const router = express.Router();

router.get('/', getOrders);
router.post('/create', createOrder);
router.put('/status', changeStatusOrder);
router.put('/cancel/:id', cancelOrder);

export default router;