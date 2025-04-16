import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const TesterPage = () => {
    const [message,setMessage] = useState([])

    const baseUrl = 'http://192.168.3.37:8001/admin/api/messages/';
    useEffect(()=>{
        const fetchMessage = async () =>{
            try {
                const response = await axios.get(baseUrl);
                setMessage(response.data)
                console.log(`The message: ${message}`)
            }catch (error){
                console.error("Error fetching message",error)
            }
        }
        fetchMessage()
    },[]);
    return (
        <div className='bg-slate-600 min-h-screen text-white'>
            <h3>Test 1: add a page that will create Message</h3>
            <h3>Test 2: delete a message from the bulk, meaning handleDelete</h3>
            <h3>Architecture:
                1. usestate
                2. useEffect for fetching the data
                3. add handle and update the state
            </h3>

        </div>

    )
}

export default TesterPage