import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import JobsList from './components/JobsList';
import SubscribersList from './components/SubscribersList';
import MessagesList from './components/MessagesList';
import SubscriptionsList from './components/SubscriptionsList';

function App() {
  const [jobsData, setJobsData] = useState([]);
  const [subscribersData, setSubscribersData] = useState([]);
  const [messagesData, setMessagesData] = useState([]);
  const [subscriptionsData, setSubscriptionsData] = useState([]);

  const jobUrl = 'http://localhost:8000/admin/api/jobs/';
  const subscriberUrl = 'http://localhost:8000/admin/api/subscribers/';
  const messageUrl = 'http://localhost:8000/admin/api/messages/';
  const subscriptionUrl = 'http://localhost:8000/admin/api/subscriptions/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsResponse, subscribersResponse, messagesResponse, subscriptionsResponse] = await Promise.all([
          axios.get(jobUrl),
          axios.get(subscriberUrl),
          axios.get(messageUrl),
          axios.get(subscriptionUrl),
        ]);

        setJobsData(jobsResponse.data);
        setSubscribersData(subscribersResponse.data);
        setMessagesData(messagesResponse.data);
        setSubscriptionsData(subscriptionsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard dark-theme">
      <header>
        <h1>Admin Dashboard</h1>
        <input type="text" placeholder="Search..." className="search-bar" />
      </header>
      <div className="dashboard-container">
        <JobsList jobs={jobsData} />
        <SubscribersList subscribers={subscribersData} />
        <MessagesList messages={messagesData} />
        <SubscriptionsList subscriptions={subscriptionsData} />
      </div>
    </div>
  );
}

export default App;