import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

// Your Mapbox access token
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const MapComponent = () => {
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        const initializeMap = () => {
            const newMap = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [0, 0], // Set the initial center of the map
                zoom: 10
            });

            newMap.on('load', () => {
                setMap(newMap);
                newMap.resize();
            });
        };

        if (!map) initializeMap();

        // Fetch route data from your API
        const fetchRoutes = async () => {
            const response = await fetch('YOUR_API_ENDPOINT');
            const data = await response.json();
            setRoutes(data); // Assuming 'data' is an array of route objects
            // Now add the routes as a source and layer to the map
            if (map && data) {
                data.forEach(route => {
                    map.addSource(route.id, {
                        type: 'geojson',
                        data: route.geometry
                    });
                    map.addLayer({
                        id: route.id,
                        type: 'line',
                        source: route.id,
                        layout: {},
                        paint: {
                            'line-color': '#888', // Change line color as needed
                            'line-width': 8
                        }
                    });
                });
            }
        };

        if (map) fetchRoutes();
    }, [map, routes]);

    return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;
