import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobsList from './components/JobsList';
import SportsList from './components/SportsList';
import SubscribersList from './components/SubscribersList';
import MessagesQList from './components/MessagesQList';
import SubscriptionsList from './components/SubscriptionsList';
import ReportList from './components/ReportList';
import MessagesList from './components/MessagesList';
import ServicesList from './components/ServicesList';
import Nav from './components/ui/Nav';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, BarElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, BarElement, PointElement, Title, Tooltip, Legend);

// Chart Component
const ChartComponent = ({ type = 'line', data, options, title }) => (
  <div className="bg-gray-800 rounded-lg shadow-lg p-4">
    <div className="card-header mb-4">
      <h2 className="text-xl font-semibold text-purple-400">{title}</h2>
    </div>
    <div className="h-80">
      {type === 'line' ? (
        <Line data={data} options={options} />
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  </div>
);

function App() {
  const [jobsData, setJobsData] = useState([]);
  const [subscribersData, setSubscribersData] = useState([]);
  const [messagesQData, setMessagesQData] = useState([]);
  const [subscriptionsData, setSubscriptionsData] = useState([]);
  const [reportsData, setReportsData] = useState([]);
  const [sportsData, setSportsData] = useState([]);
  const [messagesData, setMessagesData] = useState([]);
  const [servicesData, setServicesData] = useState([]);

  const jobUrl = 'http://192.168.3.37:8001/admin/api/jobs/';
  const sportsUrl = 'http://192.168.3.37:8001/admin/api/sports/';
  const subscriberUrl = 'http://192.168.3.37:8001/admin/api/subscribers/';
  const messagesQUrl = 'http://192.168.3.37:8001/admin/api/messagesQueue/';
  const subscriptionUrl = 'http://192.168.3.37:8001/admin/api/subscriptions/';
  const reportUrl = 'http://192.168.3.37:8001/admin/api/reports/';
  const messageUrl = 'http://192.168.3.37:8001/admin/api/messages/';
  const serviceUrl = 'http://192.168.3.37:8001/admin/api/services/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsResponse, sportsResponse, subscribersResponse, messagesQResponse, subscriptionsResponse, reportsResponse, messagesResponse,servicesResponse, ] = await Promise.all([
          axios.get(jobUrl),
          axios.get(sportsUrl),
          axios.get(subscriberUrl),
          axios.get(messagesQUrl),
          axios.get(subscriptionUrl),
          axios.get(reportUrl),
          axios.get(messageUrl),
          axios.get(serviceUrl)
        ]);

        setJobsData(jobsResponse.data);
        setSportsData(sportsResponse.data);
        setSubscribersData(subscribersResponse.data);
        setMessagesQData(messagesQResponse.data);
        setSubscriptionsData(subscriptionsResponse.data);
        setReportsData(reportsResponse.data);
        setMessagesData(messagesResponse.data);
        setServicesData(servicesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Base Chart Options
  const baseChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#e0e0e0' },
      },
      title: {
        display: true,
        color: '#e0e0e0',
        font: { size: 18 }
      },
    },
    scales: {
      x: {
        ticks: { color: '#e0e0e0' },
        title: { display: true, color: '#e0e0e0' },
      },
      y: {
        ticks: { color: '#e0e0e0' },
        title: { display: true, color: '#e0e0e0' },
        beginAtZero: true,
      },
    },
  };

  // Messages Over Time (Fixed to show count per day)
  const messagesOverTimeData = {
    labels: [...new Set(messagesData.map(msg => new Date(msg.created_at).toLocaleDateString()))],
    datasets: [{
      label: 'Messages Sent',
      data: [...new Set(messagesData.map(msg => new Date(msg.created_at).toLocaleDateString()))]
        .map(date => messagesData.filter(msg => new Date(msg.created_at).toLocaleDateString() === date).length),
      borderColor: '#bb86fc',
      backgroundColor: 'rgba(187, 134, 252, 0.2)',
      fill: true,
    }],
  };

  const messagesOptions = {
    ...baseChartOptions,
    plugins: {
      ...baseChartOptions.plugins,
      title: { ...baseChartOptions.plugins.title },
    },
    scales: {
      x: { ...baseChartOptions.scales.x, title: { ...baseChartOptions.scales.x.title, text: 'Date' } },
      y: { ...baseChartOptions.scales.y, title: { ...baseChartOptions.scales.y, text: 'Message Count' } },
    },
  };

  // Jobs by Region
  const jobsByRegionData = {
    labels: [...new Set(jobsData.map(job => job.region))],
    datasets: [{
      label: 'Jobs by Region',
      data: [...new Set(jobsData.map(job => job.region))].map(region =>
        jobsData.filter(job => job.region === region).length),
      backgroundColor: '#bb86fc',
      borderColor: '#bb86fc',
      borderWidth: 1,
    }],
  };

  const jobsOptions = {
    ...baseChartOptions,
    plugins: {
      ...baseChartOptions.plugins,
      title: { ...baseChartOptions.plugins.title },
    },
    scales: {
      x: { ...baseChartOptions.scales.x, title: { ...baseChartOptions.scales.x.title, text: 'Region' } },
      y: { ...baseChartOptions.scales.y, title: { ...baseChartOptions.scales.y, text: 'Number of Jobs' } },
    },
  };

  // Subscribers by Region
  const subscribersByRegionData = {
    labels: [...new Set(subscribersData.map(sub => sub.region))],
    datasets: [{
      label: 'Subscribers by Region',
      data: [...new Set(subscribersData.map(sub => sub.region))].map(region =>
        subscribersData.filter(sub => sub.region === region).length),
      backgroundColor: '#bb86fc',
      borderColor: '#bb86fc',
      borderWidth: 1,
    }],
  };

  const subscribersOptions = {
    ...baseChartOptions,
    plugins: {
      ...baseChartOptions.plugins,
      title: { ...baseChartOptions.plugins.title },
    },
    scales: {
      x: { ...baseChartOptions.scales.x, title: { ...baseChartOptions.scales.x.title, text: 'Region' } },
      y: { ...baseChartOptions.scales.y, title: { ...baseChartOptions.scales.y, text: 'Subscriber Count' } },
    },
  };

  // Reports Total Charge Over Time
  const reportsChargeData = {
    labels: [...new Set(reportsData.map(report => new Date(report.sent_on).toLocaleDateString()))],
    datasets: [{
      label: 'Total Charge',
      data: [...new Set(reportsData.map(report => new Date(report.sent_on).toLocaleDateString()))]
        .map(date => reportsData.filter(r => new Date(r.sent_on).toLocaleDateString() === date)
          .reduce((sum, r) => sum + parseFloat(r.total_charge || 0), 0)),
      borderColor: '#bb86fc',
      backgroundColor: 'rgba(187, 134, 252, 0.2)',
      fill: true,
    }],
  };

  const reportsOptions = {
    ...baseChartOptions,
    plugins: {
      ...baseChartOptions.plugins,
      title: { ...baseChartOptions.plugins.title },
    },
    scales: {
      x: { ...baseChartOptions.scales.x, title: { ...baseChartOptions.scales.x.title, text: 'Date' } },
      y: { ...baseChartOptions.scales.y, title: { ...baseChartOptions.scales.y, text: 'Total Charge' } },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-mono flex">
      <div className="w-64 bg-gray-800 p-4 fixed h-screen">
        <Nav />
      </div>

      <div className="flex-1 ml-64 p-6">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-purple-400">Admin Dashboard</h1>
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 w-64"
          />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <JobsList jobs={jobsData} setJobs={setJobsData} />
          <SportsList sports={sportsData} />
          <SubscribersList subscribers={subscribersData} />
          <MessagesQList messages={messagesQData} />
          <SubscriptionsList subscriptions={subscriptionsData} />
          <ReportList reports={reportsData} />
          <MessagesList messages={messagesData} setMessages={setMessagesData} />
          <ServicesList services={servicesData} setServices={setServicesData} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartComponent
            type="line"
            data={messagesOverTimeData}
            options={messagesOptions}
            title="Messages Over Time"
          />
          <ChartComponent
            type="bar"
            data={jobsByRegionData}
            options={jobsOptions}
            title="Jobs by Region"
          />
          <ChartComponent
            type="bar"
            data={subscribersByRegionData}
            options={subscribersOptions}
            title="Subscribers by Region"
          />
          <ChartComponent
            type="line"
            data={reportsChargeData}
            options={reportsOptions}
            title="Total Charge Over Time"
          />
        </div>
      </div>
    </div>
  );
}

export default App;