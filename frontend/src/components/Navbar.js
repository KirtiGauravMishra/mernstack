import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css'; 

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>Appraisal System</h1>
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                {!user ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                ) : (
                    <>
                        {user.role === 'admin' && (
                            <>
                                <Link to="/admin/create-question">Create Question</Link>
                                <Link to="/admin/map-participants">Map Participants</Link>
                                <Link to="/admin/view-mappings">View Mappings</Link>
                            </>
                        )}
                        {['supervisor', 'peer', 'junior', 'participant'].includes(user.role) && (
                            <>
                                <Link to="/appraisal/submit">Submit Appraisal</Link>
                                <Link to="/appraisal/view">View Appraisals</Link>
                            </>
                        )}
                        <button className="logout-button" onClick={logout}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
