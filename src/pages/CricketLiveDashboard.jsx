import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import axios from 'axios';

function CricketLiveDashboard() {
  const [selectedMatch, setSelectedMatch] = useState(0);
  const [matches, setMatches] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [errorMatches, setErrorMatches] = useState(null);
  const [errorMessages, setErrorMessages] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generateStatus, setGenerateStatus] = useState(null);

  // Fetch matches
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoadingMatches(true);
        const baseUrl = 'http://192.168.3.35:8002/sport/api/matches/?sport_category=cricket';
        const response = await axios.get(baseUrl);
        console.log('Matches API Response:', response.data);

        const validMatches = response.data.filter(
          (match) =>
            match &&
            match.id &&
            match.teams &&
            match.teams.home &&
            match.teams.away &&
            match.teams.home.team_short &&
            match.teams.away.team_short
        );
        setMatches(validMatches);

        if (selectedMatch >= validMatches.length) {
          setSelectedMatch(0);
        }
      } catch (error) {
        console.error('Error fetching Matches:', error);
        setErrorMatches('Failed to load matches. Please try again later.');
        setMatches([]);
      } finally {
        setLoadingMatches(false);
      }
    };
    fetchMatches();
  }, []);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoadingMessages(true);
        const baseUrl = 'http://192.168.3.35:8002/sport/api/spMessageBox/?sport_category=cricket';
        const response = await axios.get(baseUrl);
        console.log('Messages API Response:', response.data);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching Messages:', error);
        setErrorMessages('Failed to load messages. Please try again later.');
        setMessages([]);
      } finally {
        setLoadingMessages(false);
      }
    };
    fetchMessages();
  }, []);

  // Reset selectedMatch when matches change
  useEffect(() => {
    if (matches.length > 0 && selectedMatch >= matches.length) {
      setSelectedMatch(0);
    }
  }, [matches, selectedMatch]);

  // Handle message generation
  const handleGenerateMessage = async () => {
    if (!messageInput.trim()) {
      setGenerateStatus({ type: 'error', message: 'Please enter a message.' });
      return;
    }

    setGenerating(true);
    setGenerateStatus(null);

    try {
      const payload = {
        text_for_review: messageInput,
        sport_category: 'cricket',
        processed: false,
      };
      await axios.post('http://192.168.3.35:8002/sport/api/sportListing/', payload);
      setGenerateStatus({ type: 'success', message: 'Message generated successfully!' });

      // Refetch messages to update the Published Messages section
      const response = await axios.get('http://192.168.3.35:8002/sport/api/spMessageBox/?sport_category=cricket');
      setMessages(response.data);

      // Clear input
      setMessageInput('');
    } catch (error) {
      console.error('Error generating message:', error);
      setGenerateStatus({ type: 'error', message: 'Failed to generate message. Please try again.' });
    } finally {
      setGenerating(false);
    }
  };

  const currentMatch = matches[selectedMatch] || {};

  const getStatusColor = (status) => {
    switch (status) {
      case 'live':
        return 'bg-red-500';
      case 'upcoming':
        return 'bg-blue-500';
      case 'finished':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getMessageTypeColor = (type) => {
    switch (type) {
      case 'WICKET':
        return 'text-red-400';
      case 'SIX':
        return 'text-purple-400';
      case 'FOUR':
        return 'text-green-400';
      default:
        return 'text-blue-400';
    }
  };

  if (loadingMatches) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading matches...</div>;
  }

  if (errorMatches) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">{errorMatches}</div>;
  }

  if (matches.length === 0) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">No matches available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-blue-400">CricApp</h1>
            <p className="text-gray-400 text-sm">
              CricApp bridges the gap by acting as a smart intermediary between cricket boards, broadcasters, and fans,
              delivering tailored updates and curated content straight to your fingertips.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-xs">🔔</span>
            </div>
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-xs">👤</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 p-4">
          {/* Live Cricket Header */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg">CricApp Live Cricket</h2>
              <div className="flex items-center space-x-2">
                <span className="bg-green-500 text-xs px-2 py-1 rounded">Live</span>
                <span className="bg-blue-500 text-xs px-2 py-1 rounded">
                  {matches.filter((m) => m.status === 'live').length} Active
                </span>
              </div>
            </div>
          </div>

          {/* Active Matches */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">ACTIVE MATCHES</h3>
            <div className="space-y-3">
              {matches.map((match, index) => (
                <div
                  key={match.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedMatch === index ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-650'
                  }`}
                  onClick={() => setSelectedMatch(index)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-1 rounded text-white ${getStatusColor(match.status)}`}>
                      {(match.status || 'N/A').toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-400">{match.format || 'N/A'}</span>
                  </div>
                  <div className="text-sm font-medium">
                    {match.teams?.home?.team_short && match.teams?.away?.team_short
                      ? `${match.teams.home.team_short} vs ${match.teams.away.team_short}`
                      : 'Teams not available'}
                  </div>
                  {match.status === 'live' && match.teams?.home?.score && match.teams?.away?.score && (
                    <div className="text-xs text-gray-300 mt-1">
                      {match.teams.home.score.runs}/{match.teams.home.score.wickets} ({match.teams.home.score.overs}) -{' '}
                      {match.teams.away.score.runs}/{match.teams.away.score.wickets} ({match.teams.away.score.overs})
                    </div>
                  )}
                  {match.status === 'finished' && match.result && (
                    <div className="text-xs text-green-400 mt-1">{match.result}</div>
                  )}
                  {match.status === 'live' && (
                    <div className="text-xs text-blue-400 mt-1">
                      Over {match.over || 0}.{match.ball || 0}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tip */}
          <div className="bg-gray-700 p-3 rounded-lg">
            <div className="flex items-start space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-xs">💡</span>
              </div>
              <div className="text-xs text-gray-300">
                <strong>Tip</strong>
                <br />
                Click on any match to view details and generate messages for that specific game
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Match Header */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">
                {currentMatch.teams?.home?.team_name && currentMatch.teams?.away?.team_name
                  ? `${currentMatch.teams.home.team_name} vs ${currentMatch.teams.away.team_name}`
                  : 'Match details not available'}
              </h2>
              {currentMatch.status === 'live' && (
                <div className="flex items-center space-x-2 text-red-400">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">
                    Over {currentMatch.over || 0}.{currentMatch.ball || 0}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4">
              <span>🏟️ {currentMatch.venue || 'N/A'}</span>
              <span>🏏 {currentMatch.format || 'N/A'}</span>
              {currentMatch.teams?.home?.captain && currentMatch.teams?.away?.captain && (
                <span>
                  👤 {currentMatch.teams.home.captain} vs {currentMatch.teams.away.captain}
                </span>
              )}
            </div>

            {/* Score Display */}
            {currentMatch.status === 'live' && currentMatch.teams?.home?.score && currentMatch.teams?.away?.score && (
              <div className="flex items-center justify-center space-x-8 py-4">
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-1">{currentMatch.teams.home.team_short || 'N/A'}</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-blue-400">
                      {currentMatch.teams.home.score.runs || 0}
                    </span>
                    <span className="text-red-400">-</span>
                    <span className="text-xl font-semibold text-red-400">
                      {currentMatch.teams.home.score.wickets || 0}
                    </span>
                    <span className="text-green-400">+</span>
                  </div>
                  <div className="text-xs text-gray-400">({currentMatch.teams.home.score.overs || 0} overs)</div>
                </div>

                <div className="text-center">
                  <div className="text-lg font-bold text-gray-400">VS</div>
                </div>

                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-1">{currentMatch.teams.away.team_short || 'N/A'}</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-blue-400">
                      {currentMatch.teams.away.score.runs || 0}
                    </span>
                    <span className="text-red-400">-</span>
                    <span className="text-xl font-semibold text-red-400">
                      {currentMatch.teams.away.score.wickets || 0}
                    </span>
                    <span className="text-green-400">+</span>
                  </div>
                  <div className="text-xs text-gray-400">({currentMatch.teams.away.score.overs || 0} overs)</div>
                </div>
              </div>
            )}

            {currentMatch.target && currentMatch.teams?.home?.score && (
              <div className="text-center text-sm text-yellow-400 mt-2">
                Target: {currentMatch.target} | Need{' '}
                {currentMatch.target - (currentMatch.teams.home.score.runs || 0)} runs from{' '}
                {((20 - (currentMatch.over || 0)) * 6 - (currentMatch.ball || 0))} balls
              </div>
            )}
          </div>

          {/* Message Template */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Generate Message</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">{messages.length} Messages</span>
                <span className="bg-blue-600 text-xs px-2 py-1 rounded">Match #1</span>
              </div>
            </div>

            {/* Message Input */}
            <div className="mb-4">
              <label className="block text-xs text-gray-400 mb-1">Message Content</label>
              <textarea
                placeholder="Enter your message (e.g., WICKET! Jadeja bowls Iyer for 34!)"
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                rows="4"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateMessage}
              disabled={generating || !messageInput.trim()}
              className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${
                generating || !messageInput.trim()
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {generating ? 'Generating...' : 'Generate Message'}
            </button>

            {/* Status Message */}
            {generateStatus && (
              <div
                className={`mt-3 text-sm ${
                  generateStatus.type === 'success' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {generateStatus.message}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Published Messages */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 p-4">
          <h3 className="text-lg font-semibold mb-4">Published Messages</h3>
          {loadingMessages ? (
            <div className="text-gray-400 text-sm">Loading messages...</div>
          ) : errorMessages ? (
            <div className="text-red-400 text-sm">{errorMessages}</div>
          ) : messages.length === 0 ? (
            <div className="text-gray-400 text-sm">No messages available.</div>
          ) : (
            <div className="space-y-3">
              {messages.map((msg, index) => (
                <div key={msg.id || index} className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold ${getMessageTypeColor(msg.type || 'DEFAULT')}`}>
                      {(msg.type || 'UPDATE') + '!'}
                    </span>
                    <span className="text-xs text-gray-400">{msg.time || 'N/A'}</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{msg.text_for_review || 'No message content'}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Sent to users</span>
                    <span>{msg.minutes || 'Just now'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CricketLiveDashboard;