import React, { useState, useEffect } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import apiClient from '../api/axiosInstance';
import axios from 'axios';

function GenericReportsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [reports, setReports] = useState([]);
    const [editingReport, setEditingReport] = useState(null);
    const [newReport, setNewReport] = useState({
        subscriber: '',
        subscription_plan: '',
        category: '',
        operator: '',
        created_at:'',
        updated_at:'',
        total_charge: '0.00'
    });

    const baseUrl = '/admin/api/reports/'; // Adjust the API endpoint as needed

    // Fetch reports on page load
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await apiClient.get(baseUrl);
                setReports(response.data);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, []);

    const filteredReports = reports.filter((report) =>
        report?.subscriber === parseInt(searchTerm) || !searchTerm
    );

    const handleCreateReport = async () => {
        if (!newReport.subscriber || !newReport.period_start || !newReport.period_end) {
            alert('Please fill in required fields (Subscriber, Period Start, Period End)');
            return;
        }

        try {
            const response = await apiClient.post(baseUrl, newReport);
            setReports([...reports, response.data]);
            setNewReport({
                subscriber: '',
                subscription_plan: '',
                category: '',
                operator: '',
                created_at: '',
                updated_at: '',
                total_charge: '0.00'
            });
        } catch (error) {
            console.error('Error creating report:', error);
            alert('Failed to create report');
        }
    };

    const handleUpdateReport = async () => {
        if (!editingReport.subscriber || !editingReport.period_start || !editingReport.period_end) {
            alert('Please fill in required fields (Subscriber, Period Start, Period End)');
            return;
        }

        try {
            const response = await apiClient.put(`${baseUrl}${editingReport.id}/`, editingReport);
            setReports(reports.map(rep =>
                rep.id === editingReport.id ? response.data : rep
            ));
            setEditingReport(null);
        } catch (error) {
            console.error('Error updating report:', error);
            alert('Failed to update report');
        }
    };

    const handleDeleteReport = async (id) => {
        try {
            await axios.delete(`${baseUrl}${id}/`);
            setReports(reports.filter(rep => rep.id !== id));
            if (editingReport?.id === id) {
                setEditingReport(null);
            }
        } catch (error) {
            console.error('Error deleting report:', error);
            alert('Failed to delete report');
        }
    };

    const columns = Object.keys(newReport);

    return (
        <div className="px-4 py-8">
            <div className="border-2 rounded-lg shadow-lg">
                <div className="flex justify-between items-center p-4 rounded-t-lg">
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
                        <h1 className="text-xl font-bold">Reports Management</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Search Reports by Subscriber..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-1 bg-slate-900 text-gray-100 rounded border focus:outline-none focus:border-gray-100"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>

                <div className="p-6">
                    {/* New Report Form */}
                    <div className="mb-8 p-4 rounded-lg">
                        <h2 className="flex items-center text-lg font-semibold mb-4">
                            <PlusIcon className="mr-2" />
                            Add New Report
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="number"
                                placeholder="Subscriber *"
                                value={newReport.subscriber}
                                onChange={(e) => setNewReport({ ...newReport, subscriber: e.target.value })}
                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="number"
                                placeholder="Subscription plan *"
                                value={newReport.subscription_plan}
                                onChange={(e) => setNewReport({ ...newReport, subscription_plan: e.target.value })}
                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                            />
                             <input
                                type="number"
                                placeholder="Category *"
                                value={newReport.category}
                                onChange={(e) => setNewReport({ ...newReport, category: parseInt(e.target.value) })}
                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="number"
                                placeholder="Operator *"
                                value={newReport.operator}
                                onChange={(e) => setNewReport({ ...newReport, operator: parseInt(e.target.value)})}
                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="number"
                                step="0.01"
                                placeholder="Total Charge"
                                value={newReport.total_charge}
                                onChange={(e) => setNewReport({ ...newReport, total_charge: e.target.value })}
                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                            />
                            <button
                                onClick={handleCreateReport}
                                className="font-bold bg-black text-white px-4 py-2 rounded border-2 border-cyan-600 hover:bg-gray-300 hover:text-black transition duration-500"
                            >
                                Add Report
                            </button>
                        </div>
                    </div>

                    {/* Reports Table */}
                    <div className="overflow-x-auto border-2 rounded-lg">
                        {filteredReports.length > 0 ? (
                            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-gray-700">
                                        {columns.map((column) => (
                                            <th key={column} className="px-4 py-3 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">
                                                {column.charAt(0).toUpperCase() + column.slice(1).replace('_', ' ')}
                                            </th>
                                        ))}
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-600">
                                    {filteredReports.map((report) => (
                                        editingReport?.id === report.id ? (
                                            <tr key={report.id} className="bg-gray-700">
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="number"
                                                        value={editingReport.subscriber}
                                                        onChange={(e) => setEditingReport({ ...editingReport, subscriber: parseInt(e.target.value) || 0 })}
                                                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </td>

                                                <td className="px-4 py-2">
                                                    <input
                                                        type="number"
                                                        value={editingReport.subscription_plan}
                                                        onChange={(e) => setEditingReport({ ...editingReport, subscription_plan: parseInt(e.target.value) || 0 })}
                                                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </td>
                
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="number"
                                                        value={editingReport.category}
                                                        onChange={(e) => setEditingReport({ ...editingReport, category: parseInt(e.target.value) || 0 })}
                                                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="number"
                                                        value={editingReport.operator}
                                                        onChange={(e) => setEditingReport({ ...editingReport, operator: parseInt(e.target.value) || 0 })}
                                                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="datetime-local"
                                                        value={editingReport.created_at}
                                                        onChange={(e) => setEditingReport({ ...editingReport, created_at: e.target.value })}
                                                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="datetime-local"
                                                        value={editingReport.updated_at}
                                                        onChange={(e) => setEditingReport({ ...editingReport, updated_at: e.target.value })}
                                                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </td>
                                                
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={editingReport.total_charge}
                                                        onChange={(e) => setEditingReport({ ...editingReport, total_charge: e.target.value })}
                                                        className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 text-right whitespace-nowrap">
                                                    <button
                                                        onClick={handleUpdateReport}
                                                        className="inline-flex items-center justify-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                                                    >
                                                        <SaveIcon size={16} className="mr-1" /> Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingReport(null)}
                                                        className="inline-flex items-center justify-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                    >
                                                        <XIcon size={16} className="mr-1" /> Cancel
                                                    </button>
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr key={report.id} className="hover:bg-gray-700">
                                                <td className="px-4 py-3 text-gray-300">{report.subscriber || 'N/A'}</td>
                                                <td className="px-4 py-3 text-gray-300">{report.subscription_plan || 'N/A'}</td>
                                                <td className="px-4 py-3 text-gray-300">{report.category || 'N/A'}</td>
                                                <td className="px-4 py-3 text-gray-300">{report.operator}</td>
                                                <td className="px-4 py-3 text-gray-300">{report.created_at}</td>
                                                <td className="px-4 py-3 text-gray-300">{report.updated_at}</td>
                                                <td className="px-4 py-3 text-gray-300">{report.total_charge}</td>
                                                <td className="px-4 py-3 text-right whitespace-nowrap">
                                                    <button
                                                        onClick={() => setEditingReport(report)}
                                                        className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                                    >
                                                        <EditIcon size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteReport(report.id)}
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
                            <p className="text-center text-gray-500">No reports found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>


    );
}

export default GenericReportsPage;