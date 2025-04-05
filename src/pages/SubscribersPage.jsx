import React, { useState, useEffect } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import Nav from '../components/ui/Nav';
import axios from 'axios';

function SubscribersPage() {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [subscribers, setSubscribers] = useState([]);
    const [editingSubscriber, setEditingSubscriber] = useState(null);
    const [newSubscriber, setNewSubscriber] = useState({
        id: '',
        name: '',
        phone_number: '',
        shortcode: '',
        subscription_end: '',
        schedule: '',
        gender: '',
        employment_type: '',
        location: '',
        region: '',
        subscription: '',
        operator: '',
        category: ''
    });

    const baseUrl = 'http://192.168.3.37:8001/admin/api/subscribers/';

    // Fetch subscribers on page load
    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const response = await axios.get(baseUrl);
                setSubscribers(response.data);
            } catch (error) {
                console.error('Error fetching subscribers:', error);
            }
        };
        fetchSubscribers();
    }, []);

    const filteredSubscribers = subscribers.filter((subscriber) =>
        subscriber?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateSubscriber = async () => {
        if (!newSubscriber.name || !newSubscriber.phone_number) {
            alert('Please fill in required fields (Name and Phone Number)');
            return;
        }

        try {
            const response = await axios.post(baseUrl, newSubscriber);
            setSubscribers([...subscribers, response.data]);
            setNewSubscriber({
                id: '',
                name: '',
                phone_number: '',
                shortcode: '',
                subscription_end: '',
                schedule: '',
                gender: '',
                employment_type: '',
                location: '',
                region: '',
                subscription: '',
                operator: '',
                category: ''
            });
        } catch (error) {
            console.error('Error creating subscriber:', error);
            alert('Failed to create subscriber');
        }
    };

    const handleUpdateSubscriber = async () => {
        if (!editingSubscriber.name || !editingSubscriber.phone_number) {
            alert('Please fill in required fields (Name and Phone Number)');
            return;
        }

        try {
            const response = await axios.put(`${baseUrl}${editingSubscriber.id}/`, editingSubscriber);
            setSubscribers(subscribers.map(subscriber =>
                subscriber.id === editingSubscriber.id ? response.data : subscriber
            ));
            setEditingSubscriber(null);
        } catch (error) {
            console.error('Error updating subscriber:', error);
            alert('Failed to update subscriber');
        }
    };

    const handleDeleteSubscriber = async (id) => {
        try {
            await axios.delete(`${baseUrl}${id}/`);
            setSubscribers(subscribers.filter(subscriber => subscriber.id !== id));
            if (editingSubscriber?.id === id) {
                setEditingSubscriber(null);
            }
        } catch (error) {
            console.error('Error deleting subscriber:', error);
            alert('Failed to delete subscriber');
        }
    };

    // Define table columns - excluding 'id' field
    const columns = Object.keys(newSubscriber).filter(key => key !== 'id');

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Nav />
            <div className="container mx-auto px-4 py-8 ml-16">
                <div className="border-2 rounded-lg shadow-lg">
                    <div 
                        className="flex justify-between items-center p-4 bg-gray-800 text-white rounded-t-lg"
                        
                    >
                        <div className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="mr-2"
                                fill="currentColor"
                            >
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                            <h1 className="text-xl font-bold">Subscribers Management</h1>
                        </div>
                        <input
                            type="text"
                            placeholder="Search Subscribers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-3 py-1 bg-slate-900 text-gray-100 rounded border focus:outline-none focus:border-gray-100"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    
                        <div className="p-6">
                            {/* New Subscriber Form */}
                            <div className="mb-8 p-4 rounded-lg">
                                <h2 className="flex items-center text-lg font-semibold mb-4">
                                    <PlusIcon className="mr-2" />
                                    Add New Subscriber
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(newSubscriber).map(([key, value]) => (
                                        key !== 'id' && (
                                            <input
                                                key={key}
                                                type={key === 'subscription_end' ? 'datetime-local' : 'text'}
                                                placeholder={key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                                value={value}
                                                onChange={(e) => setNewSubscriber({ ...newSubscriber, [key]: e.target.value })}
                                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                            />
                                        )
                                    ))}
                                    <button
                                        onClick={handleCreateSubscriber}
                                        className="md:col-span-2 font-bold bg-black text-white px-4 py-2 rounded border-2 border-cyan-600 hover:bg-gray-300 hover:text-black transition duration-500"
                                    >
                                        Add Subscriber
                                    </button>
                                </div>
                            </div>

                            {/* Subscribers Table */}
                            <div className="overflow-x-auto">
                                {filteredSubscribers.length > 0 ? (
                                    <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                                        <thead>
                                            <tr className="bg-gray-700">
                                                {columns.slice(0, 5).map((column) => (
                                                    <th key={column} className="px-4 py-3 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">
                                                        {column.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                                    </th>
                                                ))}
                                                <th className="px-4 py-3 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-600">
                                            {filteredSubscribers.map((subscriber) => (
                                                editingSubscriber?.id === subscriber.id ? (
                                                    <tr key={subscriber.id} className="bg-gray-700">
                                                        {columns.slice(0, 5).map((column) => (
                                                            <td key={column} className="px-4 py-2">
                                                                <input
                                                                    type={column === 'subscription_end' ? 'datetime-local' : 'text'}
                                                                    value={editingSubscriber[column] || ''}
                                                                    onChange={(e) => setEditingSubscriber({
                                                                        ...editingSubscriber,
                                                                        [column]: e.target.value
                                                                    })}
                                                                    className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                                />
                                                            </td>
                                                        ))}
                                                        <td className="px-4 py-2 text-right whitespace-nowrap">
                                                            <button
                                                                onClick={handleUpdateSubscriber}
                                                                className="inline-flex items-center justify-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                                                            >
                                                                <SaveIcon size={16} className="mr-1" /> Save
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingSubscriber(null)}
                                                                className="inline-flex items-center justify-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                            >
                                                                <XIcon size={16} className="mr-1" /> Cancel
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    <tr key={subscriber.id} className="hover:bg-gray-700">
                                                        {columns.slice(0, 5).map((column) => (
                                                            <td key={column} className="px-4 py-3 text-gray-300">
                                                                {subscriber[column] || 'N/A'}
                                                            </td>
                                                        ))}
                                                        <td className="px-4 py-3 text-right whitespace-nowrap">
                                                            <button
                                                                onClick={() => setEditingSubscriber(subscriber)}
                                                                className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                                            >
                                                                <EditIcon size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteSubscriber(subscriber.id)}
                                                                className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                            >
                                                                <TrashIcon size={16} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-center text-gray-500">No subscribers found</p>
                                )}
                            </div>
                            
                            {/* View Details Modal could be added here */}
                        </div>
                    
                </div>
            </div>
        </div>
    );
}

export default SubscribersPage;