import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { fetchVehicleData } from '../services/VehicleService';
import { fetchMaintenanceData } from '../services/MaintenanceLocationService';
import 'mapbox-gl/dist/mapbox-gl.css';
import CarIcon from '../images/icons/CarIcon.png'; // Ensure this path is correct
import MaintenanceIcon from '../images/icons/MaintenanceIcon.png'; // Path to maintenance icon

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zaHVhbWVuZGlvbGFtYXAiLCJhIjoiY2x2NHIwcmFoMGNxYTJrcDVxM2dkejB1aCJ9.by1L5S6qb2NABCUvKcTQQA';

const MapComponent = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const vehicleMarkers = useRef({});

    useEffect(() => {
        if (map.current) return; // Prevent reinitializing the map

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-97.7431, 30.2672],
            zoom: 10
        });

        const updateVehicleMarkers = (vehicles) => {
            // Clear existing vehicle markers
            Object.keys(vehicleMarkers.current).forEach(key => {
                vehicleMarkers.current[key].remove();
            });
            vehicleMarkers.current = {};

            vehicles.forEach(vehicle => {
                const { current_lat, current_lon, _id, vehicle_type, battery_percentage, status } = vehicle;
                const color = getColorByPlugin(vehicle_type);

                const el = document.createElement('div');
                el.className = 'marker';
                el.style.backgroundColor = color;
                el.style.backgroundImage = `url(${CarIcon})`;
                el.style.backgroundSize = '80%';
                el.style.backgroundRepeat = 'no-repeat';
                el.style.backgroundPosition = 'center';
                el.style.width = '30px';
                el.style.height = '30px';
                el.style.borderRadius = '50%';

                const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                    `<strong>ID:</strong> ${_id}<br>` +
                    `<strong>Type:</strong> ${vehicle_type}<br>` +
                    `<strong>Battery:</strong> ${battery_percentage}%<br>` +
                    `<strong>Status:</strong> ${status}`
                );

                const marker = new mapboxgl.Marker(el)
                    .setLngLat([current_lon, current_lat])
                    .setPopup(popup)
                    .addTo(map.current);

                vehicleMarkers.current[_id] = marker;
            });
        };

        const intervalId = setInterval(() => {
            fetchVehicleData().then(updateVehicleMarkers);
        }, 3000); // Update markers every 3 seconds

        // Fetch and display battery markers once on load
        fetchMaintenanceData().then(maintenance_zones => {
            maintenance_zones.forEach(zone => {
                const { lat, lon, _id } = zone;

                const el = document.createElement('div');
                el.className = 'marker';
                el.style.backgroundColor = '#ad3d5f';
                el.style.backgroundImage = `url(${MaintenanceIcon})`;
                el.style.backgroundSize = '65%';
                el.style.backgroundRepeat = 'no-repeat';
                el.style.backgroundPosition = 'center';
                el.style.width = '30px';
                el.style.height = '30px';
                el.style.borderRadius = '50%';

                const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                    `<strong>Maintenance Zone</strong>`
                );

                new mapboxgl.Marker(el)
                    .setLngLat([lon, lat])
                    .setPopup(popup)
                    .addTo(map.current);
            });
        });

        return () => {
            clearInterval(intervalId);
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
            Object.keys(vehicleMarkers.current).forEach(key => {
                vehicleMarkers.current[key].remove();
            });
        };
    }, []);

    return (
        <div style={{ width: '500px', height: '100%' }}>
            <div ref={mapContainer} style={{ width: '100%', height: '300px' }} />
        </div>
    );
};

export default MapComponent;

// Helper function to determine color based on vehicle type
function getColorByPlugin(vehicleType) {
    const colors = {
        "ihaul": '#d68829',
        "medmobile": '#0ec3cc',
        "nomad": '#3abd5b',
        default: 'grey',
    };
    return colors[vehicleType] || colors.default;
}
