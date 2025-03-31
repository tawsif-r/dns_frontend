import React, { useState } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import axios from 'axios';

function SubscribersList({ subscribers, setSubscribers }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
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

    const baseUrl = 'http://localhost:8000/admin/api/subscribers/'; // Adjust this URL as needed

    const filteredSubscribers = subscribers.filter((subscriber) =>
        subscriber?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Create a new subscriber
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

    // Update an existing subscriber
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

    // Delete a subscriber
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

    return (
        <div className="dashboard-card bg-gray-900 text-white rounded-lg shadow-lg">
            <div 
                className="card-header flex justify-between items-center p-4 bg-purple-900 hover:bg-purple-700 rounded-t-lg cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="mr-2 text-white"
                        fill="currentColor"
                    >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    <h2 className="text-lg font-semibold">Subscribers</h2>
                </div>
                <input
                    type="text"
                    placeholder="Search Subscribers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="ml-4 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>

            {isOpen && (
                <div className="p-4 bg-gray-900 max-h-96 overflow-y-auto">
                    {/* New Subscriber Form */}
                    <div className="mb-6">
                        <h3 className="flex items-center text-purple-400 mb-2">
                            <PlusIcon className="mr-2" />
                            Create New Subscriber
                        </h3>
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Name"
                                value={newSubscriber.name}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, name: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={newSubscriber.phone_number}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, phone_number: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="text"
                                placeholder="Shortcode"
                                value={newSubscriber.shortcode}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, shortcode: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="datetime-local"
                                placeholder="Subscription End"
                                value={newSubscriber.subscription_end}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, subscription_end: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="text"
                                placeholder="Schedule"
                                value={newSubscriber.schedule}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, schedule: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="text"
                                placeholder="Gender"
                                value={newSubscriber.gender}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, gender: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="text"
                                placeholder="Employment Type"
                                value={newSubscriber.employment_type}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, employment_type: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="text"
                                placeholder="Location"
                                value={newSubscriber.location}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, location: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="text"
                                placeholder="Region"
                                value={newSubscriber.region}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, region: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="text"
                                placeholder="Subscription"
                                value={newSubscriber.subscription}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, subscription: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="text"
                                placeholder="Operator"
                                value={newSubscriber.operator}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, operator: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="text"
                                placeholder="Category"
                                value={newSubscriber.category}
                                onChange={(e) => setNewSubscriber({ ...newSubscriber, category: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <button
                                onClick={handleCreateSubscriber}
                                className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-200"
                            >
                                Add Subscriber
                            </button>
                        </div>
                    </div>

                    {/* Subscribers List */}
                    {filteredSubscribers.length > 0 ? (
                        <ul className="space-y-4">
                            {filteredSubscribers.map((subscriber) => (
                                <li 
                                    key={subscriber.id}
                                    className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                                >
                                    {editingSubscriber?.id === subscriber.id ? (
                                        // Edit Mode
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                value={editingSubscriber.name}
                                                onChange={(e) => setEditingSubscriber({ ...editingSubscriber, name: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="text"
                                                value={editingSubscriber.phone_number}
                                                onChange={(e) => setEditingSubscriber({ ...editingSubscriber, phone_number: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="text"
                                                value={editingSubscriber.shortcode}
                                                onChange={(e) => setEditingSubscriber({ ...editingSubscriber, shortcode: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="datetime-local"
                                                value={editingSubscriber.subscription_end}
                                                onChange={(e) => setEditingSubscriber({ ...editingSubscriber, subscription_end: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="text"
                                                value={editingSubscriber.schedule}
                                                onChange={(e) => setEditingSubscriber({ ...editingSubscriber, schedule: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="text"
                                                value={editingSubscriber.gender}
                                                onChange={(e) => setEditingSubscriber({ ...editingSubscriber, gender: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="text"
                                                value={editingSubscriber.employment_type}
                                                onChange={(e) => setEditingSubscriber({ ...editingSubscriber, employment_type: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="text"
                                                value={editingSubscriber.location}
                                                onChange={(e) => setEditingSubscriber({ ...editingSubscriber, location: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="text"
                                                value={editingSubscriber.region}
                                                onChange={(e) => setEditingSubscriber({ ...editingSubscriber, region: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="text"
                                                value={editingSubscriber.subscription}
                                                onChange={(e) => setEditingSubscriber({ ...editingSubscriber, subscription: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="text"
                                                value={editingSubscriber.operator}
                                                onChange={(e) => setEditingSubscriber({ ...editingSubscriber, operator: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="text"
                                                value={editingSubscriber.category}
                                                onChange={(e) => setEditingSubscriber({ ...editingSubscriber, category: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={handleUpdateSubscriber}
                                                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
                                                >
                                                    <SaveIcon className="mr-2" /> Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingSubscriber(null)}
                                                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                                                >
                                                    <XIcon className="mr-2" /> Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        // View Mode
                                        <>
                                            <div className="flex justify-between items-center">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => setEditingSubscriber(subscriber)}
                                                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                                                    >
                                                        <EditIcon />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteSubscriber(subscriber.id)}
                                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                                                    >
                                                        <TrashIcon />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-2 space-y-2">
                                                <p><strong>Name:</strong> {subscriber.name}</p>
                                                <p><strong>Phone:</strong> {subscriber.phone_number}</p>
                                                <p><strong>Short code:</strong> {subscriber.shortcode}</p>
                                                <p><strong>End:</strong> {subscriber.subscription_end}</p>
                                                <p><strong>Schedule:</strong> {subscriber.schedule}</p>
                                                <p><strong>Gender:</strong> {subscriber.gender}</p>
                                                <p><strong>Employment:</strong> {subscriber.employment_type}</p>
                                                <p><strong>Location:</strong> {subscriber.location}</p>
                                                <p><strong>Region:</strong> {subscriber.region}</p>
                                                <p><strong>Subscription:</strong> {subscriber.subscription}</p>
                                                <p><strong>Operator:</strong> {subscriber.operator}</p>
                                                <p><strong>Category:</strong> {subscriber.category}</p>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">No subscribers available</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default SubscribersList;