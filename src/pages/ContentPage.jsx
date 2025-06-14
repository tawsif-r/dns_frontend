import React, { useState, useEffect } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import apiClient from '../api/axiosInstance';

function ContentsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [contents, setContents] = useState([]);
    const [editingContent, setEditingContent] = useState(null);
    const [newContent, setNewContent] = useState({
        title: '',
        external_id: '',
        category: '',
        description: '',
        published: '',
        deadline: '',
        status: '',
        details: '',
        is_active: '',
        created_at: '',
        updated_at: '',

    });

    const baseUrl = '/admin/api/contents/';

    // Fetch Contents on page load
    useEffect(() => {
        const fetchContents = async () => {
            try {
                const response = await apiClient.get(baseUrl);
                setContents(response.data);
            } catch (error) {
                console.error('Error fetching Contents:', error);
            }
        };
        fetchContents();
    }, []);

    const filteredContents = contents.filter((content) =>
        content.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateContent = async () => {
        if (!newContent.external_id || !newContent.title || !newContent.category) {
            alert('Please fill in required fields (Content ID, title, and Category)');
            return;
        }

        try {
            const response = await apiClient.post(baseUrl, newContent);
            setContents([...contents, response.data]);
            setNewContent({
                title: '',
                external_id: '',
                category: '',
                description: '',
                published: '',
                deadline: '',
                status: '',
                details: '',
                is_active: '',
                created_at: '',
                updated_at: '',
            });
        } catch (error) {
            console.error('Error creating Content:', error);
            alert('Failed to create Content');
        }
    };

    const handleUpdateContent = async () => {
        if (!editingContent.category || !editingContent.title || !editingContent.external_id) {
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

    // Define table columns
    const columns = Object.keys(newContent);

    return (

        <div className="px-4 py-8">
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
                    {/* New Content Form */}
                    <div className="mb-8 p-4 rounded-lg">
                        <h2 className="flex items-center text-lg font-semibold mb-4">
                            <PlusIcon className="mr-2" />
                            Add New Content
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(newContent).map(([key, value]) => (
                                <input
                                    key={key}
                                    type={key === 'published' || key === 'deadline' ? 'datetime-local' : 'text'}
                                    placeholder={key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                    value={value}
                                    onChange={(e) => setNewContent({ ...newContent, [key]: e.target.value })}
                                    className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200
                                        [&::-webkit-calendar-picker-indicator]:bg-dark 
                                                        [&::-webkit-calendar-picker-indicator]:rounded
                                                        [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                    style={{ colorScheme: 'dark' }}
                                />
                            ))}
                            <button
                                onClick={handleCreateContent}
                                className="md:col-span-2 font-bold bg-black text-white px-4 py-2 rounded border-2 border-cyan-600 hover:bg-gray-300 hover:text-black transition duration-500"
                            >
                                Add Content
                            </button>
                        </div>
                    </div>

                    {/* Contents Table */}
                    <div className="overflow-x-auto">
                        {filteredContents.length > 0 ? (
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
                                    {filteredContents.map((content) => (
                                        editingContent?.id === content.id ? (
                                            <tr key={content.id} className="bg-gray-700">
                                                {columns.slice(0, 5).map((column) => (
                                                    <td key={column} className="px-4 py-2">
                                                        <input
                                                            type={column === 'published' || column === 'deadline' ? 'datetime-local' : 'text'}
                                                            value={editingContent[column] || ''}
                                                            onChange={(e) => setEditingContent({
                                                                ...editingContent,
                                                                [column]: e.target.value
                                                            })}
                                                            className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500 [&::-webkit-calendar-picker-indicator]:bg-dark 
                                                        [&::-webkit-calendar-picker-indicator]:rounded
                                                        [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                                            style={{ colorScheme: 'dark' }}
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
                                                {columns.slice(0, 5).map((column) => (
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

export default ContentsPage;