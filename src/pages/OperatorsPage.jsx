import React, { useState, useEffect } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import apiClient from '../api/axiosInstance';

function OperatorsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [operators, setOperators] = useState([]);
    const [editingOperator, setEditingOperator] = useState(null);
    const [newOperator, setNewOperator] = useState({
        name: '',
        short_code: '',
        supported_channels: []
    });

    const channelOptions = ['SMS', 'App', 'Web'];
    const baseUrl = '/admin/api/operators/';

    // Fetch operators on page load
    useEffect(() => {
        const fetchOperators = async () => {
            try {
                const response = await apiClient.get(baseUrl);
                setOperators(response.data);
            } catch (error) {
                console.error('Error fetching operators:', error);
            }
        };

        fetchOperators();
    }, []);

    const filteredOperators = operators.filter((operator) =>
        operator?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateOperator = async () => {
        if (!newOperator.name || !newOperator.short_code) {
            alert('Please fill in required fields (Name and Short Code)');
            return;
        }

        try {
            const response = await apiClient.post(baseUrl, newOperator);
            setOperators([...operators, response.data]);
            setNewOperator({
                name: '',
                short_code: '',
                supported_channels: []
            });
        } catch (error) {
            console.error('Error creating operator:', error);
            alert('Failed to create operator');
        }
    };

    const handleUpdateOperator = async () => {
        if (!editingOperator.name || !editingOperator.short_code) {
            alert('Please fill in required fields (Name and Short Code)');
            return;
        }

        try {
            const response = await apiClient.put(`${baseUrl}${editingOperator.id}/`, editingOperator);
            setOperators(operators.map(op =>
                op.id === editingOperator.id ? response.data : op
            ));
            setEditingOperator(null);
        } catch (error) {
            console.error('Error updating operator:', error);
            alert('Failed to update operator');
        }
    };

    const handleDeleteOperator = async (id) => {
        try {
            await apiClient.delete(`${baseUrl}${id}/`);
            setOperators(operators.filter(op => op.id !== id));
            if (editingOperator?.id === id) {
                setEditingOperator(null);
            }
        } catch (error) {
            console.error('Error deleting operator:', error);
            alert('Failed to delete operator');
        }
    };

    const handleChannelChange = (channel, operatorState, setOperatorState) => {
        const currentChannels = operatorState.supported_channels || [];
        let updatedChannels;
        
        if (currentChannels.includes(channel)) {
            updatedChannels = currentChannels.filter(ch => ch !== channel);
        } else {
            updatedChannels = [...currentChannels, channel];
        }
        
        setOperatorState({
            ...operatorState,
            supported_channels: updatedChannels
        });
    };

    const columns = ['name', 'short_code', 'supported_channels'];

    const renderChannelCheckboxes = (operatorData, setOperatorData) => {
        return (
            <div className="flex gap-4">
                {channelOptions.map(channel => (
                    <label key={channel} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={(operatorData.supported_channels || []).includes(channel)}
                            onChange={() => handleChannelChange(channel, operatorData, setOperatorData)}
                            className="form-checkbox h-4 w-4 text-blue-500"
                        />
                        <span className="text-gray-300">{channel}</span>
                    </label>
                ))}
            </div>
        );
    };

    return (
        <div className="px-4 py-8">
            <div className="border-2 rounded-lg shadow-lg">
                <div className="flex justify-between items-center p-4 bg-gray-800 text-white rounded-t-lg">
                    <div className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="mr-2"
                            fill="currentColor"
                        >
                            <path d="M4 4h16v2H4zm0 4h16v2H4zm0 4h16v2H4zm0 4h16v2H4z" />
                        </svg>
                        <h1 className="text-xl font-bold">Operators Management</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Search Operators by Name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-1 bg-slate-900 text-gray-100 rounded border focus:outline-none focus:border-gray-100"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>

                <div className="p-6">
                    {/* New Operator Form */}
                    <div className="mb-8 p-4 rounded-lg">
                        <h2 className="flex items-center text-lg font-semibold mb-4">
                            <PlusIcon className="mr-2" />
                            Add New Operator
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Name *"
                                value={newOperator.name}
                                onChange={(e) => setNewOperator({ ...newOperator, name: e.target.value })}
                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="text"
                                placeholder="Short Code *"
                                value={newOperator.short_code}
                                onChange={(e) => setNewOperator({ ...newOperator, short_code: e.target.value })}
                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                            />
                            <div className="col-span-2">
                                <label className="block mb-2 text-gray-300">Supported Channels:</label>
                                {renderChannelCheckboxes(newOperator, setNewOperator)}
                            </div>
                            <div className="col-span-2">
                                <button
                                    onClick={handleCreateOperator}
                                    className="font-bold bg-black text-white px-4 py-2 rounded border-2 border-cyan-600 hover:bg-gray-300 hover:text-black transition duration-500"
                                >
                                    Add Operator
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Operators Table */}
                    <div className="overflow-x-auto border-2 rounded-lg">
                        {filteredOperators.length > 0 ? (
                            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-gray-700">
                                        <th className="px-4 py-3 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Name</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Short Code</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Supported Channels</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-600">
                                    {filteredOperators.map((operator) => (
                                        editingOperator?.id === operator.id ? (
                                            <tr key={operator.id} className="bg-gray-700">
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="text"
                                                        value={editingOperator.name}
                                                        onChange={(e) => setEditingOperator({ ...editingOperator, name: e.target.value })}
                                                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="text"
                                                        value={editingOperator.short_code}
                                                        onChange={(e) => setEditingOperator({ ...editingOperator, short_code: e.target.value })}
                                                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    {renderChannelCheckboxes(editingOperator, setEditingOperator)}
                                                </td>
                                                <td className="px-4 py-2 text-right whitespace-nowrap">
                                                    <button
                                                        onClick={handleUpdateOperator}
                                                        className="inline-flex items-center justify-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                                                    >
                                                        <SaveIcon size={16} className="mr-1" /> Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingOperator(null)}
                                                        className="inline-flex items-center justify-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                    >
                                                        <XIcon size={16} className="mr-1" /> Cancel
                                                    </button>
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr key={operator.id} className="hover:bg-gray-700">
                                                <td className="px-4 py-3 text-gray-300">{operator.name || 'N/A'}</td>
                                                <td className="px-4 py-3 text-gray-300">{operator.short_code || 'N/A'}</td>
                                                <td className="px-4 py-3 text-gray-300">
                                                    {(operator.supported_channels || []).length > 0 
                                                        ? operator.supported_channels.join(', ') 
                                                        : 'None'}
                                                </td>
                                                <td className="px-4 py-3 text-right whitespace-nowrap">
                                                    <button
                                                        onClick={() => setEditingOperator(operator)}
                                                        className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                                    >
                                                        <EditIcon size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteOperator(operator.id)}
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
                            <p className="text-center py-4 text-gray-500">No operators found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OperatorsPage;