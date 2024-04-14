import MapComponent from '../components/MapComponent';
import React, { useState, useEffect } from 'react';
import GetAllVehicles from "../components/GetAllVehicles";
import Sidebar from "../components/Sidebar";

const DashboardPage = () => {
    return (
        <div>
            <Sidebar/>
            <div id="title-and-links" className="centered-flex">
                <div className="title">
                    <h1 className="ihaul-style">Dashboard</h1>
                </div>
            </div>


            <h2 style={{ marginLeft: '51%' }}>Location of Vehicles</h2>
            <MapComponent/>
            <GetAllVehicles/>
        </div>
    );
};


export default DashboardPage;