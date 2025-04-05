import React, { useState, useEffect } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import Nav from '../components/ui/Nav'; // Assuming you have a Nav component
import axios from 'axios';

function SportsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sports, setSports] = useState([]);
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

    const baseUrl = 'http://192.168.3.37:8001/admin/api/sports/';

    // Fetch sports on page load
    useEffect(() => {
        const fetchSports = async () => {
            try {
                const response = await axios.get(baseUrl);
                setSports(response.data);
            } catch (error) {
                console.error('Error fetching sports:', error);
            }
        };
        fetchSports();
    }, []);

    const filteredSports = sports.filter((sport) =>
        sport?.home_team_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sport?.away_team_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

    // Define table columns - excluding 'id' field
    const columns = Object.keys(newSport).filter(key => key !== 'id');

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Nav />
            <div className="container mx-auto px-4 py-8 ml-16">
                <div className="border-2 rounded-lg shadow-lg">
                    <div 
                        className="flex justify-between items-center p-4 bg-gray-800 text-white rounded-t-lg"
                    >
                        <div className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="mr-2"
                                fill="currentColor"
                            >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                            </svg>
                            <h1 className="text-xl font-bold">Sports Management</h1>
                        </div>
                        <input
                            type="text"
                            placeholder="Search Sports by Team Name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-3 py-1 bg-slate-900 text-gray-100 rounded border focus:outline-none focus:border-gray-100"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    <div className="p-6">
                        {/* New Sport Form */}
                        <div className="mb-8 p-4 rounded-lg">
                            <h2 className="flex items-center text-lg font-semibold mb-4">
                                <PlusIcon className="mr-2" />
                                Add New Sport Event
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(newSport).map(([key, value]) => (
                                    key !== 'id' && (
                                        <input
                                            key={key}
                                            type={key.includes('score') || key === 'home_score_wickets' ? 'number' : 'text'}
                                            placeholder={key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                            value={value}
                                            onChange={(e) => setNewSport({ ...newSport, [key]: e.target.value })}
                                            className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                        />
                                    )
                                ))}
                                <button
                                    onClick={handleCreateSport}
                                    className="md:col-span-2 font-bold bg-black text-white px-4 py-2 rounded border-2 border-cyan-600 hover:bg-gray-300 hover:text-black transition duration-500"
                                >
                                    Add Sport Event
                                </button>
                            </div>
                        </div>

                        {/* Sports Table */}
                        <div className="overflow-x-auto">
                            {filteredSports.length > 0 ? (
                                <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                                    <thead>
                                        <tr className="bg-gray-700">
                                            {columns.slice(0, 5).map((column) => (
                                                <th key={column} className="px-4 py-3 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">
                                                    {column.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                                </th>
                                            ))}
                                            <th className="px-4 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-600">
                                        {filteredSports.map((sport) => (
                                            editingSport?.id === sport.id ? (
                                                <tr key={sport.id} className="bg-gray-700">
                                                    {columns.slice(0, 5).map((column) => (
                                                        <td key={column} className="px-4 py-2">
                                                            <input
                                                                type={column.includes('score') || column === 'home_score_wickets' ? 'number' : 'text'}
                                                                value={editingSport[column] || ''}
                                                                onChange={(e) => setEditingSport({
                                                                    ...editingSport,
                                                                    [column]: e.target.value
                                                                })}
                                                                className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                            />
                                                        </td>
                                                    ))}
                                                    <td className="px-4 py-2 text-right whitespace-nowrap">
                                                        <button
                                                            onClick={handleUpdateSport}
                                                            className="inline-flex items-center justify-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                                                        >
                                                            <SaveIcon size={16} className="mr-1" /> Save
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingSport(null)}
                                                            className="inline-flex items-center justify-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                        >
                                                            <XIcon size={16} className="mr-1" /> Cancel
                                                        </button>
                                                    </td>
                                                </tr>
                                            ) : (
                                                <tr key={sport.id} className="hover:bg-gray-700">
                                                    {columns.slice(0, 5).map((column) => (
                                                        <td key={column} className="px-4 py-3 text-gray-300">
                                                            {sport[column] || 'N/A'}
                                                        </td>
                                                    ))}
                                                    <td className="px-4 py-3 text-right whitespace-nowrap">
                                                        <button
                                                            onClick={() => setEditingSport(sport)}
                                                            className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                                        >
                                                            <EditIcon size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteSport(sport.id)}
                                                            className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                        >
                                                            <TrashIcon size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-center text-gray-500">No sports found</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SportsPage;