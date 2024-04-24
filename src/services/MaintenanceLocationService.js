import axios from 'axios';

export const fetchMaintenanceData = async () => {
    try {
        const response = await axios.get('https://team-11.supply.seuswe.rocks/api/get-all-maintenance-zones');
        const maintenanceData = response.data.Maintenance;
        return maintenanceData;
    } catch (error) {
        console.error('Error fetching Maintenance data:', error);
        return []; // Return an empty array in case of an error
    }
};
