import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { createQuestion } from '../../utils/api';

const CreateQuestion = () => {
    const { user } = useContext(AuthContext);
    const [question, setQuestion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createQuestion({ questionText: question }, localStorage.getItem('token'));
        setQuestion('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Appraisal Question" required />
            <button type="submit">Create Question</button>
        </form>
    );
};

export default CreateQuestion;
