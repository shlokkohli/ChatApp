import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getUsersForSideBar } from '../controllers/user.controller.js';

const router = Router();

router.get('/', authMiddleware, getUsersForSideBar);

export default router;