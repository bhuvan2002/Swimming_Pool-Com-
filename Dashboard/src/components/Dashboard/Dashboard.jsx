import React from 'react';
import { Card } from 'primereact/card';
import './Dashboard.css';  // Custom CSS for styling

const Dashboard = () => {
  const cardData = [
    { title: "Today's Registration ", count: 100 },
    { title: "Current Month Registrations  ", count: 100},
    { title: "Total Active Members         ", count: 100},
    { title: "Members with Expired Packages", count: 100},
    { title: "Total Guests Today     ", count: 100},
    { title: "Today Payment     ", count: 100},
    { title: "Current Month's Payment      ", count: 100},
    { title: "Total Payments Pending     ", count: 100},
  ];

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="grid">
        {cardData.map((card, index) => (
          <Card key={index} className="dashboard-card">
            <div className="card-content">
              <span className="card-title">{card.title}</span>
              <div className="card-count">{card.count}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
