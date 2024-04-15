import React, { useState, useEffect } from 'react';

function PendingTrips() {
  const [pendingTrips, setPendingTrips] = useState([]);

  useEffect(() => {
    const fetchPendingTrips = () => {
      // Replace with your actual API endpoint to fetch pending trips
      fetch('https://team-11.supply.seuswe.rocks/api/get-all-pending-trips').then((response) => {})
        .then(response => response.json())
        .then(data => {
          // Process and set data for pending trips
          setPendingTrips(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    };

    fetchPendingTrips();
    const interval = setInterval(fetchPendingTrips, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
      <div>
          <h2>Pending Trips</h2>
          <table className="trip-data">
              <thead>
              <tr>
                  <th>Pending Trips</th>


              </tr>
              </thead>
              <tbody>
              {trips.map((trip, index) => (
                  <tr key={index}>
                      <td>{trips.pendingTrips} </td>

                  </tr>
              ))}
              </tbody>
          </table>
      </div>
  );
}