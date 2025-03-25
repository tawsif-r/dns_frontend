import React, { useState } from 'react';

function MessagesQList({ messages }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMessages = messages.filter((message) =>
        message.created_at.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className='dashboard-card'>
            <div className="card-header" onClick={() => setIsOpen(!isOpen)}>
                <h2>{isOpen ? '' : ''}<svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="message-logo"
                    fill="currentColor"
                >
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                </svg>
                </h2>
                <input
                    type="text"
                    placeholder="Search Subscribers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>
            {isOpen && (
                <ul>
                    {filteredMessages.length > 0 ? (
                        filteredMessages.map((message) => (
                            <li key={message.id}>
                                <strong>ID: </strong>{message.id}<br />
                                <strong>Schedule: </strong>{message.scheduled_time}<br />
                                <strong>Check: </strong>{message.check_time}<br />
                                <strong>Created At: </strong>{message.created_at}<br />
                                <strong>Subscriber: </strong>{message.subscriber}<br />
                                <strong>Job: </strong>{message.job}<br />
                                <strong>Charge: </strong>{message.charge}<br />
                            </li>
                        ))
                    ) : (
                        <p>No messsages</p>
                    )}
                </ul>
            )}

        </div>
    )
}
export default MessagesQList;