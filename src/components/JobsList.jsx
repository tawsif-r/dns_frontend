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
        <h2>{isOpen ? '▼' : '▶'} Jobs</h2>
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
                <strong>Job ID:</strong> {job.job_id}<br/>
                <strong>Region: </strong>{job.region}<br/>
                <strong>Category: </strong>{job.category}<br/>
                <strong>Experience: </strong>{job.experience_needed}<br/>
                <strong>Published: </strong>{job.published}<br/>
                <strong>Deadline: </strong>{job.deadline}<br/>
                <strong>Gender: </strong>{job.gender}<br/>
                <strong>URL: <a href={job.url}>Check Site</a></strong><br/>
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