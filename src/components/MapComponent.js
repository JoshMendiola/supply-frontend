import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { fetchVehicleData } from './VehicleService'; // adjust the path as needed
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoiamdpcm9ubG8iLCJhIjoiY2x1NjJ0ZHVsMXdycDJtbnkycWIwZXJ1cyJ9.Pc7EyDNEmBEqC8QiPjoOng';

const MapComponent = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [markers, setMarkers] = useState({});
    const markerRef = useRef({});

    useEffect(() => {
        if (map.current) return; // Initialize the map only once

        // Map initialization
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-97.7431, 30.2672], // Example coordinates (Austin, TX)
            zoom: 10
        });

        return () => {
            Object.values(markerRef.current).forEach(marker => marker.remove());
        };
    }, []);

    useEffect(() => {
        const updateMarkers = (vehicleData) => {
            vehicleData.forEach(vehicle => {
                const { current_lat, current_lon } = vehicle;
                if (markerRef.current[vehicle.id]) {
                    // Move existing marker
                    animateMarker(vehicle.id, [current_lon, current_lat]);
                } else {
                    // Create new marker
                    const marker = new mapboxgl.Marker({ "iconSize": [40, 40] })
                        .setLngLat([current_lon, current_lat])
                        .addTo(map.current);
                    markerRef.current[vehicle.id] = marker;
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
    <div style={{ display: 'flex' }}>
      <div style={{ width: '20%', display: 'flex', flexDirection: 'row', gap: '70px', color: '#1c6b7c', marginTop: '-5%' }}>
          <h3 style={{textAlign: 'center', marginLeft: '350px'}}>Pending trips</h3>
          <h3>Current trips</h3>
        <h3>Maintenance</h3>
      </div>
      <div ref={mapContainer} style={{ height: '300px', width: '30%', marginLeft: '40%'}} />
    </div>
  );
};

export default MapComponent;

