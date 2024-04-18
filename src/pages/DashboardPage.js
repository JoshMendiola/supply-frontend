import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import GetAllVehicles from "../components/GetAllVehicles";
import Sidebar from "../components/Sidebar";
import PendingTripsComponent from "../components/PendingTripsComponent";
import DashboardItem from '../components/DashboardItem';
import VehicleStatusChart from "../components/VehicleStatusChart";

const DashboardPage = () => {
    const [items, setItems] = useState([
        { id: 'map', label: 'Map', Component: MapComponent },
        { id: 'trips', label: 'Pending Trips', Component: PendingTripsComponent },
        { id: 'vehicles', label: 'Live Vehicle Data', Component: GetAllVehicles },
        { id: 'vehiclechart', label: 'Vehicles by Status', Component: VehicleStatusChart}
    ]);

    const handleDragOver = e => {
        e.preventDefault(); // Necessary to allow dropping
    };

    const handleDrop = (e, targetItem) => {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData("text");
        const newItems = reorderItems(draggedId, targetItem.id);
        setItems(newItems);
    };

    const reorderItems = (draggedId, targetId) => {
        const newItems = [...items];
        const draggedIndex = items.findIndex(item => item.id === draggedId);
        const targetIndex = items.findIndex(item => item.id === targetId);
        const [reorderedItem] = newItems.splice(draggedIndex, 1);
        newItems.splice(targetIndex, 0, reorderedItem);
        return newItems;
    };

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData("text", id);
    };

    return (
        <div className="dashboard-container">
            <Sidebar/>
            <div className="title-and-links centered-flex">
                <h1 className="ihaul-style">Dashboard</h1>
            </div>
            <div className="main-content">
                {items.map(item => (
                    <DashboardItem
                        key={item.id}
                        id={item.id}
                        onDragStart={e => handleDragStart(e, item.id)}
                        onDragOver={handleDragOver}
                        onDrop={e => handleDrop(e, item)}
                    >
                        <h2>{item.label}</h2>
                        <item.Component />
                    </DashboardItem>
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;
