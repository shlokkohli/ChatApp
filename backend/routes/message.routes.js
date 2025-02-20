import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { sendMessage } from '../controllers/message.controller.js';
import { getMessages } from '../controllers/message.controller.js';

const router = Router();

router.get('/:id', authMiddleware, getMessages)
router.post('/send/:id', authMiddleware, sendMessage)

export default router;