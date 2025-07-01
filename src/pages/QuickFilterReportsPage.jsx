import React, { useState, useEffect } from 'react';
import { TrashIcon, FilterIcon } from 'lucide-react';
import apiClient from '../api/axiosInstance';
import axios from 'axios';

function QuickFilterReportsPage() {
    const [reports, setReports] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const [loading, setLoading] = useState(false);

    // Filter states
    const [filters, setFilters] = useState({
        operator: '',
        subscriber_name: '',
        category_name: '',
        subscription_plan_name: '',
        date_time: ''
    });

    const baseUrl = '/admin/api/reports/';

    // Fetch all reports (no filtering on backend)
    const fetchReports = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get(baseUrl);
            console.log("Fetch reports is fired");
            // saving the response data in reports
            setReports(response.data.data);
            // saving the response data in filteredReports
            setFilteredReports(response.data.data); // Initially show all reports
        } catch (error) {
            console.error('Error fetching reports:', error);
            setReports([]);
            setFilteredReports([]);
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    // why the empty list set as the target
    useEffect(() => {
        fetchReports();
    }, []);

    // Frontend filtering function
    const applyFilters = (reportsToFilter, currentFilters) => {
        return reportsToFilter.filter(report => {
            // Operator filter
            if (currentFilters.operator &&
                !report.operator?.toString().toLowerCase().includes(currentFilters.operator.toLowerCase())) {
                return false;
            }

            // Subscriber name filter
            if (currentFilters.subscriber_name &&
                !report.subscriber_name?.toLowerCase().includes(currentFilters.subscriber_name.toLowerCase())) {
                return false;
            }

            // Category name filter
            if (currentFilters.category_name &&
                !report.category_name?.toLowerCase().includes(currentFilters.category_name.toLowerCase())) {
                return false;
            }

            // Subscription plan name filter
            if (currentFilters.subscription_plan_name &&
                !report.subscription_plan_name?.toLowerCase().includes(currentFilters.subscription_plan_name.toLowerCase())) {
                return false;
            }

            // Date and time filter - check if report's created_at matches or is after the selected date/time
            if (currentFilters.date_time && report.created_at) {
                const reportDate = new Date(report.created_at);
                const filterDate = new Date(currentFilters.date_time);

                // Filter to show reports created on or after the selected date/time
                if (reportDate < filterDate) {
                    return false;
                }
            }

            return true;
        });
    };
    // Handle total charge
    const totalCharge = filteredReports.reduce((sum, report) => {
        // report is each individual report
        const charge = parseFloat(report.total_charge);
        return sum + (isNaN(charge) ? 0 : charge);
    }, 0);

    // Handle filter changes
    const handleFilterChange = (filterName, value) => {
        const newFilters = { ...filters, [filterName]: value };
        setFilters(newFilters);

        // Apply filters to the original reports data
        const filtered = applyFilters(reports, newFilters);
        setFilteredReports(filtered);
    };

    // Clear all filters
    const clearFilters = () => {
        const clearedFilters = {
            operator: '',
            subscriber_name: '',
            category_name: '',
            subscription_plan_name: '',
            date_time: ''
        };
        setFilters(clearedFilters);
        setFilteredReports(reports); // Show all reports when filters are cleared
    };

    const handleDeleteReport = async (id) => {
        try {
            await axios.delete(`${baseUrl}${id}/`);
            // Refresh the reports after deletion
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
            <div className="rounded-lg shadow-lg">
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
                                type="text"
                                placeholder="Operator"
                                value={filters.operator}
                                onChange={(e) => handleFilterChange('operator', e.target.value)}
                                className="w-full bg-black rounded px-3 py-2 text-white focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Subscriber"
                                value={filters.subscriber_name}
                                onChange={(e) => handleFilterChange('subscriber_name', e.target.value)}
                                className="w-full bg-black border rounded px-3 py-2 text-white focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="text"
                                placeholder="Category"
                                value={filters.category_name}
                                onChange={(e) => handleFilterChange('category_name', e.target.value)}
                                className="w-full bg-black border rounded px-3 py-2 text-white focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="text"
                                placeholder="Subscription Plan"
                                value={filters.subscription_plan_name}
                                onChange={(e) => handleFilterChange('subscription_plan_name', e.target.value)}
                                className="w-full bg-black border rounded px-3 py-2 text-white focus:outline-none focus:border-blue-200"
                            />
                            <input
                                type="datetime-local"
                                placeholder="Date & Time"
                                value={filters.date_time}
                                onChange={(e) => handleFilterChange('date_time', e.target.value)}
                                className="w-full bg-black border rounded px-3 py-2 text-white focus:outline-none focus:border-blue-200
                                                        [&::-webkit-calendar-picker-indicator]:bg-dark 
                                                        [&::-webkit-calendar-picker-indicator]:rounded
                                                        [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                style={{ colorScheme: 'dark' }}
                            />
                            <button
                                onClick={clearFilters}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
                            >
                                Clear Filters
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
                                        <tr key={report.id} className="hover:bg-gray-700">
                                            <td className="px-4 py-3 text-gray-300">{report.subscriber_name || 'N/A'}</td>
                                            <td className="px-4 py-3 text-gray-300">{report.subscriber_message_count || 0}</td>
                                            <td className="px-4 py-3 text-gray-300">{report.subscription_plan_name || 'N/A'}</td>
                                            <td className="px-4 py-3 text-gray-300">{report.category_name || 'N/A'}</td>
                                            <td className="px-4 py-3 text-gray-300">{report.operator}</td>
                                            <td className="px-4 py-3 text-gray-300">{report.created_at}</td>
                                            <td className="px-4 py-3 text-gray-300">{report.updated_at}</td>
                                            <td className="px-4 py-3 text-gray-300">{report.total_charge}</td>
                                            <td className="px-4 py-3 text-right whitespace-nowrap">
                                                <button
                                                    onClick={() => handleDeleteReport(report.id)}
                                                    className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
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
                                {loading ? 'Loading...' :
                                    reports.length === 0 ? 'No reports found' :
                                        'No reports match the current filters'}
                            </div>
                        )}
                    </div>

                    {/* Show filtering stats */}
                    {!loading && reports.length > 0 && (
                        <div>
                            <div className="mt-4 text-sm text-gray-500 text-center">
                                Showing {filteredReports.length} of {reports.length} reports

                            </div>
                            <div className="mt-4 text-sm text-gray-300 text-center">
                                Total Charge: {filteredReports ? totalCharge : 0}

                            </div>
                        </div>


                    )}
                </div>
            </div>
        </div>
    );
}

export default QuickFilterReportsPage;