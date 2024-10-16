import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credentials, navigate);
        } catch (err) {
            setError('Login failed! Please check your credentials.');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
                <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
