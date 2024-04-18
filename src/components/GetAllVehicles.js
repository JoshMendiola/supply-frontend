import React, { useState, useEffect } from 'react';

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


    return (
        <div>
            <table className="vehicle-data">
                <thead>
                <tr>
                    <th>Battery Percentage</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Type</th>
                    <th>Speed</th>
                    <th>Status</th>

                </tr>
                </thead>
                <tbody>
                {vehicles.map((vehicle, index) => (
                    <tr key={index}>
                        <td>{vehicle.battery_percentage}</td>
                        <td>{vehicle.current_lat}</td>
                        <td>{vehicle.current_lon}</td>
                        <td>{vehicle.vehicle_type}</td>
                        <td>{vehicle.speed}</td>
                        <td>{vehicle.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default GetAllVehicles;
