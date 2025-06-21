import React, { useState, useEffect, useCallback, useMemo } from 'react';

const STADIUM_MAP = {
  arsenal: 'Emirates Stadium', chelsea: 'Stamford Bridge', 'manchester united': 'Old Trafford',
  'manchester city': 'Etihad Stadium', liverpool: 'Anfield', tottenham: 'Tottenham Hotspur Stadium'
};

const STATUS_STYLES = {
  Upcoming: { bg: '#6c757d', text: 'white' },
  FT: { bg: '#28a745', text: 'white' },
  HT: { bg: '#ffc107', text: 'black' },
  LIVE: { bg: '#ff6b35', text: 'white' }
};

function MatchHeader({ teamsData, scoreData, currentTime, matchData, onScoreUpdate, matchStatus }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [score, setScore] = useState(scoreData || { home: 0, away: 0 });
  const status = matchStatus || 'LIVE';

  useEffect(() => setScore(scoreData || { home: 0, away: 0 }), [scoreData]);

  const getAbbr = (name) => name?.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase() || 'TBD';
  
  const getValue = (obj, paths) => {
    for (const path of paths) {
      const val = path.split('.').reduce((o, k) => o?.[k], obj);
      if (val) return val;
    }
    return null;
  };

  const venue = useMemo(() => {
    const paths = ['venue.venue.stadium', 'venue.stadium', 'venue', 'stadium'];
    let v = getValue(matchData, paths) || getValue(teamsData, paths);
    
    if (!v && teamsData?.home?.team_name) {
      const team = teamsData.home.team_name.toLowerCase();
      v = Object.entries(STADIUM_MAP).find(([k]) => team.includes(k))?.[1];
    }
    
    return v || 'Stadium TBD';
  }, [matchData, teamsData]);

  const updateScore = useCallback(async (newHomeScore, newAwayScore) => {
    if (!matchData?.id || isUpdating) return false;
    
    // Create proper score structure for database
    let updatedScore = {
      home: newHomeScore,
      away: newAwayScore,
      penalty: { home: 0, away: 0 },
      fulltime: { home: newHomeScore, away: newAwayScore },
      halftime: { home: 0, away: 0 }
    };

    // Preserve existing score structure if available
    if (matchData.score) {
      try {
        const existing = typeof matchData.score === 'string' ? JSON.parse(matchData.score) : matchData.score;
        if (existing && typeof existing === 'object') {
          updatedScore = {
            ...updatedScore,
            penalty: existing.penalty || updatedScore.penalty,
            halftime: existing.halftime || updatedScore.halftime
          };
        }
      } catch (error) {
        console.log('Using default score structure');
      }
    }
    
    setIsUpdating(true);
    try {
      const res = await fetch(`http://192.168.3.35:8002/sport/api/matches/${matchData.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: updatedScore })
      });
      
      if (res.ok) {
        onScoreUpdate?.({ home: newHomeScore, away: newAwayScore });
        return true;
      }
      
      // Try with stringified score if object failed
      if (res.status === 400) {
        const retryRes = await fetch(`http://192.168.3.35:8002/sport/api/matches/${matchData.id}/`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ score: JSON.stringify(updatedScore) })
        });
        
        if (retryRes.ok) {
          onScoreUpdate?.({ home: newHomeScore, away: newAwayScore });
          return true;
        }
      }
      
      throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      alert(`Failed to update: ${err.message}`);
      return false;
    } finally {
      setIsUpdating(false);
    }
  }, [matchData?.id, matchData?.score, isUpdating, onScoreUpdate]);

  const changeScore = useCallback(async (team, delta) => {
    const newScore = { ...score, [team]: Math.max(0, score[team] + delta) };
    setScore(newScore);
    
    if (!(await updateScore(newScore.home, newScore.away))) {
      setScore(score); // revert
    }
  }, [score, updateScore]);

  const ScoreBtn = ({ team, delta, children }) => (
    <button
      onClick={() => changeScore(team, delta)}
      disabled={isUpdating || (delta < 0 && score[team] <= 0)}
      className={`w-6 h-6 rounded ${isUpdating || (delta < 0 && score[team] <= 0) ? 'bg-gray-300 text-gray-400 cursor-not-allowed' : delta < 0 ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white font-bold`}
    >
      {children}
    </button>
  );

  const renderStatus = () => {
    const style = STATUS_STYLES[status] || STATUS_STYLES.LIVE;
    const getTime = () => {
      try {
        return new Date(matchData?.kickoff_time || matchData?.match_date).toLocaleTimeString('en-GB', { 
          hour: '2-digit', minute: '2-digit' 
        });
      } catch { return '20:00'; }
    };

    return (
      <span className={`px-2 py-1 rounded text-sm font-bold ${style.bg} ${style.text}`}>
        {status === 'Upcoming' ? getTime() : 
         status === 'FT' ? 'FULL TIME' : 
         status === 'HT' ? 'HALF TIME' : 
         `${currentTime || 0}'`}
      </span>
    );
  };

  if (!teamsData) return <div className="p-5 text-center text-gray-400">Loading...</div>;

  const { home, away } = teamsData;
  const showControls = status === 'LIVE';

  return (
    <div className="bg-gray-800 rounded-lg shadow-md mb-6 p-5">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-white">
            {home.team_name} vs {away.team_name}
          </h2>
          <div className="flex gap-4 text-sm text-gray-400 flex-wrap">
            <span>🏟️ {venue}</span>
            <span>👥 22,325 capacity</span>
            {home.manager && away.manager && <span>👨‍💼 {home.manager} vs {away.manager}</span>}
          </div>
        </div>
        {renderStatus()}
      </div>

      <div className="flex items-center justify-center gap-10 py-5">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 text-white w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold">
            {getAbbr(home.team_short || home.team_name)}
          </div>
          <div>
            <div className="text-sm text-gray-400 uppercase mb-1">
              {home.team_short || home.team_name}
            </div>
            <div className="flex items-center gap-2">
              {showControls && <ScoreBtn team="home" delta={-1}>-</ScoreBtn>}
              <div className="text-4xl font-bold text-white min-w-[40px] text-center" style={{ opacity: isUpdating ? 0.6 : 1 }}>
                {score.home}
              </div>
              {showControls && <ScoreBtn team="home" delta={1}>+</ScoreBtn>}
            </div>
          </div>
        </div>

        <div className="text-xl text-gray-400 font-bold">VS</div>

        <div className="flex items-center gap-4">
          <div>
            <div className="text-sm text-gray-400 uppercase mb-1">
              {away.team_short || away.team_name}
            </div>
            <div className="flex items-center gap-2 justify-end">
              {showControls && <ScoreBtn team="away" delta={-1}>-</ScoreBtn>}
              <div className="text-4xl font-bold text-white min-w-[40px] text-center" style={{ opacity: isUpdating ? 0.6 : 1 }}>
                {score.away}
              </div>
              {showControls && <ScoreBtn team="away" delta={1}>+</ScoreBtn>}
            </div>
          </div>
          <div className="bg-indigo-600 text-white w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold">
            {getAbbr(away.team_short || away.team_name)}
          </div>
        </div>
      </div>

      {isUpdating && (
        <div className="text-center mt-4 p-2 bg-gray-700 rounded text-sm text-gray-400">
          🔄 Updating score...
        </div>
      )}
    </div>
  );
}

export default MatchHeader;