import React, { useState } from 'react';

function SubscribersList({ subscribers }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSubscribers = subscribers.filter((subscriber) =>
        subscriber.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    {filteredSubscribers.length > 0 ? (
                        <ul className="space-y-4">
                            {filteredSubscribers.map((subscriber) => (
                                <li 
                                    key={subscriber.id}
                                    className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                                >
                                    <div className="space-y-2">
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