import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { mapParticipants } from '../../utils/api';

const MapParticipants = () => {
    const { user } = useContext(AuthContext);
    const [mapping, setMapping] = useState({ participantId: '', supervisorId: '', peerIds: [], juniorIds: [] });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'peerIds' || name === 'juniorIds') {
            setMapping({ ...mapping, [name]: value.split(',') });
        } else {
            setMapping({ ...mapping, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await mapParticipants(mapping, localStorage.getItem('token'));
        setMapping({ participantId: '', supervisorId: '', peerIds: [], juniorIds: [] });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="participantId" value={mapping.participantId} onChange={handleChange} placeholder="Participant ID" required />
            <input type="text" name="supervisorId" value={mapping.supervisorId} onChange={handleChange} placeholder="Supervisor ID" required />
            <input type="text" name="peerIds" value={mapping.peerIds.join(',')} onChange={handleChange} placeholder="Peer IDs (comma-separated)" />
            <input type="text" name="juniorIds" value={mapping.juniorIds.join(',')} onChange={handleChange} placeholder="Junior IDs (comma-separated)" />
            <button type="submit">Map Participants</button>
        </form>
    );
};

export default MapParticipants;
