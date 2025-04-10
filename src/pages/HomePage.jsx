import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../components/ui/Nav';

function HomePage() {
  const [categoriesData, setCategoriesData] = useState([])
  const [contentsData, setContentsData] = useState([])
  const [subscribersData, setSubscribersData] = useState([]);
  const [messagesQData, setMessagesQData] = useState([]);
  const [subscriptionsData, setSubscriptionsData] = useState([]);
  const [reportsData, setReportsData] = useState([]);
  const [messagesData, setMessagesData] = useState([]);


  const base = "http://192.168.3.37:8001/admin/api";

  const categoryUrl = `${base}/categories/`
  const contentUrl = `${base}/contents/`
  const subscriberUrl = `${base}/subscribers/`;
  const messagesQUrl = `${base}/messagesQueue/`;
  const subscriptionUrl = `${base}/subscriptions/`;
  const reportUrl = `${base}/reports/`;
  const messageUrl = `${base}/messages/`;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse,contentsResponse,subscribersResponse, messagesQResponse, subscriptionsResponse, reportsResponse, messagesResponse ] = await Promise.all([
          axios.get(categoryUrl),
          axios.get(contentUrl),
          axios.get(subscriberUrl),
          axios.get(messagesQUrl),
          axios.get(subscriptionUrl),
          axios.get(reportUrl),
          axios.get(messageUrl),
        ]);

        setCategoriesData(categoriesResponse.data);
        setContentsData(contentsResponse.data);
        setSubscribersData(subscribersResponse.data);
        setMessagesQData(messagesQResponse.data);
        setSubscriptionsData(subscriptionsResponse.data);
        setReportsData(reportsResponse.data);
        setMessagesData(messagesResponse.data);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div><h1 className='border-2'>Dashboard</h1></div>
  );
}


export default HomePage;