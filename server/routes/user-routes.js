import express from 'express';

import { readUserTask, requireSignIn, adminMiddleware, listUser, updateUserTask } from '../controllers/user-controller.js';

const router = express.Router();

router.get('/:id', requireSignIn, readUserTask);
router.put('/update', requireSignIn, updateUserTask);
router.post('/list', requireSignIn, adminMiddleware, listUser);

export default router;