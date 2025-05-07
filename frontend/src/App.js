import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Metrics from './components/Metrics';
import Dashboard from './components/Dashboard';
import SystemHealth from './components/SystemHealth';
import Logs from './components/Logs';
import NetworkTraffic from './components/NetworkTraffic';
import './App.css';

const App = () => {
  return (
    <Router>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/logs" style={styles.link}>Logs</Link>
        <Link to="/system-health" style={styles.link}>System Health</Link>
        <Link to="/network-traffic" style={styles.link}>Network Traffic</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/system-health" element={<SystemHealth />} />
        <Route path="/network-traffic" element={<NetworkTraffic />} />
      </Routes>
    </Router>
  );
}

const styles = {
  nav: {
    padding: '10px',
    backgroundColor: '#eee',
    display: 'flex',
    gap: '20px',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
  }
};
export default App;
