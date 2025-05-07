import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SystemHealth = () => {
  const [systemHealth, setSystemHealth] = useState(null);
  const [hasError, setHasError] = useState(false);

  const fetchSystemHealth = () => {
    axios.get('http://localhost:5000/system_health')
      .then(response => {
        setSystemHealth(response.data);
        setHasError(false);
      })
      .catch(error => {
        console.error("Error fetching system health:", error);
        setHasError(true);
      });
  };

  useEffect(() => {
    fetchSystemHealth();
    const interval = setInterval(fetchSystemHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  if (hasError) {
    return <p style={{ color: 'red' }}>Failed to fetch system health data.</p>;
  }

  if (!systemHealth) {
    return <p>Loading system health...</p>;
  }

  return (
    <div style={styles.container}>
      <h2>System Health</h2>
      <div style={styles.card}>
        <h4>Uptime</h4>
        <p>{systemHealth.uptime} seconds</p>
      </div>
      <div style={styles.card}>
        <h4>Load Average</h4>
        <p>{systemHealth.load_avg}</p>
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
    width: '250px',
    marginBottom: '15px',
  },
};

export default SystemHealth;
