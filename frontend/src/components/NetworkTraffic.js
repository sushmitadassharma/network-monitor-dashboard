import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NetworkTraffic = () => {
  const [traffic, setTraffic] = useState(null);
  const [hasError, setHasError] = useState(false);

  const fetchNetworkTraffic = () => {
    axios.get('http://localhost:5000/network_traffic')
      .then(response => {
        setTraffic(response.data);
        setHasError(false);
      })
      .catch(error => {
        console.error("Error fetching network traffic:", error);
        setHasError(true);
      });
  };

  useEffect(() => {
    fetchNetworkTraffic();
    const interval = setInterval(fetchNetworkTraffic, 5000);
    return () => clearInterval(interval);
  }, []);

  if (hasError) {
    return <p style={{ color: 'red' }}>Failed to fetch network traffic data.</p>;
  }

  if (!traffic) {
    return <p>Loading network traffic...</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Network Traffic</h2>
      <div style={styles.card}>
        <p><strong>Bytes Sent:</strong> {(traffic.bytes_sent / 1024 / 1024).toFixed(2)} MB</p>
        <p><strong>Bytes Received:</strong> {(traffic.bytes_recv / 1024 / 1024).toFixed(2)} MB</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    background: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
    width: '250px'
  }
};

export default NetworkTraffic;
