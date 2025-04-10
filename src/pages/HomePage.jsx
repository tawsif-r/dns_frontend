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
  const subscriptionUrl = `${base}/subscriptionplans/`;
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
    <div className='border-2 grid grid-cols-3 p-4'>
      <div className='border-2 p-4'>
        {categoriesData?
        (<ul>
        {categoriesData.map((category)=>(
          <li className="border-2 p-3 m-2" key={category.id}>
            <p className='bold'>Name: {category.name}</p>
            <p className='bold'>Slug:{category.slug}</p>
            <p className='bold'>Service: {category.service}</p>
            <p className='bold'>Keyword: {category.keyword}</p>
            <p className='bold'>Fcatid:{category.fcatid}</p>
            <p className='bold'>icatid:{category.icatid}</p>
            <p className='bold'>Desc: {category.description}</p>
            <p className='bold'>is active: {category.is_active ? "yes":"No"}</p>
          </li>
        ))}
        </ul>
        ):(
          <>
          <p>No data found</p>
          </>
        )}
      
      </div>

      <div className='border-2 p-4'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut dicta doloremque similique sunt sint labore nulla molestias laudantium praesentium eius deserunt eveniet molestiae rerum, magni officia ut! Corrupti, error incidunt.</p>
      </div>

      <div className='border-2 p-4 row-span-3'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae laboriosam deleniti esse quaerat. Iure autem voluptate quis ipsam est minima veritatis ullam eveniet quibusdam illo, deserunt, praesentium, dolorem quia quisquam?</p>
      </div>

      <div className='border-2 p-4'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde autem velit illum, distinctio maxime aperiam consequuntur eos cupiditate? Facere maiores accusamus perspiciatis quae eaque tempore doloremque quis dolor, quod sed.</p>
      </div>

      <div className='border-2 p-4'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis excepturi nemo molestiae pariatur nostrum voluptates omnis perspiciatis dolore delectus fugit, mollitia nulla, rerum laudantium animi, deleniti voluptatem! Aliquid, pariatur numquam?
      </div>
    </div>
  );
}


export default HomePage;