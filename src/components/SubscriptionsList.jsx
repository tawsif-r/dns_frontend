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
                <h2>{isOpen ? '▼' : '▶'} Sups</h2>
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
                                <strong>ID: </strong>{subscription.id}<br/>
                                <strong>Name: </strong>{subscription.name}<br/>
                                <strong>Duration: </strong>{subscription.duration}<br/>
                                <strong>Price: </strong>{subscription.price}<br/>
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