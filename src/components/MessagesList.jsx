import React, { useState } from 'react';

function MessageList({ messages }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMessages = messages.filter((message) =>
        message.created_at.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className='dashboard-card'>
            <div className="card-header" onClick={() => setIsOpen(!isOpen)}>
                <h2>{isOpen ? '▼' : '▶'} Messages</h2>
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
                                <strong>ID: </strong>{message.id}<br/>
                                <strong>Schedule: </strong>{message.scheduled_time}<br/>
                                <strong>Check: </strong>{message.check_time}<br/>
                                <strong>Created At: </strong>{message.created_at}<br/>
                                <strong>Subscriber: </strong>{message.subscriber}<br/>
                                <strong>Job: </strong>{message.job}<br/>
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
export default MessageList;