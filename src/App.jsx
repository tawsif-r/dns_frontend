import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import JobsList from './components/JobsList';
import SportsList from './components/SpotsList';
import SubscribersList from './components/SubscribersList';
import MessagesList from './components/MessagesList';
import SubscriptionsList from './components/SubscriptionsList';
import ReportList from './components/ReportList';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

function App() {
  const [jobsData, setJobsData] = useState([]);
  const [subscribersData, setSubscribersData] = useState([]);
  const [messagesData, setMessagesData] = useState([]);
  const [subscriptionsData, setSubscriptionsData] = useState([]);
  const [reportsData, setReportsData] = useState([]);
  const [sportsData,setSportsData] = useState([]);

  const jobUrl = 'http://localhost:8001/admin/api/jobs/';
  const sportsUrl = 'http://localhost:8001/admin/api/sports/'
  const subscriberUrl = 'http://localhost:8001/admin/api/subscribers/';
  const messageUrl = 'http://localhost:8001/admin/api/messages/';
  const subscriptionUrl = 'http://localhost:8001/admin/api/subscriptions/';
  const reportUrl = 'http://localhost:8001/admin/api/reports/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsResponse, sportsResponse,subscribersResponse, messagesResponse, subscriptionsResponse, reportsResponse] = await Promise.all([
          axios.get(jobUrl),
          axios.get(sportsUrl),
          axios.get(subscriberUrl),
          axios.get(messageUrl),
          axios.get(subscriptionUrl),
          axios.get(reportUrl),
        ]);

        setJobsData(jobsResponse.data);
        setSportsData(sportsResponse.data);
        setSubscribersData(subscribersResponse.data);
        setMessagesData(messagesResponse.data);
        setSubscriptionsData(subscriptionsResponse.data);
        setReportsData(reportsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
 
 

  //=======================================message chart===============================================
  const messagesOverTimeData = {
    labels: messagesData.map(msg => new Date(msg.created_at).toLocaleTimeString()), // X-axis: Time of creation
    datasets: [
      {
        label: 'Messages Created',
        data: messagesData.map((_, index) => index + 1), // Y-axis: Incremental count (replace with actual metric if needed)
        borderColor: '#bb86fc',
        backgroundColor: 'rgba(187, 134, 252, 0.2)', // Optional fill under the line
        fill: true,
      },
    ],
  };

  //=======================================Jobs Chart==================================================
  const jobsByRegionData = {
    labels: [...new Set(jobsData.map(job => job.region))], // Unique regions
    datasets: [
      {
        label: 'Jobs by Region',
        data: [...new Set(jobsData.map(job => job.region))].map(region =>
          jobsData.filter(job => job.region === region).length
        ),
        backgroundColor: '#bb86fc',
        borderColor: '#bb86fc',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e0e0e0', // Match dark theme
        },
      },
      title: {
        display: true,
        text: 'Messages Over Time',
        color: '#e0e0e0',
      },
    },
    scales: {
      x: {
        ticks: { color: '#e0e0e0' },
        title: {
          display: true,
          text: 'Time',
          color: '#e0e0e0',
        },
      },
      y: {
        ticks: { color: '#e0e0e0' },
        title: {
          display: true,
          text: 'Message Count',
          color: '#e0e0e0',
        },
      },
    },
  };

  const chartOptionsJobs = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e0e0e0', // Match dark theme
        },
      },
      title: {
        display: true,
        text: 'Jobs by Region',
        color: '#e0e0e0',
      },
    },
    scales: {
      x: {
        ticks: { color: '#e0e0e0' },
        title: {
          display: true,
          text: 'Region',
          color: '#e0e0e0',
        },
      },
      y: {
        ticks: { color: '#e0e0e0' },
        title: {
          display: true,
          text: 'Number of Jobs',
          color: '#e0e0e0',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard dark-theme">
      {/* Side Navigation */}
      <div className="sidenav">
        <ul>
          <li><a href="#jobs">Jobs</a></li>
          <li><a href="#subscribers">Subscribers</a></li>
          <li><a href="#messages">Messages</a></li>
          <li><a href="#subscriptions">Subscriptions</a></li>
          <li><a href="#reports">Reports</a></li>
        </ul>
      </div>
      <div className="main-content">
        <header>
          <h1>Admin Dashboard</h1>
          <input type="text" placeholder="Search..." className="search-bar" />
        </header>
        <div className="dashboard-container">
          <JobsList jobs={jobsData} />
          <SportsList sports={sportsData} />
          <SubscribersList subscribers={subscribersData} />
          <MessagesList messages={messagesData} />
          <SubscriptionsList subscriptions={subscriptionsData} />
          <ReportList reports={reportsData} />
        </div>
        <div className="dashboard-graphs">
          <div className="dashboard-card">
            <div className="card-header">
              <h2>Messages Over Time</h2>
            </div>
            <div style={{ height: '300px', padding: '15px' }}>
              <Line data={messagesOverTimeData} options={chartOptions} />
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h2>Jobs By Region</h2>
            </div>
            <div style={{ height: '300px', padding: '15px' }}>
              <Line data={jobsByRegionData} options={chartOptionsJobs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;