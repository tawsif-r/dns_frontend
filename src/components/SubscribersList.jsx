import React, { useState } from 'react';

function SubscribersList({ subscribers }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSubscribers = subscribers.filter((subscriber) =>
        subscriber.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className='dashboard-card'>
            <div className="card-header" onClick={() => setIsOpen(!isOpen)}>
                <h2>{isOpen ? '' : ''} <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="subscriber-logo"
                    fill="currentColor"
                >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg></h2>
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
                    {filteredSubscribers.length > 0 ? (
                        filteredSubscribers.map((subscriber) => (
                            <li key={subscriber.id}>
                                <strong>{subscriber.name}</strong><br />
                                <strong>Phone: </strong>{subscriber.phone_number}<br />
                                <strong>Short code: </strong>{subscriber.shortcode}<br />
                                <strong>End: </strong>{subscriber.subscription_end}<br />
                                <strong>Schedule: </strong>{subscriber.schedule}<br />
                                <strong>Gender: </strong>{subscriber.gender}<br />
                                <strong>Employment: </strong>{subscriber.employment_type}<br />
                                <strong>Location: </strong>{subscriber.location}<br />
                                <strong>Region: </strong>{subscriber.region}<br />
                                <strong>Subscription: </strong>{subscriber.subscription}<br />
                                <strong>Operator: </strong>{subscriber.operator}<br />
                                <strong>Category: </strong>{subscriber.category}
                            </li>
                        ))
                    ) : (
                        <p>No Subscribers Available.</p>
                    )}
                </ul>
            )}
        </div>
    )
}
export default SubscribersList;