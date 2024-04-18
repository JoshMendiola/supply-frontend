import React, { useState, useEffect } from 'react';

function PendingTrips() {
    const [pendingTrips, setPendingTrips] = useState([]);

    useEffect(() => {
        const fetchPendingTrips = () => {
            fetch('https://team-11.supply.seuswe.rocks/api/get-all-pending-trips')
                .then(response => response.json()) // Converts the response to JSON
                .then(data => {
                    // Access the 'trips' key from the response data
                    setPendingTrips(data.trips);
                })
                .catch(error => console.error('Error fetching data:', error));
        };

        fetchPendingTrips();
        const interval = setInterval(fetchPendingTrips, 1000); // Re-fetches every 1000 ms (1 second)

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    return (
        <div>
            <table className="trip-data">
                <thead>
                <tr>
                    <th>Timestamp</th>
                    <th>Plugin</th>
                    <th>Destinations</th>
                </tr>
                </thead>
                <tbody>
                {pendingTrips.map((trip, index) => (
                    <tr key={index}>
                        <td>{trip.timestamp}</td>
                        <td>{trip.plugin}</td>
                        <td>{trip.destinations.map((dest, idx) => (
                            <div key={idx}>
                                Lat: {dest.lat}, Lon: {dest.lon}
                            </div>
                        ))}</td>
                        <td>{trip.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PendingTrips;
