import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { submitAppraisal } from '../../utils/api';

const SubmitAppraisal = () => {
    const { user } = useContext(AuthContext);
    const [appraisal, setAppraisal] = useState({ participantId: '', formType: '', answers: {} });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppraisal({ ...appraisal, [name]: value });
    };

    const handleAnswerChange = (e, question) => {
        setAppraisal({ ...appraisal, answers: { ...appraisal.answers, [question]: e.target.value } });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await submitAppraisal(appraisal, localStorage.getItem('token'));
        setAppraisal({ participantId: '', formType: '', answers: {} });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="participantId" value={appraisal.participantId} onChange={handleChange} placeholder="Participant ID" required />
            <select name="formType" onChange={handleChange} required>
                <option value="">Select Form Type</option>
                <option value="self">Self-Appraisal</option>
                <option value="peer">Peer Review</option>
                <option value="supervisor">Supervisor Review</option>
            </select>
          
            <button type="submit">Submit Appraisal</button>
        </form>
    );
};

export default SubmitAppraisal;
