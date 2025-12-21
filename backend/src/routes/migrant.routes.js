import express from 'express';
import { registerMigrant } from '../controllers/migrant.controller.js';

const router = express.Router();

router.post('/register', registerMigrant);

export default router;

