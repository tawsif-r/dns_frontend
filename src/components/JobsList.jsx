import React, { useState } from 'react';

function JobsList({ jobs }) {
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter((job) =>
    job.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-card">
      <div className="card-header" onClick={() => setIsOpen(!isOpen)}>
        <h2>{isOpen ? '' : ''}<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="jobs-logo"
            fill="currentColor"
        >
            <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
        </svg>
        </h2>
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      {isOpen && (
        <ul>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <li key={job.id}>
                <strong>Job ID:</strong> {job.job_id}<br />
                <strong>Region: </strong>{job.region}<br />
                <strong>Category: </strong>{job.category}<br />
                <strong>Experience: </strong>{job.experience_needed}<br />
                <strong>Published: </strong>{job.published}<br />
                <strong>Deadline: </strong>{job.deadline}<br />
                <strong>Gender: </strong>{job.gender}<br />
                <strong>URL: <a href={job.url}>Check Site</a></strong><br />
              </li>
            ))
          ) : (
            <p>No jobs match your search.</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default JobsList;