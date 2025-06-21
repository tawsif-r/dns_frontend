import React from 'react';

function ActiveMatch({ activeMatches, liveMatchesCount, selectedMatchId, onMatchSelect }) {
  
  const handleMatchClick = (match) => {
    console.log('Match clicked:', match);
    onMatchSelect(match);
  };

  return (
    <div className="w-72 bg-gray-800 border-r border-gray-700 p-4">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl mr-3">⚽</div>
        <h2 className="text-xl font-bold text-blue-400">DNS Live Football</h2>
      </div>
      
      <div className="flex items-center mb-4">
        <span className="px-2 py-1 rounded text-xs font-bold bg-green-600 text-white mr-2">Live</span>
        <span className="px-2 py-1 rounded text-xs font-bold bg-yellow-400 text-black">{liveMatchesCount} Active</span>
      </div>

      <h3 className="text-xs uppercase text-gray-400 mb-3 font-bold">ACTIVE MATCHES</h3>
      
      {activeMatches.length > 0 ? (
        activeMatches.map(match => {
          const isSelected = match.id === selectedMatchId;
          
          return (
            <div 
              key={match.id} 
              onClick={() => handleMatchClick(match)}
              className={`bg-gray-800 border rounded-lg mb-2 p-3 cursor-pointer transition-all duration-200 ${isSelected ? 'border-blue-600 scale-102 shadow-lg shadow-blue-600/15' : match.status === 'LIVE' ? 'border-red-600' : 'border-gray-700'} ${!isSelected ? 'hover:bg-gray-700 hover:scale-101' : ''}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs">{match.league}</span>
                <span className={`px-1.5 py-0.5 rounded text-xs font-bold text-white ${match.status === 'LIVE' ? 'bg-red-600' : match.status === 'FT' ? 'bg-green-600' : match.status === 'Upcoming' ? 'bg-gray-500' : 'bg-yellow-400'}`}>{match.status}</span>
              </div>
              
              <div className={`font-bold text-base mb-2 ${isSelected ? 'text-blue-400' : 'text-gray-200'}`}>
                {match.teams}
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`text-2xl font-bold ${isSelected ? 'text-blue-400' : 'text-gray-200'}`}>
                  {match.score}
                </span>
                
                {match.status === 'LIVE' && match.minute > 0 && 
                  <span className={`px-1.5 py-0.5 rounded text-xs ${isSelected ? 'bg-blue-600' : 'bg-green-600'} text-white`}>{match.minute}'</span>
                }
                
                {(match.status === 'Upcoming' || match.status === 'UPCOMING') && 
                  <span className={`text-xs ${isSelected ? 'text-blue-400' : 'text-gray-400'}`}>
                    {match.kickoffTime || (typeof match.minute === 'string' ? match.minute : '20:00')}
                  </span>
                }
              </div>
              
              {isSelected && (
                <div className="absolute right-2 top-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-gray-800" />
              )}
            </div>
          );
        })
      ) : (
        <div className="text-center text-gray-400 text-base p-5 italic">
          No matches available
        </div>
      )}
      
      <div className="mt-4 p-3 bg-gray-700 rounded-lg text-gray-400 text-xs text-center">
        <div className="mb-1 font-bold">💡 Tip</div>
        Click on any match to view details and create events for that specific game
      </div>
    </div>
  );
}

export default ActiveMatch;