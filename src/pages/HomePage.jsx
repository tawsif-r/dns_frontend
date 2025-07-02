import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LineChart from '../components/LineChart'
import apiClient from '../api/axiosInstance';


function HomePage() {
  const [categoriesData, setCategoriesData] = useState([])
  const [contentsData, setContentsData] = useState([])
  const [subscribersData, setSubscribersData] = useState([]);
  const [messagesQData, setMessagesQData] = useState([]);
  const [subscriptionsData, setSubscriptionsData] = useState([]);
  const [reportsData, setReportsData] = useState([]);



  const base = "/admin/api";

  const categoryUrl = `${base}/categories/`
  const contentUrl = `${base}/contents/`
  const subscriberUrl = `${base}/subscribers/`;
  const messagesQUrl = `${base}/messagesQueue/`;
  const subscriptionUrl = `${base}/subscriptionplans/`;
  const reportUrl = `${base}/reports/`;
  const messageUrl = `${base}/messages/`;



  const chart = []
  const chartData = categoriesData.forEach(category => {
    const category_subscribers = subscribersData.filter(subscriber =>
      subscriber.categories == category.id

    );
    chart.push({
      category: category.name,
      subscribers: category_subscribers.length
    });
  }
  )
  // console.log(chart);
  // chart.forEach(item => console.log(item.category))
  const sampleData = {

    labels: chart.map(item => item.category),
    datasets: [
      {
        label: 'subscribers',
        data: chart.map(item => item.subscribers),
        // You can override any default styling here
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, contentsResponse, subscribersResponse, messagesQResponse, subscriptionsResponse, reportsResponse, messagesResponse] = await Promise.all([
          apiClient.get(categoryUrl),
          apiClient.get(contentUrl),
          apiClient.get(subscriberUrl),
          apiClient.get(messagesQUrl),
          apiClient.get(subscriptionUrl),
          apiClient.get(reportUrl),
          apiClient.get(messageUrl),
        ]);

        setCategoriesData(categoriesResponse.data);
        setContentsData(contentsResponse.data);
        setSubscribersData(subscribersResponse.data);
        setMessagesQData(messagesQResponse.data);
        setSubscriptionsData(subscriptionsResponse.data);
        setReportsData(reportsResponse.data.data);
        setMessagesData(messagesResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  return (
    <div className='grid grid-cols-3 p-4'>
      <div className='max-h-96 overflow-x-auto custom-scrollbar relative m-2'>
        {categoriesData ?
          (<>
            <p className='sticky top-0 bg-gray-700 p-2 rounded-md font-semibold text-cyan-400'>Total Categories: {categoriesData.length}</p>
            <ul>
              {categoriesData.slice(0, 5).map((category) => (
                <li key={category.id} className="bg-slate-700 m-2 p-3 rounded-md hover:bg-gray-800 ">
                  <p className='bold'>Name: {category.name}</p>
                  <p className='bold'>Category id: {category.cat_id}</p>
                  <p className='bold'>Slug:{category.slug}</p>
                  <p className='bold'>Service: {category.service}</p>
                  <p className='bold'>Keyword: {category.keyword}</p>
                  <p className='bold'>Desc: {category.description}</p>
                  <p className='bold'>is active: {category.is_active ? "yes" : "No"}</p>
                </li>
              ))}
            </ul>
          </>
          ) : (
            <>
              <p>No data found</p>
            </>
          )}

      </div>

      <div className='max-h-96 overflow-x-auto custom-scrollbar relative m-2'>
        {subscribersData ? (
          <>
            <p className='sticky top-0 bg-gray-700 p-2 font-semibold rounded-md text-cyan-400'>Total subscribers: {subscribersData.length}</p>
            <ul>
              {subscribersData.slice(0, 5).map((subscriber) => (
                <li key={subscriber.id} className='bg-slate-700 m-2 p-3 rounded-md hover:bg-gray-800'>
                  <p className='bold'>Name: {subscriber.name}</p>
                  <p className='bold'>Phone Number:{subscriber.phone_number}</p>
                  <p className='bold'>Subscription End: {subscriber.subscription_end}</p>
                </li>

              ))}
            </ul>
          </>) : (<p>No data</p>)}
      </div>


      <div className='max-h-96 overflow-x-auto custom-scrollbar relative m-2'>
        {reportsData ? (
          <>
            <p className='sticky top-0 bg-gray-700 p-2 font-semibold text-cyan-400 rounded-md'>Reports: {reportsData.length}</p>
            <ul>
              {reportsData.slice(0, 5).map((report) => (
                <li key={report.id} className='bg-slate-700 m-2 p-3 rounded-md hover:bg-gray-800'>
                  <p className='bold'>Subscriber: {report.subscriber}</p>
                  <p className='bold'>Send Messages: {report.sent_messages}</p>
                  <p className='bold'>Total Charge: {report.total_charge}</p>
                </li>

              ))}
            </ul>
          </>) : (<p>No data</p>)}
      </div>

      <div className='bg-gray-800 m-4 p-4 col-span-3 rounded-lg'>
        <div style={{ padding: '20px' }}>
          <h1 className='text-cyan-400'>Subscriber per category</h1>
          <LineChart
            data={sampleData}
            title="Subscribers for Different categories"
            xAxisLabel="Categories"
            yAxisLabel="Subscribers"
            height="650px"
          />
        </div>
        
        <div>
        </div>
      </div>
      


    </div>
  );
}

export default HomePage;