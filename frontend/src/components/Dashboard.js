import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import Metrics from './Metrics';
import CpuChart from './CpuChart';
import SystemHealth from './SystemHealth';
import Logs from './Logs';

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <h1>Dashboard Overview</h1>
      
      <div style={styles.section}>
        <Metrics />
        
      </div>

      <div>
      <h2>CPU Usage Trend</h2>
      <CpuChart />
      </div>
{/* 
      <div style={styles.section}>
        <Logs />
      </div>

      <div style={styles.section}>
        <SystemHealth />
      </div> */}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  section: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '20px',
  },
};

export default Dashboard;
