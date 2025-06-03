import React, { useState, useEffect } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import apiClient from '../api/axiosInstance';
import axios from 'axios';

function ReportRobiPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [reports, setReports] = useState([]);
    const [newReport, setNewReport] = useState({
        subscriber: '',
        subscriprion_plan: '',
        category: '',
        operator: '',
        total_charge: '0.00'
    });
    const baseUrl = '/admin/api/reports/robi/'; // Adjust the API endpoint as needed

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
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-600">
                                    {filteredReports.map((report) => (
                                        <tr key={report.id} className="hover:bg-gray-700">
                                            <td className="px-4 py-3 text-gray-300">{report.subscriber || 'N/A'}</td>
                                            <td className="px-4 py-3 text-gray-300">{report.subscription_plan || 'N/A'}</td>
                                            <td className="px-4 py-3 text-gray-300">{report.category || 'N/A'}</td>
                                            <td className="px-4 py-3 text-gray-300">{report.operator || 'N/A'}</td>
                                            <td className="px-4 py-3 text-gray-300">{report.total_charge}</td>
                                        </tr>
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

export default ReportRobiPage;