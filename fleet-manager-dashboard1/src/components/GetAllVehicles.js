import React, { useState, useEffect } from 'react';

function GetAllVehicles() {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = () => {
            fetch('https://team-11.supply.seuswe.rocks//api/get-all-vehicles')
                .then(response => response.json())
                .then(data => {
                    // Ensure we are accessing the 'Vehicles' key from the response
                    if (data.Vehicles) {
                        setVehicles(data.Vehicles);
                    } else {
                        console.error('Vehicles key not found in response');
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        };

        fetchVehicles(); // Fetch immediately on component mount
        const interval = setInterval(fetchVehicles, 1000); // Then fetch every 1000 milliseconds (1 second)

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, []);


    return (
        <div>
            <h1>Live Vehicle Data</h1>
            <ul>
                {vehicles.map((vehicle, index) => (
                    <li key={index}>
                        Latitude: {vehicle.current_lat}, Longitude: {vehicle.current_lon},
                        Type: {vehicle.vehicle_type}, Speed: {vehicle.speed}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GetAllVehicles;