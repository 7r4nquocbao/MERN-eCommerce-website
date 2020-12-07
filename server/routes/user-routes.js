import express from 'express';

import { readUserTask, requireSignIn, adminMiddleware, listUser } from '../controllers/user-controller.js';

const router = express.Router();

router.get('/:id', requireSignIn, readUserTask);
router.post('/list', requireSignIn, adminMiddleware, listUser);

export default router;