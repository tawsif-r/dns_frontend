import React, { useState } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import axios from 'axios';

function JobsList({ jobs, setJobs }) {  // Added setJobs as prop
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingJob, setEditingJob] = useState(null);
  const [newJob, setNewJob] = useState({
    job_id: '',
    region: '',
    category: '',
    experience_needed: '',
    published: '',
    deadline: '',
    gender: '',
    url: ''
  });

  const baseUrl = 'http://localhost:8000/admin/api/jobs/';  // Adjust this URL as needed

  // Filtered jobs based on search term
  const filteredJobs = jobs.filter((job) =>
    job.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Create a new job
  const handleCreateJob = async () => {
    if (!newJob.job_id || !newJob.region || !newJob.category) {
      alert('Please fill in required fields');
      return;
    }

    try {
      const response = await axios.post(baseUrl, newJob);
      setJobs([...jobs, response.data]);
      setNewJob({
        job_id: '',
        region: '',
        category: '',
        experience_needed: '',
        published: '',
        deadline: '',
        gender: '',
        url: ''
      });
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Failed to create job');
    }
  };

  // Update an existing job
  const handleUpdateJob = async () => {
    if (!editingJob.job_id || !editingJob.region || !editingJob.category) {
      alert('Please fill in required fields');
      return;
    }

    try {
      const response = await axios.put(`${baseUrl}${editingJob.id}/`, editingJob);
      setJobs(jobs.map(job => 
        job.id === editingJob.id ? response.data : job
      ));
      setEditingJob(null);
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Failed to update job');
    }
  };

  // Delete a job
  const handleDeleteJob = async (id) => {
    try {
      await axios.delete(`${baseUrl}${id}/`);
      setJobs(jobs.filter(job => job.id !== id));
      if (editingJob?.id === id) {
        setEditingJob(null);
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job');
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
          {/* New Job Form */}
          <div className="mb-6">
            <h3 className="flex items-center text-purple-400 mb-2">
              <PlusIcon className="mr-2" /> 
              Create New Job
            </h3>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Job ID"
                value={newJob.job_id}
                onChange={(e) => setNewJob({ ...newJob, job_id: e.target.value })}
                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
              />
              <input
                type="text"
                placeholder="Region"
                value={newJob.region}
                onChange={(e) => setNewJob({ ...newJob, region: e.target.value })}
                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
              />
              <input
                type="text"
                placeholder="Category"
                value={newJob.category}
                onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}
                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
              />
              <input
                type="text"
                placeholder="Experience Needed"
                value={newJob.experience_needed}
                onChange={(e) => setNewJob({ ...newJob, experience_needed: e.target.value })}
                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
              />
              <input
                type="text"
                placeholder="Published Date"
                value={newJob.published}
                onChange={(e) => setNewJob({ ...newJob, published: e.target.value })}
                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
              />
              <input
                type="text"
                placeholder="Deadline"
                value={newJob.deadline}
                onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
              />
              <input
                type="text"
                placeholder="Gender"
                value={newJob.gender}
                onChange={(e) => setNewJob({ ...newJob, gender: e.target.value })}
                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
              />
              <input
                type="text"
                placeholder="URL"
                value={newJob.url}
                onChange={(e) => setNewJob({ ...newJob, url: e.target.value })}
                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
              />
              <button 
                onClick={handleCreateJob}
                className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-200"
              >
                Add Job
              </button>
            </div>
          </div>

          {/* Jobs List */}
          {filteredJobs.length > 0 ? (
            <ul className="space-y-4">
              {filteredJobs.map((job) => (
                <li 
                  key={job.id}
                  className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                >
                  {editingJob?.id === job.id ? (
                    // Edit Mode
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editingJob.job_id}
                        onChange={(e) => setEditingJob({ ...editingJob, job_id: e.target.value })}
                        className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                      />
                      <input
                        type="text"
                        value={editingJob.region}
                        onChange={(e) => setEditingJob({ ...editingJob, region: e.target.value })}
                        className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                      />
                      <input
                        type="text"
                        value={editingJob.category}
                        onChange={(e) => setEditingJob({ ...editingJob, category: e.target.value })}
                        className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                      />
                      <input
                        type="text"
                        value={editingJob.experience_needed}
                        onChange={(e) => setEditingJob({ ...editingJob, experience_needed: e.target.value })}
                        className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                      />
                      <input
                        type="text"
                        value={editingJob.published}
                        onChange={(e) => setEditingJob({ ...editingJob, published: e.target.value })}
                        className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                      />
                      <input
                        type="text"
                        value={editingJob.deadline}
                        onChange={(e) => setEditingJob({ ...editingJob, deadline: e.target.value })}
                        className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                      />
                      <input
                        type="text"
                        value={editingJob.gender}
                        onChange={(e) => setEditingJob({ ...editingJob, gender: e.target.value })}
                        className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                      />
                      <input
                        type="text"
                        value={editingJob.url}
                        onChange={(e) => setEditingJob({ ...editingJob, url: e.target.value })}
                        className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                      />
                      <div className="flex space-x-2">
                        <button 
                          onClick={handleUpdateJob}
                          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
                        >
                          <SaveIcon className="mr-2" /> Save
                        </button>
                        <button 
                          onClick={() => setEditingJob(null)}
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
                            onClick={() => setEditingJob(job)}
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                          >
                            <EditIcon />
                          </button>
                          <button 
                            onClick={() => handleDeleteJob(job.id)}
                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 space-y-2">
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
                    </>
                  )}
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