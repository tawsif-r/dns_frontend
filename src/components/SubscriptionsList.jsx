import React, { useState } from 'react';

function SubscriptionsList({ subscriptions }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSubscriptions = subscriptions.filter((subscription) =>
        subscription.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className='dashboard-card'>
            <div className="card-header" onClick={() => setIsOpen(!isOpen)}>
                <h2>{isOpen ? '' : ''}<svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="subscriptions-logo"
                    fill="currentColor"
                >
                    <path d="M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 4l-6-3.27v6.53L16 16z" />
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
                    {filteredSubscriptions.length > 0 ? (
                        filteredSubscriptions.map((subscription) => (
                            <li key={subscription.id}>
                                <strong>ID: </strong>{subscription.id}<br />
                                <strong>Name: </strong>{subscription.name}<br />
                                <strong>Duration: </strong>{subscription.duration_days} day(s)<br />
                                <strong>Price: </strong>{subscription.price}<br />
                            </li>
                        ))
                    ) : (
                        <p>No Subscriptions</p>
                    )}
                </ul>
            )}

        </div>
    )
}
export default SubscriptionsList;