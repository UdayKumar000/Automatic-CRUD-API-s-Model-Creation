import type { Router } from 'express';
import express from 'express';
import { registerUser, loginUser } from '../controllers/user.controller.js';

const router: Router = express.Router();

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);

export default router;