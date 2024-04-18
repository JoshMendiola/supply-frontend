import React from 'react';

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ position }) => {
    const { isLoggedIn } = useAuth()

    const sidebarStyle = {
        position: 'fixed',
        top: 0,
        bottom: 0,
        [position]: 0,
        width: '200px',
        padding: '20px',
        border: '4px'
    };

    const linkContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '550%',
    };

    return (
        <div style={sidebarStyle}>
            <div style={linkContainerStyle}>
                <Link to={"/"} className="services">Home</Link>
                {isLoggedIn && <Link to={"/fleetdashboard"} className="services">Dashboard</Link>}
            </div>
        </div>
    );
};

export default Sidebar;
