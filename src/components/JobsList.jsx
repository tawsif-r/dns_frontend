import React, { useState } from 'react';

function JobsList({ jobs }) {
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter((job) =>
    job.region.toLowerCase().includes(searchTerm.toLowerCase())
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
            <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
          </svg>
          <h2 className="text-lg font-semibold">Jobs</h2>
        </div>
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ml-4 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {isOpen && (
        <div className="p-4 bg-gray-900 max-h-96 overflow-y-auto">
          {filteredJobs.length > 0 ? (
            <ul className="space-y-4">
              {filteredJobs.map((job) => (
                <li 
                  key={job.id}
                  className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                >
                  <div className="space-y-2">
                    <p><strong>Job ID:</strong> {job.job_id}</p>
                    <p><strong>Region:</strong> {job.region}</p>
                    <p><strong>Category:</strong> {job.category}</p>
                    <p><strong>Experience:</strong> {job.experience_needed}</p>
                    <p><strong>Published:</strong> {job.published}</p>
                    <p><strong>Deadline:</strong> {job.deadline}</p>
                    <p><strong>Gender:</strong> {job.gender}</p>
                    <p>
                      <strong>URL:</strong>{' '}
                      <a 
                        href={job.url}
                        className="text-purple-400 hover:text-purple-300 transition duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Check Site
                      </a>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No jobs match your search.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default JobsList;