import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userRole = localStorage.getItem('role');
            setUser({ role: userRole });
        }
    }, []);

    const login = async (credentials, navigate) => {
        const data = await loginUser(credentials);
        setUser({ role: data.role });
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        navigate('/'); 
    };

    const register = async (userInfo, navigate) => {
        await registerUser(userInfo);
        navigate('/login'); 
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
