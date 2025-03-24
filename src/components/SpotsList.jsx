import React, { useState } from 'react';

function SportsList({ sports }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSports = sports.filter((sport) =>
        sport.slug.toLowerCase().includes(searchTerm.toLowerCase())
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
                                <strong>Home Team: </strong>{sport.home_team_name}<br/>
                                <strong>Away Team: </strong>{sport.away_team_name}<br/>
                                <strong>away score current: </strong>{sport.away_score_current}<br/>
                                <strong>away team country: </strong>{sport.away_team_country}<br/>
                                <strong>home score current: </strong>{sport.home_score_current}<br/>
                                <strong>home score overs: </strong>{sport.home_score_overs}<br/>
                                <strong>home score wickets: </strong>{sport.home_score_wickets}<br/>
                                <strong>home team country: </strong>{sport.home_team_country}<br/>
                                <strong>last period: </strong>{sport.last_period}<br/>
                                <strong>status description: </strong>{sport.status_description}<br/>

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