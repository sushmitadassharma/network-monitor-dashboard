import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CpuChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMetric = () => {
      axios.get('http://localhost:5000/metrics')
        .then(res => {
          const timestamp = new Date().toLocaleTimeString();
          setData(prev => [...prev.slice(-9), { time: timestamp, cpu: res.data.cpu_usage }]);
        })
        .catch(err => console.error(err));
    };

    fetchMetric();
    const interval = setInterval(fetchMetric, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3>CPU Usage Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis unit="%" />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="cpu" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CpuChart;
