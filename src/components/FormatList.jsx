import React, { useState } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import axios from 'axios';

function FormatList({ formats, setFormats }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingFormat, setEditingFormat] = useState(null);
    const [newFormat, setNewFormat] = useState({
        name: '',
        char_limit: '',
        job_limit: ''
    });

    const baseUrl = 'http://localhost:8000/admin/api/formats/';

    const filteredFormats = formats.filter((format) =>
        format?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Create a new format
    const handleCreateFormat = async () => {
        if (!newFormat.name || !newFormat.char_limit || !newFormat.job_limit) {
            alert('Please fill in all required fields (Name, Char Limit, and Job Limit)');
            return;
        }

        try {
            const response = await axios.post(baseUrl, {
                name: newFormat.name,
                char_limit: parseInt(newFormat.char_limit),
                job_limit: parseInt(newFormat.job_limit)
            });
            setFormats([...formats, response.data]);
            setNewFormat({
                name: '',
                char_limit: '',
                job_limit: ''
            });
        } catch (error) {
            console.error('Error creating format:', error);
            alert('Failed to create format');
        }
    };

    // Update an existing format
    const handleUpdateFormat = async () => {
        if (!editingFormat.name || !editingFormat.char_limit || !editingFormat.job_limit) {
            alert('Please fill in all required fields (Name, Char Limit, and Job Limit)');
            return;
        }

        try {
            const response = await axios.put(`${baseUrl}${editingFormat.id}/`, {
                name: editingFormat.name,
                char_limit: parseInt(editingFormat.char_limit),
                job_limit: parseInt(editingFormat.job_limit)
            });
            setFormats(formats.map(format =>
                format.id === editingFormat.id ? response.data : format
            ));
            setEditingFormat(null);
        } catch (error) {
            console.error('Error updating format:', error);
            alert('Failed to update format');
        }
    };

    // Delete a format
    const handleDeleteFormat = async (id) => {
        try {
            await axios.delete(`${baseUrl}${id}/`);
            setFormats(formats.filter(format => format.id !== id));
            if (editingFormat?.id === id) {
                setEditingFormat(null);
            }
        } catch (error) {
            console.error('Error deleting format:', error);
            alert('Failed to delete format');
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
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 16H7v-1h10v1zm0-3H7v-1h10v1zm0-3H7v-1h10v1zm0-3H7V9h10v1zm0-3H7V6h10v1z" />
                    </svg>
                    <h2 className="text-lg font-semibold">Formats</h2>
                </div>
                <input
                    type="text"
                    placeholder="Search Formats..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="ml-4 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>

            {isOpen && (
                <div className="p-4 bg-gray-900 max-h-96 overflow-y-auto">
                    {/* New Format Form */}
                    <div className="mb-6">
                        <h3 className="flex items-center text-purple-400 mb-2">
                            <PlusIcon className="mr-2" />
                            Create New Format
                        </h3>
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Name"
                                value={newFormat.name}
                                onChange={(e) => setNewFormat({ ...newFormat, name: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="number"
                                placeholder="Character Limit"
                                value={newFormat.char_limit}
                                onChange={(e) => setNewFormat({ ...newFormat, char_limit: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="number"
                                placeholder="Job Limit"
                                value={newFormat.job_limit}
                                onChange={(e) => setNewFormat({ ...newFormat, job_limit: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <button
                                onClick={handleCreateFormat}
                                className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-200"
                            >
                                Add Format
                            </button>
                        </div>
                    </div>

                    {/* Formats List */}
                    {filteredFormats.length > 0 ? (
                        <ul className="space-y-4">
                            {filteredFormats.map((format) => (
                                <li 
                                    key={format.id}
                                    className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                                >
                                    {editingFormat?.id === format.id ? (
                                        // Edit Mode
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                value={editingFormat.name}
                                                onChange={(e) => setEditingFormat({ ...editingFormat, name: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="number"
                                                value={editingFormat.char_limit}
                                                onChange={(e) => setEditingFormat({ ...editingFormat, char_limit: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="number"
                                                value={editingFormat.job_limit}
                                                onChange={(e) => setEditingFormat({ ...editingFormat, job_limit: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={handleUpdateFormat}
                                                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
                                                >
                                                    <SaveIcon className="mr-2" /> Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingFormat(null)}
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
                                                        onClick={() => setEditingFormat(format)}
                                                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                                                    >
                                                        <EditIcon />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteFormat(format.id)}
                                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                                                    >
                                                        <TrashIcon />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-2 space-y-2">
                                                <p><strong>ID:</strong> {format.id}</p>
                                                <p><strong>Name:</strong> {format.name}</p>
                                                <p><strong>Character Limit:</strong> {format.char_limit}</p>
                                                <p><strong>Job Limit:</strong> {format.job_limit}</p>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">No formats found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default FormatList;