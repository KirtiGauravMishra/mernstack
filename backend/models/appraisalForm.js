import mongoose from 'mongoose';

const appraisalFormSchema = new mongoose.Schema({
    participant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    formType: { type: String, enum: ['self', 'manager', 'peer', 'junior'], required: true },
    answers: [{ question: String, answer: String }],
    date: { type: Date, default: Date.now },
});

const AppraisalForm = mongoose.model('AppraisalForm', appraisalFormSchema);
export default AppraisalForm;
