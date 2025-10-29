import type { Router } from 'express';
import express from 'express';
import { createModelController } from '../controllers/createModel.controller.js';

const router: Router = express.Router();

router.post('/createModel', createModelController);

export default router;