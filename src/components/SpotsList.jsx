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
                <h2>{isOpen ? '' : ''} <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="sports-logo"
                    fill="currentColor"
                >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg></h2>
                <input
                    type="text"
                    placeholder="Search Sports..."
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
                                <strong>ID: </strong>{sport.id}<br />
                                <strong>Home Team: </strong>{sport.home_team_name}<br />
                                <strong>Away Team: </strong>{sport.away_team_name}<br />
                                <strong>away score current: </strong>{sport.away_score_current}<br />
                                <strong>away team country: </strong>{sport.away_team_country}<br />
                                <strong>home score current: </strong>{sport.home_score_current}<br />
                                <strong>home score overs: </strong>{sport.home_score_overs}<br />
                                <strong>home score wickets: </strong>{sport.home_score_wickets}<br />
                                <strong>home team country: </strong>{sport.home_team_country}<br />
                                <strong>last period: </strong>{sport.last_period}<br />
                                <strong>status description: </strong>{sport.status_description}<br />

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