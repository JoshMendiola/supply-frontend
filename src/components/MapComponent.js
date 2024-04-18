import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { fetchVehicleData } from './VehicleService'; // adjust the path as needed
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zaHVhbWVuZGlvbGFtYXAiLCJhIjoiY2x2NHIwcmFoMGNxYTJrcDVxM2dkejB1aCJ9.by1L5S6qb2NABCUvKcTQQA';

const MapComponent = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [markers, setMarkers] = useState({});
    const markerRef = useRef({});

    useEffect(() => {
        if (!mapContainer.current || map.current || mapContainer.current.offsetWidth === 0 || mapContainer.current.offsetHeight === 0) {
            return;
        }

        // Map initialization
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-97.7431, 30.2672],
            zoom: 10
        });

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const updateMarkers = (vehicleData) => {
            if (!map.current) return;
            vehicleData.forEach(vehicle => {
                const { current_lat, current_lon, id } = vehicle;
                if (markerRef.current[id]) {
                    // Move existing marker
                    animateMarker(id, [current_lon, current_lat]);
                } else {
                    // Create new marker
                    const marker = new mapboxgl.Marker({ "iconSize": [40, 40] })
                        .setLngLat([current_lon, current_lat])
                        .addTo(map.current);
                    markerRef.current[id] = marker;
                }
            });
        };

        const animateMarker = (id, newCoords) => {
            const marker = markerRef.current[id];
            const oldCoords = marker.getLngLat();
            const steps = 20;
            let step = 0;

            const intervalId = setInterval(() => {
                step++;
                const newLat = oldCoords.lat + (newCoords[1] - oldCoords.lat) * (step / steps);
                const newLon = oldCoords.lng + (newCoords[0] - oldCoords.lng) * (step / steps);
                marker.setLngLat([newLon, newLat]);

                if (step === steps) {
                    clearInterval(intervalId);
                }
            }, 50); // Adjust timing to control speed of animation
        };

        const fetchDataAndUpdateMarkers = async () => {
            const data = await fetchVehicleData();
            updateMarkers(data);
        };

        fetchDataAndUpdateMarkers();
        const intervalId = setInterval(fetchDataAndUpdateMarkers, 1000);

        return () => clearInterval(intervalId);
    }, []);


    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <div ref={mapContainer} style={{ height: '300px', width: '100%', minWidth: '500px'}} />
        </div>
    );
};

export default MapComponent;

