import React, { useState, useEffect } from 'react';
import Message from '../components/football/Message';
import MatchHeader from '../components/football/MatchHeader';
import FinalMessage from '../components/football/FinalMessage';
import ActiveMatch from '../components/football/ActiveMatch';

// Constants
const LEAGUE_MAP = {
  'EPL_2024_25': 'EPL',
  'UCL_2024_25': 'UCL',
  'UEL_2024_25': 'UEL',
  'LA_LIGA_2024_25': 'LA LIGA',
  'SERIE_A_2024_25': 'SERIE A',
  'BUNDESLIGA_2024_25': 'BUNDESLIGA',
  'LIGUE_1_2024_25': 'LIGUE 1'
};

const STATUS_MAP = {
  'live': 'LIVE',
  'finished': 'FT',
  'scheduled': 'Upcoming',
  'upcoming': 'Upcoming',
  'postponed': 'Postponed',
  'cancelled': 'Cancelled',
  'halftime': 'HT',
  'fulltime': 'FT'
};

const STATUS_PRIORITY = {
  'LIVE': 1,
  'HT': 2,
  'FT': 3,
  'Upcoming': 4,
  'Postponed': 5,
  'Cancelled': 6
};

const TIME_FIELDS = [
  'match_date', 'kickoff_time', 'start_time', 
  'match_time', 'datetime', 'date'
];

// Utility functions
const findNestedData = (obj, checkFn) => {
  if (obj && typeof obj === 'object' && checkFn(obj)) {
    return obj;
  }
  
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        const result = findNestedData(obj[key], checkFn);
        if (result) return result;
      }
    }
  }
  return null;
};

const parseJsonSafely = (data) => {
  if (typeof data === 'object') return data;
  
  if (typeof data === 'string') {
    try {
      return JSON.parse(data.replace(/\\"/g, '"').replace(/'/g, '"'));
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return null;
    }
  }
  
  return null;
};

const extractNestedValue = (obj, path) => {
  return path.reduce((o, p) => o && o[p], obj);
};

