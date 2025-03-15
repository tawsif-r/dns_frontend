import React from 'react';

function SubscriptionList({subscriptions}) {
    return (
        <div className='dashboard-card'>
        <h2 className='card-header'>Subscriptions</h2>
        <ul>
            {subscriptions.length > 0 ? (
                subscriptions.map((subscription)=>(
                    <li key={subscription.id}>
                        <strong>ID: </strong>{subscription.id}<br/>
                        <strong>Name: </strong>{subscription.name}<br/>
                        <strong>Duration: </strong>{subscription.duration_days} days<br/>
                        <strong>Price: </strong>{subscription.price}<br/>
                    </li>
                ))
            ):(
                <p>No Subscriptions</p>
            )}
        </ul>
        </div>
    )
}
export default SubscriptionList;