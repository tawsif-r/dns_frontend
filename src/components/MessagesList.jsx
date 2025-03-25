import React, { useState } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import axios from 'axios';

function MessagesList({ messages, setMessages }) {  // Added setMessages as prop
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingMessage, setEditingMessage] = useState(null);
  const [newMessage, setNewMessage] = useState({
    to: '',
    body: '',
    sender: ''
  });

  const baseUrl = 'http://192.168.3.37:8001/admin/api/messages/';

  // Filtered messages based on search term
  const filteredMessages = messages.filter((message) =>
    message.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Create a new message
  const handleCreateMessage = async () => {
    if (!newMessage.to || !newMessage.body || !newMessage.sender) {
      alert('Please fill in all fields');
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

  // Update an existing message
  const handleUpdateMessage = async () => {
    if (!editingMessage.to || !editingMessage.body || !editingMessage.sender) {
      alert('Please fill in all fields');
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

  // Delete a message
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

  return (
    <div className="dashboar-card bg-gray-900 text-white rounded-lg shadow-lg">
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
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
          <h2 className="text-lg font-semibold">Messages</h2>
        </div>
        <input
          type="text"
          placeholder="Search Messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ml-4 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {isOpen && (
        <div className="p-4 bg-gray-900 max-h-80 overflow-y-auto">
          {/* New Message Form */}
          <div className="mb-6">
            <h3 className="flex items-center text-purple-400 mb-2">
              <PlusIcon className="mr-2" /> 
              Create New Message
            </h3>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="To"
                value={newMessage.to}
                onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })}
                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
              />
              <input
                type="text"
                placeholder="Sender"
                value={newMessage.sender}
                onChange={(e) => setNewMessage({ ...newMessage, sender: e.target.value })}
                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
              />
              <textarea
                placeholder="Message Body"
                value={newMessage.body}
                onChange={(e) => setNewMessage({ ...newMessage, body: e.target.value })}
                className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                rows="3"
              />
              <button 
                onClick={handleCreateMessage}
                className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-200"
              >
                Add Message
              </button>
            </div>
          </div>

          {/* Messages List */}
          {filteredMessages.length > 0 ? (
            <ul className="space-y-4">
              {filteredMessages.map((message) => (
                <li 
                  key={message.id} 
                  className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                >
                  {editingMessage?.id === message.id ? (
                    // Edit Mode
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editingMessage.to}
                        onChange={(e) => setEditingMessage({ ...editingMessage, to: e.target.value })}
                        className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                      />
                      <input
                        type="text"
                        value={editingMessage.sender}
                        onChange={(e) => setEditingMessage({ ...editingMessage, sender: e.target.value })}
                        className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                      />
                      <textarea
                        value={editingMessage.body}
                        onChange={(e) => setEditingMessage({ ...editingMessage, body: e.target.value })}
                        className="w-full border border-purple-600 bg-gray-800 text-white p-2 rounded focus:outline-none focus:border-purple-400"
                        rows="3"
                      />
                      <div className="flex space-x-2">
                        <button 
                          onClick={handleUpdateMessage}
                          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
                        >
                          <SaveIcon className="mr-2" /> Save
                        </button>
                        <button 
                          onClick={() => setEditingMessage(null)}
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
                            onClick={() => setEditingMessage(message)}
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                          >
                            <EditIcon />
                          </button>
                          <button 
                            onClick={() => handleDeleteMessage(message.id)}
                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p><strong>To:</strong> {message.to}</p>
                        <p><strong>Sender:</strong> {message.sender}</p>
                        <p><strong>Message:</strong> {message.body}</p>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No messages found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MessagesList;