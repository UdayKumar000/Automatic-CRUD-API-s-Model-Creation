import type { Router } from 'express';
import express from 'express';
import { createModelController, showModelsController } from '../controllers/createModel.controller.js';
import { adminAuthMiddleware } from '../middlewares/adminAuth.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router: Router = express.Router();

router.post('/createModel', authMiddleware, adminAuthMiddleware, createModelController);
router.get('/showModels', showModelsController);

export default router;