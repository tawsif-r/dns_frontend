import React,{useState} from 'react';

function SubscribersList({ subscribers }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSubscribers = subscribers.filter((subscriber) =>
        subscriber.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className='dashboard-card'>
            <div className="card-header" onClick={() => setIsOpen(!isOpen)}>
                <h2>{isOpen ? '▼' : '▶'} Subs</h2>
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
                                <strong>{subscriber.name}</strong><br/>
                                <strong>Phone: </strong>{subscriber.phone_number}<br/>
                                <strong>Short code: </strong>{subscriber.shortcode}<br/>
                                <strong>End: </strong>{subscriber.subscription_end}<br/>
                                <strong>Schedule: </strong>{subscriber.schedule}<br/>
                                <strong>Gender: </strong>{subscriber.gender}<br/>
                                <strong>Employment: </strong>{subscriber.employment_type}<br/>
                                <strong>Location: </strong>{subscriber.location}<br/>
                                <strong>Region: </strong>{subscriber.region}<br/>
                                <strong>Subscription: </strong>{subscriber.subscription}<br/>
                                <strong>Operator: </strong>{subscriber.operator}<br/>
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