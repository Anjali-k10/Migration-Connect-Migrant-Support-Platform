import express from 'express';
console.log("MIGRANT ROUTES LOADED");
import { registerMigrant, getMigrantById,updateMigrant,deleteMigrant,verifyMigrant } from '../controllers/migrant.controller.js';

const router = express.Router();

router.post('/register', registerMigrant);
router.get('/:migrantId', getMigrantById);
router.put('/:migrantId', updateMigrant);
router.delete('/:migrantId', deleteMigrant);
router.put("/verify/:migrantId", verifyMigrant);

export default router;

