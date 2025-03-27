import React, { useState } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import axios from 'axios';

function ChannelList({ channels, setChannels }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingChannel, setEditingChannel] = useState(null);
    const [newChannel, setNewChannel] = useState({
        name: '',
        format: ''
    });

    const baseUrl = 'http://192.168.3.37:8001/admin/api/channels/';

    const filteredChannels = channels.filter((channel) =>
        channel?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Create a new channel
    const handleCreateChannel = async () => {
        if (!newChannel.name || !newChannel.format) {
            alert('Please fill in all required fields (Name and Format)');
            return;
        }

        try {
            const response = await axios.post(baseUrl, {
                name: newChannel.name,
                format: parseInt(newChannel.format)
            });
            setChannels([...channels, response.data]);
            setNewChannel({
                name: '',
                format: ''
            });
        } catch (error) {
            console.error('Error creating channel:', error);
            alert('Failed to create channel');
        }
    };

    // Update an existing channel
    const handleUpdateChannel = async () => {
        if (!editingChannel.name || !editingChannel.format) {
            alert('Please fill in all required fields (Name and Format)');
            return;
        }

        try {
            const response = await axios.put(`${baseUrl}${editingChannel.id}/`, {
                name: editingChannel.name,
                format: parseInt(editingChannel.format)
            });
            setChannels(channels.map(channel =>
                channel.id === editingChannel.id ? response.data : channel
            ));
            setEditingChannel(null);
        } catch (error) {
            console.error('Error updating channel:', error);
            alert('Failed to update channel');
        }
    };

    // Delete a channel
    const handleDeleteChannel = async (id) => {
        try {
            await axios.delete(`${baseUrl}${id}/`);
            setChannels(channels.filter(channel => channel.id !== id));
            if (editingChannel?.id === id) {
                setEditingChannel(null);
            }
        } catch (error) {
            console.error('Error deleting channel:', error);
            alert('Failed to delete channel');
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
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16zm-8-8.5c1.38 0 2.5-1.12 2.5-2.5S13.38 6.5 12 6.5 9.5 7.62 9.5 9s1.12 2.5 2.5 2.5zM18 16H6v-.67l2.5-3 2 2.67L15 11l3 5v0z" />
                    </svg>
                    <h2 className="text-lg font-semibold">Channels</h2>
                </div>
                <input
                    type="text"
                    placeholder="Search Channels..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="ml-4 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>

            {isOpen && (
                <div className="p-4 bg-gray-900 max-h-96 overflow-y-auto">
                    {/* New Channel Form */}
                    <div className="mb-6">
                        <h3 className="flex items-center text-purple-400 mb-2">
                            <PlusIcon className="mr-2" />
                            Create New Channel
                        </h3>
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Name"
                                value={newChannel.name}
                                onChange={(e) => setNewChannel({ ...newChannel, name: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="number"
                                placeholder="Format"
                                value={newChannel.format}
                                onChange={(e) => setNewChannel({ ...newChannel, format: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <button
                                onClick={handleCreateChannel}
                                className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-200"
                            >
                                Add Channel
                            </button>
                        </div>
                    </div>

                    {/* Channels List */}
                    {filteredChannels.length > 0 ? (
                        <ul className="space-y-4">
                            {filteredChannels.map((channel) => (
                                <li 
                                    key={channel.id}
                                    className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                                >
                                    {editingChannel?.id === channel.id ? (
                                        // Edit Mode
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                value={editingChannel.name}
                                                onChange={(e) => setEditingChannel({ ...editingChannel, name: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="number"
                                                value={editingChannel.format}
                                                onChange={(e) => setEditingChannel({ ...editingChannel, format: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={handleUpdateChannel}
                                                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
                                                >
                                                    <SaveIcon className="mr-2" /> Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingChannel(null)}
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
                                                        onClick={() => setEditingChannel(channel)}
                                                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                                                    >
                                                        <EditIcon />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteChannel(channel.id)}
                                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                                                    >
                                                        <TrashIcon />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-2 space-y-2">
                                                <p><strong>ID:</strong> {channel.id}</p>
                                                <p><strong>Name:</strong> {channel.name}</p>
                                                <p><strong>Format:</strong> {channel.format}</p>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">No channels found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default ChannelList;