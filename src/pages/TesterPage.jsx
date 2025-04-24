import React, { useEffect, useState } from 'react';
import apiClient from '../api/axiosInstance';

const TesterPage = () => {
    const [subscriptionPlans, setSubscriptionPlans] = useState([]);
    const [editingPlan, setEditingPlan] = useState(null);

    const baseUrl = 'http://192.168.3.37:8001/admin/api/subscriptionplans/';
    
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

    const handleUpdatePlan = async () => {
        if (!editingPlan) return;
        
        try {
            const response = await apiClient.put(
                `${baseUrl}${editingPlan.id}/`,
                editingPlan
            );
            console.log(editingPlan)
            
            setSubscriptionPlans(prevPlans => 
                prevPlans.map(plan => 
                    plan.id === editingPlan.id ? editingPlan : plan
                )
            );
            setEditingPlan(null);
        } catch (error) {
            console.error("Error updating plan:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditingPlan(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className='bg-slate-600 min-h-screen text-white p-4'>
            <div>
                <h1 className='text-2xl font-bold mb-4'>Subscription Plans</h1>
                <ul className='space-y-4'>
                    {subscriptionPlans.map(plan => (
                        <li key={plan.id} className='p-4 bg-slate-700 rounded-lg'>
                            {editingPlan?.id === plan.id ? (
                                // EDIT MODE
                                <div className='space-y-3'>
                                    <div>
                                        <label className='block mb-1'>Name:</label>
                                        <input
                                            className="bg-slate-800 p-2 rounded w-full"
                                            name="name"
                                            value={editingPlan.name || ''}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label className='block mb-1'>Description:</label>
                                        <textarea
                                            className="bg-slate-800 p-2 rounded w-full"
                                            name="description"
                                            value={editingPlan.description || ''}
                                            onChange={handleChange}
                                            rows={3}
                                        />
                                    </div>

                                    <div className='grid grid-cols-2 gap-4'>
                                        <div>
                                            <label className='block mb-1'>Duration (days):</label>
                                            <input
                                                className="bg-slate-800 p-2 rounded w-full"
                                                type="number"
                                                name="duration_days"
                                                value={editingPlan.duration_days || ''}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div>
                                            <label className='block mb-1'>Price:</label>
                                            <input
                                                className="bg-slate-800 p-2 rounded w-full"
                                                type="number"
                                                name="price"
                                                value={editingPlan.price || ''}
                                                onChange={handleChange}
                                                step="0.01"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className='block mb-1'>Process:</label>
                                        <input
                                            className="bg-slate-800 p-2 rounded w-full"
                                            name="process"
                                            value={editingPlan.process || ''}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label className='block mb-1'>Plan Keywords:</label>
                                        <input
                                            className="bg-slate-800 p-2 rounded w-full"
                                            name="plan_keyword"
                                            value={editingPlan.plan_keyword || ''}
                                            onChange={handleChange}
                                            placeholder="Comma-separated keywords"
                                        />
                                    </div>

                                    <div className='flex space-x-2 pt-2'>
                                        <button
                                            className='bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded'
                                            onClick={handleUpdatePlan}
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            className='bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded'
                                            onClick={() => setEditingPlan(null)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // VIEW MODE
                                <div className='space-y-2'>
                                    <h3 className='font-bold text-lg'>{plan.name}</h3>
                                    <p>{plan.description}</p>
                                    <div className='grid grid-cols-3 gap-2 text-sm'>
                                        <div>
                                            <span className='font-semibold'>Duration:</span> {plan.duration_days} days
                                        </div>
                                        <div>
                                            <span className='font-semibold'>Price:</span> ${plan.price}
                                        </div>
                                        <div>
                                            <span className='font-semibold'>Process:</span> {plan.process}
                                        </div>
                                    </div>
                                    {plan.plan_keyword && (
                                        <div className='text-sm'>
                                            <span className='font-semibold'>Keywords:</span> {plan.plan_keyword}
                                        </div>
                                    )}
                                    <button
                                        className='bg-green-500 hover:bg-green-600 px-4 py-2 rounded mt-2'
                                        onClick={() => setEditingPlan({...plan})}
                                    >
                                        Edit Plan
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TesterPage;