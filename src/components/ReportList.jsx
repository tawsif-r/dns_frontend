import React, { useState } from 'react';

function ReportList({ reports }) {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredReports = reports.filter((report) =>
        report.sent_on.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className='dashboard-card'>
            <div className="card-header" onClick={() => setIsOpen(!isOpen)}>
                <h2>{isOpen ? '▼' : '▶'} Reports</h2>
                <input
                    type="text"
                    placeholder="Search Reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>
            {isOpen && (
                <ul>
                    {filteredReports.length > 0 ? (
                        filteredReports.map((report) => (
                            <li key={report.id}>
                                <strong>ID: </strong>{report.id}<br/>
                                <strong>Total Charge: </strong>{report.total_charge}<br/>
                                <strong>Sent On: </strong>{report.sent_on}<br/>
                                <strong>Subscriber: </strong>{report.subscriber}<br/>
                                <strong>Sent Messages: </strong>{report.sent_messages}<br/>
                            </li>
                        ))
                    ) : (
                        <p>No messsages</p>
                    )}
                </ul>
            )}

        </div>
    )
}
export default ReportList;