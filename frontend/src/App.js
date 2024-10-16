import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import CreateQuestion from './components/Admin/CreateQuestion';
import MapParticipants from './components/Admin/MapParticipants';
import ViewMappings from './components/Admin/ViewMappings';
import SubmitAppraisal from './components/Appraisal/SubmitAppraisal';
import ViewAppraisals from './components/Appraisal/ViewAppraisals';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                     <Route path="/login" element={<Login />} />
                     <Route path="/signup" element={<Signup />} />
                    <Route path="/appraisal/submit" element={<PrivateRoute element={<SubmitAppraisal />} />} />
                     <Route path="/appraisal/view" element={<PrivateRoute element={<ViewAppraisals />} />} />
                    <Route path="/admin/create-question" element={<PrivateRoute element={<CreateQuestion />} />} />
                     <Route path="/admin/map-participants" element={<PrivateRoute element={<MapParticipants />} />} />
                    <Route path="/admin/view-mappings" element={<PrivateRoute element={<ViewMappings />} />} />
                    <Route path="/" element={<h1>Welcome to the Appraisal System</h1>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
