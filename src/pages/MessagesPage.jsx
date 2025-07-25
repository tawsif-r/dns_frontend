import React, { useState, useEffect } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import { FixedSizeList } from 'react-window'; // Import react-window
import apiClient from '../api/axiosInstance';
import MessagesQList from '../components/MessagesQList';
import ButtonCreate from '../components/ui/ButtonCreate';

function MessagesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [messages, setMessages] = useState([]);
    const [editingMessage, setEditingMessage] = useState(null);
    const [newMessage, setNewMessage] = useState({
        to: '',
        body: '',
        sender: ''
    });
    const [queueMessages, setQueueMessages] = useState([]);

    const baseUrl = '/admin/api/messages/';
    const queueBaseUrl = '/admin/api/messagesQueue/';

    // Fetch messages on page load
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await apiClient.get(baseUrl);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        const fetchQueueMessages = async () => {
            try {
                const response = await apiClient.get(queueBaseUrl);
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
            const response = await apiClient.post(baseUrl, newMessage);
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
            const response = await apiClient.put(`${baseUrl}${editingMessage.id}/`, editingMessage);
            setMessages(messages.map((msg) =>
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
            await apiClient.delete(`${baseUrl}${id}/`);
            setMessages(messages.filter((msg) => msg.id !== id));
            if (editingMessage?.id === id) {
                setEditingMessage(null);
            }
        } catch (error) {
            console.error('Error deleting message:', error);
            alert('Failed to delete message');
        }
    };

    const columns = Object.keys(newMessage);
    const queueColumns = ['id','schedule','sent','channel','charge','created_at','subcriber','content']; //gives an array of the field names of the first object in queueMessages array
    const RowMessageQueue = ({ index, style }) => {
        const queueMessage = queueMessages[index]
        return (
            <div style={style} className='grid grid-cols-8 hover:border-l-4 w-full text-gray-300 py-2'>
                <div className='px-4 py-3'>{queueMessage.id}</div>
                <div className='px-4 py-3'>{queueMessage.scheduled_time}</div>
                <div className='px-4 py-3'>{queueMessage.sent ? "true":"false"}</div>
                <div className='px-4 py-3'>{queueMessage.channel}</div>
                <div className='px-4 py-3'>{queueMessage.charge}</div>
                <div className='px-4 py-3'>{queueMessage.created_at}</div>
                <div className='px-4 py-3'>{queueMessage.subscriber}</div>
                <div className='px-4 py-3'>{queueMessage.content}</div>
            </div>
        )
    }

    // Row renderer for react-window
    const Row = ({ index, style }) => {
        const message = filteredMessages[index];
        const isEditing = editingMessage?.id === message.id;

        return (
            <div
                style={style}
                className={`grid grid-cols-4 w-full hover:border-l-4 text-gray-300 ${isEditing ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            >
                <div className="mx-auto">
                    {isEditing ? (
                        <input
                            type="text"
                            value={editingMessage.to}
                            onChange={(e) => setEditingMessage({ ...editingMessage, to: e.target.value })}
                            className="w-full bg-gray-800 rounded px-2 py-1 text-white"
                        />
                    ) : (
                        message.to || 'N/A'
                    )}
                </div>
                <div className="mx-auto">
                    {isEditing ? (
                        <input
                            type="text"
                            value={editingMessage.body}
                            onChange={(e) => setEditingMessage({ ...editingMessage, body: e.target.value })}
                            className="w-full bg-gray-800 rounded px-2 py-1 text-white"
                        />
                    ) : (
                        message.body || 'N/A'
                    )}
                </div>
                <div className="mx-auto">
                    {isEditing ? (
                        <input
                            type="text"
                            value={editingMessage.sender}
                            onChange={(e) => setEditingMessage({ ...editingMessage, sender: e.target.value })}
                            className="w-full bg-gray-800 rounded px-2 py-1 text-white"
                        />
                    ) : (
                        message.sender || 'N/A'
                    )}
                </div>
                <div className="px-4 py-3 text-right whitespace-nowrap">
                    {isEditing ? (
                        <>
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
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="px-4 py-8">
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
                            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                        </svg>
                        <h1 className="text-xl font-bold">Messages Management</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Search Messages by Recipient..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-1 bg-slate-900 text-gray-100 rounded"
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
                                className="w-full bg-black rounded px-3 py-2"
                            />
                            <input
                                type="text"
                                placeholder="Sender"
                                value={newMessage.sender}
                                onChange={(e) => setNewMessage({ ...newMessage, sender: e.target.value })}
                                className="w-full bg-black rounded px-3 py-2"
                            />
                            <textarea
                                placeholder="Message Body"
                                value={newMessage.body}
                                onChange={(e) => setNewMessage({ ...newMessage, body: e.target.value })}
                                className="w-full bg-black rounded px-3 py-2"
                                rows="4"
                            />
                            <ButtonCreate label='Add Message' onClick={handleCreateMessage} />
                            {/* <button
                                onClick={handleCreateMessage}
                                className="font-bold bg-black text-white px-4 py-2 rounded hover:bg-gray-300 hover:text-black transition duration-500"
                            >
                                Add Message
                            </button> */}
                        </div>
                    </div>

                    {/* Virtualized Messages List */}
                    <div className="flex-col">
                        <div className="overflow-x-auto custom-scrollbar rounded-lg">
                            {filteredMessages.length > 0 ? (
                                <>
                                    {/* Table Header */}
                                    <div className="bg-gray-900 grid grid-cols-4">
                                        {columns.map((column) => (
                                            <div
                                                key={column}
                                                className="px-4 py-3 text-left text-sm font-medium text-cyan-400 uppercase tracking-wider"
                                            >
                                                {column.charAt(0).toUpperCase() + column.slice(1)}
                                            </div>
                                        ))}
                                        <div className="px-4 py-3 text-right text-cyan-400">Actions</div>
                                    </div>
                                    {/* Virtualized List */}
                                    <FixedSizeList
                                        className='bg-gray-800'
                                        height={400} // Adjust height based on your needs
                                        width="100%"
                                        itemCount={filteredMessages.length}
                                        itemSize={140} // Adjust based on row height (estimate based on padding and content)
                                    >
                                        {Row}
                                    </FixedSizeList>
                                </>
                            ) : (
                                <p className="text-center text-gray-500">No messages found</p>
                            )}
                        </div>
                        <div className="flex-col py-6">
                            <div>Message queue</div>
                            <div className="overflow-x-auto custom-scrollbar rounded-lg">
                                <div className='bg-gray-700 grid grid-cols-8'>
                                    {queueColumns.map((column) => (
                                        <div key={column} className='px-4 py-3 text-left text-sm bg-slate-900 font-medium text-cyan-400 uppercase tracking-wider'>
                                            {column}
                                        </div>
                                    ))}
                                </div>
                                <FixedSizeList
                                    height={400}
                                    width="100%"
                                    itemCount={queueMessages.length}
                                    itemSize={140}
                                    className='bg-gray-800'
                                >{RowMessageQueue}</FixedSizeList>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessagesPage;