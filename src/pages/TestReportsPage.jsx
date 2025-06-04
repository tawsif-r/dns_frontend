import React, { useState, useEffect } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon, FilterIcon } from 'lucide-react';
import apiClient from '../api/axiosInstance';
import axios from 'axios';

function ReportsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [reports, setReports] = useState([]);
    const [editingReport, setEditingReport] = useState(null);
    const [loading, setLoading] = useState(false);
    
    // Filter states
    const [filters, setFilters] = useState({
        operator: '',
        subscriber: '',
        category: '',
        subscription_plan: '',
        month_date: new Date().toISOString().slice(0, 7) // Default to current month (YYYY-MM)
    });
    
    const [newReport, setNewReport] = useState({
        subscriber: '',
        subscription_plan: '',
        category: '',
        operator: '',
        created_at: '',
        updated_at: '',
        total_charge: '0.00'
    });

    const baseUrl = '/admin/api/reports/';

    // Fetch reports with filters
    const fetchReports = async (filtersToApply = filters) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            
            // Add filter params only if they have values
            if (filtersToApply.operator) params.append('operator', filtersToApply.operator);
            if (filtersToApply.subscriber) params.append('subscriber', filtersToApply.subscriber);
            if (filtersToApply.category) params.append('category', filtersToApply.category);
            if (filtersToApply.subscription_plan) params.append('subscription_plan', filtersToApply.subscription_plan);
            if (filtersToApply.month_date) params.append('month_date', filtersToApply.month_date);
            
            const response = await apiClient.get(`${baseUrl}?${params.toString()}`);
            console.log("Fetch reports is fired")
            setReports(response.data);
        } catch (error) {
            console.error('Error fetching reports:', error);
            setReports([]);
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchReports();
    }, []);

    // Apply filters
    const handleFilterChange = (filterName, value) => {
        const newFilters = { ...filters, [filterName]: value };
        setFilters(newFilters);
        fetchReports(newFilters);
    };

    // Clear all filters
    const clearFilters = () => {
        const clearedFilters = {
            operator: '',
            subscriber: '',
            category: '',
            subscription_plan: '',
            month_date: new Date().toISOString().slice(0, 7)
        };
        setFilters(clearedFilters);
        fetchReports(clearedFilters);
    };

    const handleCreateReport = async () => {
        if (!newReport.subscriber || !newReport.subscription_plan) {
            alert('Please fill in required fields (Subscriber, Subscription Plan)');
            return;
        }

        try {
            const response = await apiClient.post(baseUrl, newReport);
            setNewReport({
                subscriber: '',
                subscription_plan: '',
                category: '',
                operator: '',
                created_at: '',
                updated_at: '',
                total_charge: '0.00'
            });
            // Refresh the current page
            fetchReports();
        } catch (error) {
            console.error('Error creating report:', error);
            alert('Failed to create report');
        }
    };

    const handleUpdateReport = async () => {
        if (!editingReport.subscriber || !editingReport.subscription_plan) {
            alert('Please fill in required fields (Subscriber, Subscription Plan)');
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
            if (editingReport?.id === id) {
                setEditingReport(null);
            }
            // Refresh the current page after deletion
            fetchReports();
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
                </div>

                <div className="p-6">
                    {/* Filters Section */}
                    <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                        <h2 className="flex items-center text-lg font-semibold mb-4 text-white">
                            <FilterIcon className="mr-2" />
                            Filters
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            <input
                                type="number"
                                placeholder="Operator ID"
                                value={filters.operator}
                                onChange={(e) => handleFilterChange('operator', e.target.value)}
                                className="w-full bg-black border rounded px-3 py-2 text-white focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="number"
                                placeholder="Subscriber ID"
                                value={filters.subscriber}
                                onChange={(e) => handleFilterChange('subscriber', e.target.value)}
                                className="w-full bg-black border rounded px-3 py-2 text-white focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="number"
                                placeholder="Category ID"
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                className="w-full bg-black border rounded px-3 py-2 text-white focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="number"
                                placeholder="Subscription Plan"
                                value={filters.subscription_plan}
                                onChange={(e) => handleFilterChange('subscription_plan', e.target.value)}
                                className="w-full bg-black border rounded px-3 py-2 text-white focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="month"
                                placeholder="Month"
                                value={filters.month_date}
                                onChange={(e) => handleFilterChange('month_date', e.target.value)}
                                className="w-full bg-black border rounded px-3 py-2 text-white focus:outline-none focus:border-blue-200"
                            />
                            <button
                                onClick={clearFilters}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>

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
                                onChange={(e) => setNewReport({ ...newReport, subscriber: parseInt(e.target.value) })}
                                className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="number"
                                placeholder="Subscription plan *"
                                value={newReport.subscription_plan}
                                onChange={(e) => setNewReport({ ...newReport, subscription_plan: parseInt(e.target.value) })}
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

                    {/* Loading Indicator */}
                    {loading && (
                        <div className="text-center py-4">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            <p className="mt-2 text-gray-500">Loading reports...</p>
                        </div>
                    )}

                    {/* Reports Table */}
                    <div className="overflow-x-auto border-2 rounded-lg">
                        {reports.length > 0 ? (
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
                                    {reports.map((report) => (
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
                            <p className="text-center text-gray-500 py-8">
                                {loading ? 'Loading...' : 'No reports found'}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportsPage;