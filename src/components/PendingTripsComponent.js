import React, { useState, useEffect } from 'react';
import MedMobileIcon from "../images/icons/MedMobileIcon.png";
import IHaulIcon from "../images/icons/IHaulIcon.png";
import NomadIcon from "../images/icons/NomadIcon.png";
import UnknownIcon from "../images/icons/UnknownIcon.png";

function PendingTrips() {
    const [pendingTrips, setPendingTrips] = useState([]);

    useEffect(() => {
        const fetchPendingTrips = () => {
            fetch('https://team-11.supply.seuswe.rocks/api/get-all-pending-trips')
                .then(response => response.json()) // Converts the response to JSON
                .then(data => {
                    setPendingTrips(data.trips);
                })
                .catch(error => console.error('Error fetching data:', error));
        };

        fetchPendingTrips();
        const interval = setInterval(fetchPendingTrips, 1000); // Re-fetches every 1000 ms (1 second)

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    const getPluginIcon = (plugin) => {
        const style = { width: '30px', height: '30px' };
        switch (plugin) {
            case 1:
                return <img src={IHaulIcon} alt="IHaul Icon" style={style} />;
            case 2:
                return <img src={MedMobileIcon} alt= "MedMobile Icon" style={style} />;
            case 3:
                return <img src={NomadIcon} alt="Nomad Icon" style={style} />;
            default:
                return <img src={UnknownIcon} alt="Unknown Plugin Icon" style={style} />;
        }
    };

    return (
        <div>
            <table className="trip-data">
                <thead>
                <tr>
                    <th>Timestamp</th>
                    <th>Plugin</th>
                    <th>Destinations</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {pendingTrips.map((trip, index) => (
                    <tr key={index}>
                        <td>{trip.timestamp}</td>
                        <td>{getPluginIcon(trip.plugin)}</td>
                        <td>{trip.destinations.map((dest, idx) => (
                            <div key={idx}>Lat: {dest.lat}, Lon: {dest.lon}</div>
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
