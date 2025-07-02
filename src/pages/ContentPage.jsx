import React, { useState, useEffect } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import apiClient from '../api/axiosInstance';
import ButtonCreate from '../components/ui/ButtonCreate';
import InputField from '../components/form/InputField';
import { FixedSizeList } from 'react-window';

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
    // const columns = Object.keys(newContent);
    const columns = ["id", "external_id","title","category","deadline"]

    const Row = ({ style, index }) => {
        const content = contents[index]
        return (
            <div style={style} className="grid grid-cols-5 w-full text-gray-300 py-2 border-b border-gray-600 hover:bg-gray-700">
                <div className="px-4 py-3 text-center">{content.id}</div>
                <div className="px-4 py-3 text-center">{content.external_id}</div>
                <div className="px-4 py-3 text-center">{content.title}</div>
                <div className="px-4 py-3 text-center">{content.category}</div>
                <div className="px-4 py-3 text-center">{new Date(content.deadline).toLocaleDateString()}</div>

            </div>
        )
    }
    return (

        <div className="px-4 py-8">
            <div className="rounded-lg bg-slate-700 shadow-lg">
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
                    <InputField
                        type="text"
                        placeholder="Search Contents by Region..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-1 bg-slate-900 text-gray-100 rounded"
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
                                    className="w-full bg-black rounded px-3 py-2
                                        [&::-webkit-calendar-picker-indicator]:bg-dark 
                                                        [&::-webkit-calendar-picker-indicator]:rounded
                                                        [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                    style={{ colorScheme: 'dark' }}
                                />
                            ))}
                            <ButtonCreate
                                onClick={handleCreateContent}
                                label='Add Content'
                            />
                        </div>
                    </div>

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
                                        height={400}
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

export default ContentsPage;