import React, { useState } from 'react';

const MessageBox = ({ 
  messages = [], 
  loading = false, 
  fetchError = null, 
  templateMapping = {},
  updateMessage,
  selectedMatchId
}) => {
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleEditClick = (message, index) => {
    setEditingMessageId(index);
    setEditingText(message.text_for_review || '');
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditingText('');
  };

  const handleTextChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= 160) {
      setEditingText(newValue);
    }
  };

  const handleUpdateMessage = async (message, index) => {
    if (!editingText.trim()) {
      alert('Message cannot be empty.');
      return;
    }

    try {
      setUpdateLoading(true);
      
      if (updateMessage) {
        const success = await updateMessage(message.id || index, {
          ...message,
          text_for_review: editingText
        });
        
        if (success) {
          alert('Message updated successfully!');
          setEditingMessageId(null);
          setEditingText('');
        } else {
          throw new Error('Update failed');
        }
      } else {
        const response = await fetch(`http://192.168.3.35:8002/sport/api/sportListing/${message.id || index}/`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...message,
            text_for_review: editingText,
            updated_at: new Date().toISOString()
          })
        });

        if (response.ok) {
          alert('Message updated successfully!');
          setEditingMessageId(null);
          setEditingText('');
          window.location.reload();
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
    } catch (error) {
      console.error('Error updating message:', error);
      alert('Failed to update message. Please try again.');
    } finally {
      setUpdateLoading(false);
    }
  };

  const isCharacterLimitReached = editingText.length >= 160;

  const matchPrimaryKey = selectedMatchId;
  const filteredMessages = matchPrimaryKey 
    ? messages.filter(message => message.match == matchPrimaryKey)
    : messages;

  console.log('📊 MessageBox - Total messages:', messages.length, 'Filtered for sport_match.id', matchPrimaryKey, ':', filteredMessages.length);

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-bold text-white">Message Boxes</h4>
        {selectedMatchId && (
          <span className="bg-blue-900/30 text-blue-300 border border-blue-700/50 px-3 py-1 rounded-full text-sm font-semibold">
            Match #{selectedMatchId} Events
          </span>
        )}
      </div>
      
      {/* Error State */}
      {fetchError && (
        <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 mb-4 flex items-center gap-3">
          <span className="text-red-400 text-lg">⚠️</span>
          <span className="text-red-300">{fetchError}</span>
        </div>
      )}
      
      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <div className="text-gray-400 text-lg">Loading messages...</div>
        </div>
      ) : filteredMessages.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="text-6xl opacity-50">📭</div>
          <div className="text-gray-400 text-lg text-center">
            {selectedMatchId ? `No events found for Match #${selectedMatchId}` : 'No messages available.'}
          </div>
          <div className="text-gray-500 text-sm text-center max-w-md">
            {selectedMatchId 
              ? 'Create events for this match using the templates above'
              : 'Generated messages will appear here'
            }
          </div>
        </div>
      ) : (
        /* Messages Grid */
        <div className="max-h-96 overflow-y-auto space-y-4 pr-2">
          {filteredMessages
            .slice()
            .reverse()
            .map((message, index) => {
              const eventType = message.event_type
                ? message.event_type.charAt(0).toUpperCase() + message.event_type.slice(1)
                : 'Unknown';
              const template = templateMapping[eventType] || {};
              const isEditing = editingMessageId === index;

              return (
                <div
                  key={message.id || index}
                  className={`relative bg-gray-800 rounded-lg border transition-all duration-200 ${
                    isEditing 
                      ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  {/* Character Count Badge */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <span className={`px-2 py-1 rounded-full text-xs font-mono ${
                      isEditing 
                        ? (isCharacterLimitReached ? 'bg-red-900/50 text-red-300' : 'bg-blue-900/50 text-blue-300')
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {isEditing 
                        ? `${editingText.length}/160`
                        : `${(message.text_for_review?.length || 0)}/160`
                      }
                    </span>
                  </div>
                  
                  {/* Message Header */}
                  <div className="flex items-center justify-between p-4 pb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        {template.icon || '📝'}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm font-medium">
                          {message.event_subtype || 'Football'}
                        </span>
                        {message.match_context && (
                          <span className="bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs">
                            {message.match_context.teams} • {message.match_context.minute}'
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {!isEditing && (
                      <button
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
                        onClick={() => handleEditClick(message, index)}
                        title="Edit message"
                      >
                        <span>✏️</span>
                        <span className="text-sm">Edit</span>
                      </button>
                    )}
                  </div>
                  
                  {/* Message Content */}
                  <div className="px-4 pb-4">
                    {isEditing ? (
                      <div className="space-y-3">
                        <textarea
                          className="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none transition-colors duration-200"
                          value={editingText}
                          onChange={handleTextChange}
                          maxLength={160}
                          placeholder="Edit your message..."
                          rows={3}
                          autoFocus
                        />
                        <div className={`text-xs ${isCharacterLimitReached ? 'text-red-400' : 'text-gray-400'}`}>
                          {editingText.length}/160 characters
                          {isCharacterLimitReached && ' (limit reached)'}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="text-blue-300 text-base leading-relaxed break-words">
                          {message.text_for_review || 'No message content'}
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-400">
                          {message.created_at && (
                            <span>
                              {new Date(message.created_at).toLocaleString()}
                            </span>
                          )}
                          {message.match && (
                            <span className="text-blue-400 font-semibold">
                              Match #{message.match}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Edit Actions */}
                  {isEditing && (
                    <div className="flex justify-end space-x-2 p-4 pt-0">
                      <button
                        className="flex items-center space-x-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors duration-200"
                        onClick={handleCancelEdit}
                        disabled={updateLoading}
                      >
                        <span>✕</span>
                        <span>Cancel</span>
                      </button>
                      <button
                        className={`flex items-center space-x-1 px-4 py-2 rounded-md transition-colors duration-200 ${
                          editingText.trim() && !updateLoading
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                        }`}
                        onClick={() => handleUpdateMessage(message, index)}
                        disabled={!editingText.trim() || updateLoading}
                      >
                        <span>{updateLoading ? '⏳' : '✓'}</span>
                        <span>{updateLoading ? 'Updating...' : 'Update'}</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default MessageBox;