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
                .then(response => response.json())
                .then(data => {
                    setPendingTrips(data.trips.map(trip => {
                        const timestamp = new Date(trip.timestamp + 'Z'); // Ensure UTC by adding 'Z'
                        trip.localTimestamp = timestamp.toLocaleString(); // Converts to local time string
                        return trip;
                    }));
                })
                .catch(error => console.error('Error fetching data:', error));
        };

        fetchPendingTrips();
        const fetchInterval = setInterval(fetchPendingTrips, 1000); // Re-fetches every 1000 ms (1 second)
        return () => clearInterval(fetchInterval);
    }, []);

    const getTimeAgo = (isoString) => {
        const past = new Date(isoString + 'Z'); // Parse as UTC
        const now = new Date(); // Current time in user's local time
        const diff = now - past; // Difference in milliseconds

        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    };

    const getPluginIcon = (plugin) => {
        const style = { width: '30px', height: '30px' };
        switch (plugin) {
            case 1:
                return <img src={IHaulIcon} alt="IHaul Icon" style={style} />;
            case 2:
                return <img src={MedMobileIcon} alt="MedMobile Icon" style={style} />;
            case 3:
                return <img src={NomadIcon} alt="Nomad Icon" style={style} />;
            default:
                return <img src={UnknownIcon} alt="Unknown Plugin Icon" style={style} />;
        }
    };

    return (
        <div>
            <table className="trip-data" style={{ borderCollapse: 'separate', borderSpacing: '0' }}>
                <thead>
                <tr>
                    <th>Timestamp (Local)</th>
                    <th>Plugin</th>
                    <th>Status</th>
                    <th>Time Ago</th>
                </tr>
                </thead>
                <tbody>
                {pendingTrips.map((trip, index) => (
                    <tr key={index}>
                        <td style={{ border: '2px solid black', padding: '5px' }}>{trip.localTimestamp}</td>
                        <td style={{ border: '2px solid black', padding: '5px' }}>{getPluginIcon(trip.plugin)}</td>
                        <td style={{ border: '2px solid black', padding: '5px' }}>{trip.trip_status}</td>
                        <td style={{ border: '2px solid black', padding: '5px' }}>{getTimeAgo(trip.timestamp)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PendingTrips;
