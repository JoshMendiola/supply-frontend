import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { fetchVehicleData } from './VehicleService'; // Adjust the path as needed
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zaHVhbWVuZGlvbGFtYXAiLCJhIjoiY2x2NHIwcmFoMGNxYTJrcDVxM2dkejB1aCJ9.by1L5S6qb2NABCUvKcTQQA';

const MapComponent = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const markers = useRef({});

    useEffect(() => {
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-97.7431, 30.2672],
            zoom: 10
        });

        return () => {
            Object.values(markers.current).forEach(marker => marker.remove());
            map.current.remove();
            map.current = null;
        };
    }, []);

    const getColorByPlugin = (vehicleType) => {
        // Define colors based on the plugin number
        const colors = {
            "ihaul": '#d68829',
            "medmobile": '#0ec3cc',
            "nomad": '#3abd5b',
            default: 'black',
        };
        return colors[vehicleType] || colors.default;
    };

    const updateMarkers = (vehicleData) => {
        const newMarkers = {};

        vehicleData.forEach(vehicle => {
            const { current_lat, current_lon, id, vehicle_type } = vehicle;
            const color = getColorByPlugin(vehicle_type);

            if (markers.current[id]) {
                // Update position and color if it already exists
                markers.current[id].setLngLat([current_lon, current_lat]);
                markers.current[id].getElement().style.backgroundColor = color;
                newMarkers[id] = markers.current[id];
            } else {
                // Create a new div element for the custom marker
                const el = document.createElement('div');
                el.className = 'marker';
                el.style.backgroundColor = color;
                el.style.width = '30px';
                el.style.height = '30px';
                el.style.borderRadius = '50%'; // Circular markers

                const marker = new mapboxgl.Marker(el)
                    .setLngLat([current_lon, current_lat])
                    .addTo(map.current);
                newMarkers[id] = marker;
            }
        });

        // Remove old markers that were not updated
        Object.keys(markers.current).forEach(id => {
            if (!newMarkers[id]) {
                markers.current[id].remove();
            }
        });

        markers.current = newMarkers;
    };

    useEffect(() => {
        const fetchDataAndUpdateMarkers = async () => {
            const data = await fetchVehicleData();
            updateMarkers(data);
        };

        fetchDataAndUpdateMarkers();
        const intervalId = setInterval(fetchDataAndUpdateMarkers, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div style={{ width: '100%', height: '300px' }}>
            <div ref={mapContainer} style={{ width: '100%', height: '100%', minWidth: '500px' }} />
        </div>
    );
};

export default MapComponent;