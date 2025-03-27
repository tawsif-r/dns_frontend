import React, { useState } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import axios from 'axios';

function KeywordList({ keywords, setKeywords }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingKeyword, setEditingKeyword] = useState(null);
    const [newKeyword, setNewKeyword] = useState({
        key: '',
        description: '',
        service_id: ''
    });

    const baseUrl = 'http://192.168.3.37:8001/admin/api/keywords/';

    const filteredKeywords = keywords.filter((keyword) =>
        keyword?.key?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Create a new keyword
    const handleCreateKeyword = async () => {
        if (!newKeyword.key || !newKeyword.service_id) {
            alert('Please fill in all required fields (Key and Service ID)');
            return;
        }

        try {
            const response = await axios.post(baseUrl, {
                key: newKeyword.key,
                description: newKeyword.description,
                service_id: parseInt(newKeyword.service_id)
            });
            setKeywords([...keywords, response.data]);
            setNewKeyword({
                key: '',
                description: '',
                service_id: ''
            });
        } catch (error) {
            console.error('Error creating keyword:', error);
            alert('Failed to create keyword');
        }
    };

    // Update an existing keyword
    const handleUpdateKeyword = async () => {
        if (!editingKeyword.key || !editingKeyword.service_id) {
            alert('Please fill in all required fields (Key and Service ID)');
            return;
        }

        try {
            const response = await axios.put(`${baseUrl}${editingKeyword.id}/`, {
                key: editingKeyword.key,
                description: editingKeyword.description,
                service_id: parseInt(editingKeyword.service_id)
            });
            setKeywords(keywords.map(keyword =>
                keyword.id === editingKeyword.id ? response.data : keyword
            ));
            setEditingKeyword(null);
        } catch (error) {
            console.error('Error updating keyword:', error);
            alert('Failed to update keyword');
        }
    };

    // Delete a keyword
    const handleDeleteKeyword = async (id) => {
        try {
            await axios.delete(`${baseUrl}${id}/`);
            setKeywords(keywords.filter(keyword => keyword.id !== id));
            if (editingKeyword?.id === id) {
                setEditingKeyword(null);
            }
        } catch (error) {
            console.error('Error deleting keyword:', error);
            alert('Failed to delete keyword');
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
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 16H7v-1h10v1zm0-3H7v-1h10v1zm-3-7H7v-1h7v1zm3-3H7V6h10v1z" />
                    </svg>
                    <h2 className="text-lg font-semibold">Keywords</h2>
                </div>
                <input
                    type="text"
                    placeholder="Search Keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="ml-4 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>

            {isOpen && (
                <div className="p-4 bg-gray-900 max-h-96 overflow-y-auto">
                    {/* New Keyword Form */}
                    <div className="mb-6">
                        <h3 className="flex items-center text-purple-400 mb-2">
                            <PlusIcon className="mr-2" />
                            Create New Keyword
                        </h3>
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Key"
                                value={newKeyword.key}
                                onChange={(e) => setNewKeyword({ ...newKeyword, key: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <textarea
                                placeholder="Description"
                                value={newKeyword.description}
                                onChange={(e) => setNewKeyword({ ...newKeyword, description: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="number"
                                placeholder="Service ID"
                                value={newKeyword.service_id}
                                onChange={(e) => setNewKeyword({ ...newKeyword, service_id: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <button
                                onClick={handleCreateKeyword}
                                className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-200"
                            >
                                Add Keyword
                            </button>
                        </div>
                    </div>

                    {/* Keywords List */}
                    {filteredKeywords.length > 0 ? (
                        <ul className="space-y-4">
                            {filteredKeywords.map((keyword) => (
                                <li 
                                    key={keyword.id}
                                    className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                                >
                                    {editingKeyword?.id === keyword.id ? (
                                        // Edit Mode
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                value={editingKeyword.key}
                                                onChange={(e) => setEditingKeyword({ ...editingKeyword, key: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <textarea
                                                value={editingKeyword.description}
                                                onChange={(e) => setEditingKeyword({ ...editingKeyword, description: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="number"
                                                value={editingKeyword.service_id}
                                                onChange={(e) => setEditingKeyword({ ...editingKeyword, service_id: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={handleUpdateKeyword}
                                                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
                                                >
                                                    <SaveIcon className="mr-2" /> Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingKeyword(null)}
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
                                                        onClick={() => setEditingKeyword(keyword)}
                                                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                                                    >
                                                        <EditIcon />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteKeyword(keyword.id)}
                                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                                                    >
                                                        <TrashIcon />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-2 space-y-2">
                                                <p><strong>ID:</strong> {keyword.id}</p>
                                                <p><strong>Key:</strong> {keyword.key}</p>
                                                <p><strong>Description:</strong> {keyword.description}</p>
                                                <p><strong>Service ID:</strong> {keyword.service}</p>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">No keywords found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default KeywordList;