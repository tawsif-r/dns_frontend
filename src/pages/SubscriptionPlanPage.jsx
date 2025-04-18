import React, { useState, useEffect } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import Nav from '../components/ui/Nav'; // Assuming you have a Nav component
import axios from 'axios';

function SubscriptionPlanPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [plans, setPlans] = useState([]);
    const [editingPlan, setEditingPlan] = useState(null);
    const [newPlan, setNewPlan] = useState({
        name: '',
        duration_days: '',
        price: '',
        process: '',
        description: ''
    });

    const baseUrl = 'http://10.0.0.27:8000/admin/api/subscriptionplans/';

    // Fetch subscription plans on page load
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get(baseUrl);
                setPlans(response.data);
            } catch (error) {
                console.error('Error fetching subscription plans:', error);
            }
        };

        fetchPlans();
    }, []);

    const filteredPlans = plans.filter((plan) =>
        plan?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreatePlan = async () => {
        if (!newPlan.name || !newPlan.duration_days || !newPlan.price) {
            alert('Please fill in required fields (Name, Duration Days, and Price)');
            return;
        }

        try {
            const response = await axios.post(baseUrl, {
                ...newPlan,
                duration_days: parseInt(newPlan.duration_days),
                price: parseFloat(newPlan.price)
            });
            setPlans([...plans, response.data]);
            setNewPlan({
                name: '',
                duration_days: '',
                price: '',
                process: '',
                description: ''
            });
        } catch (error) {
            console.error('Error creating subscription plan:', error);
            alert('Failed to create subscription plan');
        }
    };

    const handleUpdatePlan = async () => {
        if (!editingPlan.name || !editingPlan.duration_days || !editingPlan.price) {
            alert('Please fill in required fields (Name, Duration Days, and Price)');
            return;
        }

        try {
            const response = await axios.put(`${baseUrl}${editingPlan.id}/`, {
                ...editingPlan,
                duration_days: parseInt(editingPlan.duration_days),
                price: parseFloat(editingPlan.price)
            });
            setPlans(plans.map(plan =>
                plan.id === editingPlan.id ? response.data : plan
            ));
            setEditingPlan(null);
        } catch (error) {
            console.error('Error updating subscription plan:', error);
            alert('Failed to update subscription plan');
        }
    };

    const handleDeletePlan = async (id) => {
        try {
            await axios.delete(`${baseUrl}${id}/`);
            setPlans(plans.filter(plan => plan.id !== id));
            if (editingPlan?.id === id) {
                setEditingPlan(null);
            }
        } catch (error) {
            console.error('Error deleting subscription plan:', error);
            alert('Failed to delete subscription plan');
        }
    };

    const columns = Object.keys(newPlan);

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
                                <path d="M19 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                            </svg>
                            <h1 className="text-xl font-bold">Subscription Plans Management</h1>
                        </div>
                        <input
                            type="text"
                            placeholder="Search Plans by Name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-3 py-1 bg-slate-900 text-gray-100 rounded border focus:outline-none focus:border-gray-100"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    <div className="p-6">
                        {/* New Plan Form */}
                        <div className="mb-8 p-4 rounded-lg">
                            <h2 className="flex items-center text-lg font-semibold mb-4">
                                <PlusIcon className="mr-2" />
                                Add New Subscription Plan
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Name *"
                                    value={newPlan.name}
                                    onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                                    className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                />
                                <input
                                    type="number"
                                    placeholder="Duration (days) *"
                                    value={newPlan.duration_days}
                                    onChange={(e) => setNewPlan({ ...newPlan, duration_days: e.target.value })}
                                    className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                    min="1"
                                />
                                <input
                                    type="number"
                                    placeholder="Price *"
                                    value={newPlan.price}
                                    onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                                    className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                    step="0.01"
                                    min="0"
                                />
                                <input
                                    type="text"
                                    placeholder="Process"
                                    value={newPlan.process}
                                    onChange={(e) => setNewPlan({ ...newPlan, process: e.target.value })}
                                    className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                />
                                <textarea
                                    placeholder="Description"
                                    value={newPlan.description}
                                    onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                                    className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200 col-span-2"
                                    rows="3"
                                />
                                <button
                                    onClick={handleCreatePlan}
                                    className="font-bold bg-black text-white px-4 py-2 rounded border-2 border-cyan-600 hover:bg-gray-300 hover:text-black transition duration-500 col-span-2"
                                >
                                    Add Subscription Plan
                                </button>
                            </div>
                        </div>

                        {/* Plans Table */}
                        <div className="overflow-x-auto border-2 rounded-lg">
                            {filteredPlans.length > 0 ? (
                                <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                                    <thead>
                                        <tr className="bg-gray-700">
                                            {columns.map((column) => (
                                                <th key={column} className="px-4 py-3 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">
                                                    {column.split('_').join(' ').charAt(0).toUpperCase() + column.split('_').join(' ').slice(1)}
                                                </th>
                                            ))}
                                            <th className="px-4 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-600">
                                        {filteredPlans.map((plan) => (
                                            editingPlan?.id === plan.id ? (
                                                <tr key={plan.id} className="bg-gray-700">
                                                    <td className="px-4 py-2">
                                                        <input
                                                            type="text"
                                                            value={editingPlan.name}
                                                            onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                                                            className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <input
                                                            type="number"
                                                            value={editingPlan.duration_days}
                                                            onChange={(e) => setEditingPlan({ ...editingPlan, duration_days: e.target.value })}
                                                            className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                            min="1"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <input
                                                            type="number"
                                                            value={editingPlan.price}
                                                            onChange={(e) => setEditingPlan({ ...editingPlan, price: e.target.value })}
                                                            className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                            step="0.01"
                                                            min="0"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <input
                                                            type="text"
                                                            value={editingPlan.process}
                                                            onChange={(e) => setEditingPlan({ ...editingPlan, process: e.target.value })}
                                                            className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <textarea
                                                            value={editingPlan.description}
                                                            onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                                                            className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                            rows="2"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 text-right whitespace-nowrap">
                                                        <button
                                                            onClick={handleUpdatePlan}
                                                            className="inline-flex items-center justify-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                                                        >
                                                            <SaveIcon size={16} className="mr-1" /> Save
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingPlan(null)}
                                                            className="inline-flex items-center justify-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                        >
                                                            <XIcon size={16} className="mr-1" /> Cancel
                                                        </button>
                                                    </td>
                                                </tr>
                                            ) : (
                                                <tr key={plan.id} className="hover:bg-gray-700">
                                                    <td className="px-4 py-3 text-gray-300">{plan.name || 'N/A'}</td>
                                                    <td className="px-4 py-3 text-gray-300">{plan.duration_days || 'N/A'}</td>
                                                    <td className="px-4 py-3 text-gray-300">${parseFloat(plan.price).toFixed(2) || 'N/A'}</td>
                                                    <td className="px-4 py-3 text-gray-300">{plan.process || 'N/A'}</td>
                                                    <td className="px-4 py-3 text-gray-300">{plan.description || 'N/A'}</td>
                                                    <td className="px-4 py-3 text-right whitespace-nowrap">
                                                        <button
                                                            onClick={() => setEditingPlan(plan)}
                                                            className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                                        >
                                                            <EditIcon size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeletePlan(plan.id)}
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
                                <p className="text-center text-gray-500">No subscription plans found</p>
                            )}
                        </div>
                    </div>
                </div>

        </div>
    );
}

export default SubscriptionPlanPage;