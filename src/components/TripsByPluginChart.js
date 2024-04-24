import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function TripsByPluginChart() {
    const [pendingTrips, setPendingTrips] = useState([]);

    const colorMap = {
        'Maintenance': '#ad3d5f',
        'IHaul': '#3e83a8',
        'MedMobile': '#3e83a8',
        'Nomad': '#24962a',
        'Unknown': '#000000'
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, // This allows the chart to fill the container
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                ticks: {
                    autoSkip: false, // Ensures all labels are shown
                    maxRotation: 45, // Optional: Adjust label rotation for better readability
                    minRotation: 45
                }
            }
        }
    };

    useEffect(() => {
        const fetchPendingTrips = () => {
            fetch('https://team-11.supply.seuswe.rocks/api/get-all-pending-trips')
                .then(response => response.json())
                .then(data => {
                    if (data.trips) {
                        setPendingTrips(data.trips);
                        updateChartData(data.trips);
                    } else {
                        console.error('Trips key not found in response');
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        };

        fetchPendingTrips();
        const interval = setInterval(fetchPendingTrips, 1000);
        return () => clearInterval(interval);
    }, []);

    const getPluginName = (pluginId) => {
        switch (pluginId) {
            case -1:
                return 'Maintenance';
            case 1:
                return 'IHaul';
            case 2:
                return 'MedMobile';
            case 3:
                return 'Nomad';
            default:
                return 'Unknown';
        }
    };

    const updateChartData = (trips) => {
        const pluginCounts = {};
        const backgroundColors = [];
        trips.forEach(trip => {
            const pluginName = getPluginName(trip.plugin);
            pluginCounts[pluginName] = (pluginCounts[pluginName] || 0) + 1;
            // Ensure color mapping for each plugin
            backgroundColors.push(colorMap[pluginName] || '#000000'); // Default to black if no mapping exists
        });

        setChartData({
            labels: Object.keys(pluginCounts),
            datasets: [{
                label: 'Number of Pending Trips',
                data: Object.values(pluginCounts),
                backgroundColor: backgroundColors,
                hoverBackgroundColor: backgroundColors
            }]
        });
    };

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Number of Pending Trips',
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: []
        }]
    });

    return (
        <div style={{ height: '100%', width: '300px' }}> {/* Set height to control the size of the chart container */}
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
}

export default TripsByPluginChart;
