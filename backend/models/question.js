import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Question = mongoose.model('Question', questionSchema);
export default Question;
