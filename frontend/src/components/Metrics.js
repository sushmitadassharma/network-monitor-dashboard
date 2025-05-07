import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Metrics = () => {
  const [metricsData, setMetricsData] = useState(null);
  const [hasError, setHasError] = useState(false);

  const fetchMetricsData = () => {
    axios.get('http://localhost:5000/metrics')
      .then(response => {
        setMetricsData(response.data);
        setHasError(false);
      })
      .catch(error => {
        console.error("Error fetching metrics:", error);
        setHasError(true);
      });
  };

  useEffect(() => {
    fetchMetricsData();
    const interval = setInterval(fetchMetricsData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (hasError) {
    return <p style={{ color: 'red' }}>Failed to fetch metrics.</p>;
  }

  if (!metricsData) {
    return <p>Loading metrics...</p>;
  }

  return (
    <div>
    <h2>System Metrics</h2>
    <div style={styles.container}>
      
      <div style={styles.card}>
        <h4>CPU</h4>
        <p><strong>CPU Usage:</strong> {metricsData.cpu_usage}%</p>
      </div>

      <div style={styles.card}>
        <h4>Memory</h4>
        <p><strong>Used:</strong> {(metricsData.memory.used / 1024 / 1024).toFixed(2)} MB</p>
        <p><strong>Total:</strong> {(metricsData.memory.total / 1024 / 1024).toFixed(2)} MB</p>
        <p><strong>Usage:</strong> {metricsData.memory.percent}%</p>
      </div>

      <div style={styles.card}>
        <h4>Disk</h4>
        <p><strong>Used:</strong> {(metricsData.disk.used / 1024 / 1024 / 1024).toFixed(2)} GB</p>
        <p><strong>Total:</strong> {(metricsData.disk.total / 1024 / 1024 / 1024).toFixed(2)} GB</p>
        <p><strong>Usage:</strong> {metricsData.disk.percent}%</p>
      </div>

      <div style={styles.card}>
        <h4>Network</h4>
        <p><strong>Bytes Sent:</strong> {(metricsData.network.bytes_sent / 1024 / 1024).toFixed(2)} MB</p>
        <p><strong>Bytes Received:</strong> {(metricsData.network.bytes_recv / 1024 / 1024).toFixed(2)} MB</p>
      </div>
    </div>
    </div>
  );
};

const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
    },
    card: {
      background: '#f9f9f9',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 0 5px rgba(0,0,0,0.1)',
      width: '300px'
    }
  };

export default Metrics;
