import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { fetchVehicleData } from './VehicleService'; // adjust the path as needed
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoiamdpcm9ubG8iLCJhIjoiY2x1NjJ0ZHVsMXdycDJtbnkycWIwZXJ1cyJ9.Pc7EyDNEmBEqC8QiPjoOng';

const MapComponent = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        if (map.current) return;
        // Austin, TX coordinates
        const austinLat = 30.2672;
        const austinLon = -97.7431;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [austinLon, austinLat], // Set to Austin's coordinates
            zoom: 10 // Adjust the zoom level as needed
        });

        // Function to update markers on the map
        const updateMarkers = (vehicleData) => {
            if (!Array.isArray(vehicleData) || vehicleData.length === 0) {
                console.error('Invalid or empty vehicleData:', vehicleData);
                return; // Exit the function if vehicleData is not an array or is empty
            }

            // Log the data to ensure it's in the expected format
            console.log('Vehicle data:', vehicleData);

            // Remove existing markers
            markers.forEach(marker => marker.remove());

            const newMarkers = vehicleData.map(vehicle => {
                console.log('Vehicle location:', vehicle.current_lat, vehicle.current_lon); //DELETE MEEEEE
                const marker = new mapboxgl.Marker({ "iconSize": [40, 40] }) // Set icon size width and height in pixels
                    .setLngLat([vehicle.current_lon, vehicle.current_lat])
                    .addTo(map.current);
                return marker;
            });

            setMarkers(newMarkers);
        };


        const fetchDataAndUpdateMarkers = async () => {
            const data = await fetchVehicleData();
            console.log("Updating map")
            updateMarkers(data);
        };

        fetchDataAndUpdateMarkers();
        // Set interval to fetch vehicle data periodically
        const intervalId = setInterval(fetchDataAndUpdateMarkers, 1000); // Adjust the interval as needed

        return () => clearInterval(intervalId);
    }, []);

    return <div ref={mapContainer} style={{ height: '300px', width: '30%', marginLeft: '60%' }} />;
};

export default MapComponent;

