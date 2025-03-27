import React, { useState } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import axios from 'axios';

function SportsList({ sports, setSports }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingSport, setEditingSport] = useState(null);
    const [newSport, setNewSport] = useState({
        id: '',
        home_team_name: '',
        away_team_name: '',
        away_score_current: '',
        away_team_country: '',
        home_score_current: '',
        home_score_overs: '',
        home_score_wickets: '',
        home_team_country: '',
        last_period: '',
        status_description: ''
    });

    const baseUrl = 'http://192.168.3.37:8001/admin/api/sports/'; // Adjust this URL as needed

    const filteredSports = sports.filter((sport) =>
        sport?.tournament_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        sport?.home_team_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sport?.away_team_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Create a new sport
    const handleCreateSport = async () => {
        if (!newSport.home_team_name || !newSport.away_team_name) {
            alert('Please fill in required fields (Home Team Name and Away Team Name)');
            return;
        }

        try {
            const response = await axios.post(baseUrl, newSport);
            setSports([...sports, response.data]);
            setNewSport({
                id: '',
                home_team_name: '',
                away_team_name: '',
                away_score_current: '',
                away_team_country: '',
                home_score_current: '',
                home_score_overs: '',
                home_score_wickets: '',
                home_team_country: '',
                last_period: '',
                status_description: ''
            });
        } catch (error) {
            console.error('Error creating sport:', error);
            alert('Failed to create sport');
        }
    };

    // Update an existing sport
    const handleUpdateSport = async () => {
        if (!editingSport.home_team_name || !editingSport.away_team_name) {
            alert('Please fill in required fields (Home Team Name and Away Team Name)');
            return;
        }

        try {
            const response = await axios.put(`${baseUrl}${editingSport.id}/`, editingSport);
            setSports(sports.map(sport =>
                sport.id === editingSport.id ? response.data : sport
            ));
            setEditingSport(null);
        } catch (error) {
            console.error('Error updating sport:', error);
            alert('Failed to update sport');
        }
    };

    // Delete a sport
    const handleDeleteSport = async (id) => {
        try {
            await axios.delete(`${baseUrl}${id}/`);
            setSports(sports.filter(sport => sport.id !== id));
            if (editingSport?.id === id) {
                setEditingSport(null);
            }
        } catch (error) {
            console.error('Error deleting sport:', error);
            alert('Failed to delete sport');
        }
    };

    return (
        <div className="dashboard-card bg-gray-900 text-white rounded-lg shadow-lg">
            <div 
                className="card-header flex justify-between items-center p-4 bg-purple-900 hover:bg-purple-700 rounded-t-lg cursor-pointer"
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
                    {/* New Sport Form */}
                    <div className="mb-6">
                        <h3 className="flex items-center text-purple-400 mb-2">
                            <PlusIcon className="mr-2" />
                            Create New Sport Event
                        </h3>
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Home Team Name"
                                value={newSport.home_team_name}
                                onChange={(e) => setNewSport({ ...newSport, home_team_name: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="text"
                                placeholder="Away Team Name"
                                value={newSport.away_team_name}
                                onChange={(e) => setNewSport({ ...newSport, away_team_name: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="number"
                                placeholder="Away Score Current"
                                value={newSport.away_score_current}
                                onChange={(e) => setNewSport({ ...newSport, away_score_current: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="text"
                                placeholder="Away Team Country"
                                value={newSport.away_team_country}
                                onChange={(e) => setNewSport({ ...newSport, away_team_country: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="number"
                                placeholder="Home Score Current"
                                value={newSport.home_score_current}
                                onChange={(e) => setNewSport({ ...newSport, home_score_current: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="number"
                                placeholder="Home Score Overs"
                                value={newSport.home_score_overs}
                                onChange={(e) => setNewSport({ ...newSport, home_score_overs: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="number"
                                placeholder="Home Score Wickets"
                                value={newSport.home_score_wickets}
                                onChange={(e) => setNewSport({ ...newSport, home_score_wickets: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="text"
                                placeholder="Home Team Country"
                                value={newSport.home_team_country}
                                onChange={(e) => setNewSport({ ...newSport, home_team_country: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="text"
                                placeholder="Last Period"
                                value={newSport.last_period}
                                onChange={(e) => setNewSport({ ...newSport, last_period: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="text"
                                placeholder="Status Description"
                                value={newSport.status_description}
                                onChange={(e) => setNewSport({ ...newSport, status_description: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <button
                                onClick={handleCreateSport}
                                className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-200"
                            >
                                Add Sport Event
                            </button>
                        </div>
                    </div>

                    {/* Sports List */}
                    {filteredSports.length > 0 ? (
                        <ul className="space-y-4">
                            {filteredSports.map((sport) => (
                                <li 
                                    key={sport.id}
                                    className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                                >
                                    {editingSport?.id === sport.id ? (
                                        // Edit Mode
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                value={editingSport.home_team_name}
                                                onChange={(e) => setEditingSport({ ...editingSport, home_team_name: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="text"
                                                value={editingSport.away_team_name}
                                                onChange={(e) => setEditingSport({ ...editingSport, away_team_name: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="number"
                                                value={editingSport.away_score_current}
                                                onChange={(e) => setEditingSport({ ...editingSport, away_score_current: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="text"
                                                value={editingSport.away_team_country}
                                                onChange={(e) => setEditingSport({ ...editingSport, away_team_country: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="number"
                                                value={editingSport.home_score_current}
                                                onChange={(e) => setEditingSport({ ...editingSport, home_score_current: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="number"
                                                value={editingSport.home_score_overs}
                                                onChange={(e) => setEditingSport({ ...editingSport, home_score_overs: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="number"
                                                value={editingSport.home_score_wickets}
                                                onChange={(e) => setEditingSport({ ...editingSport, home_score_wickets: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="text"
                                                value={editingSport.home_team_country}
                                                onChange={(e) => setEditingSport({ ...editingSport, home_team_country: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="text"
                                                value={editingSport.last_period}
                                                onChange={(e) => setEditingSport({ ...editingSport, last_period: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="text"
                                                value={editingSport.status_description}
                                                onChange={(e) => setEditingSport({ ...editingSport, status_description: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={handleUpdateSport}
                                                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
                                                >
                                                    <SaveIcon className="mr-2" /> Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingSport(null)}
                                                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                                                >
                                                    <XIcon className="mr-2" /> Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        // View Mode
                                        <>
                                            <div className="flex justify-between items-center">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => setEditingSport(sport)}
                                                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                                                    >
                                                        <EditIcon />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteSport(sport.id)}
                                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                                                    >
                                                        <TrashIcon />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-2 space-y-2">
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
                                        </>
                                    )}
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