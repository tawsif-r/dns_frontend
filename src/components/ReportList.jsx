import React, { useState } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import axios from 'axios';

function ReportList({ reports, setReports }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingReport, setEditingReport] = useState(null);
    const [newReport, setNewReport] = useState({
        id: '',
        total_charge: '',
        sent_on: '',
        subscriber: '',
        sent_messages: ''
    });

    const baseUrl = 'http://192.168.3.37:8001/admin/api/reports/'; // Adjust this URL as needed

    const filteredReports = reports.filter((report) =>
        report?.sent_on?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Create a new report
    const handleCreateReport = async () => {
        if (!newReport.total_charge || !newReport.sent_on || !newReport.subscriber || !newReport.sent_messages) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            const response = await axios.post(baseUrl, newReport);
            setReports([...reports, response.data]);
            setNewReport({
                id: '',
                total_charge: '',
                sent_on: '',
                subscriber: '',
                sent_messages: ''
            });
        } catch (error) {
            console.error('Error creating report:', error);
            alert('Failed to create report');
        }
    };

    // Update an existing report
    const handleUpdateReport = async () => {
        if (!editingReport.total_charge || !editingReport.sent_on || !editingReport.subscriber || !editingReport.sent_messages) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            const response = await axios.put(`${baseUrl}${editingReport.id}/`, editingReport);
            setReports(reports.map(report =>
                report.id === editingReport.id ? response.data : report
            ));
            setEditingReport(null);
        } catch (error) {
            console.error('Error updating report:', error);
            alert('Failed to update report');
        }
    };

    // Delete a report
    const handleDeleteReport = async (id) => {
        try {
            await axios.delete(`${baseUrl}${id}/`);
            setReports(reports.filter(report => report.id !== id));
            if (editingReport?.id === id) {
                setEditingReport(null);
            }
        } catch (error) {
            console.error('Error deleting report:', error);
            alert('Failed to delete report');
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
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 16H7v-1h10v1zm0-3H7v-1h10v1zm0-3H7v-1h10v1zm0-3H7V9h10v1zm0-3H7V6h10v1z" />
                    </svg>
                    <h2 className="text-lg font-semibold">Reports</h2>
                </div>
                <input
                    type="text"
                    placeholder="Search Reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="ml-4 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>

            {isOpen && (
                <div className="p-4 bg-gray-900 max-h-96 overflow-y-auto">
                    {/* New Report Form */}
                    <div className="mb-6">
                        <h3 className="flex items-center text-purple-400 mb-2">
                            <PlusIcon className="mr-2" />
                            Create New Report
                        </h3>
                        <div className="space-y-2">
                            <input
                                type="number"
                                placeholder="Total Charge"
                                value={newReport.total_charge}
                                onChange={(e) => setNewReport({ ...newReport, total_charge: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="datetime-local"
                                placeholder="Sent On"
                                value={newReport.sent_on}
                                onChange={(e) => setNewReport({ ...newReport, sent_on: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="text"
                                placeholder="Subscriber"
                                value={newReport.subscriber}
                                onChange={(e) => setNewReport({ ...newReport, subscriber: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <input
                                type="number"
                                placeholder="Sent Messages"
                                value={newReport.sent_messages}
                                onChange={(e) => setNewReport({ ...newReport, sent_messages: e.target.value })}
                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                            />
                            <button
                                onClick={handleCreateReport}
                                className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-200"
                            >
                                Add Report
                            </button>
                        </div>
                    </div>

                    {/* Reports List */}
                    {filteredReports.length > 0 ? (
                        <ul className="space-y-4">
                            {filteredReports.map((report) => (
                                <li 
                                    key={report.id}
                                    className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                                >
                                    {editingReport?.id === report.id ? (
                                        // Edit Mode
                                        <div className="space-y-2">
                                            <input
                                                type="number"
                                                value={editingReport.total_charge}
                                                onChange={(e) => setEditingReport({ ...editingReport, total_charge: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="datetime-local"
                                                value={editingReport.sent_on}
                                                onChange={(e) => setEditingReport({ ...editingReport, sent_on: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="text"
                                                value={editingReport.subscriber}
                                                onChange={(e) => setEditingReport({ ...editingReport, subscriber: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <input
                                                type="number"
                                                value={editingReport.sent_messages}
                                                onChange={(e) => setEditingReport({ ...editingReport, sent_messages: e.target.value })}
                                                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                                            />
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={handleUpdateReport}
                                                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
                                                >
                                                    <SaveIcon className="mr-2" /> Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingReport(null)}
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
                                                        onClick={() => setEditingReport(report)}
                                                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                                                    >
                                                        <EditIcon />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteReport(report.id)}
                                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                                                    >
                                                        <TrashIcon />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-2 space-y-2">
                                                <p><strong>ID:</strong> {report.id}</p>
                                                <p><strong>Total Charge:</strong> {report.total_charge}</p>
                                                <p><strong>Sent On:</strong> {report.sent_on}</p>
                                                <p><strong>Subscriber:</strong> {report.subscriber}</p>
                                                <p><strong>Sent Messages:</strong> {report.sent_messages}</p>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">No reports found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default ReportList;