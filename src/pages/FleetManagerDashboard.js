import MapComponent from '../components/MapComponent';
import React, { useState, useEffect } from 'react';
import GetAllVehicles from "../components/GetAllVehicles";
import Sidebar from "../components/Sidebar";

const DashboardPage = () => {
    // MapComponent will be included here and passed routeData as props
    return (
        <div>
            <Sidebar/>
            <div id="title-and-links" className="centered-flex">
                <div className="title">
                    <h1 className="ihaul-style"> Dashboard</h1>
                </div>
            </div>
            <GetAllVehicles />
            <h2>Location of Vehicles</h2>
            <MapComponent/>
        </div>
    );
};

export default DashboardPage;