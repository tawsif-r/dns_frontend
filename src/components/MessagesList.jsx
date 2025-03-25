import React, { useState } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';

function MessagesList({messages}) {
  // Initial state with some sample messages
//   const [messages, setMessages] = useState([]);

  // State for managing UI and form interactions
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingMessage, setEditingMessage] = useState(null);
  const [newMessage, setNewMessage] = useState({
    to: '',
    body: '',
    sender: ''
  });

  // Filtered messages based on search term
  const filteredMessages = messages.filter((message) =>
    message.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Create a new message
  const handleCreateMessage = () => {
    if (!newMessage.to || !newMessage.body || !newMessage.sender) {
      alert('Please fill in all fields');
      return;
    }

    const messageToAdd = {
      ...newMessage,
      id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1
    };

    setMessages([...messages, messageToAdd]);
    
    // Reset new message form
    setNewMessage({ to: '', body: '', sender: '' });
  };

  // Update an existing message
  const handleUpdateMessage = () => {
    if (!editingMessage.to || !editingMessage.body || !editingMessage.sender) {
      alert('Please fill in all fields');
      return;
    }

    setMessages(messages.map(msg => 
      msg.id === editingMessage.id ? editingMessage : msg
    ));

    // Reset editing state
    setEditingMessage(null);
  };

  // Delete a message
  const handleDeleteMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
    
    // Clear editing state if the deleted message was being edited
    if (editingMessage?.id === id) {
      setEditingMessage(null);
    }
  };

  return (
    <div className="dashboar-card">
      <div 
        className="card-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="mr-2 text-gray-600"
            fill="currentColor"
          >
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
          <h2 className="text-lg font-semibold">Messages</h2>
        </div>
        <input
          type="text"
          placeholder="Search Subscribers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ml-4 px-2 py-1 border rounded"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {isOpen && (
        <div className="p-4">
          {/* New Message Form */}
          <div>
            <h3>
              <PlusIcon/> 
              Create New Message
            </h3>
            <div>
              <input
                type="text"
                placeholder="To"
                value={newMessage.to}
                onChange={(e) => setNewMessage({...newMessage, to: e.target.value})}
                className="border p-1 rounded"
              />
              <input
                type="text"
                placeholder="Sender"
                value={newMessage.sender}
                onChange={(e) => setNewMessage({...newMessage, sender: e.target.value})}
                className="border p-1 rounded"
              />
              <textarea
                placeholder="Message Body"
                value={newMessage.body}
                onChange={(e) => setNewMessage({...newMessage, body: e.target.value})}
                className="col-span-2 border p-1 rounded"
                rows="3"
              />
              <button 
                onClick={handleCreateMessage}
                className="col-span-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Add Message
              </button>
            </div>
          </div>

          {/* Messages List */}
          {filteredMessages.length > 0 ? (
            <ul>
              {filteredMessages.map((message) => (
                <li 
                  key={message.id} 
            
                >
                  {editingMessage?.id === message.id ? (
                    // Edit Mode
                    <div>
                      <input
                        type="text"
                        value={editingMessage.to}
                        onChange={(e) => setEditingMessage({...editingMessage, to: e.target.value})}
                     
                      />
                      <input
                        type="text"
                        value={editingMessage.sender}
                        onChange={(e) => setEditingMessage({...editingMessage, sender: e.target.value})}
                    
                      />
                      <textarea
                        value={editingMessage.body}
                        onChange={(e) => setEditingMessage({...editingMessage, body: e.target.value})}
                   
                        rows="3"
                      />
                      <div>
                        <button 
                          onClick={handleUpdateMessage}
                        >
                          <SaveIcon/> Save
                        </button>
                        <button 
                          onClick={() => setEditingMessage(null)}
                          
                        >
                          <XIcon/> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <>
                      <div>
                        <button 
                          onClick={() => setEditingMessage(message)}
                   
                        >
                          <EditIcon />
                        </button>
                        <button 
                          onClick={() => handleDeleteMessage(message.id)}
                
                        >
                          <TrashIcon/>
                        </button>
                      </div>
                      <div>
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
            <p>No messages found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MessagesList;