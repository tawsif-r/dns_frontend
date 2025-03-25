import React, { useState } from 'react';

function MessagesQList({ messages }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMessages = messages.filter((message) =>
        message?.created_at?.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                    </svg>
                    <h2 className="text-lg font-semibold">Message Queue</h2>
                </div>
                <input
                    type="text"
                    placeholder="Search MessageQ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="ml-4 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>

            {isOpen && (
                <div className="p-4 bg-gray-900 max-h-96 overflow-y-auto">
                    {filteredMessages.length > 0 ? (
                        <ul className="space-y-4">
                            {filteredMessages.map((message) => (
                                <li 
                                    key={message.id}
                                    className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                                >
                                    <div className="space-y-2">
                                        <p><strong>ID:</strong> {message.id}</p>
                                        <p><strong>Schedule:</strong> {message.scheduled_time}</p>
                                        <p><strong>Check:</strong> {message.check_time}</p>
                                        <p><strong>Created At:</strong> {message.created_at}</p>
                                        <p><strong>Subscriber:</strong> {message.subscriber}</p>
                                        <p><strong>Job:</strong> {message.job}</p>
                                        <p><strong>Charge:</strong> {message.charge}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">No messages found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default MessagesQList;