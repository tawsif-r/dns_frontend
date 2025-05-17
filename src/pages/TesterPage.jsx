import React, { useState, useEffect } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import apiClient from '../api/axiosInstance';
import axios from 'axios';

function TesterPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [contents, setContents] = useState([]);
    const [editingContent, setEditingContent] = useState(null);
    const [categories, setCategories] = useState([]);
    const [jobs, setJobs] = useState([
        {
            company_name: '',
            job_title: '',
            job_id: '',
            category: '',
            deadline: '',
            job_details: {
                jobUrl: '',
                deadLine: '',
                jobTitle: '',
                location: '',
                companyLogo: '',
                companyName: '',
                skillRequired: { otherSkill: '', educational: '' },
                experienceRequired: { year: '', workArea: '', organization: '', additionalRequirements: '' }
            }
        }
    ]);

    const baseUrl = '/admin/api/contents/';
    const categoriesUrl = 'http://172.18.0.1:8002/content/job_categories/';
    const bulkCreateUrl = 'http://172.18.0.1:8002/content/job_list/bulk_create/';

    // Fetch Contents on page load
    useEffect(() => {
        const fetchContents = async () => {
            try {
                const response = await apiClient.get(baseUrl);
                console.log('Contents API Response:', response.data);
                const data = Array.isArray(response.data) ? response.data : response.data.data || [];
                setContents(data);
            } catch (error) {
                console.error('Error fetching Contents:', error);
                setContents([]);
            }
        };
        fetchContents();
    }, []);

    // Fetch Categories on page load
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(categoriesUrl);
                console.log('Categories API Response:', response.data);
                const data = Array.isArray(response.data) ? response.data : response.data.data || [];
                setCategories(data);
            } catch (error) {
                console.error('Error fetching Categories:', error);
                setCategories([]);
            }
        };
        fetchCategories();
    }, []);

    // Ensure contents is an array before filtering
    const filteredContents = Array.isArray(contents)
        ? contents.filter((content) =>
              content.title?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];

    const addJob = () => {
        setJobs([...jobs, {
            company_name: '',
            job_title: '',
            job_id: '',
            category: '',
            deadline: '',
            job_details: {
                jobUrl: '',
                deadLine: '',
                jobTitle: '',
                location: '',
                companyLogo: '',
                companyName: '',
                skillRequired: { otherSkill: '', educational: '' },
                experienceRequired: { year: '', workArea: '', organization: '', additionalRequirements: '' }
            }
        }]);
    };

    const removeJob = (index) => {
        setJobs(jobs.filter((_, i) => i !== index));
    };

    // Fixed handleJobChange function that properly handles nested objects
    const handleJobChange = (index, field, value, nestedField = null, subField = null) => {
        console.log('handleJobChange:', { index, field, value, nestedField, subField }); // Debug
        const newJobs = [...jobs];
        
        try {
            if (nestedField && subField) {
                // Handle double nested field (like job_details.skillRequired.otherSkill)
                newJobs[index].job_details = {
                    ...newJobs[index].job_details,
                    [nestedField]: {
                        ...newJobs[index].job_details[nestedField],
                        [subField]: value
                    }
                };
            } else if (nestedField) {
                // Handle nested field (like job_details.jobUrl)
                newJobs[index].job_details = {
                    ...newJobs[index].job_details,
                    [nestedField]: value
                };
            } else {
                // Handle top level field (like company_name)
                newJobs[index][field] = value;
            }
            
            setJobs(newJobs);
        } catch (error) {
            console.error('Error in handleJobChange:', error);
        }
    };

    // Function to validate job data before submission
    const validateJobData = (jobsData) => {
        for (let i = 0; i < jobsData.length; i++) {
            const job = jobsData[i];
            
            // Validate required fields
            if (!job.company_name || !job.job_title || !job.category || !job.deadline) {
                alert(`Job ${i + 1}: Please fill in all required fields (Company Name, Job Title, Category, and Deadline)`);
                return false;
            }
            
            // Validate job_id is a number
            if (job.job_id && isNaN(Number(job.job_id))) {
                alert(`Job ${i + 1}: Job ID must be a number`);
                return false;
            }
            
            // Validate job_details required fields
            if (!job.job_details.jobUrl || !job.job_details.jobTitle || 
                !job.job_details.location || !job.job_details.companyName) {
                alert(`Job ${i + 1}: Please fill in all required job details (Job URL, Job Title, Location, Company Name)`);
                return false;
            }
        }
        
        return true;
    };

    const handleBulkCreate = async () => {
        // Clone and prepare jobs data for submission
        const jobsToSubmit = jobs.map(job => ({
            ...job,
            job_id: job.job_id ? Number(job.job_id) : '',  // Convert to number if not empty
        }));
        
        // Validate job data
        if (!validateJobData(jobsToSubmit)) {
            return;
        }

        try {
            console.log('Submitting jobs:', jobsToSubmit);
            
            const response = await axios.post(bulkCreateUrl, jobsToSubmit, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('Success response:', response.data);
            alert('Jobs created successfully!');
            
            // Reset form after successful submission
            setJobs([{
                company_name: '',
                job_title: '',
                job_id: '',
                category: '',
                deadline: '',
                job_details: {
                    jobUrl: '',
                    deadLine: '',
                    jobTitle: '',
                    location: '',
                    companyLogo: '',
                    companyName: '',
                    skillRequired: { otherSkill: '', educational: '' },
                    experienceRequired: { year: '', workArea: '', organization: '', additionalRequirements: '' }
                }
            }]);
        } catch (error) {
            console.error('Error creating jobs:', error);
            alert('Failed to create jobs: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleUpdateContent = async () => {
        if (!editingContent?.category || !editingContent?.title || !editingContent?.external_id) {
            alert('Please fill in required fields (category, title, and external_id)');
            return;
        }

        try {
            const response = await apiClient.put(`${baseUrl}${editingContent.id}/`, editingContent);
            setContents(contents.map(content =>
                content.id === editingContent.id ? response.data : content
            ));
            setEditingContent(null);
        } catch (error) {
            console.error('Error updating Content:', error);
            alert('Failed to update Content');
        }
    };

    const handleDeleteContent = async (id) => {
        try {
            await apiClient.delete(`${baseUrl}${id}/`);
            setContents(contents.filter(content => content.id !== id));
            if (editingContent?.id === id) {
                setEditingContent(null);
            }
        } catch (error) {
            console.error('Error deleting Content:', error);
            alert('Failed to delete Content');
        }
    };

    const columns = ['title', 'external_id', 'category', 'description', 'deadline'];

    return (
        <div className="px-4 py-8">
            <div className="border-2 rounded-lg shadow-lg">
                <div className="flex justify-between items-center p-4 bg-gray-800 text-white rounded-t-lg">
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
                        <h1 className="text-xl font-bold">Contents Management</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Search Contents by Region..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-1 bg-slate-900 text-gray-100 rounded border focus:outline-none focus:border-gray-100"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>

                <div className="p-6">
                    {/* Bulk Job Creation Form */}
                    <div className="mb-8 p-4 rounded-lg">
                        <h2 className="flex items-center text-lg font-semibold mb-4">
                            <PlusIcon className="mr-2" />
                            Add New Job Listings
                        </h2>
                        {jobs.map((job, index) => (
                            <div key={index} className="mb-6 p-4 border border-gray-600 rounded-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-md font-semibold">Job Listing {index + 1}</h3>
                                    {index > 0 && (
                                        <button
                                            onClick={() => removeJob(index)}
                                            className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            <TrashIcon size={16} />
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300">Company Name</label>
                                        <input
                                            type="text"
                                            value={job.company_name}
                                            onChange={(e) => handleJobChange(index, 'company_name', e.target.value)}
                                            className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300">Job Title</label>
                                        <input
                                            type="text"
                                            value={job.job_title}
                                            onChange={(e) => handleJobChange(index, 'job_title', e.target.value)}
                                            className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300">Job ID</label>
                                        <input
                                            type="number"
                                            value={job.job_id}
                                            onChange={(e) => handleJobChange(index, 'job_id', e.target.value)}
                                            className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300">Category</label>
                                        <select
                                            value={job.category}
                                            onChange={(e) => handleJobChange(index, 'category', e.target.value)}
                                            className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map(category => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300">Deadline</label>
                                        <input
                                            type="datetime-local"
                                            value={job.deadline}
                                            onChange={(e) => handleJobChange(index, 'deadline', e.target.value)}
                                            className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <h4 className="text-sm font-semibold text-gray-300 mb-2">Job Details</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Job URL</label>
                                                <input
                                                    type="url"
                                                    value={job.job_details.jobUrl}
                                                    onChange={(e) => handleJobChange(index, null, e.target.value, 'jobUrl')}
                                                    className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Job Deadline (Text)</label>
                                                <input
                                                    type="text"
                                                    value={job.job_details.deadLine}
                                                    onChange={(e) => handleJobChange(index, null, e.target.value, 'deadLine')}
                                                    className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Job Title (Detail)</label>
                                                <input
                                                    type="text"
                                                    value={job.job_details.jobTitle}
                                                    onChange={(e) => handleJobChange(index, null, e.target.value, 'jobTitle')}
                                                    className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Location</label>
                                                <input
                                                    type="text"
                                                    value={job.job_details.location}
                                                    onChange={(e) => handleJobChange(index, null, e.target.value, 'location')}
                                                    className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Company Logo URL</label>
                                                <input
                                                    type="url"
                                                    value={job.job_details.companyLogo}
                                                    onChange={(e) => handleJobChange(index, null, e.target.value, 'companyLogo')}
                                                    className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Company Name (Detail)</label>
                                                <input
                                                    type="text"
                                                    value={job.job_details.companyName}
                                                    onChange={(e) => handleJobChange(index, null, e.target.value, 'companyName')}
                                                    className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Other Skills</label>
                                                <input
                                                    type="text"
                                                    value={job.job_details.skillRequired.otherSkill}
                                                    onChange={(e) => handleJobChange(index, null, e.target.value, 'skillRequired', 'otherSkill')}
                                                    className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Educational Requirements</label>
                                                <textarea
                                                    value={job.job_details.skillRequired.educational}
                                                    onChange={(e) => handleJobChange(index, null, e.target.value, 'skillRequired', 'educational')}
                                                    className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                                    rows="4"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Experience Years</label>
                                                <input
                                                    type="text"
                                                    value={job.job_details.experienceRequired.year}
                                                    onChange={(e) => handleJobChange(index, null, e.target.value, 'experienceRequired', 'year')}
                                                    className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Work Area</label>
                                                <input
                                                    type="text"
                                                    value={job.job_details.experienceRequired.workArea}
                                                    onChange={(e) => handleJobChange(index, null, e.target.value, 'experienceRequired', 'workArea')}
                                                    className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Organization</label>
                                                <input
                                                    type="text"
                                                    value={job.job_details.experienceRequired.organization}
                                                    onChange={(e) => handleJobChange(index, null, e.target.value, 'experienceRequired', 'organization')}
                                                    className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Additional Requirements</label>
                                                <textarea
                                                    value={job.job_details.experienceRequired.additionalRequirements}
                                                    onChange={(e) => handleJobChange(index, null, e.target.value, 'experienceRequired', 'additionalRequirements')}
                                                    className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                                    rows="4"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={addJob}
                                className="font-bold bg-black text-white px-4 py-2 rounded border-2 border-cyan-600 hover:bg-gray-300 hover:text-black transition duration-500"
                            >
                                Add Another Job
                            </button>
                            <button
                                type="button"
                                onClick={handleBulkCreate}
                                className="font-bold bg-black text-white px-4 py-2 rounded border-2 border-cyan-600 hover:bg-gray-300 hover:text-black transition duration-500"
                            >
                                Submit Jobs
                            </button>
                        </div>
                    </div>

                    {/* Contents Table */}
                    <div className="overflow-x-auto">
                        {filteredContents.length > 0 ? (
                            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-gray-700">
                                        {columns.map((column) => (
                                            <th key={column} className="px-4 py-3 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">
                                                {column.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                            </th>
                                        ))}
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-600">
                                    {filteredContents.map((content) => (
                                        editingContent?.id === content.id ? (
                                            <tr key={content.id} className="bg-gray-700">
                                                {columns.map((column) => (
                                                    <td key={column} className="px-4 py-2">
                                                        <input
                                                            type={column === 'published' || column === 'deadline' ? 'datetime-local' : 'text'}
                                                            value={editingContent[column] || ''}
                                                            onChange={(e) => setEditingContent({
                                                                ...editingContent,
                                                                [column]: e.target.value
                                                            })}
                                                            className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                        />
                                                    </td>
                                                ))}
                                                <td className="px-4 py-2 text-right whitespace-nowrap">
                                                    <button
                                                        onClick={handleUpdateContent}
                                                        className="inline-flex items-center justify-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                                                    >
                                                        <SaveIcon size={16} className="mr-1" /> Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingContent(null)}
                                                        className="inline-flex items-center justify-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                    >
                                                        <XIcon size={16} className="mr-1" /> Cancel
                                                    </button>
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr key={content.id} className="hover:bg-gray-700">
                                                {columns.map((column) => (
                                                    <td key={column} className="px-4 py-3 text-gray-300">
                                                        {column === 'url' ? (
                                                            <a
                                                                href={content[column]}
                                                                className="text-blue-400 hover:text-blue-300"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                {content[column] || 'N/A'}
                                                            </a>
                                                        ) : (
                                                            content[column] || 'N/A'
                                                        )}
                                                    </td>
                                                ))}
                                                <td className="px-4 py-3 text-right whitespace-nowrap">
                                                    <button
                                                        onClick={() => setEditingContent(content)}
                                                        className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                                    >
                                                        <EditIcon size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteContent(content.id)}
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
                            <p className="text-center text-gray-500">No Contents found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TesterPage;