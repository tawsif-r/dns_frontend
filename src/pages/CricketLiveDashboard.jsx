import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Users, Trophy, AlertCircle, Target, Star, Calendar, Activity } from 'lucide-react';

const CricketLiveDashboard = () => {
  const [selectedMatch, setSelectedMatch] = useState(0);
  const [selectedEventType, setSelectedEventType] = useState('wicket');
  const [eventDetails, setEventDetails] = useState({
    batsman: '',
    bowler: '',
    runs: '',
    ballType: '',
    dismissalType: '',
    fielder: ''
  });

  // Mock data for cricket matches
  const matches = [
    {
      id: 1,
      match_id: "IPL_2025_M45",
      matchday: 45,
      match_date: "2025-06-21T14:30:00Z",
      status: "live",
      over: 18,
      ball: 3,
      sport_category: "cricket",
      format: "T20",
      venue: "Eden Gardens",
      teams: {
        home: {
          team_name: "Mumbai Indians",
          team_short: "MI",
          captain: "Rohit Sharma",
          score: { runs: 156, wickets: 4, overs: 18.3 }
        },
        away: {
          team_name: "Chennai Super Kings",
          team_short: "CSK", 
          captain: "MS Dhoni",
          score: { runs: 142, wickets: 6, overs: 20.0 }
        }
      },
      current_innings: 2,
      target: 157
    },
    {
      id: 2,
      match_id: "BBL_2025_M23",
      matchday: 23,
      match_date: "2025-06-21T09:45:00Z",
      status: "upcoming",
      sport_category: "cricket",
      format: "T20",
      venue: "MCG Melbourne",
      teams: {
        home: {
          team_name: "Melbourne Stars",
          team_short: "STA",
          captain: "Glenn Maxwell"
        },
        away: {
          team_name: "Sydney Sixers", 
          team_short: "SIX",
          captain: "Moises Henriques"
        }
      }
    },
    {
      id: 3,
      match_id: "PSL_2025_M12",
      matchday: 12,
      match_date: "2025-06-21T16:00:00Z",
      status: "finished",
      sport_category: "cricket",
      format: "T20",
      venue: "National Stadium",
      teams: {
        home: {
          team_name: "Karachi Kings",
          team_short: "KK",
          captain: "Babar Azam",
          score: { runs: 178, wickets: 5, overs: 20.0 }
        },
        away: {
          team_name: "Lahore Qalandars",
          team_short: "LQ",
          captain: "Shaheen Afridi", 
          score: { runs: 165, wickets: 8, overs: 20.0 }
        }
      },
      result: "KK won by 13 runs"
    }
  ];

  const publishedMessages = [
    {
      time: "18.3",
      type: "WICKET",
      message: "WICKET! Jadeja bowls Iyer for 34! What a delivery that was!",
      team: "MI",
      minutes: "2 min ago"
    },
    {
      time: "17.5", 
      type: "SIX",
      message: "SIX! Massive hit by Suryakumar Yadav! That's gone into the stands!",
      team: "MI",
      minutes: "4 min ago"
    },
    {
      time: "16.2",
      type: "FOUR", 
      message: "FOUR! Beautiful cover drive by Rohit Sharma! Textbook shot!",
      team: "MI",
      minutes: "7 min ago"
    },
    {
      time: "15.4",
      type: "WICKET",
      message: "WICKET! Chahar strikes! Tilak Varma caught behind for 28!",
      team: "MI", 
      minutes: "12 min ago"
    }
  ];

  const eventTypes = [
    { id: 'wicket', label: 'Wicket', icon: Target, color: 'bg-red-500' },
    { id: 'boundary', label: 'Boundary', icon: Star, color: 'bg-green-500' },
    { id: 'milestone', label: 'Milestone', icon: Trophy, color: 'bg-yellow-500' },
    { id: 'strategic', label: 'Strategic', icon: Activity, color: 'bg-blue-500' },
    { id: 'special', label: 'Special', icon: AlertCircle, color: 'bg-purple-500' },
    { id: 'other', label: 'Other', icon: Calendar, color: 'bg-gray-500' }
  ];

  const quickEvents = [
    { label: 'Wicket Taken', type: 'wicket' },
    { label: 'Boundary Scored', type: 'boundary' },
    { label: 'Fifty Milestone', type: 'milestone' },
    { label: 'Century Milestone', type: 'milestone' },
    { label: 'Dropped Catch', type: 'special' },
    { label: 'Strategic Timeout', type: 'strategic' }
  ];

  const currentMatch = matches[selectedMatch];

  const getStatusColor = (status) => {
    switch(status) {
      case 'live': return 'bg-red-500';
      case 'upcoming': return 'bg-blue-500'; 
      case 'finished': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getMessageTypeColor = (type) => {
    switch(type) {
      case 'WICKET': return 'text-red-400';
      case 'SIX': return 'text-purple-400';
      case 'FOUR': return 'text-green-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-blue-400">CricApp</h1>
            <p className="text-gray-400 text-sm">
              CricApp bridges the gap by acting as a smart intermediary between cricket boards, broadcasters, and fans, delivering tailored updates and curated content straight to your fingertips.
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
                <span className="bg-blue-500 text-xs px-2 py-1 rounded">{matches.filter(m => m.status === 'live').length} Active</span>
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
                      {match.status.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-400">{match.format}</span>
                  </div>
                  <div className="text-sm font-medium">
                    {match.teams.home.team_short} vs {match.teams.away.team_short}
                  </div>
                  {match.status === 'live' && match.teams.home.score && (
                    <div className="text-xs text-gray-300 mt-1">
                      {match.teams.home.score.runs}/{match.teams.home.score.wickets} ({match.teams.home.score.overs}) - 
                      {match.teams.away.score.runs}/{match.teams.away.score.wickets} ({match.teams.away.score.overs})
                    </div>
                  )}
                  {match.status === 'finished' && match.result && (
                    <div className="text-xs text-green-400 mt-1">{match.result}</div>
                  )}
                  {match.status === 'live' && (
                    <div className="text-xs text-blue-400 mt-1">
                      Over {match.over}.{match.ball}
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
                <strong>Tip</strong><br />
                Click on any match to view details and create events for that specific game
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
                {currentMatch.teams.home.team_name} vs {currentMatch.teams.away.team_name}
              </h2>
              {currentMatch.status === 'live' && (
                <div className="flex items-center space-x-2 text-red-400">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Over {currentMatch.over}.{currentMatch.ball}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4">
              <span>🏟️ {currentMatch.venue}</span>
              <span>🏏 {currentMatch.format}</span>
              {currentMatch.teams.home.captain && (
                <span>👤 {currentMatch.teams.home.captain} vs {currentMatch.teams.away.captain}</span>
              )}
            </div>

            {/* Score Display */}
            {currentMatch.status === 'live' && currentMatch.teams.home.score && (
              <div className="flex items-center justify-center space-x-8 py-4">
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-1">{currentMatch.teams.home.team_short}</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-blue-400">
                      {currentMatch.teams.home.score.runs}
                    </span>
                    <span className="text-red-400">-</span>
                    <span className="text-xl font-semibold text-red-400">
                      {currentMatch.teams.home.score.wickets}
                    </span>
                    <span className="text-green-400">+</span>
                  </div>
                  <div className="text-xs text-gray-400">({currentMatch.teams.home.score.overs} overs)</div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-400">VS</div>
                </div>
                
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-1">{currentMatch.teams.away.team_short}</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-blue-400">
                      {currentMatch.teams.away.score.runs}
                    </span>
                    <span className="text-red-400">-</span>
                    <span className="text-xl font-semibold text-red-400">
                      {currentMatch.teams.away.score.wickets}
                    </span>
                    <span className="text-green-400">+</span>
                  </div>
                  <div className="text-xs text-gray-400">({currentMatch.teams.away.score.overs} overs)</div>
                </div>
              </div>
            )}

            {currentMatch.target && (
              <div className="text-center text-sm text-yellow-400 mt-2">
                Target: {currentMatch.target} | Need {currentMatch.target - currentMatch.teams.home.score.runs} runs from {(20 - currentMatch.over) * 6 - currentMatch.ball} balls
              </div>
            )}
          </div>

          {/* Message Templates */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Message Templates</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">12 Messages</span>
                <span className="bg-blue-600 text-xs px-2 py-1 rounded">Match #1</span>
              </div>
            </div>

            {/* Event Type Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {eventTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedEventType(type.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedEventType === type.id 
                        ? `${type.color} text-white` 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Select */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Quick Select</h4>
              <div className="text-xs text-gray-500 mb-3">Choose event type</div>
              <div className="grid grid-cols-3 gap-3">
                {quickEvents.map((event, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedEventType(event.type)}
                    className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-left transition-colors"
                  >
                    <div className="text-sm font-medium">{event.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Event Details Form */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-3">Event Details</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Batsman</label>
                    <input
                      type="text"
                      placeholder="Enter batsman name"
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                      value={eventDetails.batsman}
                      onChange={(e) => setEventDetails({...eventDetails, batsman: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Bowler</label>
                    <input
                      type="text"
                      placeholder="Enter bowler name"
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                      value={eventDetails.bowler}
                      onChange={(e) => setEventDetails({...eventDetails, bowler: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-3">Event Type</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Runs Scored</label>
                    <select 
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                      value={eventDetails.runs}
                      onChange={(e) => setEventDetails({...eventDetails, runs: e.target.value})}
                    >
                      <option value="">Select runs</option>
                      <option value="0">Dot Ball</option>
                      <option value="1">1 Run</option>
                      <option value="2">2 Runs</option>
                      <option value="3">3 Runs</option>
                      <option value="4">Four</option>
                      <option value="6">Six</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Difficulty</label>
                    <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                      <option>Easy/Good/Brilliant/World Class</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Published Messages */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 p-4">
          <h3 className="text-lg font-semibold mb-4">Published Messages</h3>
          <div className="space-y-3">
            {publishedMessages.map((msg, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold ${getMessageTypeColor(msg.type)}`}>
                    {msg.type}!
                  </span>
                  <span className="text-xs text-gray-400">{msg.time}'</span>
                </div>
                <p className="text-sm text-gray-300 mb-2">{msg.message}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Sent to 22,334 users</span>
                  <span>{msg.minutes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CricketLiveDashboard;