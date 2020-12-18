import express from 'express';

import { createComment, getCommments } from '../controllers/comment-controller.js'

const router = express.Router();

router.get('/:id', getCommments);
router.post('/create', createComment);

export default router;