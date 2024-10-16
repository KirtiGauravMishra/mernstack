import Question from '../models/question.js';
import ParticipantMap from '../models/participantMap.js';
import User from '../models/user.js';

// Creating a new appraisal question
export const createQuestion = async (req, res) => {
    const { questionText } = req.body;
    
    try {
        const newQuestion = new Question({ questionText, createdBy: req.userId });
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create question' });
    }
};

// Mapping participants to supervisors, peers, and juniors
export const mapParticipants = async (req, res) => {
    const { participantId, supervisorId, peerIds, juniorIds } = req.body;

    try {
        const participant = await User.findById(participantId);
        if (!participant) return res.status(404).json({ message: 'Participant not found' });

        const newMapping = new ParticipantMap({
            participant: participantId,
            supervisor: supervisorId,
            peers: peerIds,
            juniors: juniorIds,
        });

        await newMapping.save();
        res.status(201).json({ message: 'Mapping created successfully', mapping: newMapping });
    } catch (err) {
        res.status(500).json({ error: 'Failed to map participants' });
    }
};

// Admin to View all the mappings
export const getAllMappings = async (req, res) => {
    try {
        const mappings = await ParticipantMap.find()
            .populate('participant supervisor peers juniors');
        res.status(200).json(mappings);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch mappings' });
    }
};
