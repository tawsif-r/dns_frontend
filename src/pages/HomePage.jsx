import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LineChart from '../components/LineChart'

function HomePage() {
  const [categoriesData, setCategoriesData] = useState([])
  const [contentsData, setContentsData] = useState([])
  const [subscribersData, setSubscribersData] = useState([]);
  const [messagesQData, setMessagesQData] = useState([]);
  const [subscriptionsData, setSubscriptionsData] = useState([]);
  const [reportsData, setReportsData] = useState([]);
  const [messagesData, setMessagesData] = useState([]);


  const base = "http://10.0.0.27:8000/admin/api";

  const categoryUrl = `${base}/categories/`
  const contentUrl = `${base}/contents/`
  const subscriberUrl = `${base}/subscribers/`;
  const messagesQUrl = `${base}/messagesQueue/`;
  const subscriptionUrl = `${base}/subscriptionplans/`;
  const reportUrl = `${base}/reports/`;
  const messageUrl = `${base}/messages/`;


  const sampleData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales 2023',
        data: [65, 59, 80, 81, 56, 55,44,33,55,40,66],
        // You can override any default styling here
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Sales 2022',
        data: [28, 48, 40, 19, 86, 27,44,21,61,23,66],
      }
    ]
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, contentsResponse, subscribersResponse, messagesQResponse, subscriptionsResponse, reportsResponse, messagesResponse] = await Promise.all([
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
    <div className='border-2 grid grid-cols-3 p-4'>
      <div className='border-2 max-h-96 overflow-x-auto relative m-2'>
        {categoriesData ?
          (<>
            <p className='sticky top-0 bg-gray-700 p-2 border-b font-semibold'>Total Categories: {categoriesData.length}</p>
            <ul>
              {categoriesData.slice(0, 5).map((category) => (
                <li key={category.id} className="border-2 m-2 p-3 rounded-md hover:bg-gray-800 ">
                  <p className='bold'>Name: {category.name}</p>
                  <p className='bold'>Slug:{category.slug}</p>
                  <p className='bold'>Service: {category.service}</p>
                  <p className='bold'>Keyword: {category.keyword}</p>
                  <p className='bold'>Fcatid: {category.fcatid ? category.fcatid : "Not Functional"}</p>
                  <p className='bold'>icatid: {category.icatid ? category.icatid : "Not industrial"}</p>
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

      <div className='border-2 max-h-96 overflow-x-auto relative m-2'>
        {subscribersData ? (
          <>
            <p className='sticky top-0 bg-gray-700 p-2 border-b font-semibold'>Total subscribers: {subscribersData.length}</p>
            <ul>
              {subscribersData.slice(0, 5).map((subscriber) => (
                <li key={subscriber.id} className='border-2 m-2 p-3 rounded-md hover:bg-gray-800'>
                  <p className='bold'>Name: {subscriber.name}</p>
                  <p className='bold'>Phone Number:{subscriber.phone_number}</p>
                  <p className='bold'>Subscription End: {subscriber.subscription_end}</p>
                </li>

              ))}
            </ul>
          </>) : (<p>No data</p>)}
      </div>


      <div className='border-2 max-h-96 overflow-x-auto relative m-2'>
        {reportsData ? (
          <>
            <p className='sticky top-0 bg-gray-700 p-2 border-b font-semibold'>Reports: {reportsData.length}</p>
            <ul>
              {reportsData.slice(0, 5).map((report) => (
                <li key={report.id} className='border-2 m-2 p-3 rounded-md hover:bg-gray-800'>
                  <p className='bold'>Subscriber: {report.subscriber}</p>
                  <p className='bold'>Send Messages: {report.sent_messages}</p>
                  <p className='bold'>Total Charge: {report.total_charge}</p>
                </li>

              ))}
            </ul>
          </>) : (<p>No data</p>)}
      </div>

      <div className='border-2 m-2 p-4 col-span-3'>
        <div style={{ padding: '20px' }}>
          <h1>Sales Report</h1>
          <LineChart
            data={sampleData}
            title="Monthly Sales Comparison"
            xAxisLabel="Month"
            yAxisLabel="Sales ($)"
            height="650px"
          />
        </div>
      </div>


    </div>
  );
}


export default HomePage;