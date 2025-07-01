import React, { useState, useEffect } from 'react';
import { TrashIcon, FilterIcon, SearchIcon } from 'lucide-react';
import apiClient from '../api/axiosInstance';
import { FixedSizeList } from 'react-window';
import axios from 'axios';

function SalesReportsPage() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [subscriber_count, setSubscriberCount] = useState(0);
    const [active_subscribers, setActive_subscribers] = useState(0);
    const [inactive_subscribers, setInActive_subscribers] = useState(0);
    const [recent_subscribers, setRecent_subscribers] = useState(0);
    const [appliedFilters, setAppliedFilters] = useState({});
    const [viewTable, setViewTable] = useState(false);

    // New state for plan-based statistics
    const [planStats, setPlanStats] = useState({});

    // Dropdown data states
    const [operators, setOperators] = useState([]);
    const [categories, setCategories] = useState([]);
    const [dropdownsLoading, setDropdownsLoading] = useState(false);

    // Filter states
    const [filters, setFilters] = useState({
        subscriber: '',
        shortcode: '',
        operator: '',
        service: '',
        keyword: '',
        subscription_plan: '',
        category: '',
        date_from: '',
        date_to: ''
    });

    const baseUrl = '/admin/api/reports/';

    // Fetch operators and categories for dropdowns
    const fetchDropdownData = async () => {
        setDropdownsLoading(true);
        try {
            const [operatorsResponse, categoriesResponse] = await Promise.all([
                apiClient.get('http://192.168.3.35:8001/admin/api/operators/'),
                apiClient.get('http://192.168.3.35:8001/admin/api/categories/')
            ]);

            setOperators(operatorsResponse.data);
            setCategories(categoriesResponse.data);
            console.log("Operators loaded:", operatorsResponse.data.length);
            console.log("Categories loaded:", categoriesResponse.data.length);
        } catch (error) {
            console.error('Error fetching dropdown data:', error);
            setOperators([]);
            setCategories([]);
        } finally {
            setDropdownsLoading(false);
        }
    };

    // Load dropdown data on component mount
    useEffect(() => {
        fetchDropdownData();
    }, []);

    // Fetch reports with backend filtering
    const fetchReports = async (searchFilters = filters) => {
        setLoading(true);
        try {
            const params = {};
            Object.keys(searchFilters).forEach(key => {
                if (searchFilters[key] && searchFilters[key].trim() !== '') {
                    params[key] = searchFilters[key].trim();
                }
            });

            console.log("Fetching reports with params:", params);

            const response = await apiClient.get(baseUrl, { params });
            setReports(response.data.data);
            setAppliedFilters(response.data.filters_applied);
            setSubscriberCount(response.data.subscriber_count);
            setActive_subscribers(response.data.active_subscribers);
            setInActive_subscribers(response.data.inactive_subscribers);
            setRecent_subscribers(response.data.recent_subscribers);
            setHasSearched(true);
        } catch (error) {
            console.error('Error fetching reports:', error);
            setReports([]);
            setSubscriberCount(0);
            setActive_subscribers(0);
            setInActive_subscribers(0);
            setRecent_subscribers(0);
        } finally {
            setLoading(false);
        }
    };

    // Calculate plan-based statistics
    useEffect(() => {
        const stats = reports.reduce((acc, report) => {
            const plan = report.subscription_plan_name || 'Unknown';
            acc[plan] = acc[plan] || { count: 0, totalCharge: 0 };
            acc[plan].count += 1;
            acc[plan].totalCharge += parseFloat(report.total_charge) || 0;
            return acc;
        }, {});
        setPlanStats(stats);
    }, [reports]);

    // Handle table view toggle
    const handleTableView = () => {
        setViewTable(!viewTable);
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
            category: '',
            date_from: '',
            date_to: ''
        };
        setFilters(clearedFilters);
        setReports([]);
        setSubscriberCount(0);
        setActive_subscribers(0);
        setInActive_subscribers(0);
        setRecent_subscribers(0);
        setHasSearched(false);
        setViewTable(false);
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
            fetchReports();
        } catch (error) {
            console.error('Error deleting report:', error);
            alert('Failed to delete report');
        }
    };

    const Row = ({ index, style }) => {
        const report = reports[index];
        return (
            <div style={style} className="grid grid-cols-9 w-full text-gray-300 py-2 border-b border-gray-600 hover:bg-gray-700">
                <div className="px-4 py-3 text-center">{report.id}</div>
                <div className="px-4 py-3 text-center">{report.subscriber_name}</div>
                <div className="px-4 py-3 text-center">{report.category_name}</div>
                <div className="px-4 py-3 text-center">{report.operator}</div>
                <div className="px-4 py-3 text-center">{report.subscription_plan_name}</div>
                <div className="px-4 py-3 text-center">{report.subscriber_message_count}</div>
                <div className="px-4 py-3 text-center">{report.total_charge}</div>
                <div className="px-4 py-3 text-center">{new Date(report.created_at).toLocaleDateString()}</div>
                <div className="px-4 py-3 text-center">{new Date(report.updated_at).toLocaleDateString()}</div>
            </div>
        );
    };
    const columns = [
        'id',
        'phone',
        'category',
        'operator',
        'plan',
        'messages',
        'total_charge',
        'created_at',
        'updated_at',
        // 'subscriber',
        // 'subscription_plan',
        // 'category id'
    ];

    return (
        <div className="px-4 py-8">
            <div className="bg-slate-700 rounded-lg shadow-lg">
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
                        <div className="mb-6 p-4 bg-cyan-50 rounded-lg">
                            <p className="text-cyan-700 text-sm">
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
                                onKeyDown={handleKeyPress}
                                className="w-full bg-black rounded px-3 py-2 text-white"
                            />
                            <input
                                type="text"
                                placeholder="Short Code"
                                value={filters.shortcode}
                                onChange={(e) => handleFilterChange('shortcode', e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="w-full bg-black rounded px-3 py-2 text-white"
                            />
                            <select
                                value={filters.operator}
                                onChange={(e) => handleFilterChange('operator', e.target.value)}
                                disabled={dropdownsLoading}
                                className="w-full bg-black rounded px-3 py-2 text-white"
                            >
                                <option value="">
                                    {dropdownsLoading ? 'Loading operators...' : 'Select Operator'}
                                </option>
                                {operators.map((operator) => (
                                    <option key={operator.id} value={operator.id}>
                                        {operator.name} ({operator.short_code})
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Service"
                                value={filters.service}
                                onChange={(e) => handleFilterChange('service', e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="w-full bg-black rounded px-3 py-2 text-white"
                            />
                            <input
                                type="text"
                                placeholder="Keyword"
                                value={filters.keyword}
                                onChange={(e) => handleFilterChange('keyword', e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="w-full bg-black rounded px-3 py-2 text-gray-300"
                            />
                            <input
                                type="text"
                                placeholder="Subscription Plan ID"
                                value={filters.subscription_plan}
                                onChange={(e) => handleFilterChange('subscription_plan', e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="w-full bg-black rounded px-3 py-2 text-white"
                            />
                            <select
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                disabled={dropdownsLoading}
                                className="w-full bg-black rounded px-3 py-2 text-white "
                            >
                                <option value="">
                                    {dropdownsLoading ? 'Loading categories...' : 'Select Category'}
                                </option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name} - {category.keyword}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date Range Filter Section */}
                        <div className="mb-4">
                            <h3 className="text-sm font-medium text-gray-300 mb-2">Date Range Filter</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">From Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        value={filters.date_from}
                                        onChange={(e) => handleFilterChange('date_from', e.target.value)}
                                        className="w-full bg-black rounded px-3 py-2 text-white
                                                   [&::-webkit-calendar-picker-indicator]:bg-dark 
                                                   [&::-webkit-calendar-picker-indicator]:rounded
                                                   [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                        style={{ colorScheme: 'dark' }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">To Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        value={filters.date_to}
                                        onChange={(e) => handleFilterChange('date_to', e.target.value)}
                                        className="w-full bg-black rounded px-3 py-2 text-white
                                                   [&::-webkit-calendar-picker-indicator]:bg-dark 
                                                   [&::-webkit-calendar-picker-indicator]:rounded
                                                   [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                        style={{ colorScheme: 'dark' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleSearch}
                                disabled={loading || dropdownsLoading}
                                className="flex items-center bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition duration-200 disabled:opacity-50"
                            >
                                <SearchIcon className="mr-2" size={16} />
                                {loading ? 'Searching...' : 'Search Reports'}
                            </button>
                            <button
                                onClick={clearFilters}
                                disabled={loading || dropdownsLoading}
                                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200 disabled:opacity-50"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-1'>
                        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                            {/* Applied Filters Section */}
                            {hasSearched && Object.keys(appliedFilters).length > 0 && (
                                <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                                    <h2 className="text-lg font-semibold mb-2 text-white">Applied Filters</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(appliedFilters).map(([key, value]) => {
                                            if (!value) return null;
                                            const formattedKey = key
                                                .replace('_', ' ')
                                                .split(' ')
                                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                .join(' ');
                                            return (
                                                <span key={key} className="px-3 py-1 bg-cyan-900 text-cyan-200 rounded-full text-xs">
                                                    <strong>{formattedKey}:</strong> {value}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                            <div className="font-semibold text-lg text-gray-200">
                                Number of subscribers:{subscriber_count ? subscriber_count : "0"}
                                <div className="flex flex-col items-start">

                                    {/* Subscription Plan Statistics */}
                                    {hasSearched && Object.keys(planStats).length > 0 && (
                                        <div className="mt-4 w-full">
                                            <h3 className="text-md font-semibold text-white mb-2">Subscription Plan Breakdown:</h3>
                                            {Object.entries(planStats).map(([plan, { count, totalCharge }]) => {
                                                const individualCharge = count > 0 ? (totalCharge / count).toFixed(2) : '0.00';
                                                return (
                                                    <div key={plan} className="flex justify-between items-center py-2 border-b border-gray-600">
                                                        <span className="text-gray-300">{plan}</span>
                                                        <span className="text-gray-300">
                                                            Tk {individualCharge} X {count} = Tk {individualCharge * count.toFixed(2)}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                    {hasSearched && (
                                        <button
                                            onClick={handleTableView}
                                            className="mt-2 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition duration-200"
                                        >
                                            {viewTable ? 'Hide Table' : 'View Table'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                            <p className='font-semibold'>Billing:</p>
                            <p className='font-semibold'>Total Charge: Tk {totalCharge.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* Loading Indicator */}
                    {loading && (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
                            <p className="mt-2 text-gray-500">Searching reports...</p>
                        </div>
                    )}

                    {/* Reports Table */}
                    {hasSearched && !loading && viewTable && (
                        <div className="overflow-x-auto border-2 rounded-lg">
                            {reports.length > 0 ? (
                                <div className="min-w-full">
                                    {/* Table Header */}
                                    <div className="bg-gray-800 grid grid-cols-9 sticky top-0 z-10 border-b-2 border-gray-600">
                                        {columns.map((column) => (
                                            <div key={column} className='px-4 py-3 text-center text-sm font-medium text-cyan-200 uppercase tracking-wider'>
                                                {column}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Virtualized Table Body */}
                                    <div className="bg-gray-900">
                                        <FixedSizeList
                                            height={400}
                                            width="100%"
                                            itemCount={reports.length}
                                            itemSize={100}
                                            className="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
                                        >
                                            {Row}
                                        </FixedSizeList>
                                    </div>
                                </div>
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

export default SalesReportsPage;