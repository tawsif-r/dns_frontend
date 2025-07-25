import React, { useState, useEffect } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon, Wrench } from 'lucide-react';
import apiClient from '../api/axiosInstance';
import axios from 'axios';
import { FixedSizeList } from 'react-window';
import ButtonCreate from '../components/ui/ButtonCreate';
function JobEntryPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [contents, setContents] = useState([]);
    const [editingContent, setEditingContent] = useState(null);
    const [categories, setCategories] = useState([]);
    const [usedJobIds, setUsedJobIds] = useState(new Set()); // Track used job IDs
    const [jobs, setJobs] = useState([
        {
            company_name: '',
            job_title: '',
            job_id: generateUniqueJobId(), // Auto-generated unique ID
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
            },
            source: ''
        }
    ]);

    const baseUrl = '/admin/api/contents/';
    const categoriesUrl = import.meta.env.VITE_API_JOB_CATEGORIES_URL;
    const bulkCreateUrl = import.meta.env.VITE_API_JOB_BULKCREATE_URL;

    // Function to generate unique alphanumeric job ID (e.g., MAN908293)
    function generateUniqueJobId() {
        const prefix = 'MAN'; // Fixed prefix, or use randomPrefix() for random
        let jobId;
        do {
            // Generate a random 6-digit number
            const number = Math.floor(100000 + Math.random() * 900000);
            jobId = `${prefix}${number}`;
        } while (usedJobIds.has(jobId));

        return jobId;
    }

    // Optional: Function to generate a random 3-letter prefix
    function randomPrefix() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let prefix = '';
        for (let i = 0; i < 3; i++) {
            prefix += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return prefix;
    }

    // Function to reserve a job ID
    const reserveJobId = (jobId) => {
        setUsedJobIds(prev => new Set([...prev, jobId]));
    };

    // Function to release a job ID when job is removed
    const releaseJobId = (jobId) => {
        setUsedJobIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(jobId);
            return newSet;
        });
    };

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

    // Initialize used job IDs when jobs state changes
    useEffect(() => {
        const currentJobIds = jobs.map(job => job.job_id).filter(id => id);
        setUsedJobIds(new Set(currentJobIds));
    }, []);

    // Ensure contents is an array before filtering
    const filteredContents = Array.isArray(contents)
        ? contents.filter((content) =>
            content.title?.toLowerCase().includes(searchTerm.toLowerCase()) || content.external_id?.includes(searchTerm)
        )
        : [];

    const addJob = () => {
        const newJobId = generateUniqueJobId();
        reserveJobId(newJobId);

        setJobs([...jobs, {
            company_name: '',
            job_title: '',
            job_id: newJobId,
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
            },
            created_at: '',
            source: ''
        }]);
    };

    const removeJob = (index) => {
        const jobToRemove = jobs[index];
        if (jobToRemove.job_id) {
            releaseJobId(jobToRemove.job_id);
        }
        setJobs(jobs.filter((_, i) => i !== index));
    };

    // Regenerate job ID function
    const regenerateJobId = (index) => {
        const oldJobId = jobs[index].job_id;
        if (oldJobId) {
            releaseJobId(oldJobId);
        }

        const newJobId = generateUniqueJobId();
        reserveJobId(newJobId);

        const newJobs = [...jobs];
        newJobs[index].job_id = newJobId;
        setJobs(newJobs);
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

            // Validate job ID
            if (!job.job_id || !/^[A-Z]{3}\d{6}$/.test(job.job_id)) {
                alert(`Job ${i + 1}: Invalid Job ID format. Please regenerate the Job ID.`);
                return false;
            }

            // Validate job_details required fields
            if (!job.job_details.jobUrl) {
                alert(`Job ${i + 1}: Please fill in all required job details (Job URL)`);
                return false;
            }
        }

        return true;
    };

    const getOutputCharCountWithSpaces = (job) => {
        const outputFields = [
            job.company_name || '',
            job.job_title || '',
            job.category || '',
            job.deadline || '',
            job.job_details.skillRequired.educational || '',
            job.job_details.experienceRequired.year || '',
            job.job_details.jobUrl || '',
            job.created_at || '',
            job.source || ''
        ];

        // Join with spaces for readability
        const combinedOutput = outputFields.filter(field => field.toString().trim() !== '').join(' ');
        return combinedOutput.length;
    };

    const handleBulkCreate = async () => {
        // Clone and prepare jobs data for submission
        const jobsToSubmit = jobs.map(job => ({
            ...job,
            job_id: job.job_id,  // Keep as string since it's alphanumeric
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
            const newJobId = generateUniqueJobId();
            setUsedJobIds(new Set([newJobId])); // Reset used IDs with only the new job ID

            setJobs([{
                company_name: '',
                job_title: '',
                job_id: newJobId,
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
                },
                source: ''
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

    const columns = ['title', 'external_id', 'category', 'deadline'];
    const Row = ({ index, style }) => {
        const content = contents[index]
        return (
            <div style={style} className="grid grid-cols-5 w-full text-gray-300 py-2 border-b border-gray-600 hover:bg-gray-700 hover:border-gray-100 hover:border-l-4 ">
                <div className="px-4 py-3 text-center">{content.title}</div>
                <div className="px-4 py-3 text-center">{content.external_id}</div>
                <div className="px-4 py-3 text-center">{content.category}</div>
                <div className="px-4 py-3 px-2 text-center">{new Date(content.deadline).toLocaleDateString()}</div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-3 gap-1 px-4 py-8">
            <div className="col-span-3 bg-slate-700 rounded-lg shadow-lg">
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
                        className="px-3 py-1 bg-slate-900 text-gray-100 rounded"
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
                            <div key={index} className="mb-6 p-4 rounded-lg">
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
                                        <label className="block text-sm font-medium text-gray-300">Category: </label>
                                        <select
                                            value={job.category}
                                            onChange={(e) => handleJobChange(index, 'category', e.target.value)}
                                            className="w-full bg-black rounded px-3 py-2"
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
                                        <label className="block text-sm font-medium text-gray-300">Company Name: (e.g Electra International)</label>
                                        <input
                                            type="text"
                                            value={job.company_name}
                                            onChange={(e) => handleJobChange(index, 'company_name', e.target.value)}
                                            className="w-full bg-black rounded px-3 py-2"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300">Job Title: (e.g Executive/Sr. Executive (Audit Department))</label>
                                        <input
                                            type="text"
                                            value={job.job_title}
                                            onChange={(e) => handleJobChange(index, 'job_title', e.target.value)}
                                            className="w-full bg-black rounded px-3 py-2 focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300">Job ID (Auto-Generated)</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={job.job_id}
                                                className="flex-1 bg-gray-900 rounded px-3 py-2 text-gray-300"
                                                readOnly
                                                disabled
                                            />
                                            <button
                                                type="button"
                                                onClick={() => regenerateJobId(index)}
                                                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                                title="Generate New ID"
                                            >
                                                🔄
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">Auto-generated unique alphanumeric ID (e.g., MAN908293)</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300">Deadline (e.g 2025-07-01T01:01:00Z)</label>
                                        <input
                                            type="datetime-local"
                                            value={job.deadline}
                                            onChange={(e) => handleJobChange(index, 'deadline', e.target.value)}
                                            className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white 
                                                        [&::-webkit-calendar-picker-indicator]:bg-dark 
                                                        [&::-webkit-calendar-picker-indicator]:rounded
                                                        [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                            style={{ colorScheme: 'dark' }}
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <h4 className="text-sm font-semibold text-gray-300 mb-2">Job Details</h4>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Job URL: (e.g https://jobs.bdjobs.com/jobdetails.asp?id=1371575&ln=1&src=10ms)</label>
                                                <input
                                                    type="url"
                                                    value={job.job_details.jobUrl}
                                                    onChange={(e) => handleJobChange(index, null, e.target.value, 'jobUrl')}
                                                    className="w-full bg-black rounded px-3 py-2"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Educational Requirements: (e.g Masters, Bachelor's Degree)</label>
                                                <textarea
                                                    value={job.job_details.skillRequired.educational}
                                                    onChange={(e) => handleJobChange(index, null, e.target.value, 'skillRequired', 'educational')}
                                                    className="w-full bg-black rounded px-3 py-2"
                                                    rows="4"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Experience Years: (e.g 5 yrs)</label>
                                                <input
                                                    type="text"
                                                    value={job.job_details.experienceRequired.year}
                                                    onChange={(e) => handleJobChange(index, null, e.target.value, 'experienceRequired', 'year')}
                                                    className="w-full bg-black rounded px-3 py-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Source: (bdjobs, manual)</label>
                                                <input
                                                    type="text"
                                                    value={job.source}
                                                    onChange={(e) => handleJobChange(index, 'source', e.target.value)}
                                                    className="w-full bg-black rounded px-3 py-2"
                                                />
                                            </div>


                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mt-2 mb-2">
                                                <span className="font-semibold">Output:</span>
                                                <span className="text-sm text-gray-400">
                                                    Character Count: {getOutputCharCountWithSpaces(job)}
                                                </span>
                                            </div>
                                            <div className="bg-slate-950 p-5 rounded overflow-auto custom-scroll whitespace-normal">
                                                {job.company_name}
                                                {job.job_title}
                                                {job.category}
                                                {job.deadline}
                                                {job.job_details.skillRequired.educational}
                                                {job.job_details.experienceRequired.year}
                                                {job.job_details.jobUrl}
                                                {job.source}
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        ))}
                        <div className="flex gap-4">
                            <ButtonCreate label="Add Another Job" onClick={addJob} />
                            <ButtonCreate label="Submit Job" onClick={handleBulkCreate} />

                        </div>
                    </div>

                    {/* Contents Table */}
                    {/* Contents Table */}
                    <div className="overflow-x-auto custom-scrollbar">
                        {filteredContents.length > 0 ? (

                            <div className="min-w-full">
                                {/* Table Header */}
                                <div className="bg-gray-800 grid grid-cols-5 sticky top-0 z-10 border-b-2 border-gray-600">
                                    {columns.map((column) => (
                                        <div key={column} className='px-4 py-3 text-center text-sm font-medium text-cyan-200 uppercase tracking-wider'>
                                            {column}
                                        </div>
                                    ))}
                                </div>

                                {/* Virtualized Table Body */}
                                <div className="bg-gray-900">
                                    <FixedSizeList
                                        height={700}
                                        width="100%"
                                        itemCount={contents.length}
                                        itemSize={100}
                                        className="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
                                    >
                                        {Row}
                                    </FixedSizeList>
                                </div>
                            </div>

                        ) : (
                            <p className="text-center text-gray-500">No Contents found</p>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default JobEntryPage;