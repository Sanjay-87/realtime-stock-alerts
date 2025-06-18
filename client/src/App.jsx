import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import './App.css'

const socket = io("http://localhost:4000");

function App() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    socket.on("alert", (data) => {
      setAlerts(prev => [data, ...prev])
    })

    return () => {
      socket.disconnect();
    }
  })

  return (
    <div className="app-container">
      <h1 className="app-title">Real-Time Stock Alerts</h1>
      <ul className="alert-list">
        {alerts.map((alert, idx) => (
          <li key={idx} className="alert-item">
            <strong>{alert.symbol}</strong> hit <strong>${alert.price}</strong> at{" "}
            <em>{new Date(alert.timestamp).toLocaleTimeString()}</em>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;
