import React, { useState } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import axios from 'axios';

function SportCategoryList({ sportCategories, setSportCategories }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingSportCategory, setEditingSportCategory] = useState(null);
    const [newSportCategory, setNewSportCategory] = useState({
        name: '',
        description: '',
        keyword: ''
    });

    const baseUrl = 'http://localhost:8000/admin/api/sportCats/';

    const filteredSportCategories = sportCategories.filter((sportCategory) =>
        sportCategory?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sportCategory?.keyword?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Create a new sport category
    const handleCreateSportCategory = async () => {
        if (!newSportCategory.name || !newSportCategory.keyword) {
            alert('Please fill in required fields (Name and Keyword)');
            return;
        }

        try {
            const response = await axios.post(baseUrl, newSportCategory);
            setSportCategories([...sportCategories, response.data]);
            setNewSportCategory({
                name: '',
                description: '',
                keyword: ''
            });
        } catch (error) {
            console.error('Error creating sport category:', error);
            alert('Failed to create sport category');
        }
    };

    // Update an existing sport category
    const handleUpdateSportCategory = async () => {
        if (!editingSportCategory.name || !editingSportCategory.keyword) {
            alert('Please fill in required fields (Name and Keyword)');
            return;
        }

        try {
            const response = await axios.put(`${baseUrl}${editingSportCategory.id}/`, editingSportCategory);
            setSportCategories(sportCategories.map(sportCategory =>
                sportCategory.id === editingSportCategory.id ? response.data : sportCategory
            ));
            setEditingSportCategory(null);
        } catch (error) {
            console.error('Error updating sport category:', error);
            alert('Failed to update sport category');
        }
    };

    // Delete a sport category
    const handleDeleteSportCategory = async (id) => {
        try {
            await axios.delete(`${baseUrl}${id}/`);
            setSportCategories(sportCategories.filter(sportCategory => sportCategory.id !== id));
            if (editingSportCategory?.id === id) {
                setEditingSportCategory(null);
            }
        } catch (error) {
            console.error('Error deleting sport category:', error);
            alert('Failed to delete sport category');
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
                    <h2 className="text-lg font-semibold">Sport Categories</h2>
                </div>
                <input
                    type="text"
                    placeholder="Search Sport Categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="ml-4 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>

            {isOpen && (
                <div className="p-4 bg-gray-900 max-h-96 overflow-y-auto">
                    {/* New Sport Category Form */}
                    <div className="mb-6">
                        <h3 className="flex items-center text-purple-400 mb-2">
                            <PlusIcon className="mr-2" />
                            Create New Sport Category
                        </h3>
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Name"
                                value={newSportCategory.name}
                                onChange={(e) => setNewSportCategory({ ...newSportCategory, name: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <textarea
                                placeholder="Description"
                                value={newSportCategory.description}
                                onChange={(e) => setNewSportCategory({ ...newSportCategory, description: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="text"
                                placeholder="Keyword"
                                value={newSportCategory.keyword}
                                onChange={(e) => setNewSportCategory({ ...newSportCategory, keyword: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <button
                                onClick={handleCreateSportCategory}
                                className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-200"
                            >
                                Add Sport Category
                            </button>
                        </div>
                    </div>

                    {/* Sport Categories List */}
                    {filteredSportCategories.length > 0 ? (
                        <ul className="space-y-4">
                            {filteredSportCategories.map((sportCategory) => (
                                <li 
                                    key={sportCategory.id}
                                    className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                                >
                                    {editingSportCategory?.id === sportCategory.id ? (
                                        // Edit Mode
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                value={editingSportCategory.name}
                                                onChange={(e) => setEditingSportCategory({ ...editingSportCategory, name: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <textarea
                                                value={editingSportCategory.description}
                                                onChange={(e) => setEditingSportCategory({ ...editingSportCategory, description: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="text"
                                                value={editingSportCategory.keyword}
                                                onChange={(e) => setEditingSportCategory({ ...editingSportCategory, keyword: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={handleUpdateSportCategory}
                                                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
                                                >
                                                    <SaveIcon className="mr-2" /> Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingSportCategory(null)}
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
                                                        onClick={() => setEditingSportCategory(sportCategory)}
                                                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                                                    >
                                                        <EditIcon />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteSportCategory(sportCategory.id)}
                                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                                                    >
                                                        <TrashIcon />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-2 space-y-2">
                                                <p><strong>ID:</strong> {sportCategory.id}</p>
                                                <p><strong>Name:</strong> {sportCategory.name}</p>
                                                <p><strong>Description:</strong> {sportCategory.description}</p>
                                                <p><strong>Keyword:</strong> {sportCategory.keyword}</p>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">No sport categories found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default SportCategoryList;