import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobsList from './JobsList';
import SportsList from './SportsList';
import SubscribersList from './SubscribersList';
import MessagesQList from './MessagesQList';
import SubscriptionsList from './SubscriptionsList';
import ReportList from './ReportList';
import MessagesList from './MessagesList';
import ServicesList from './ServicesList';
import BdjobsList from './BdjobsList';
import JobCategoryList from './JobCategoryList';
import SportCategoryList from './SportCategoryList';
import ChannelList from './ChannelList';
import FormatList from './FormatList';
import KeywordList from './KeywordList';
import Nav from './ui/Nav';

function Home() {
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
  

  const base = "http://10.0.0.27:8000/admin/api";

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


  //============================= Routes =================================






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
          <SportsList sports={sportsData} setSports={setSportsData}/>
          <SubscribersList subscribers={subscribersData} setSubscribers={setSubscribersData} />
          <MessagesQList messages={messagesQData} />
          <SubscriptionsList subscriptions={subscriptionsData} setSubscriptions={setSubscriptionsData} />
          <ReportList reports={reportsData} setReports={setReportsData} />
          <MessagesList messages={messagesData} setMessages={setMessagesData} />
          <ServicesList services={servicesData} setServices={setServicesData} />
          <BdjobsList bdjobs={bdjobsData} setBdjobs={setBdjobsData} />
          <JobCategoryList jobCategories={jobCategoriesData} setJobCategories={setJobCategoriesData} />
          <SportCategoryList sportCategories={sportCategoriesData} setSportCategories={setSportCategoriesData} />
          <ChannelList channels={channelsData} setChannels={setChannelsData} />
          <FormatList formats={formatsData} setFormats={setFormatsData} />
          <KeywordList keywords={keywordsData} setKeywords={setKeywordsData} />
        </div>

        
      </div>
    </div>
  );
}


export default Home;