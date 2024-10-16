import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css';

const Signup = () => {
    const { register } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({ name: '', email: '', password: '', role: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(userInfo, navigate);
        } catch (err) {
            setError('Signup failed! Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>Signup</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" onChange={handleChange} placeholder="Name" required />
                <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
                <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
                <select name="role" onChange={handleChange} required>
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="peer">Peer</option>
                    <option value="junior">Junior</option>
                    <option value="participant">Participant</option>
                </select>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
