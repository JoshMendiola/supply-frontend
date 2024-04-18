import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Auto import needed components from Chart.js

function VehicleStatusChart() {
    const [vehicles, setVehicles] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: []
        }]
    });

    const [chartOptions, setChartOptions] = useState({
        plugins: {
            legend: {
                labels: {
                    color: 'white', // Change this to your preferred color
                    font: {
                        size: 14 // You can adjust the size here
                    }
                }
            }
        }
    });

    useEffect(() => {
        const fetchVehicles = () => {
            fetch('https://team-11.supply.seuswe.rocks/api/get-all-vehicles')
                .then(response => response.json())
                .then(data => {
                    if (data.Vehicles) {
                        setVehicles(data.Vehicles);
                        updateChartData(data.Vehicles);
                    } else {
                        console.error('Vehicles key not found in response');
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        };

        fetchVehicles();
        const interval = setInterval(fetchVehicles, 1000);

        return () => clearInterval(interval);
    }, []);

    // Function to update chart data
    const updateChartData = (vehicles) => {
        const statusCounts = {};
        vehicles.forEach(vehicle => {
            statusCounts[vehicle.status] = (statusCounts[vehicle.status] || 0) + 1;
        });
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#cc65fe', '#ff6348', '#36a2eb', '#ffcd56'];
        setChartData({
            labels: Object.keys(statusCounts),
            datasets: [{
                data: Object.values(statusCounts),
                backgroundColor: colors,
                hoverBackgroundColor: colors
            }]
        });
    };

    return (
        <div>
            <Pie data={chartData} options={chartOptions} />
        </div>
    );
}

export default VehicleStatusChart;
