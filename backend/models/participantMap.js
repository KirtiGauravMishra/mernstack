import mongoose from 'mongoose';

const participantMapSchema = new mongoose.Schema({
    participant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    peers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    juniors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const ParticipantMap = mongoose.model('ParticipantMap', participantMapSchema);
export default ParticipantMap;
