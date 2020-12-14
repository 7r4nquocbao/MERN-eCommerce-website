import express from 'express';

import { cancelOrder, changeStatusOrder, createOrder, getOrders, getOrderOfUser } from '../controllers/order-controller.js'

const router = express.Router();

router.get('/', getOrders);
router.post('/create', createOrder);
router.put('/status', changeStatusOrder);
router.put('/cancel/:id', cancelOrder);
router.get('/user/:id', getOrderOfUser);

export default router;