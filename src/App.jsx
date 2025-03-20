import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import JobsList from './components/JobsList';
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

  const jobUrl = 'http://localhost:8000/admin/api/jobs/';
  const subscriberUrl = 'http://localhost:8000/admin/api/subscribers/';
  const messageUrl = 'http://localhost:8000/admin/api/messages/';
  const subscriptionUrl = 'http://localhost:8000/admin/api/subscriptions/';
  const reportUrl = 'http://localhost:8000/admin/api/reports/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsResponse, subscribersResponse, messagesResponse, subscriptionsResponse, reportsResponse] = await Promise.all([
          axios.get(jobUrl),
          axios.get(subscriberUrl),
          axios.get(messageUrl),
          axios.get(subscriptionUrl),
          axios.get(reportUrl),
        ]);

        setJobsData(jobsResponse.data);
        setSubscribersData(subscribersResponse.data);
        setMessagesData(messagesResponse.data);
        setSubscriptionsData(subscriptionsResponse.data);
        setReportsData(reportsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
    // Generate stars for the night sky
    generateStars();
  }, []);
  
  // Function to generate stars
  const generateStars = () => {
    const nightSky = document.createElement('div');
    nightSky.className = 'night-sky';
    document.body.appendChild(nightSky);
    
    // Create shooting stars
    const shootingStarCount = 15;
    for (let i = 0; i < shootingStarCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      
      // Random properties
      star.style.setProperty('--size', Math.random() * 3 + 0.5);
      star.style.setProperty('--delay', `${Math.random() * 10}s`);
      star.style.setProperty('--left', `${Math.random() * 100}vw`);
      star.style.setProperty('--top', `${Math.random() * 50}vh`);
      star.style.setProperty('--travel', `${Math.random() * 50 + 50}vw`);
      star.style.setProperty('--speed', `${Math.random() * 5 + 5}`);
      
      nightSky.appendChild(star);
    }
    
    // Create static twinkling stars
    const staticStarCount = 80;
    for (let i = 0; i < staticStarCount; i++) {
      const star = document.createElement('div');
      star.classList.add('static-star');
      
      // Random properties
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.setProperty('--delay', `${Math.random() * 3}s`);
      star.style.setProperty('--twinkle-speed', `${Math.random() * 3 + 2}`);
      
      nightSky.appendChild(star);
    }
  };

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