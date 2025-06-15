import React, { useState, useEffect } from 'react';
import { TrashIcon, FilterIcon, SearchIcon } from 'lucide-react';
import apiClient from '../api/axiosInstance';
import axios from 'axios';

function TestReportsPage() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // Filter states
    const [filters, setFilters] = useState({
        subscriber: '',
        shortcode: '',
        operator: '',
        service: '',
        keyword: '',
        subscription_plan: '',
        category: ''
    });

    const baseUrl = '/admin/api/reports/';

    // Fetch reports with backend filtering
    const fetchReports = async (searchFilters = filters) => {
        setLoading(true);
        try {
            // Build query parameters object, only including non-empty values
            const params = {};
            Object.keys(searchFilters).forEach(key => {
                if (searchFilters[key] && searchFilters[key].trim() !== '') {
                    params[key] = searchFilters[key].trim();
                }
            });

            console.log("Fetching reports with params:", params);
            
            const response = await apiClient.get(baseUrl, { params });
            setReports(response.data);
            setHasSearched(true);
        } catch (error) {
            console.error('Error fetching reports:', error);
            setReports([]);
        } finally {
            setLoading(false);
        }
    };

    // Handle filter changes
    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    // Handle search button click
    const handleSearch = () => {
        fetchReports(filters);
    };

    // Clear all filters and reset results
    const clearFilters = () => {
        const clearedFilters = {
            subscriber: '',
            shortcode: '',
            operator: '',
            service: '',
            keyword: '',
            subscription_plan: '',
            category: ''
        };
        setFilters(clearedFilters);
        setReports([]);
        setHasSearched(false);
    };

    // Handle Enter key press in filter inputs
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Calculate total charge
    const totalCharge = reports.reduce((sum, report) => {
        const charge = parseFloat(report.total_charge);
        return sum + (isNaN(charge) ? 0 : charge);
    }, 0);

    const handleDeleteReport = async (id) => {
        try {
            await axios.delete(`${baseUrl}${id}/`);
            // Refresh the reports after deletion with current filters
            fetchReports();
        } catch (error) {
            console.error('Error deleting report:', error);
            alert('Failed to delete report');
        }
    };

    const columns = [
        'subscriber name',
        'message count',
        'subscription plan',
        'category name',
        'operator',
        'created at',
        'updated at',
        'charge'
    ];

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
                    {/* Search Instructions */}
                    {!hasSearched && (
                        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-blue-700 text-sm">
                                Enter your search criteria in the filters below and click "Search Reports" to fetch data from the server.
                            </p>
                        </div>
                    )}

                    {/* Filters Section */}
                    <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                        <h2 className="flex items-center text-lg font-semibold mb-4 text-white">
                            <FilterIcon className="mr-2" />
                            Search Filters
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Subscriber ID"
                                value={filters.subscriber}
                                onChange={(e) => handleFilterChange('subscriber', e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full bg-black border rounded px-3 py-2 text-white focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="text"
                                placeholder="Short Code"
                                value={filters.shortcode}
                                onChange={(e) => handleFilterChange('shortcode', e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full bg-black border rounded px-3 py-2 text-white focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="text"
                                placeholder="Operator ID"
                                value={filters.operator}
                                onChange={(e) => handleFilterChange('operator', e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full bg-black border rounded px-3 py-2 text-white focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="text"
                                placeholder="Service"
                                value={filters.service}
                                onChange={(e) => handleFilterChange('service', e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full bg-black border rounded px-3 py-2 text-white focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="text"
                                placeholder="Keyword"
                                value={filters.keyword}
                                onChange={(e) => handleFilterChange('keyword', e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full bg-black border rounded px-3 py-2 text-white focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="text"
                                placeholder="Subscription Plan ID"
                                value={filters.subscription_plan}
                                onChange={(e) => handleFilterChange('subscription_plan', e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full bg-black border rounded px-3 py-2 text-white focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="text"
                                placeholder="Category ID"
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full bg-black border rounded px-3 py-2 text-white focus:outline-none focus:border-blue-200"
                            />
                        </div>
                        
                        <div className="flex gap-4">
                            <button
                                onClick={handleSearch}
                                disabled={loading}
                                className="flex items-center bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                            >
                                <SearchIcon className="mr-2" size={16} />
                                {loading ? 'Searching...' : 'Search Reports'}
                            </button>
                            <button
                                onClick={clearFilters}
                                disabled={loading}
                                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200 disabled:opacity-50"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>

                    {/* Loading Indicator */}
                    {loading && (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            <p className="mt-2 text-gray-500">Searching reports...</p>
                        </div>
                    )}

                    {/* Reports Table */}
                    {hasSearched && !loading && (
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
                                            <tr key={report.id} className="hover:bg-gray-700">
                                                <td className="px-4 py-3 text-gray-300">{report.subscriber_name || 'N/A'}</td>
                                                <td className="px-4 py-3 text-gray-300">{report.subscriber_message_count || 0}</td>
                                                <td className="px-4 py-3 text-gray-300">{report.subscription_plan_name || 'N/A'}</td>
                                                <td className="px-4 py-3 text-gray-300">{report.category_name || 'N/A'}</td>
                                                <td className="px-4 py-3 text-gray-300">{report.operator}</td>
                                                <td className="px-4 py-3 text-gray-300">
                                                    {report.created_at ? new Date(report.created_at).toLocaleString() : 'N/A'}
                                                </td>
                                                <td className="px-4 py-3 text-gray-300">
                                                    {report.updated_at ? new Date(report.updated_at).toLocaleString() : 'N/A'}
                                                </td>
                                                <td className="px-4 py-3 text-gray-300">
                                                    {report.total_charge ? parseFloat(report.total_charge).toFixed(2) : '0.00'}
                                                </td>
                                                <td className="px-4 py-3 text-right whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleDeleteReport(report.id)}
                                                        className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                        title="Delete Report"
                                                    >
                                                        <TrashIcon size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center text-gray-500 py-8">
                                    No reports found matching your search criteria
                                </div>
                            )}
                        </div>
                    )}

                    {/* Show search results stats */}
                    {hasSearched && !loading && reports.length > 0 && (
                        <div className="mt-4 space-y-2">
                            <div className="text-sm text-gray-500 text-center">
                                Found {reports.length} report{reports.length !== 1 ? 's' : ''}
                            </div>
                            <div className="text-sm text-gray-300 text-center font-semibold">
                                Total Charge: ${totalCharge.toFixed(2)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TestReportsPage;