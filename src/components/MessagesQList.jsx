import React, { useState } from 'react';

function MessagesQList({ messages }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMessages = messages.filter((message) =>
        message?.created_at?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="mt-8">
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
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                    </svg>
                    <h2 className="text-lg font-semibold">Message Queue</h2>
                </div>
                <input
                    type="text"
                    placeholder="Search Message Queue by Created At..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-3 py-1 bg-slate-900 text-gray-100 rounded border focus:outline-none focus:border-gray-100"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
            <div className="p-6 bg-gray-800 rounded-b-lg">
                {filteredMessages.length > 0 ? (
                    <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="px-4 py-3 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">ID</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Schedule</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Check</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Created At</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Subscriber</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Job</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Charge</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-600">
                            {filteredMessages.map((message) => (
                                <tr key={message.id} className="hover:bg-gray-700">
                                    <td className="px-4 py-3 text-gray-300">{message.id || 'N/A'}</td>
                                    <td className="px-4 py-3 text-gray-300">{message.scheduled_time || 'N/A'}</td>
                                    <td className="px-4 py-3 text-gray-300">{message.check_time || 'N/A'}</td>
                                    <td className="px-4 py-3 text-gray-300">{message.created_at || 'N/A'}</td>
                                    <td className="px-4 py-3 text-gray-300">{message.subscriber || 'N/A'}</td>
                                    <td className="px-4 py-3 text-gray-300">{message.job || 'N/A'}</td>
                                    <td className="px-4 py-3 text-gray-300">{message.charge || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500">No messages in queue found</p>
                )}
            </div>
        </div>
    );
}

export default MessagesQList;