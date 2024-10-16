import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getAppraisals } from '../../utils/api';

const ViewAppraisals = () => {
    const { user } = useContext(AuthContext);
    const [appraisals, setAppraisals] = useState([]);

    useEffect(() => {
        const fetchAppraisals = async () => {
            const participantId = "participant_id"; 
            const data = await getAppraisals(participantId, localStorage.getItem('token'));
            setAppraisals(data);
        };
        fetchAppraisals();
    }, []);

    return (
        <div>
            <h3>Your Appraisals</h3>
            {appraisals.map(appraisal => (
                <div key={appraisal._id}>
                    <h4>Submitted by: {appraisal.reviewer.name}</h4>
                    <p>Type: {appraisal.formType}</p>
                    <p>Answers: {JSON.stringify(appraisal.answers)}</p>
                </div>
            ))}
        </div>
    );
};

export default ViewAppraisals;
