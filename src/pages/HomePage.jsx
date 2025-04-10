import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../components/ui/Nav';

function HomePage() {
  const [jobsData, setJobsData] = useState([]);
  const [subscribersData, setSubscribersData] = useState([]);
  const [messagesQData, setMessagesQData] = useState([]);
  const [subscriptionsData, setSubscriptionsData] = useState([]);
  const [reportsData, setReportsData] = useState([]);
  const [sportsData, setSportsData] = useState([]);
  const [messagesData, setMessagesData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [bdjobsData,setBdjobsData] = useState([]);
  const [jobCategoriesData,setJobCategoriesData] = useState([]);
  const [sportCategoriesData,setSportCategoriesData] = useState([]);
  const [channelsData, setChannelsData] = useState([]);
  const [formatsData, setFormatsData] = useState([]);
  const [keywordsData, setKeywordsData] =useState([]);
  

  const base = "http://192.168.3.37:8001/admin/api";

  const jobUrl = `${base}/jobs/`;
  const sportsUrl = `${base}/sports/`;
  const subscriberUrl = `${base}/subscribers/`;
  const messagesQUrl = `${base}/messagesQueue/`;
  const subscriptionUrl = `${base}/subscriptions/`;
  const reportUrl = `${base}/reports/`;
  const messageUrl = `${base}/messages/`;
  const serviceUrl = `${base}/services/`;
  const bdjobsUrl = `${base}/bdjobs/`;
  const jobCatUrl = `${base}/jobCats/`;
  const sportCatUrl = `${base}/sportCats/`;
  const channelUrl = `${base}/channels/`;
  const formatUrl = `${base}/formats/`;
  const keywordUrl = `${base}/keywords/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsResponse, sportsResponse, subscribersResponse, messagesQResponse, subscriptionsResponse, reportsResponse, messagesResponse,servicesResponse,bdjobsResponse,jobCategoriesResponse,sportCategoriesResponse,channelsResponse,formatsResponse,keywordResponse ] = await Promise.all([
          axios.get(jobUrl),
          axios.get(sportsUrl),
          axios.get(subscriberUrl),
          axios.get(messagesQUrl),
          axios.get(subscriptionUrl),
          axios.get(reportUrl),
          axios.get(messageUrl),
          axios.get(serviceUrl),
          axios.get(bdjobsUrl),
          axios.get(jobCatUrl),
          axios.get(sportCatUrl),
          axios.get(channelUrl),
          axios.get(formatUrl),
          axios.get(keywordUrl),
        ]);

        setJobsData(jobsResponse.data);
        setSportsData(sportsResponse.data);
        setSubscribersData(subscribersResponse.data);
        setMessagesQData(messagesQResponse.data);
        setSubscriptionsData(subscriptionsResponse.data);
        setReportsData(reportsResponse.data);
        setMessagesData(messagesResponse.data);
        setServicesData(servicesResponse.data);
        setBdjobsData(bdjobsResponse.data);
        setJobCategoriesData(jobCategoriesResponse.data);
        setSportCategoriesData(sportCategoriesResponse.data);
        setChannelsData(channelsResponse.data);
        setFormatsData(formatsResponse.data);
        setKeywordsData(keywordResponse.data);

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