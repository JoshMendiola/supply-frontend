import React, { useState, useEffect } from 'react';

function GetAllVehicles() {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = () => {
            fetch('https://team-11.supply.seuswe.rocks/api/get-all-vehicles')
                .then(response => response.json())
                .then(data => {
                    if (data.Vehicles) {
                        console.log(data.Vehicles);
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
            <h2>Live Vehicle Data</h2>
            <table className="vehicle-data">
                <thead>
                <tr>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Type</th>
                    <th>Speed</th>
                </tr>
                </thead>
                <tbody>
                {vehicles.map((vehicle, index) => (
                    <tr key={index}>
                        <td>{vehicle.current_lat}</td>
                        <td>{vehicle.current_lon}</td>
                        <td>{vehicle.vehicle_type}</td>
                        <td>{vehicle.speed}</td>
                        <td>{vehicle.battery_percentage}</td>
                        <td>{vehicle.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default GetAllVehicles;
