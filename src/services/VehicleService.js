import axios from 'axios';

// Function to fetch vehicle data from the API
export const fetchVehicleData = async () => {
    try {
        const response = await axios.get('https://team-11.supply.seuswe.rocks/api/get-all-vehicles');
        const vehicleData = response.data.Vehicles;
        return vehicleData;
    } catch (error) {
        console.error('Error fetching vehicle data:', error);
        return []; // Return an empty array in case of an error
    }
};
