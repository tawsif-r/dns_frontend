import React, { useState } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import axios from 'axios';

function BdjobsList({ bdjobs, setBdjobs }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingBdjob, setEditingBdjob] = useState(null);
    const [newBdjob, setNewBdjob] = useState({
        fcatid: '',
        icatid: '',
        name: ''
    });

    const baseUrl = 'http://192.168.3.37:8001/admin/api/bdjobs/';

    const filteredBdjobs = bdjobs.filter((bdjob) =>
        bdjob?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Create a new bdjob
    const handleCreateBdjob = async () => {
        if (!newBdjob.fcatid || !newBdjob.icatid || !newBdjob.name) {
            alert('Please fill in all required fields (FCatID, ICatID, and Name)');
            return;
        }

        try {
            const response = await axios.post(baseUrl, {
                fcatid: parseInt(newBdjob.fcatid),
                icatid: parseInt(newBdjob.icatid),
                name: newBdjob.name
            });
            setBdjobs([...bdjobs, response.data]);
            setNewBdjob({
                fcatid: '',
                icatid: '',
                name: ''
            });
        } catch (error) {
            console.error('Error creating bdjob:', error);
            alert('Failed to create bdjob');
        }
    };

    // Update an existing bdjob
    const handleUpdateBdjob = async () => {
        if (!editingBdjob.fcatid || !editingBdjob.icatid || !editingBdjob.name) {
            alert('Please fill in all required fields (FCatID, ICatID, and Name)');
            return;
        }

        try {
            const response = await axios.put(`${baseUrl}${editingBdjob.id}/`, {
                fcatid: parseInt(editingBdjob.fcatid),
                icatid: parseInt(editingBdjob.icatid),
                name: editingBdjob.name
            });
            setBdjobs(bdjobs.map(bdjob =>
                bdjob.id === editingBdjob.id ? response.data : bdjob
            ));
            setEditingBdjob(null);
        } catch (error) {
            console.error('Error updating bdjob:', error);
            alert('Failed to update bdjob');
        }
    };

    // Delete a bdjob
    const handleDeleteBdjob = async (id) => {
        try {
            await axios.delete(`${baseUrl}${id}/`);
            setBdjobs(bdjobs.filter(bdjob => bdjob.id !== id));
            if (editingBdjob?.id === id) {
                setEditingBdjob(null);
            }
        } catch (error) {
            console.error('Error deleting bdjob:', error);
            alert('Failed to delete bdjob');
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
                    <h2 className="text-lg font-semibold">BD Jobs</h2>
                </div>
                <input
                    type="text"
                    placeholder="Search BD Jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="ml-4 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>

            {isOpen && (
                <div className="p-4 bg-gray-900 max-h-96 overflow-y-auto">
                    {/* New Bdjob Form */}
                    <div className="mb-6">
                        <h3 className="flex items-center text-purple-400 mb-2">
                            <PlusIcon className="mr-2" />
                            Create New BD Job
                        </h3>
                        <div className="space-y-2">
                            <input
                                type="number"
                                placeholder="FCatID"
                                value={newBdjob.fcatid}
                                onChange={(e) => setNewBdjob({ ...newBdjob, fcatid: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="number"
                                placeholder="ICatID"
                                value={newBdjob.icatid}
                                onChange={(e) => setNewBdjob({ ...newBdjob, icatid: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="text"
                                placeholder="Name"
                                value={newBdjob.name}
                                maxLength={100}
                                onChange={(e) => setNewBdjob({ ...newBdjob, name: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <button
                                onClick={handleCreateBdjob}
                                className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-200"
                            >
                                Add BD Job
                            </button>
                        </div>
                    </div>

                    {/* Bdjobs List */}
                    {filteredBdjobs.length > 0 ? (
                        <ul className="space-y-4">
                            {filteredBdjobs.map((bdjob) => (
                                <li 
                                    key={bdjob.id}
                                    className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                                >
                                    {editingBdjob?.id === bdjob.id ? (
                                        // Edit Mode
                                        <div className="space-y-2">
                                            <input
                                                type="number"
                                                value={editingBdjob.fcatid}
                                                onChange={(e) => setEditingBdjob({ ...editingBdjob, fcatid: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="number"
                                                value={editingBdjob.icatid}
                                                onChange={(e) => setEditingBdjob({ ...editingBdjob, icatid: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="text"
                                                value={editingBdjob.name}
                                                maxLength={100}
                                                onChange={(e) => setEditingBdjob({ ...editingBdjob, name: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={handleUpdateBdjob}
                                                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
                                                >
                                                    <SaveIcon className="mr-2" /> Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingBdjob(null)}
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
                                                        onClick={() => setEditingBdjob(bdjob)}
                                                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                                                    >
                                                        <EditIcon />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteBdjob(bdjob.id)}
                                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                                                    >
                                                        <TrashIcon />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-2 space-y-2">
                                                <p><strong>ID:</strong> {bdjob.id}</p>
                                                <p><strong>FCatID:</strong> {bdjob.fcatid}</p>
                                                <p><strong>ICatID:</strong> {bdjob.icatid}</p>
                                                <p><strong>Name:</strong> {bdjob.name}</p>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">No BD jobs found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default BdjobsList;