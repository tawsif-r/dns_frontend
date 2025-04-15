import React, { useState, useEffect } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
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

    const baseUrl = 'http://192.168.3.37:8001/admin/api/subscribers/'; // Adjust the API endpoint as needed

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
        subscriber?.name.toLowerCase().includes(searchTerm.toLowerCase()) || !searchTerm
    );

    const handleCreateSubscriber = async () => {
        if (!newSubscriber.name || !newSubscriber.phone_number) {
            alert('Please fill in required fields (Name, Phone Number)');
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
            alert('Please fill in required fields (Name, Phone Number)');
            return;
        }

        try {
            const response = await axios.put(`${baseUrl}${editingSubscriber.id}/`, editingSubscriber);
            setSubscribers(subscribers.map(sub =>
                sub.id === editingSubscriber.id ? response.data : sub
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
            setSubscribers(subscribers.filter(sub => sub.id !== id));
            if (editingSubscriber?.id === id) {
                setEditingSubscriber(null);
            }
        } catch (error) {
            console.error('Error deleting subscriber:', error);
            alert('Failed to delete subscriber');
        }
    };

    const columns = Object.keys(newSubscriber);

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
                        <h1 className="text-xl font-bold">Subscribers Management</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Search Subscribers by Name..."
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
                        <div className="grid grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="Name *"
                                value={newSubscriber.name}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, name: e.target.value })}
                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="text"
                                placeholder="Phone Number *"
                                value={newSubscriber.phone_number}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, phone_number: e.target.value })}
                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="text"
                                placeholder="Shortcode"
                                value={newSubscriber.shortcode}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, shortcode: e.target.value })}
                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="datetime-local"
                                placeholder="Subscription End"
                                value={newSubscriber.subscription_end}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, subscription_end: e.target.value })}
                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="text"
                                placeholder="Schedule"
                                value={newSubscriber.schedule}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, schedule: e.target.value })}
                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="text"
                                placeholder="Gender"
                                value={newSubscriber.gender}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, gender: e.target.value })}
                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="text"
                                placeholder="Employment Type"
                                value={newSubscriber.employment_type}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, employment_type: e.target.value })}
                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="text"
                                placeholder="Location"
                                value={newSubscriber.location}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, location: e.target.value })}
                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="text"
                                placeholder="Region"
                                value={newSubscriber.region}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, region: e.target.value })}
                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="text"
                                placeholder="Subscription"
                                value={newSubscriber.subscription}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, subscription: e.target.value })}
                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="text"
                                placeholder="Operator"
                                value={newSubscriber.operator}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, operator: e.target.value })}
                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="text"
                                placeholder="Category"
                                value={newSubscriber.category}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, category: e.target.value })}
                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                            />
                            <button
                                onClick={handleCreateSubscriber}
                                className="font-bold bg-black text-white px-4 py-2 rounded border-2 border-cyan-600 hover:bg-gray-300 hover:text-black transition duration-500"
                            >
                                Add Subscriber
                            </button>
                        </div>
                    </div>

                    {/* Subscribers Table */}
                    <div className="border-2 rounded-lg overflow-scroll">
                        {filteredSubscribers.length > 0 ? (
                            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-gray-700">
                                        {columns.map((column) => (
                                            <th key={column} className="px-4 py-3 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">
                                                {column.charAt(0).toUpperCase() + column.slice(1).replace('_', ' ')}
                                            </th>
                                        ))}
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-600">
                                    {filteredSubscribers.map((subscriber) => (
                                        editingSubscriber?.id === subscriber.id ? (
                                            <tr key={subscriber.id} className="bg-gray-700">
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="text"
                                                        value={editingSubscriber.id}
                                                        onChange={(e) => setEditingSubscriber({ ...editingSubscriber, id: e.target.value })}
                                                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="text"
                                                        value={editingSubscriber.name}
                                                        onChange={(e) => setEditingSubscriber({ ...editingSubscriber, name: e.target.value })}
                                                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="text"
                                                        value={editingSubscriber.phone_number}
                                                        onChange={(e) => setEditingSubscriber({ ...editingSubscriber, phone_number: e.target.value })}
                                                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="text"
                                                        value={editingSubscriber.shortcode}
                                                        onChange={(e) => setEditingSubscriber({ ...editingSubscriber, shortcode: e.target.value })}
                                                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="datetime-local"
                                                        value={editingSubscriber.subscription_end}
                                                        onChange={(e) => setEditingSubscriber({ ...editingSubscriber, subscription_end: e.target.value })}
                                                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="text"
                                                        value={editingSubscriber.schedule}
                                                        onChange={(e) => setEditingSubscriber({ ...editingSubscriber, schedule: e.target.value })}
                                                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="text"
                                                        value={editingSubscriber.gender}
                                                        onChange={(e) => setEditingSubscriber({ ...editingSubscriber, gender: e.target.value })}
                                                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="text"
                                                        value={editingSubscriber.employment_type}
                                                        onChange={(e) => setEditingSubscriber({ ...editingSubscriber, employment_type: e.target.value })}
                                                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="text"
                                                        value={editingSubscriber.location}
                                                        onChange={(e) => setEditingSubscriber({ ...editingSubscriber, location: e.target.value })}
                                                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="text"
                                                        value={editingSubscriber.region}
                                                        onChange={(e) => setEditingSubscriber({ ...editingSubscriber, region: e.target.value })}
                                                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="text"
                                                        value={editingSubscriber.subscription}
                                                        onChange={(e) => setEditingSubscriber({ ...editingSubscriber, subscription: e.target.value })}
                                                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="text"
                                                        value={editingSubscriber.operator}
                                                        onChange={(e) => setEditingSubscriber({ ...editingSubscriber, operator: e.target.value })}
                                                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="text"
                                                        value={editingSubscriber.category}
                                                        onChange={(e) => setEditingSubscriber({ ...editingSubscriber, category: e.target.value })}
                                                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </td>
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
                                                <td className="px-4 py-3 text-gray-300">{subscriber.id || 'N/A'}</td>
                                                <td className="px-4 py-3 text-gray-300">{subscriber.name || 'N/A'}</td>
                                                <td className="px-4 py-3 text-gray-300">{subscriber.phone_number || 'N/A'}</td>
                                                <td className="px-4 py-3 text-gray-300">{subscriber.shortcode || 'N/A'}</td>
                                                <td className="px-4 py-3 text-gray-300">{subscriber.subscription_end || 'N/A'}</td>
                                                <td className="px-4 py-3 text-gray-300">{subscriber.schedule || 'N/A'}</td>
                                                <td className="px-4 py-3 text-gray-300">{subscriber.gender || 'N/A'}</td>
                                                <td className="px-4 py-3 text-gray-300">{subscriber.employment_type || 'N/A'}</td>
                                                <td className="px-4 py-3 text-gray-300">{subscriber.location || 'N/A'}</td>
                                                <td className="px-4 py-3 text-gray-300">{subscriber.region || 'N/A'}</td>
                                                <td className="px-4 py-3 text-gray-300">{subscriber.subscription || 'N/A'}</td>
                                                <td className="px-4 py-3 text-gray-300">{subscriber.operator || 'N/A'}</td>
                                                <td className="px-4 py-3 text-gray-300">{subscriber.categories || 'N/A'}</td>
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
                </div>
            </div>
        </div>
    );
}

export default SubscribersPage;