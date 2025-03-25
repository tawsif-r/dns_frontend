import React, { useState } from 'react';

function ReportList({ reports }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredReports = reports.filter((report) =>
        report.sent_on.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard-card bg-gray-900 text-white rounded-lg shadow-lg">
            <div 
                className="card-header flex justify-between items-center p-4 bg-purple-800 rounded-t-lg cursor-pointer"
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
                    {filteredReports.length > 0 ? (
                        <ul className="space-y-4">
                            {filteredReports.map((report) => (
                                <li 
                                    key={report.id}
                                    className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                                >
                                    <div className="space-y-2">
                                        <p><strong>ID:</strong> {report.id}</p>
                                        <p><strong>Total Charge:</strong> {report.total_charge}</p>
                                        <p><strong>Sent On:</strong> {report.sent_on}</p>
                                        <p><strong>Subscriber:</strong> {report.subscriber}</p>
                                        <p><strong>Sent Messages:</strong> {report.sent_messages}</p>
                                    </div>
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