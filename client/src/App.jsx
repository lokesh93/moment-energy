import React, { useState, useEffect } from 'react';
import { MdRefresh } from 'react-icons/md';
import LineChart from './components/LineChart';
import './styles/App.css';

const TIME_RANGES = [
  { label: '1m',  value: '1m',  ms: 1 * 60 * 1000 },
  { label: '15m', value: '15m', ms: 15 * 60 * 1000 },
  { label: '1hr', value: '1hr', ms: 60 * 60 * 1000 },
  { label: '6h',  value: '6h',  ms: 6 * 60 * 60 * 1000 },
  { label: '12h', value: '12h', ms: 12 * 60 * 60 * 1000 },
];

function App() {
  const [selectedRange, setSelectedRange] = useState('1hr');
  const [refreshKey, setRefreshKey] = useState(0);
  const [chartData, setChartData] = useState({ labels: [], voltages: [] });
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [error, setError] = useState(null);

  function handleReset() {
    setResetting(true);
    setError(null);
    fetch('/reset-data', { method: 'POST' })
      .then((res) => res.json())
      .then(() => setRefreshKey((k) => k + 1))
      .catch((err) => setError(err.message))
      .finally(() => setResetting(false));
  }

  useEffect(() => {
    const range = TIME_RANGES.find((r) => r.value === selectedRange);
    const from = new Date(Date.now() - range.ms).toISOString();

    setLoading(true);
    setError(null);

    fetch(`/voltage-measurement?from=${encodeURIComponent(from)}`)
      .then((res) => res.json())
      .then((data) => {
        setChartData({
          labels: data.map((d) => new Date(d.created_at).toLocaleTimeString()),
          voltages: data.map((d) => d.voltage),
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  return (
    <div className="app-container">
      <div className="controls">
        <div className="range-selector">
          <span>Time Range</span>
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
          >
            {TIME_RANGES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
        <button className="refresh-btn" onClick={() => setRefreshKey((k) => k + 1)}>
          <MdRefresh size={20} />
        </button>
        <button className="reset-btn" onClick={handleReset} disabled={resetting}>
          {resetting ? 'Resetting...' : 'Reset Data'}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {loading ? <p>Loading...</p> : <LineChart labels={chartData.labels} voltages={chartData.voltages} />}
    </div>
  );
}

export default App;