function FootballMessagePage() {
  console.log('Test component rendering...');
  
  const [teamsData, setTeamsData] = useState(null);
  const [scoreData, setScoreData] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [activeMatches, setActiveMatches] = useState([]);
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Score update callback function
  const handleScoreUpdate = (newScoreData) => {
    console.log('Score updated:', newScoreData);
    setScoreData(newScoreData);
    
    // Update the activeMatches list to reflect the new score
    setActiveMatches(prevMatches => 
      prevMatches.map(match => {
        if (match.rawMatch?.id === matchData?.id) {
          return {
            ...match,
            score: `${newScoreData.home} - ${newScoreData.away}`
          };
        }
        return match;
      })
    );
  };

  // Handle match selection from Active Matches
  const handleMatchSelect = (selectedMatch) => {
    console.log('Selected match:', selectedMatch);
    
    setSelectedMatchId(selectedMatch.id);
    
    // Make sure to include the minute in matchData
    const updatedMatchData = {
      ...selectedMatch.rawMatch,
      minute: selectedMatch.minute // Ensure minute is included
    };
    
    setMatchData(updatedMatchData);
    
    // Parse teams and score data for the selected match
    const parsedTeams = parseTeamsData(selectedMatch.rawMatch);
    const parsedScore = parseScoreData(selectedMatch.rawMatch);
    
    setTeamsData(parsedTeams);
    setScoreData(parsedScore);
    
    console.log('Updated to selected match:', {
      id: selectedMatch.id,
      teams: parsedTeams,
      score: parsedScore,
      matchData: updatedMatchData,
      minute: selectedMatch.minute // Log the minute being set
    });
  };

  // Helper function to extract teams names from match data
  const extractTeamNames = (match) => {
    if (!match.teams) return 'Unknown vs Unknown';
    
    const teamsObj = parseJsonSafely(match.teams);
    if (!teamsObj) return 'Unknown vs Unknown';
    
    const teams = findNestedData(teamsObj, obj => obj.home && obj.away) || teamsObj;
    
    const homeName = teams.home?.team_name || teams.home?.name || 'Home';
    const awayName = teams.away?.team_name || teams.away?.name || 'Away';
    
    return `${homeName} vs ${awayName}`;
  };

  // Helper function to extract score from match data
  const extractScore = (match) => {
    if (!match.score) return '- vs -';
    
    const scoreObj = parseJsonSafely(match.score);
    if (!scoreObj) return '- vs -';
    
    const score = findNestedData(scoreObj, obj => 
      obj.home !== undefined && obj.away !== undefined
    ) || scoreObj;
    
    const homeScore = score.home !== undefined ? score.home : '-';
    const awayScore = score.away !== undefined ? score.away : '-';
    
    return `${homeScore} - ${awayScore}`;
  };

  // Helper function to format match status
  const formatMatchStatus = (status) => {
    if (!status) return 'Unknown';
    return STATUS_MAP[status.toLowerCase()] || status.toUpperCase();
  };

  // Helper function to get league abbreviation
  const getLeagueAbbreviation = (tournamentId) => {
    if (!tournamentId) return 'UNKNOWN';
    return LEAGUE_MAP[tournamentId] || tournamentId.replace(/_/g, ' ');
  };

  // Helper function to extract kickoff time from match data
  const extractKickoffTime = (match) => {
    if (!match) return '20:00';
    
    for (const field of TIME_FIELDS) {
      if (match[field]) {
        try {
          return new Date(match[field]).toLocaleTimeString('en-GB', { 
            hour: '2-digit', 
            minute: '2-digit' 
          });
        } catch (error) {
          console.error(`Error parsing time field ${field}:`, error);
          continue;
        }
      }
    }
    
    return '20:00';
  };

  // Helper function to determine match status based on match_date
  const determineMatchStatus = (match) => {
    if (!match.match_date) {
      return match.status ? formatMatchStatus(match.status) : 'Unknown';
    }
    
    try {
      const matchTime = new Date(match.match_date);
      const now = new Date();
      const timeDiff = now - matchTime;
      
      if (timeDiff > 105 * 60 * 1000) return 'FT';
      if (timeDiff > 0) return 'LIVE';
      return 'Upcoming';
    } catch (error) {
      console.error('Error determining match status:', error);
      return match.status ? formatMatchStatus(match.status) : 'Unknown';
    }
  };

  // Helper function to calculate current minute for live matches
  const calculateCurrentMinute = (match) => {
    if (!match.match_date) return match.minute || 0;
    
    try {
      const matchTime = new Date(match.match_date);
      const now = new Date();
      const timeDiff = now - matchTime;
      const minutesElapsed = Math.floor(timeDiff / (1000 * 60));
      
      return Math.min(Math.max(minutesElapsed, 0), 90);
    } catch (error) {
      console.error('Error calculating current minute:', error);
      return match.minute || 0;
    }
  };

  // Helper function to sort matches by status priority
  const sortMatchesByStatus = (matches) => {
    return matches.sort((a, b) => {
      const priorityA = STATUS_PRIORITY[a.status] || 99;
      const priorityB = STATUS_PRIORITY[b.status] || 99;
      
      if (priorityA === priorityB && priorityA === 1) {
        return b.minute - a.minute;
      }
      
      return priorityA - priorityB;
    });
  };

  // Helper function to parse teams data from match
  const parseTeamsData = (match) => {
    if (!match.teams) return null;
    
    const teamsObj = parseJsonSafely(match.teams);
    if (!teamsObj) return null;
    
    return findNestedData(teamsObj, obj => obj.home && obj.away);
  };

  // Helper function to parse score data from match
  const parseScoreData = (match) => {
    if (!match.score) return null;
    
    const scoreObj = parseJsonSafely(match.score);
    if (!scoreObj) return null;
    
    const score = findNestedData(scoreObj, obj => 
      obj.home !== undefined && obj.away !== undefined
    );
    
    return score && score.home !== undefined && score.away !== undefined 
      ? { home: score.home, away: score.away } 
      : null;
  };

  // Fetch matches data from database and update live minutes
  useEffect(() => {
    const fetchMatchesData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Starting to fetch matches data...');
        
        const response = await fetch('http://192.168.3.35:8002/sport/api/matches/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Raw API Response:', data);
        
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('No match data received');
        }

        // Process all matches for the active matches list
        const formattedActiveMatches = data.map((match, index) => {
          const dynamicStatus = determineMatchStatus(match);
          const currentMinute = dynamicStatus === 'LIVE' ? calculateCurrentMinute(match) : (match.minute || 0);
          
          return {
            id: match.id || index + 1,
            teams: extractTeamNames(match),
            score: extractScore(match),
            minute: currentMinute,
            status: dynamicStatus,
            league: getLeagueAbbreviation(match.tournament_id),
            kickoffTime: extractKickoffTime(match),
            rawMatch: match
          };
        });
        
        const sortedMatches = sortMatchesByStatus(formattedActiveMatches);
        setActiveMatches(sortedMatches);
        
        // Auto-select the first live match or first match if no selection exists
        if (!selectedMatchId && sortedMatches.length > 0) {
          const defaultMatch = sortedMatches.find(match => match.status === 'LIVE') || sortedMatches[0];
          handleMatchSelect(defaultMatch);
        } else if (selectedMatchId) {
          // Update the currently selected match data
          const currentMatch = sortedMatches.find(match => match.id === selectedMatchId);
          if (currentMatch) {
            handleMatchSelect(currentMatch);
          }
        }
        
      } catch (error) {
        console.error('Error fetching matches data:', error);
        setError(`Failed to load matches data: ${error.message}`);
        
        // Reset all state on error
        setTeamsData(null);
        setScoreData(null);
        setMatchData(null);
        setActiveMatches([]);
        setSelectedMatchId(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchesData();

    // Set up interval to update live match minutes every minute
    const interval = setInterval(() => {
      console.log('Updating match minutes...');
      setActiveMatches(prevMatches => 
        prevMatches.map(match => {
          if (match.status === 'LIVE' && match.minute < 90) {
            console.log(`Updating minute for match ${match.id}: ${match.minute} -> ${match.minute + 1}`);
            const updatedMatch = {
              ...match,
              minute: Math.min(match.minute + 1, 90)
            };
            
            // IMPORTANT FIX: If this is the selected match, update the main match data too
            if (match.id === selectedMatchId) {
              console.log('Updating matchData minute for selected match:', updatedMatch.minute);
              setMatchData(prevMatch => ({
                ...prevMatch,
                minute: updatedMatch.minute
              }));
            }
            
            return updatedMatch;
          }
          return match;
        })
      );
    }, 60000); // Update every minute

    return () => {
      console.log('Cleaning up interval...');
      clearInterval(interval);
    };
  }, [selectedMatchId]);

  const liveMatchesCount = activeMatches.filter(match => match.status === 'LIVE').length;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white font-sans">
        <div className="text-center">
          <div className="text-4xl mb-4">⚽</div>
          <div>Loading match data...</div>
        </div>
      </div>
    );
  }

  // No data state
  if (!teamsData && !scoreData && activeMatches.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white font-sans">
        <div className="text-center">
          <div className="text-6xl mb-4">⚽</div>
          <h2 className="text-gray-400 mb-2">No Match Data Found</h2>
          <p className="text-gray-500">Unable to retrieve match information from the server.</p>
          {error && (
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mt-4 text-yellow-800 max-w-md">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>
      </div>
    );
  }

  const hasMatchData = teamsData && scoreData;

  return (
    <div className="min-h-screen bg-gray-900 flex font-sans text-white">
      {/* Left Sidebar - Active Matches */}
      <ActiveMatch 
        activeMatches={activeMatches} 
        liveMatchesCount={liveMatchesCount}
        selectedMatchId={selectedMatchId}
        onMatchSelect={handleMatchSelect}
      />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Error Display */}
        {error && (
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mb-4 text-yellow-800">
            <strong>Warning:</strong> {error}
          </div>
        )}

        {/* Match Header Component */}
        {hasMatchData ? (
          <MatchHeader 
            teamsData={teamsData} 
            scoreData={scoreData} 
            currentTime={matchData?.minute || 0}
            matchData={matchData}
            matchStatus={activeMatches.find(match => match.id === selectedMatchId)?.status || 'LIVE'}
            onScoreUpdate={handleScoreUpdate}
          />
        ) : (
          <div className="bg-gray-800 rounded-lg p-10 text-center mb-6">
            <h3 className="text-gray-400 mb-2">Match Data Not Found</h3>
            <p className="text-gray-500">No match information available to display.</p>
          </div>
        )}

        {/* Message Templates Component */}
        <Message 
          teamsData={teamsData} 
          scoreData={scoreData} 
          matchData={matchData}
          selectedMatchId={selectedMatchId}
        />
      </div>

      {/* Right Sidebar - Message Composer & Recent Messages */}
      {hasMatchData ? (
        <FinalMessage 
          teamsData={teamsData} 
          scoreData={scoreData} 
          currentTime={matchData?.minute || 0} 
          matchData={matchData}
          matchStatus={activeMatches.find(match => match.id === selectedMatchId)?.status || 'LIVE'}
        />
      ) : (
        <div className="w-80 bg-gray-800 border-l border-gray-700 p-6 flex items-center justify-center">
          <div className="text-center">
            <h4 className="text-gray-400 mb-2">Message Data Not Available</h4>
            <p className="text-gray-500 text-sm">No match data to generate messages.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default FootballMessagePage;