import React, { useState, useEffect, useCallback } from 'react';
import {
  GoalsTemplate, CardsTemplate, OtherTemplate, SpecialTemplate,
  SubstitutionsTemplate, TimeEventsTemplate, VARTemplate
} from '../football';
import MessageBox from './MessageBox';

// Constants
const TEMPLATES = {
  Goals: GoalsTemplate, Cards: CardsTemplate, Substitutions: SubstitutionsTemplate,
  VAR: VARTemplate, 'Time Events': TimeEventsTemplate, Special: SpecialTemplate, Other: OtherTemplate
};

const TABS = [
  { name: 'Goals', icon: '⚽' }, { name: 'Cards', icon: '🟨' }, { name: 'Substitutions', icon: '🔄' },
  { name: 'VAR', icon: '📹' }, { name: 'Time Events', icon: '⏰' }, { name: 'Special', icon: '🔴' }, { name: 'Other', icon: '📋' }
];

const API_URL = 'http://192.168.3.35:8002/sport/api/sportListing/';

// Error Boundary
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-100 border border-red-400 rounded-lg p-3 text-red-700">
          <h4 className="font-bold mb-1">Error Rendering Component</h4>
          <p>{this.state.error?.message || 'An unexpected error occurred.'}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Custom hook for message API
const useMessages = (selectedMatchId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMessages = useCallback(async () => {
    if (!selectedMatchId) return setMessages([]);
    
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      const filtered = data.filter(msg => msg.match == selectedMatchId);
      setMessages(Array.isArray(filtered) ? filtered : []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedMatchId]);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const addMessage = (newMessage) => setMessages(prev => [...prev, newMessage]);

  return { messages, loading, error, addMessage };
};

// Custom hook for form state
const useFormState = (activeTab) => {
  const [formData, setFormData] = useState({});
  const [otherSummary, setOtherSummary] = useState('');
  const [editableMessage, setEditableMessage] = useState('');
  const [showEditBox, setShowEditBox] = useState(false);

  const updateField = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));
  
  const clearForm = () => {
    setFormData({});
    setOtherSummary('');
    setEditableMessage('');
    setShowEditBox(false);
  };

  const hasContent = () => {
    if (activeTab === 'Other') return otherSummary.trim().length > 0;
    return Object.values(formData).some(value => value?.toString().trim());
  };

  return {
    formData, otherSummary, editableMessage, showEditBox,
    setOtherSummary, setEditableMessage, setShowEditBox,
    updateField, clearForm, hasContent
  };
};

