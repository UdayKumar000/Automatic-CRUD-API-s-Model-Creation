import type { Router } from 'express';
import express from 'express';
import { loginAdmin, registerAdmin } from '../controllers/admin.controller.js';

const router: Router = express.Router();

router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);

export default router;