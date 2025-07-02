import React, { useState, useEffect } from 'react';
import { EditIcon, TrashIcon } from 'lucide-react';
import apiClient from '../api/axiosInstance';

function SubscribersPage() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [subscribers, setSubscribers] = useState([]);

    const baseUrl = '/admin/api/subscribercategories/'; // Adjust the API endpoint as needed

    // Fetch subscribers on page load
    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const response = await apiClient.get(baseUrl);
                setSubscribers(response.data);
            } catch (error) {
                console.error('Error fetching subscribers:', error);
            }
        };

        fetchSubscribers();
    }, []);

    // Filter subscribers based on date range
    const filteredSubscribers = subscribers.filter((subscriber) => {
        const start = startDate ? new Date(subscriber.subscription_start) : null;
        const end = endDate ? new Date(subscriber.subscription_end) : null;
        const filterStart = startDate ? new Date(startDate) : null;
        const filterEnd = endDate ? new Date(endDate) : null;

        const matchesStart = !filterStart || (start && start >= filterStart);
        const matchesEnd = !filterEnd || (end && end <= filterEnd);

        return matchesStart && matchesEnd;
    });

    const columns = ['id', 'subscriber_phone', 'category_keyword', 'subscription_start', 'subscription_end'];

    return (
        <div className="px-4 py-8">
            <div className=" rounded-lg bg-slate-700 shadow-lg">
                <div className="flex justify-between items-center p-4 rounded-t-lg">
                    <div className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="mr-2"
                            fill="currentColor"
                        >
                            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z" />
                        </svg>
                        <h1 className="text-xl font-bold">Active Subscribers</h1>
                    </div>
                    <div className="flex space-x-4">
                        <input
                            type="datetime-local"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            placeholder="Filter by Subscription Start"
                            className="w-full bg-black rounded px-3 py-2
                                                   [&::-webkit-calendar-picker-indicator]:bg-dark 
                                                   [&::-webkit-calendar-picker-indicator]:rounded
                                                   [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                            style={{ colorScheme: 'dark' }}
                        />
                        <input
                            type="datetime-local"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            placeholder="Filter by Subscription End"
                            className="w-full bg-black rounded px-3 py-2 text-white
                                                   [&::-webkit-calendar-picker-indicator]:bg-dark 
                                                   [&::-webkit-calendar-picker-indicator]:rounded
                                                   [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                            style={{ colorScheme: 'dark' }}
                        />
                    </div>
                </div>

                <div className="p-6">
                    {/* Subscribers Table */}
                    <div className="rounded-lg overflow-x-auto custom-scrollbar">
                        {filteredSubscribers.length > 0 ? (
                            <table className="min-w-full bg-gray-800 rounded-lg">
                                <thead>
                                    <tr className="bg-slate-900">
                                        {columns.map((column) => (
                                            <th key={column} className="px-4 py-3 text-left text-sm font-medium text-cyan-400 uppercase tracking-wider">
                                                {column.charAt(0).toUpperCase() + column.slice(1).replace('_', ' ')}
                                            </th>
                                        ))}
                                        <th className="px-4 py-3 text-cyan-400 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-600">
                                    {filteredSubscribers.map((subscriber) => (
                                        <tr key={subscriber.id} className="hover:bg-gray-700">
                                            <td className="px-4 py-3 text-gray-300">{subscriber.id || 'N/A'}</td>
                                            <td className="px-4 py-3 text-gray-300">{subscriber.subscriber_phone || 'N/A'}</td>
                                            <td className="px-4 py-3 text-gray-300">{subscriber.category_keyword || 'N/A'}</td>
                                            <td className="px-4 py-3 text-gray-300">{subscriber.subscription_start || 'N/A'}</td>
                                            <td className="px-4 py-3 text-gray-300">{subscriber.subscription_end || 'N/A'}</td>
                                            <td className="px-4 py-3 text-right whitespace-nowrap">
                                                <button
                                                    onClick={() => setEditingSubscriber(subscriber)}
                                                    className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                                >
                                                    <EditIcon size={16} />
                                                </button>
                                                <button
                                                    className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                >
                                                    <TrashIcon size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center text-gray-500">No subscribers found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubscribersPage;