import axios from 'axios';

export const fetchBatteryData = async () => {
    try {
        const response = await axios.get('https://team-11.supply.seuswe.rocks/api/get-all-battery-locations');
        const batteryData = response.data.Battery; // Assuming the key in the response for battery data is 'Battery'
        return batteryData;
    } catch (error) {
        console.error('Error fetching battery data:', error);
        return []; // Return an empty array in case of an error
    }
};
