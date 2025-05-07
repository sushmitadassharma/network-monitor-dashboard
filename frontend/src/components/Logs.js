import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [hasError, setHasError] = useState(false);

  const fetchLogs = () => {
    axios.get('http://localhost:5000/logs')
      .then(response => {
        setLogs(response.data);
        setHasError(false);
      })
      .catch(error => {
        console.error("Error fetching logs:", error);
        setHasError(true);
      });
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  if (hasError) {
    return <p style={{ color: 'red' }}>Failed to fetch logs.</p>;
  }

  return (
    <div style={styles.container}>
      <h2>System Logs</h2>
      {logs.length === 0 ? (
        <p>No logs available.</p>
      ) : (
        <ul>
          {logs.map((log, index) => (
            <li key={index}>{log.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
};

export default Logs;
