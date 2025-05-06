import React, { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon } from 'lucide-react';
import apiClient from '../api/axiosInstance';

function TestSubscribersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [testSubscribers, setTestSubscribers] = useState([]);
    const [newTestSubscriber, setNewTestSubscriber] = useState({
        phone_number: '',
        keyword: ''
    });

    const baseUrl = '/admin/api/test_subscribers/';

    // Fetch test subscribers on page load
    useEffect(() => {
        const fetchTestSubscribers = async () => {
            try {
                const response = await apiClient.get(baseUrl);
                setTestSubscribers(response.data);
            } catch (error) {
                console.error('Error fetching test subscribers:', error);
            }
        };

        fetchTestSubscribers();
    }, []);

    const filteredTestSubscribers = testSubscribers.filter((subscriber) =>
        subscriber?.phone_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscriber?.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
        !searchTerm
    );

    const handleCreateTestSubscriber = async () => {
        if (!newTestSubscriber.phone_number || !newTestSubscriber.keyword) {
            alert('Please fill in required fields (Phone Number, Keyword)');
            return;
        }

        try {
            const response = await apiClient.post(baseUrl, newTestSubscriber);
            setTestSubscribers([...testSubscribers, response.data]);
            setNewTestSubscriber({ phone_number: '', keyword: '' });
        } catch (error) {
            console.error('Error creating test subscriber:', error);
            alert('Failed to create test subscriber');
        }
    };

    const handleDeleteTestSubscriber = async (id) => {
        try {
            await apiClient.delete(`${baseUrl}${id}/`);
            setTestSubscribers(testSubscribers.filter(sub => sub.id !== id));
        } catch (error) {
            console.error('Error deleting test subscriber:', error);
            alert('Failed to delete test subscriber');
        }
    };

    return (
        <div className="px-4 py-8">
            <div className="border-2 rounded-lg shadow-lg">
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
                        <h1 className="text-xl font-bold">Test Subscribers Management</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Search by Phone or Keyword..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-1 bg-slate-900 text-gray-100 rounded border focus:outline-none focus:border-gray-100"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>

                <div className="p-6">
                    {/* New Test Subscriber Form */}
                    <div className="mb-8 p-4 rounded-lg">
                        <h2 className="flex items-center text-lg font-semibold mb-4">
                            <PlusIcon className="mr-2" />
                            Add New Test Subscriber
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Phone Number *"
                                value={newTestSubscriber.phone_number}
                                onChange={(e) => setNewTestSubscriber({ ...newTestSubscriber, phone_number: e.target.value })}
                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="text"
                                placeholder="Keyword *"
                                value={newTestSubscriber.keyword}
                                onChange={(e) => setNewTestSubscriber({ ...newTestSubscriber, keyword: e.target.value })}
                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                            />
                            <button
                                onClick={handleCreateTestSubscriber}
                                className="font-bold bg-black text-white px-4 py-2 rounded border-2 border-cyan-600 hover:bg-gray-300 hover:text-black transition duration-500"
                            >
                                Add Test Subscriber
                            </button>
                        </div>
                    </div>

                    {/* Test Subscribers Table */}
                    <div className="border-2 rounded-lg overflow-scroll">
                        {filteredTestSubscribers.length > 0 ? (
                            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-gray-700">
                                        <th className="px-4 py-3 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">ID</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Phone Number</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Keyword</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-600">
                                    {filteredTestSubscribers.map((subscriber) => (
                                        <tr key={subscriber.id} className="hover:bg-gray-700">
                                            <td className="px-4 py-3 text-gray-300">{subscriber.id || 'N/A'}</td>
                                            <td className="px-4 py-3 text-gray-300">{subscriber.phone_number || 'N/A'}</td>
                                            <td className="px-4 py-3 text-gray-300">{subscriber.keyword || 'N/A'}</td>
                                            <td className="px-4 py-3 text-right whitespace-nowrap">
                                                <button
                                                    onClick={() => handleDeleteTestSubscriber(subscriber.id)}
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
                            <p className="text-center text-gray-500">No test subscribers found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestSubscribersPage;