import React, { useState } from 'react';

function SubscriptionsList({ subscriptions }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSubscriptions = subscriptions.filter((subscription) =>
        subscription?.name?.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <path d="M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 4l-6-3.27v6.53L16 16z" />
                    </svg>
                    <h2 className="text-lg font-semibold">Subscriptions</h2>
                </div>
                <input
                    type="text"
                    placeholder="Search Subscriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="ml-4 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>

            {isOpen && (
                <div className="p-4 bg-gray-900 max-h-96 overflow-y-auto">
                    {filteredSubscriptions.length > 0 ? (
                        <ul className="space-y-4">
                            {filteredSubscriptions.map((subscription) => (
                                <li 
                                    key={subscription.id}
                                    className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                                >
                                    <div className="space-y-2">
                                        <p><strong>ID:</strong> {subscription.id}</p>
                                        <p><strong>Name:</strong> {subscription.name}</p>
                                        <p><strong>Duration:</strong> {subscription.duration_days} day(s)</p>
                                        <p><strong>Price:</strong> {subscription.price}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">No subscriptions found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default SubscriptionsList;