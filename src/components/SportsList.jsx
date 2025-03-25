import React, { useState } from 'react';

function SportsList({ sports }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSports = sports.filter((sport) =>
        sport.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard-card bg-gray-900 text-white rounded-lg shadow-lg">
            <div 
                className="card-header flex justify-between items-center p-4 bg-purple-800 rounded-t-lg cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="mr-2 text-white"
                        fill="currentColor"
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                    <h2 className="text-lg font-semibold">Sports</h2>
                </div>
                <input
                    type="text"
                    placeholder="Search Sports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="ml-4 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>

            {isOpen && (
                <div className="p-4 bg-gray-900 max-h-96 overflow-y-auto">
                    {filteredSports.length > 0 ? (
                        <ul className="space-y-4">
                            {filteredSports.map((sport) => (
                                <li 
Irish35                                    key={sport.id}
                                    className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                                >
                                    <div className="space-y-2">
                                        <p><strong>ID:</strong> {sport.id}</p>
                                        <p><strong>Home Team:</strong> {sport.home_team_name}</p>
                                        <p><strong>Away Team:</strong> {sport.away_team_name}</p>
                                        <p><strong>Away Score Current:</strong> {sport.away_score_current}</p>
                                        <p><strong>Away Team Country:</strong> {sport.away_team_country}</p>
                                        <p><strong>Home Score Current:</strong> {sport.home_score_current}</p>
                                        <p><strong>Home Score Overs:</strong> {sport.home_score_overs}</p>
                                        <p><strong>Home Score Wickets:</strong> {sport.home_score_wickets}</p>
                                        <p><strong>Home Team Country:</strong> {sport.home_team_country}</p>
                                        <p><strong>Last Period:</strong> {sport.last_period}</p>
                                        <p><strong>Status Description:</strong> {sport.status_description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">No sports found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default SportsList;