import type { Router } from 'express';
import express from 'express';
import { registerUser, loginUser } from '../controllers/user.controller.js';

const router: Router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;