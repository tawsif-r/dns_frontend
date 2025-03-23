import React, { useState } from 'react';

function SportsList({ sports }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSports = sports.filter((sport) =>
        sport.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className='dashboard-card'>
            <div className="card-header" onClick={() => setIsOpen(!isOpen)}>
                <h2>{isOpen ? '▼' : '▶'} Sports</h2>
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
                    {filteredSports.length > 0 ? (
                        filteredSports.map((sport) => (
                            <li key={sport.id}>
                                <strong>ID: </strong>{sport.id}<br/>
                                <strong>Name: </strong>{sport.name}<br/>
                                <strong>Duration: </strong>{sport.duration}<br/>
                                <strong>Price: </strong>{sport.price}<br/>
                            </li>
                        ))
                    ) : (
                        <p>No Sports</p>
                    )}
                </ul>
            )}

        </div>
    )
}
export default SportsList;