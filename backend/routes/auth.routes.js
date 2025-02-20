import { Router } from 'express'
import { signupUser } from '../controllers/auth.controller.js';
import { loginUser } from '../controllers/auth.controller.js';
import { logoutUser } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/logout', authMiddleware, logoutUser)

export default router;