import express from 'express';
import { verifyToken } from '../utils/jwt.js';
import { roleCheck } from '../middleware/roleMiddleware.js';
import { submitAppraisal, getFormsForRole } from '../controllers/appraisalController.js';

const router = express.Router();

// Supervisors, Peers, Juniors, Participants submit appraisal form
router.post('/submit', verifyToken, roleCheck(['supervisor', 'peer', 'junior', 'participant']), submitAppraisal);

// Get forms for participant based on role
router.get('/:participantId', verifyToken, getFormsForRole);

export default router;
