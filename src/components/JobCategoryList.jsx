import React, { useState } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import axios from 'axios';

function JobCategoryList({ jobCategories, setJobCategories }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingJobCategory, setEditingJobCategory] = useState(null);
    const [newJobCategory, setNewJobCategory] = useState({
        name: '',
        description: '',
        keyword: ''
    });

    const baseUrl = 'http://192.168.3.37:8001/admin/api/jobCats/';

    const filteredJobCategories = jobCategories.filter((jobCategory) =>
        jobCategory?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jobCategory?.keyword?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Create a new job category
    const handleCreateJobCategory = async () => {
        if (!newJobCategory.name || !newJobCategory.keyword) {
            alert('Please fill in required fields (Name and Keyword)');
            return;
        }

        try {
            const response = await axios.post(baseUrl, newJobCategory);
            setJobCategories([...jobCategories, response.data]);
            setNewJobCategory({
                name: '',
                description: '',
                keyword: ''
            });
        } catch (error) {
            console.error('Error creating job category:', error);
            alert('Failed to create job category');
        }
    };

    // Update an existing job category
    const handleUpdateJobCategory = async () => {
        if (!editingJobCategory.name || !editingJobCategory.keyword) {
            alert('Please fill in required fields (Name and Keyword)');
            return;
        }

        try {
            const response = await axios.put(`${baseUrl}${editingJobCategory.id}/`, editingJobCategory);
            setJobCategories(jobCategories.map(jobCategory =>
                jobCategory.id === editingJobCategory.id ? response.data : jobCategory
            ));
            setEditingJobCategory(null);
        } catch (error) {
            console.error('Error updating job category:', error);
            alert('Failed to update job category');
        }
    };

    // Delete a job category
    const handleDeleteJobCategory = async (id) => {
        try {
            await axios.delete(`${baseUrl}${id}/`);
            setJobCategories(jobCategories.filter(jobCategory => jobCategory.id !== id));
            if (editingJobCategory?.id === id) {
                setEditingJobCategory(null);
            }
        } catch (error) {
            console.error('Error deleting job category:', error);
            alert('Failed to delete job category');
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
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 17H5V5h14v14zm-7-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
                    </svg>
                    <h2 className="text-lg font-semibold">Job Categories</h2>
                </div>
                <input
                    type="text"
                    placeholder="Search Job Categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="ml-4 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>

            {isOpen && (
                <div className="p-4 bg-gray-900 max-h-96 overflow-y-auto">
                    {/* New Job Category Form */}
                    <div className="mb-6">
                        <h3 className="flex items-center text-purple-400 mb-2">
                            <PlusIcon className="mr-2" />
                            Create New Job Category
                        </h3>
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Name"
                                value={newJobCategory.name}
                                maxLength={200}
                                onChange={(e) => setNewJobCategory({ ...newJobCategory, name: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <textarea
                                placeholder="Description"
                                value={newJobCategory.description}
                                onChange={(e) => setNewJobCategory({ ...newJobCategory, description: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="text"
                                placeholder="Keyword"
                                value={newJobCategory.keyword}
                                onChange={(e) => setNewJobCategory({ ...newJobCategory, keyword: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <button
                                onClick={handleCreateJobCategory}
                                className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-200"
                            >
                                Add Job Category
                            </button>
                        </div>
                    </div>

                    {/* Job Categories List */}
                    {filteredJobCategories.length > 0 ? (
                        <ul className="space-y-4">
                            {filteredJobCategories.map((jobCategory) => (
                                <li 
                                    key={jobCategory.id}
                                    className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                                >
                                    {editingJobCategory?.id === jobCategory.id ? (
                                        // Edit Mode
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                value={editingJobCategory.name}
                                                maxLength={200}
                                                onChange={(e) => setEditingJobCategory({ ...editingJobCategory, name: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <textarea
                                                value={editingJobCategory.description}
                                                onChange={(e) => setEditingJobCategory({ ...editingJobCategory, description: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2Enumerator rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="text"
                                                value={editingJobCategory.keyword}
                                                onChange={(e) => setEditingJobCategory({ ...editingJobCategory, keyword: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={handleUpdateJobCategory}
                                                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
                                                >
                                                    <SaveIcon className="mr-2" /> Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingJobCategory(null)}
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
                                                        onClick={() => setEditingJobCategory(jobCategory)}
                                                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                                                    >
                                                        <EditIcon />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteJobCategory(jobCategory.id)}
                                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                                                    >
                                                        <TrashIcon />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-2 space-y-2">
                                                <p><strong>ID:</strong> {jobCategory.id}</p>
                                                <p><strong>Name:</strong> {jobCategory.name}</p>
                                                <p><strong>Description:</strong> {jobCategory.description}</p>
                                                <p><strong>Keyword:</strong> {jobCategory.keyword}</p>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">No job categories found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default JobCategoryList;