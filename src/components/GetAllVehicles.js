import React, { useState, useEffect } from 'react';
import IHaulIcon from "../images/icons/IHaulIcon.png";
import NomadIcon from "../images/icons/NomadIcon.png";
import MedMobileIcon from "../images/icons/MedMobileIcon.png";
import UnknownIcon from "../images/icons/UnknownIcon.png";

function GetAllVehicles() {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = () => {
            fetch('https://team-11.supply.seuswe.rocks/api/get-all-vehicles')
                .then(response => response.json())
                .then(data => {
                    if (data.Vehicles) {
                        setVehicles(data.Vehicles);
                    } else {
                        console.error('Vehicles key not found in response');
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        };

        fetchVehicles();
        const interval = setInterval(fetchVehicles, 1000);
        return () => clearInterval(interval);
    }, []);

    const getVehicleIcon = (type) => {
        const style = { width: '30px', height: '30px' };
        switch (type.toLowerCase()) {
            case 'ihaul':
                return <img src={IHaulIcon} alt="I-Haul Icon" style={style} />;
            case 'nomad':
                return <img src={NomadIcon} alt="Nomad Icon" style={style} />;
            case 'medmobile':
                return <img src={MedMobileIcon} alt="MedMobile Icon" style={style} />;
            default:
                return <img src={UnknownIcon} alt="Unknown Vehicle Icon" style={style} />;
        }
    };

    const handleUpdateVehicle = (vehicleId, currentStatus) => {
        const url = 'https://team-11.supply.seuswe.rocks/api/update-vehicle-status';
        const newStatus = currentStatus === 'STOPPED' ? 'RESUME' : 'STOPPED';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                vehicle_id: vehicleId,
                new_status: newStatus,
            })
        })
            .then(response => response.json())
            .catch(error => {
                console.error('Error updating vehicle:', error);
                alert('Failed to update vehicle');
            });
    };

    const getBatteryStyle = (percentage) => {
        if (percentage > 65) {
            return { color: '#34cf23' };
        } else if (percentage > 30) {
            return { color: '#d4c92f' };
        } else {
            return { color: '#cf2d21' };
        }
    };

    return (
        <div>
            <table className="vehicle-data" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th>Battery Percentage</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Type</th>
                    <th>Speed</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {vehicles.map((vehicle, index) => (
                    <tr key={index} style={{ border: '3px solid black', padding: '5px' }}>
                        <td style={getBatteryStyle(vehicle.battery_percentage)}>{vehicle.battery_percentage + '%'}</td>
                        <td>{parseFloat(vehicle.current_lat).toFixed(6)}</td>
                        <td>{parseFloat(vehicle.current_lon).toFixed(6)}</td>
                        <td>{getVehicleIcon(vehicle.vehicle_type)}</td>
                        <td>{vehicle.speed}</td>
                        <td>{vehicle.status}</td>
                        <td>
                            <button
                                onClick={() => handleUpdateVehicle(vehicle._id, vehicle.status)}
                                style={{
                                    color: 'white',
                                    backgroundColor: vehicle.status === 'STOPPED' ? 'red' : 'green',
                                    border: 'none',
                                    padding: '10px 20px',
                                    cursor: 'pointer'
                                }}
                            >
                                {vehicle.status === 'STOPPED' ? 'Resume' : 'Stop'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default GetAllVehicles;
