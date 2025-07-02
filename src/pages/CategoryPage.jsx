import React, { useState, useEffect } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import apiClient from '../api/axiosInstance';
import ButtonCreate from '../components/ui/ButtonCreate';

function CategoriesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [newCategory, setNewCategory] = useState({
        name: '',
        cat_id: '',
        slug: '',
        service: '',
        keyword: '',
        description: '',
        is_active: 'true'
    });

    const baseUrl = '/admin/api/categories/';
    // Fetch categories on page load
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiClient.get(baseUrl);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);


    const filteredCategories = categories.filter((category) =>
        category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // --- Data Preprocessing ---
    const payload = {
        ...newCategory,
        is_active: newCategory.is_active === 'true' ? true : (newCategory.is_active === 'false' ? false : null),

    };


    const handleCreateCategory = async () => {
        if (!newCategory.name || !newCategory.slug) {
            alert('Please fill in required fields (Name and Slug)');
            return;
        }

        try {
            const response = await apiClient.post(baseUrl, payload);
            setCategories([...categories, response.data]);
            setNewCategory({
                name: '',
                cat_id: '',
                slug: '',
                service: '',
                keyword: '',
                description: '',
                is_active: 'true'
            });
        } catch (error) {
            console.error('Error creating category:', error);
            alert('Failed to create category');
        }
    };

    const handleUpdateCategory = async () => {
        if (!editingCategory.name || !editingCategory.slug) {
            alert('Please fill in required fields (Name and Slug)');
            return;
        }

        try {
            const response = await apiClient.put(`${baseUrl}${editingCategory.id}/`, editingCategory);
            setCategories(categories.map(cat =>
                cat.id === editingCategory.id ? response.data : cat
            ));
            setEditingCategory(null);
        } catch (error) {
            console.error('Error updating category:', error);
            alert('Failed to update category');
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await apiClient.delete(`${baseUrl}${id}/`);
            setCategories(categories.filter(cat => cat.id !== id));
            if (editingCategory?.id === id) {
                setEditingCategory(null);
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Failed to delete category');
        }
    };

    const columns = Object.keys(newCategory);

    return (
        < div className="px-4 py-8" >
            <div className="rounded-lg bg-slate-700 shadow-lg">
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
                            <path d="M4 4h16v2H4zm0 4h16v2H4zm0 4h16v2H4zm0 4h16v2H4z" />
                        </svg>
                        <h1 className="text-xl font-bold">Categories Management</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Search Categories by Name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-1 bg-slate-900 text-gray-100 rounded"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>

                <div className="p-6">
                    {/* New Category Form */}
                    <div className="mb-8 p-4 rounded-lg">
                        <h2 className="flex items-center text-lg font-semibold mb-4">
                            <PlusIcon className="mr-2" />
                            Add New Category
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Name *"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                className="w-full bg-black rounded px-3 py-2"
                            />
                            <input
                                type="text"
                                placeholder="Slug *"
                                value={newCategory.slug}
                                onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                                className="w-full bg-black rounded px-3 py-2"
                            />
                            <input
                                type="text"
                                placeholder="Service"
                                value={newCategory.service}
                                onChange={(e) => setNewCategory({ ...newCategory, service: e.target.value })}
                                className="w-full bg-black rounded px-3 py-2"
                            />
                            <input
                                type="text"
                                placeholder="Keyword"
                                value={newCategory.keyword}
                                onChange={(e) => setNewCategory({ ...newCategory, keyword: e.target.value })}
                                className="w-full bg-black rounded px-3 py-2"
                            />
                            <textarea
                                placeholder="Description"
                                value={newCategory.description}
                                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                className="w-full bg-black rounded px-3 py-2"
                                rows="3"
                            />
                            <select
                                value={newCategory.is_active}
                                onChange={(e) => setNewCategory({ ...newCategory, is_active: e.target.value })}
                                className="w-full bg-black rounded px-3 py-2"
                            >
                                <option value="">Is Active? (Select)</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                            <ButtonCreate label={'Add Category'} onClick={handleCreateCategory} />
                            {/* <button
                                onClick={handleCreateCategory}
                                className="font-bold bg-black text-white px-4 py-2 rounded hover:bg-gray-300 hover:text-black transition duration-500"
                            >
                                Add Category
                            </button> */}
                        </div>
                    </div>

                    {/* Categories Table */}
                    <div className="overflow-x-auto rounded-lg">
                        {filteredCategories.length > 0 ? (
                            <div className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                                {/* Header */}
                                <div className="grid grid-cols-[repeat(7,1fr),auto] bg-gray-900">
                                    {columns.map((column) => (
                                        <div key={column} className="px-4 py-3 text-left text-sm font-medium text-cyan-400 uppercase tracking-wider">
                                            {column.charAt(0).toUpperCase() + column.slice(1)}
                                        </div>
                                    ))}
                                    <div className="px-4 py-3 text-right">Actions</div>
                                </div>

                                {/* Body */}
                                <div className="divide-y divide-gray-600">
                                    {filteredCategories.map((category) => (
                                        editingCategory?.id === category.id ? (
                                            <div key={category.id} className="grid grid-cols-[repeat(7,1fr),auto] bg-gray-700">
                                                {columns.map((column) => (
                                                    column === 'description' ? (
                                                        <div key={column} className="px-4 py-2">
                                                            <textarea
                                                                value={editingCategory[column] ?? ""}
                                                                onChange={(e) => setEditingCategory({ ...editingCategory, [column]: e.target.value })}
                                                                className="w-full bg-gray-800 rounded px-2 py-1 text-white"
                                                                rows="2"
                                                            />
                                                        </div>
                                                    ) : column === 'is_active' ? (
                                                        <div key={column} className="px-4 py-2">
                                                            <select
                                                                value={editingCategory[column]}
                                                                onChange={(e) => setEditingCategory({ ...editingCategory, [column]: e.target.value })}
                                                                className="w-full bg-gray-800 rounded px-2 py-1 text-white"
                                                            >
                                                                <option value="true">Yes</option>
                                                                <option value="false">No</option>
                                                            </select>
                                                        </div>
                                                    ) : (
                                                        <div key={column} className="px-4 py-2">
                                                            <input
                                                                type="text"
                                                                value={editingCategory[column] ?? ""}
                                                                onChange={(e) => setEditingCategory({ ...editingCategory, [column]: e.target.value })}
                                                                className="w-full bg-gray-800 rounded px-2 py-1 text-white"
                                                            />
                                                        </div>
                                                    )
                                                ))}
                                                <div className="px-4 py-2 text-right whitespace-nowrap">
                                                    <button
                                                        onClick={handleUpdateCategory}
                                                        className="inline-flex items-center justify-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                                                    >
                                                        <SaveIcon size={16} className="mr-1" /> Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingCategory(null)}
                                                        className="inline-flex items-center justify-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                    >
                                                        <XIcon size={16} className="mr-1" /> Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div key={category.id} className="grid grid-cols-[repeat(7,1fr),auto] hover:bg-gray-700 hover:border-l-4 hover:border-gray-600">
                                                <div className="px-4 py-3 text-gray-300">{category.name || 'N/A'}</div>
                                                <div className="px-4 py-3 text-gray-300">{category.cat_id || 'N/A'}</div>
                                                <div className="px-4 py-3 text-gray-300">{category.slug || 'N/A'}</div>
                                                <div className="px-4 py-3 text-gray-300">{category.service || 'N/A'}</div>
                                                <div className="px-4 py-3 text-gray-300">{category.keyword || 'N/A'}</div>
                                                <div className="px-4 py-3 text-gray-300">{category.description || 'N/A'}</div>
                                                <div className="px-4 py-3 text-gray-300">{category.is_active ? 'Yes' : 'No'}</div>
                                                <div className="px-4 py-3 text-right whitespace-nowrap">
                                                    <button
                                                        onClick={() => setEditingCategory(category)}
                                                        className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                                    >
                                                        <EditIcon size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteCategory(category.id)}
                                                        className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                    >
                                                        <TrashIcon size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No categories found</p>
                        )}
                    </div>
                </div>
            </div>



            {/**content end */}
        </div>

    );
}

export default CategoriesPage;