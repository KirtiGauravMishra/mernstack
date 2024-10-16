import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getMappings } from '../../utils/api';

const ViewMappings = () => {
    const { user } = useContext(AuthContext);
    const [mappings, setMappings] = useState([]);

    useEffect(() => {
        const fetchMappings = async () => {
            const data = await getMappings(localStorage.getItem('token'));
            setMappings(data);
        };
        fetchMappings();
    }, []);

    return (
        <div>
            <h3>Participant Mappings</h3>
            {mappings.map(mapping => (
                <div key={mapping._id}>
                    <h4>Participant: {mapping.participant.name}</h4>
                    <p>Supervisor: {mapping.supervisor.name}</p>
                    <p>Peers: {mapping.peers.map(peer => peer.name).join(', ')}</p>
                    <p>Juniors: {mapping.juniors.map(junior => junior.name).join(', ')}</p>
                </div>
            ))}
        </div>
    );
};

export default ViewMappings;
