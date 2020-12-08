import express from 'express';

import { getMessage, createMessage, createRoom, getRooms } from '../controllers/chat-controller.js'

const router = express.Router();

router.get('/:roomId', getMessage);
router.post('/create', createMessage);
router.post('/room', createRoom);


export default router;