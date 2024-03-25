import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { isLoggedIn, username } = useAuth()

    return (
        <div className="links-container">
            <Link to={"/"} className="services">Home</Link>
            {isLoggedIn && <Link to={"/fleetdashboard"} className="services">Dashboard</Link>}
        </div>
    );
};

export default Sidebar;