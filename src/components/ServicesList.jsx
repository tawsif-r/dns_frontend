import React, { useState } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import axios from 'axios';

function ServicesList({ services, setServices }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingService, setEditingService] = useState(null);
    const [newService, setNewService] = useState({
        id: '',
        name: '',
        description: '',
        active: '',
    });

    const baseUrl = 'http://192.168.3.37:8001/admin/api/services/';  // Adjust this URL as needed

    // Filtered services based on search term
    const filteredServices = services.filter((service) =>
        service?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Create a new service
    const handleCreateService = async () => {
        if (!newService.name) {
            alert('Please fill in required fields');
            return;
        }

        try {
            const response = await axios.post(baseUrl, newService);
            setServices([...services, response.data]);
            setNewService({
                id: '',
                name: '',
                description: '',
                active: '',
            });
        } catch (error) {
            console.error('Error creating service:', error);
            alert('Failed to create service');
        }
    };

    // Update an existing service
    const handleUpdateService = async () => {
        if (!editingService.name) {
            alert('Please fill in required fields');
            return;
        }

        try {
            const response = await axios.put(`${baseUrl}${editingService.id}/`, editingService);
            setServices(services.map(service =>
                service.id === editingService.id ? response.data : service
            ));
            setEditingService(null);
        } catch (error) {
            console.error('Error updating service:', error);
            alert('Failed to update service');
        }
    };

    // Delete a service
    const handleDeleteService = async (id) => {
        try {
            await axios.delete(`${baseUrl}${id}/`);
            setServices(services.filter(service => service.id !== id));
            if (editingService?.id === id) {
                setEditingService(null);
            }
        } catch (error) {
            console.error('Error deleting service:', error);
            alert('Failed to delete service');
        }
    };

    return (
        <div className="dashboard-card bg-gray-900 text-white rounded-lg shadow-lg">
            <div
                className="card-header flex justify-between items-center p-4 bg-emerald-900 hover:bg-emerald-700 rounded-t-lg cursor-pointer"
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
                        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 16H5V5h2v3h10V5h2v14z" />
                    </svg>
                    <h2 className="text-lg font-semibold">Services</h2>
                </div>
                <input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="ml-4 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>

            {isOpen && (
                <div className="p-4 bg-gray-900 max-h-96 overflow-y-auto">
                    {/* New Service Form */}
                    <div className="mb-6">
                        <h3 className="flex items-center text-emerald-400 mb-2">
                            <PlusIcon className="mr-2" />
                            Create New Service
                        </h3>
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Name"
                                value={newService.name}
                                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                                className="w-full border border-emerald-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-emerald-400"
                            />
                            <textarea
                                placeholder="Description"
                                value={newService.description}
                                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                                className="w-full border border-emerald-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-emerald-400"
                            />
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={newService.active}
                                    onChange={(e) => setNewService({ ...newService, active: e.target.checked })}
                                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                />
                                <label className="text-white">Active</label>
                            </div>
                            <button
                                onClick={handleCreateService}
                                className="w-full bg-emerald-600 text-white p-2 rounded hover:bg-emerald-700 transition duration-200"
                            >
                                Add Service
                            </button>
                        </div>

                    </div>

                    {/* Services List */}
                    {filteredServices.length > 0 ? (
                        <ul className="space-y-4">
                            {filteredServices.map((service) => (
                                <li
                                    key={service.id}
                                    className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                                >
                                    {editingService?.id === service.id ? (
                                        // Edit Mode
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                value={editingService.name}
                                                onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                                                className="w-full border border-emerald-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-emerald-400"
                                            />
                                            <textarea
                                                value={editingService.description}
                                                onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                                                className="w-full border border-emerald-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-emerald-400"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    checked={editingService.active}
                                                    onChange={(e) => setEditingService({ ...editingService, active: e.target.checked })}
                                                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                                />
                                                <label className="text-white">Active</label>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={handleUpdateService}
                                                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
                                                >
                                                    <SaveIcon className="mr-2" /> Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingService(null)}
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
                                                        onClick={() => setEditingService(service)}
                                                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                                                    >
                                                        <EditIcon />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteService(service.id)}
                                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                                                    >
                                                        <TrashIcon />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-2 space-y-2">
                                                <p><strong>Service ID:</strong> {service.id}</p>
                                                <p><strong>Name:</strong> {service.name}</p>
                                                <p><strong>Description:</strong> {service.description}</p>
                                                <p><strong>Active:</strong> {service.active ? 'Yes' : 'No'}</p>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">No services match your search.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default ServicesList;