import React, { useEffect, useState } from 'react';
import apiClient from '../api/axiosInstance';

const TesterPage = () => {
    const [subscriptionPlans, setSubscriptionPlans] = useState([]);
    const [newPlan, setNewPlan] = useState({
        name: '',
        process: '',
        duration_days: '',
        price: '',
        plan_keyword: '',
        description: ''
    })

    const baseUrl = '/admin/api/subscriptionplans/';

    useEffect(() => {
        const fetchSubscriptionPlans = async () => {
            try {
                const response = await apiClient.get(baseUrl);
                setSubscriptionPlans(response.data);
            } catch (error) {
                console.error("Error fetching plans:", error);
            }
        };
        fetchSubscriptionPlans();
    }, []);
    
    // ============= HANDLE DATA CREATION ==============
    const payload = {
        ...newPlan,
        price: parseFloat(newPlan.price),
        duration_days : parseInt(newPlan.duration_days)
    }

    const handleCreatePlan = async () => {
        try {
            const response = await apiClient.post(baseUrl, payload)
            setSubscriptionPlans([ ...subscriptionPlans, response.data ])
            console.log(`New plan: ${newPlan}`)
            setNewPlan({
                name: '',
                process: '',
                duration_days: '',
                price: '',
                plan_keyword: '',
                description: ''
            })
        } catch (error) {
            console.log(`error creating data: ${error}`)
            alert('Failed to create data')
        }

    }

    return (
        <div className='bg-black h-screen text-gray-300'>
            <p>Create + </p>
            <label>NAME: </label>
            <input
                className='bg-slate-800'
                type="text"
                name='name'
                onChange={(e)=>setNewPlan({...newPlan, name:e.target.value})}
                placeholder='Name'
            />
            <label>Description: </label>
            <input
                className='bg-slate-800'
                type="text"
                name='description'
                onChange={(e)=>setNewPlan({...newPlan, description:e.target.value})}
                placeholder='DESC'
            />
            <label>Process: </label>
            <input
                className='bg-slate-800'
                type="text"
                name='process'
                onChange={(e)=>setNewPlan({...newPlan, process:e.target.value})}
                placeholder='Process'
            />
            <label>Price: </label>
            <input
                className='bg-slate-800'
                type="number"
                name='price'
                onChange={(e)=>setNewPlan({...newPlan, price:e.target.value})}
                placeholder='Price'
            />
            <label>duration_days: </label>
            <input
                className='bg-slate-800'
                type="number"
                name='duration_days'
                onChange={(e)=>setNewPlan({...newPlan, duration_days:e.target.value})}
                placeholder='duration'
            />

            <label>Plan Key: </label>
            <input
                className='bg-slate-800'
                type="text"
                name='plan_keyword'
                onChange={(e)=>setNewPlan({...newPlan, plan_keyword:e.target.value})}
                placeholder='key'
            />
            <button className='border-2' onClick={handleCreatePlan}>Submit</button>
        </div>
    );
};

export default TesterPage;