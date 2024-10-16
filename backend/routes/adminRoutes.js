import express from 'express';
import { verifyToken } from '../utils/jwt.js';
import { roleCheck } from '../middleware/roleMiddleware.js';
import { createQuestion, mapParticipants, getAllMappings } from '../controllers/adminController.js';

const router = express.Router();

// Admin  question creation
router.post('/question', verifyToken, roleCheck(['admin']), createQuestion);

// Admin will map the  participants to supervisor, peers, and juniors
router.post('/map', verifyToken, roleCheck(['admin']), mapParticipants);

// Admin who will  views all mappings
router.get('/mappings', verifyToken, roleCheck(['admin']), getAllMappings);

export default router;
