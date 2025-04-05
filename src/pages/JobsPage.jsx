import React, { useState, useEffect } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import Nav from '../components/ui/Nav'; // Assuming you have a Nav component
import axios from 'axios';

function JobsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [jobs, setJobs] = useState([]);
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

    const baseUrl = 'http://192.168.3.37:8001/admin/api/jobs/';

    // Fetch jobs on page load
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(baseUrl);
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter((job) =>
        job.region?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateJob = async () => {
        if (!newJob.job_id || !newJob.region || !newJob.category) {
            alert('Please fill in required fields (Job ID, Region, and Category)');
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

    const handleUpdateJob = async () => {
        if (!editingJob.job_id || !editingJob.region || !editingJob.category) {
            alert('Please fill in required fields (Job ID, Region, and Category)');
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

    // Define table columns
    const columns = Object.keys(newJob);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Nav />
            <div className="container mx-auto px-4 py-8 ml-16">
                <div className="border-2 rounded-lg shadow-lg">
                    <div 
                        className="flex justify-between items-center p-4 bg-gray-800 text-white rounded-t-lg"
                    >
                        <div className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="mr-2"
                                fill="currentColor"
                            >
                                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                            </svg>
                            <h1 className="text-xl font-bold">Jobs Management</h1>
                        </div>
                        <input
                            type="text"
                            placeholder="Search Jobs by Region..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-3 py-1 bg-slate-900 text-gray-100 rounded border focus:outline-none focus:border-gray-100"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    <div className="p-6">
                        {/* New Job Form */}
                        <div className="mb-8 p-4 rounded-lg">
                            <h2 className="flex items-center text-lg font-semibold mb-4">
                                <PlusIcon className="mr-2" />
                                Add New Job
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(newJob).map(([key, value]) => (
                                    <input
                                        key={key}
                                        type={key === 'published' || key === 'deadline' ? 'datetime-local' : 'text'}
                                        placeholder={key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                        value={value}
                                        onChange={(e) => setNewJob({ ...newJob, [key]: e.target.value })}
                                        className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                    />
                                ))}
                                <button
                                    onClick={handleCreateJob}
                                    className="md:col-span-2 font-bold bg-black text-white px-4 py-2 rounded border-2 border-cyan-600 hover:bg-gray-300 hover:text-black transition duration-500"
                                >
                                    Add Job
                                </button>
                            </div>
                        </div>

                        {/* Jobs Table */}
                        <div className="overflow-x-auto">
                            {filteredJobs.length > 0 ? (
                                <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                                    <thead>
                                        <tr className="bg-gray-700">
                                            {columns.slice(0, 5).map((column) => (
                                                <th key={column} className="px-4 py-3 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">
                                                    {column.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                                </th>
                                            ))}
                                            <th className="px-4 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-600">
                                        {filteredJobs.map((job) => (
                                            editingJob?.id === job.id ? (
                                                <tr key={job.id} className="bg-gray-700">
                                                    {columns.slice(0, 5).map((column) => (
                                                        <td key={column} className="px-4 py-2">
                                                            <input
                                                                type={column === 'published' || column === 'deadline' ? 'datetime-local' : 'text'}
                                                                value={editingJob[column] || ''}
                                                                onChange={(e) => setEditingJob({
                                                                    ...editingJob,
                                                                    [column]: e.target.value
                                                                })}
                                                                className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                            />
                                                        </td>
                                                    ))}
                                                    <td className="px-4 py-2 text-right whitespace-nowrap">
                                                        <button
                                                            onClick={handleUpdateJob}
                                                            className="inline-flex items-center justify-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                                                        >
                                                            <SaveIcon size={16} className="mr-1" /> Save
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingJob(null)}
                                                            className="inline-flex items-center justify-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                        >
                                                            <XIcon size={16} className="mr-1" /> Cancel
                                                        </button>
                                                    </td>
                                                </tr>
                                            ) : (
                                                <tr key={job.id} className="hover:bg-gray-700">
                                                    {columns.slice(0, 5).map((column) => (
                                                        <td key={column} className="px-4 py-3 text-gray-300">
                                                            {column === 'url' ? (
                                                                <a
                                                                    href={job[column]}
                                                                    className="text-blue-400 hover:text-blue-300"
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    {job[column] || 'N/A'}
                                                                </a>
                                                            ) : (
                                                                job[column] || 'N/A'
                                                            )}
                                                        </td>
                                                    ))}
                                                    <td className="px-4 py-3 text-right whitespace-nowrap">
                                                        <button
                                                            onClick={() => setEditingJob(job)}
                                                            className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                                        >
                                                            <EditIcon size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteJob(job.id)}
                                                            className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                        >
                                                            <TrashIcon size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-center text-gray-500">No jobs found</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobsPage;