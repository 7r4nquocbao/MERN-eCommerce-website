import express from 'express';

import { createOrderDetail, getOrderDetails } from '../controllers/order-detail-controller.js'

const router = express.Router();

router.get('/:id', getOrderDetails);
router.post('/create', createOrderDetail);

export default router;