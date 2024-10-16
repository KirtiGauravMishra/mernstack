import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1'; 

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
};

export const registerUser = async (userInfo) => {
    await axios.post(`${API_URL}/auth/register`, userInfo);
};

export const createQuestion = async (question, token) => {
    await axios.post(`${API_URL}/admin/question`, question, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const mapParticipants = async (mapping, token) => {
    await axios.post(`${API_URL}/admin/map`, mapping, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const submitAppraisal = async (appraisal, token) => {
    await axios.post(`${API_URL}/appraisal/submit`, appraisal, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getAppraisals = async (participantId, token) => {
    const response = await axios.get(`${API_URL}/appraisal/${participantId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getMappings = async (token) => {
    const response = await axios.get(`${API_URL}/admin/mappings`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