// Tab Component
const TabButton = ({ tab, active, onClick, disabled }) => (
  <button 
    className={`flex items-center px-3 py-2 rounded ${active ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
    onClick={() => onClick(tab.name)}
    disabled={disabled}
  >
    <span className="mr-2">{tab.icon}</span>
    <span>{tab.name}</span>
  </button>
);

// Quick Select Component
const QuickSelect = ({ template, selected, onSelect, disabled }) => {
  if (!template.quickSelect) return null;
  
  return (
    <div className="mb-6">
      <h4 className="text-gray-400 text-sm font-semibold mb-2">Quick Select</h4>
      <p className="text-gray-500 text-xs mb-4">Choose event type</p>
      <div className="grid grid-cols-3 gap-2">
        {template.quickSelect.map((option, index) => (
          <div 
            key={index}
            className={`flex items-center p-2 rounded ${selected === index ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'} ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => !disabled && onSelect(index)}
          >
            <div className="mr-2">{option.icon}</div>
            <div className="text-sm">{option.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Form Fields Component
const FormFields = ({ fields, onFieldChange, disabled }) => {
  if (!fields?.length) return null;
  
  return (
    <div className="mb-6">
      <h4 className="text-gray-400 text-sm font-semibold mb-2">Event Details</h4>
      <div className="grid grid-cols-2 gap-4">
        {fields.map((field, index) => (
          <div key={index}>
            <label className="block text-gray-500 text-xs mb-1">{field.label}</label>
            <input 
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500 disabled:opacity-50"
              type="text" 
              defaultValue={field.value || ''}
              placeholder={field.placeholder}
              onChange={(e) => onFieldChange(field.key, e.target.value)}
              disabled={disabled}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Edit Message Box Component
const EditMessageBox = ({ message, onChange, onConfirm, onCancel, loading, canConfirm }) => {
  const isAtLimit = message.length >= 160;
  
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-4 w-96">
        <div className="flex items-center mb-4">
          <div className="mr-2 text-xl">✨</div>
          <div>
            <h4 className="text-white text-lg font-semibold">Review & Edit Message</h4>
            <p className="text-gray-400 text-sm">Perfect your message before publishing</p>
          </div>
        </div>

        <div className="mb-4">
          <textarea 
            className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500 resize-none h-24"
            placeholder="Edit your message here..."
            value={message}
            onChange={(e) => e.target.value.length <= 160 && onChange(e.target.value)}
            maxLength={160}
          />
          
          <div className="flex justify-between mt-2 text-xs">
            <div className={`text-gray-400 ${isAtLimit ? 'text-red-500' : ''}`}>
              {message.length}/160 characters{isAtLimit && ' • Limit reached'}
            </div>
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-1 ${isAtLimit ? 'bg-red-500' : 'bg-green-500'}`}></div>
              <span className={`text-gray-400 ${isAtLimit ? 'text-red-500' : 'text-green-500'}`}>
                {isAtLimit ? 'Full' : 'Ready'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <button 
            onClick={onConfirm}
            disabled={!canConfirm}
            className={`px-4 py-2 rounded ${canConfirm ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
          >
            <span>{loading ? '⏳' : '🚀'}</span>
            {loading ? 'Publishing...' : 'Confirm & Publish'}
          </button>
          <button onClick={onCancel} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            <span>✕</span>Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const Message = ({ teamsData, scoreData, matchData, selectedMatchId }) => {
  const [activeTab, setActiveTab] = useState('Special');
  const [selectedQuickSelect, setSelectedQuickSelect] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const { messages, loading: fetchLoading, error: fetchError, addMessage } = useMessages(selectedMatchId);
  const {
    formData, otherSummary, editableMessage, showEditBox,
    setOtherSummary, setEditableMessage, setShowEditBox,
    updateField, clearForm, hasContent
  } = useFormState(activeTab);

  const currentTemplate = TEMPLATES[activeTab] || SpecialTemplate;
  const currentEventDetails = currentTemplate.eventDetails?.[selectedQuickSelect] || currentTemplate.eventDetails?.[0] || [];

  // Generate message text
  const generateMessageText = (eventData, eventType, eventSubtype) => {
    const template = TEMPLATES[eventType];
    if (template?.generateMessage) {
      const args = [eventData, eventSubtype];
      if (template.generateMessage.length > 2) args.push(scoreData, teamsData);
      return template.generateMessage(...args);
    }
    return `📝 MATCH EVENT! ${eventSubtype}: ${eventData.description || 'Important match development recorded'} - stay tuned for more action! 🏈`;
  };

  // API call to save message
  const saveMessage = async (eventData, messageText) => {
    const matchId = matchData?.id || selectedMatchId;
    if (!matchId) throw new Error('No match ID available');

    const payload = {
      event_type: activeTab.toLowerCase(),
      event_subtype: activeTab === 'Other' ? 'Summary' : currentTemplate.quickSelect?.[selectedQuickSelect]?.label || 'General',
      event_data: eventData,
      text_for_review: messageText,
      sport_category: 'football',
      match: Number(matchId),
      match_context: matchData ? {
        teams: teamsData ? `${teamsData.home?.team_name || 'Home'} vs ${teamsData.away?.team_name || 'Away'}` : 'Unknown vs Unknown',
        score: scoreData ? `${scoreData.home}-${scoreData.away}` : '0-0',
        minute: matchData.minute || 0,
        tournament: matchData.tournament_id || 'Unknown'
      } : null,
      created_at: new Date().toISOString()
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`${response.status} - ${errorText}`);
    }

    return response.json();
  };

  // Event handlers
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSelectedQuickSelect(0);
    clearForm();
  };

  const handleGenerateMessage = () => {
    if (!hasContent() || !selectedMatchId) {
      alert(selectedMatchId ? 'Please fill in at least one field.' : 'Please select a match first.');
      return;
    }

    let messageText;
    if (activeTab === 'Other') {
      messageText = otherSummary || '📝 Event summary';
    } else {
      messageText = generateMessageText(
        formData, 
        activeTab, 
        currentTemplate.quickSelect?.[selectedQuickSelect]?.label || 'General'
      );
    }

    setEditableMessage(messageText);
    setShowEditBox(true);
  };

  const handleConfirmMessage = async () => {
    if (!editableMessage.trim() || !selectedMatchId) {
      alert(editableMessage.trim() ? 'No match selected.' : 'Message cannot be empty.');
      return;
    }

    try {
      setLoading(true);
      const currentFormData = activeTab === 'Other' ? { summary: otherSummary } : formData;
      const data = await saveMessage(currentFormData, editableMessage);
      
      addMessage(data);
      alert(`Message saved for match ID ${matchData?.id || selectedMatchId} successfully!`);
      setShowEditBox(false);
      clearForm();
    } catch (error) {
      console.error('Error saving message:', error);
      alert(`Failed to save: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const canGenerateMessage = !loading && hasContent() && selectedMatchId;
  const canConfirmMessage = !loading && editableMessage.trim() && selectedMatchId;

  return (
    <ErrorBoundary>
      <div className="bg-gray-800 rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-lg font-semibold">Message Templates</h3>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">{messages.length} Messages</span>
            {selectedMatchId && (
              <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">
                Match #{selectedMatchId}
              </span>
            )}
          </div>
        </div>

        {/* No Match Selected Warning */}
        {!selectedMatchId && (
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mb-4 text-yellow-800">
            <div className="font-bold mb-1">⚠️ No Match Selected</div>
            <div className="text-sm">Please select a match from the Active Matches sidebar to create events.</div>
          </div>
        )}
        
        <div>
          {/* Tabs */}
          <div className="flex space-x-2 mb-4">
            {TABS.map(tab => (
              <TabButton 
                key={tab.name} 
                tab={tab} 
                active={activeTab === tab.name}
                onClick={handleTabChange}
                disabled={!selectedMatchId}
              />
            ))}
          </div>

          {/* Form Content */}
          {activeTab === 'Other' ? (
            <div className="mb-6">
              <h4 className="text-gray-400 text-sm font-semibold mb-2">Event Summary</h4>
              <p className="text-gray-500 text-xs mb-4">Write a summary of the event or situation</p>
              <textarea 
                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500 resize-none h-24 disabled:opacity-50"
                placeholder="Enter event summary here... (e.g., Weather delay, Fan incident, Technical issue, etc.)"
                value={otherSummary}
                onChange={(e) => e.target.value.length <= 160 && setOtherSummary(e.target.value)}
                maxLength={160}
                disabled={!selectedMatchId}
              />
              <div className={`text-xs text-gray-400 mt-1 ${otherSummary.length >= 160 ? 'text-red-500' : ''}`}>
                {otherSummary.length}/160 characters{otherSummary.length >= 160 && ' (limit reached)'}
              </div>
            </div>
          ) : (
            <>
              <QuickSelect 
                template={currentTemplate}
                selected={selectedQuickSelect}
                onSelect={setSelectedQuickSelect}
                disabled={!selectedMatchId}
              />
              <FormFields 
                fields={currentEventDetails}
                onFieldChange={updateField}
                disabled={!selectedMatchId}
              />
            </>
          )}

          {/* Edit Message Box */}
          {showEditBox && (
            <EditMessageBox 
              message={editableMessage}
              onChange={setEditableMessage}
              onConfirm={handleConfirmMessage}
              onCancel={() => setShowEditBox(false)}
              loading={loading}
              canConfirm={canConfirmMessage}
            />
          )}

          {/* Action Buttons */}
          {!showEditBox && (
            <div className="text-center mt-8">
              <button 
                className={`px-4 py-2 rounded ${canGenerateMessage ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
                onClick={handleGenerateMessage}
                disabled={!canGenerateMessage}
                title={!selectedMatchId ? 'Please select a match first' : 'Generate message for selected match'}
              >
                <span>{loading ? '⏳' : '⚡'}</span>
                {loading ? 'Generating...' : 'Generate Message'}
              </button>
              <button className="ml-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700" onClick={clearForm}>Clear</button>
            </div>
          )}

          <MessageBox 
            messages={messages}
            loading={fetchLoading}
            fetchError={fetchError}
            templateMapping={TEMPLATES}
            selectedMatchId={selectedMatchId}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Message;