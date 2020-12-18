import express from 'express';

import { readUserTask, requireSignIn, adminMiddleware, listUser, updateUserTask, viewUser, setAdmin } from '../controllers/user-controller.js';

const router = express.Router();

router.get('/:id', requireSignIn, readUserTask);
router.put('/update', requireSignIn, updateUserTask);
router.post('/list', requireSignIn, adminMiddleware, listUser);
router.get('/view/:id', viewUser);
router.post('/set-admin/:id', setAdmin);

export default router;