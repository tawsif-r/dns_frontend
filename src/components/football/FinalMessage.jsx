function FinalMessage({ teamsData, scoreData, currentTime }) {
  const recentMessages = [
    { id: 1, type: 'GOAL', player: 'Bukayo Saka', team: 'Arsenal', score: '2 - 1 Chelsea', minute: 67, time: '2 min ago' },
    { id: 2, type: 'GOAL', player: 'Gabriel Jesus', team: 'Arsenal', score: '1 - 1 Chelsea', minute: 34, time: '2 min ago' },
    { id: 3, type: 'YELLOW', player: 'Enzo Fernandez', team: 'tackle', minute: 28, time: '5 min ago' },
    { id: 4, type: 'GOAL', player: 'Cole Palmer', team: 'Chelsea', score: '0 - 1 Chelsea', minute: 15, time: '12 min ago' },
    { id: 5, type: 'KICKOFF', text: 'Arsenal vs Chelsea is underway!', time: '18 min ago' }
  ];

  const getMessageIcon = (type) => {
    switch(type) {
      case 'GOAL': return '⚽';
      case 'YELLOW': return '🟨';
      case 'RED': return '🟥';
      case 'KICKOFF': return '⚽';
      default: return '📝';
    }
  };

  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 p-4">
      <h4 className="text-gray-400 mb-3">Published Messages</h4>
      <div className="max-h-96 overflow-y-auto">
        {recentMessages.map(message => (
          <div key={message.id} className="bg-gray-700 rounded-lg p-3 mb-2">
            <div className="flex items-start">
              <span className="mr-2 text-xl">{getMessageIcon(message.type)}</span>
              <div className="flex-1">
                {message.type === 'GOAL' && (
                  <div>
                    <strong className="text-sm text-green-500">GOAL!</strong>
                    <span className="text-sm"> {message.player} scores for {message.team}!</span>
                    <div className="text-sm text-gray-400">{message.score} | {message.minute}'</div>
                    <div className="text-xs text-gray-500">Sent to 22,325 users</div>
                  </div>
                )}
                {message.type === 'YELLOW' && (
                  <div>
                    <strong className="text-sm text-yellow-500">YELLOW CARD!</strong>
                    <span className="text-sm"> {message.player} booked for {message.team} | {message.minute}'</span>
                    <div className="text-xs text-gray-500">Sent to 22,325 users</div>
                  </div>
                )}
                {message.type === 'KICKOFF' && (
                  <div>
                    <strong className="text-sm text-blue-500">KICK OFF!</strong>
                    <span className="text-sm"> {message.text}</span>
                    <div className="text-xs text-gray-500">Sent to 22,325 users</div>
                  </div>
                )}
                <div className="text-right">
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FinalMessage;