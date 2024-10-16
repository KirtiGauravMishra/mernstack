import AppraisalForm from '../models/appraisalForm.js';
import ParticipantMap from '../models/participantMap.js';

// Submit appraisal form (for all roles)
export const submitAppraisal = async (req, res) => {
    const { participantId, formType, answers } = req.body;

    try {
        const newForm = new AppraisalForm({
            participant: participantId,
            reviewer: req.userId, 
            formType,
            answers,
        });

        await newForm.save();
        res.status(201).json({ message: 'Appraisal form submitted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to submit appraisal form' });
    }
};

// Supervisor/Peers/Juniors: Get only the forms they are allowed to see
export const getFormsForRole = async (req, res) => {
    const { participantId } = req.params;

    try {
        const mapping = await ParticipantMap.findOne({ participant: participantId });

        if (!mapping) return res.status(404).json({ message: 'No mapping found' });

        const userId = req.userId;
        const userRole = req.userRole;  
        
        let forms;

        if (userRole === 'supervisor' && mapping.supervisor.toString() === userId) {
            forms = await AppraisalForm.find({
                participant: participantId,
                $or: [{ formType: 'self' }, { reviewer: userId }],
            });
        } else if (userRole === 'peer' && mapping.peers.includes(userId)) {
            forms = await AppraisalForm.find({ participant: participantId, reviewer: userId });
        } else if (userRole === 'junior' && mapping.juniors.includes(userId)) {
            forms = await AppraisalForm.find({ participant: participantId, reviewer: userId });
        } else {
            return res.status(403).json({ message: 'You are not authorized to view these forms' });
        }

        res.status(200).json(forms);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve forms' });
    }
};
