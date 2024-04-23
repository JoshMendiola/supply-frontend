import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ position }) => {
    const { isLoggedIn } = useAuth();

    const navbarStyle = {
        position: 'fixed',
        top: 10,
        right: 20,
        width: '200px',
        height: '40px',
        padding: '20px 0px 20px 40px',
        border: '2px solid #4FC2D9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#11364b',
        borderRadius: '6px'
    };

    const linkContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
        gap: '10px', // Adds space between links
    };

    return (
        <div style={navbarStyle}>
            <div style={linkContainerStyle}>
                <Link to="/" className="services">Home</Link>
                {isLoggedIn && <Link to="/fleetdashboard" className="services">Dashboard</Link>}
            </div>
        </div>
    );
};

export default Navbar;
