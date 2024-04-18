import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function TripsByPluginChart() {
    const [pendingTrips, setPendingTrips] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Number of Pending Trips',
            data: [],
            backgroundColor: [
                '#cf5c23',
                '#3e83a8',
                '#24962a',
                '#000000'
            ],
            hoverBackgroundColor: [
                '#cf5c23',
                '#3e83a8',
                '#24962a',
                '#000000'
            ]
        }]
    });

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
        trips.forEach(trip => {
            const pluginName = getPluginName(trip.plugin);
            pluginCounts[pluginName] = (pluginCounts[pluginName] || 0) + 1;
        });

        setChartData({
            labels: Object.keys(pluginCounts),
            datasets: [{
                label: 'Number of Pending Trips',
                data: Object.values(pluginCounts),
                backgroundColor: chartData.datasets[0].backgroundColor.slice(0, Object.keys(pluginCounts).length),
                hoverBackgroundColor: chartData.datasets[0].hoverBackgroundColor.slice(0, Object.keys(pluginCounts).length)
            }]
        });
    };

    return (
        <div style={{ height: '100%', width: '300px' }}> {/* Set height to control the size of the chart container */}
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
}

export default TripsByPluginChart;
