import express from 'express';

import { createUpdatePromotion, getCodes } from '../controllers/promotion-code-controller.js';

const router = express.Router();

router.get('/', getCodes);
router.post('/create', createUpdatePromotion);

export default router;