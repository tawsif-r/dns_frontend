import React, { useState, useEffect } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import Nav from '../components/ui/Nav'; // Assuming you have a Nav component
import axios from 'axios';
import MessagesQList from '../components/MessagesQList'; // Import the new component

function MessagesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [messages, setMessages] = useState([]);
    const [editingMessage, setEditingMessage] = useState(null);
    const [newMessage, setNewMessage] = useState({
        to: '',
        body: '',
        sender: ''
    });
    const [queueMessages, setQueueMessages] = useState([]); // New state for message queue

    const baseUrl = 'http://192.168.3.37:8001/admin/api/messages/';
    const queueBaseUrl = 'http://192.168.3.37:8001/admin/api/message-queue/'; // Adjust this URL as needed

    // Fetch messages on page load
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(baseUrl);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        const fetchQueueMessages = async () => {
            try {
                const response = await axios.get(queueBaseUrl);
                setQueueMessages(response.data);
            } catch (error) {
                console.error('Error fetching queue messages:', error);
            }
        };

        fetchMessages();
        fetchQueueMessages();
    }, []);

    const filteredMessages = messages.filter((message) =>
        message?.to?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateMessage = async () => {
        if (!newMessage.to || !newMessage.body || !newMessage.sender) {
            alert('Please fill in all fields (To, Body, and Sender)');
            return;
        }

        try {
            const response = await axios.post(baseUrl, newMessage);
            setMessages([...messages, response.data]);
            setNewMessage({ to: '', body: '', sender: '' });
        } catch (error) {
            console.error('Error creating message:', error);
            alert('Failed to create message');
        }
    };

    const handleUpdateMessage = async () => {
        if (!editingMessage.to || !editingMessage.body || !editingMessage.sender) {
            alert('Please fill in all fields (To, Body, and Sender)');
            return;
        }

        try {
            const response = await axios.put(`${baseUrl}${editingMessage.id}/`, editingMessage);
            setMessages(messages.map(msg =>
                msg.id === editingMessage.id ? response.data : msg
            ));
            setEditingMessage(null);
        } catch (error) {
            console.error('Error updating message:', error);
            alert('Failed to update message');
        }
    };

    const handleDeleteMessage = async (id) => {
        try {
            await axios.delete(`${baseUrl}${id}/`);
            setMessages(messages.filter(msg => msg.id !== id));
            if (editingMessage?.id === id) {
                setEditingMessage(null);
            }
        } catch (error) {
            console.error('Error deleting message:', error);
            alert('Failed to delete message');
        }
    };

    // Define table columns
    const columns = Object.keys(newMessage);

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
                                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                            </svg>
                            <h1 className="text-xl font-bold">Messages Management</h1>
                        </div>
                        <input
                            type="text"
                            placeholder="Search Messages by Recipient..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-3 py-1 bg-slate-900 text-gray-100 rounded border focus:outline-none focus:border-gray-100"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    <div className="p-6">
                        {/* New Message Form */}
                        <div className="mb-8 p-4 rounded-lg">
                            <h2 className="flex items-center text-lg font-semibold mb-4">
                                <PlusIcon className="mr-2" />
                                Add New Message
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                                <input
                                    type="text"
                                    placeholder="To"
                                    value={newMessage.to}
                                    onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })}
                                    className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                />
                                <input
                                    type="text"
                                    placeholder="Sender"
                                    value={newMessage.sender}
                                    onChange={(e) => setNewMessage({ ...newMessage, sender: e.target.value })}
                                    className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                />
                                <textarea
                                    placeholder="Message Body"
                                    value={newMessage.body}
                                    onChange={(e) => setNewMessage({ ...newMessage, body: e.target.value })}
                                    className="w-full bg-black border rounded px-3 py-2 focus:outline-none focus:border-blue-200"
                                    rows="4"
                                />
                                <button
                                    onClick={handleCreateMessage}
                                    className="font-bold bg-black text-white px-4 py-2 rounded border-2 border-cyan-600 hover:bg-gray-300 hover:text-black transition duration-500"
                                >
                                    Add Message
                                </button>
                            </div>
                        </div>

                        {/* Messages Table */}
                        <div className='flex-col'>
                            <div className="overflow-x-auto border-2 rounded-lg">
                                {filteredMessages.length > 0 ? (
                                    <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                                        <thead>
                                            <tr className="bg-gray-700">
                                                {columns.map((column) => (
                                                    <th key={column} className="px-4 py-3 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">
                                                        {column.charAt(0).toUpperCase() + column.slice(1)}
                                                    </th>
                                                ))}
                                                <th className="px-4 py-3 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-600">
                                            {filteredMessages.map((message) => (
                                                editingMessage?.id === message.id ? (
                                                    <tr key={message.id} className="bg-gray-700">
                                                        <td className="px-4 py-2">
                                                            <input
                                                                type="text"
                                                                value={editingMessage.to}
                                                                onChange={(e) => setEditingMessage({ ...editingMessage, to: e.target.value })}
                                                                className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <input
                                                                type="text"
                                                                value={editingMessage.body}
                                                                onChange={(e) => setEditingMessage({ ...editingMessage, body: e.target.value })}
                                                                className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <input
                                                                type="text"
                                                                value={editingMessage.sender}
                                                                onChange={(e) => setEditingMessage({ ...editingMessage, sender: e.target.value })}
                                                                className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2 text-right whitespace-nowrap">
                                                            <button
                                                                onClick={handleUpdateMessage}
                                                                className="inline-flex items-center justify-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                                                            >
                                                                <SaveIcon size={16} className="mr-1" /> Save
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingMessage(null)}
                                                                className="inline-flex items-center justify-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                            >
                                                                <XIcon size={16} className="mr-1" /> Cancel
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    <tr key={message.id} className="hover:bg-gray-700">
                                                        <td className="px-4 py-3 text-gray-300">{message.to || 'N/A'}</td>
                                                        <td className="px-4 py-3 text-gray-300">{message.body || 'N/A'}</td>
                                                        <td className="px-4 py-3 text-gray-300">{message.sender || 'N/A'}</td>
                                                        <td className="px-4 py-3 text-right whitespace-nowrap">
                                                            <button
                                                                onClick={() => setEditingMessage(message)}
                                                                className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                                            >
                                                                <EditIcon size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteMessage(message.id)}
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
                                    <p className="text-center text-gray-500">No messages found</p>
                                )}
                            </div>
                            < MessagesQList messages={queueMessages}/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessagesPage;