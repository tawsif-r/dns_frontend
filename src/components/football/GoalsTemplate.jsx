const GoalsTemplate = {
    quickSelect: [
      { icon: '⚽', label: 'Regular Goal' },
      { icon: '🎯', label: 'Penalty' },
      { icon: '🏃', label: 'Free Kick' },
      { icon: '🔥', label: 'Own Goal' }
    ],
    eventDetails: {
      0: [ // Regular Goal
        { label: 'Goal Scorer', value: '', placeholder: 'Enter scorer name', key: 'goal_scorer' },
        { label: 'Assist By', value: '', placeholder: 'Enter assist name', key: 'assist_by' },
        { label: 'Team', value: '', placeholder: 'Enter team name', key: 'team' },
        { label: 'Minute', value: '', placeholder: 'Match minute', key: 'minute' }
      ],
      1: [ // Penalty
        { label: 'Penalty Taker', value: '', placeholder: 'Who took penalty', key: 'penalty_taker' },
        { label: 'Foul By', value: '', placeholder: 'Who committed foul', key: 'foul_by' },
        { label: 'Team', value: '', placeholder: 'Enter team name', key: 'team' },
        { label: 'Minute', value: '', placeholder: 'Match minute', key: 'minute' }
      ],
      2: [ // Free Kick
        { label: 'Free Kick Taker', value: '', placeholder: 'Who took the free kick', key: 'free_kick_taker' },
        { label: 'Goal Scorer', value: '', placeholder: 'Who scored the Goal', key: 'goal_scorer' },
        { label: 'Team', value: '', placeholder: 'Enter team name', key: 'team' },
        { label: 'Minute', value: '', placeholder: 'Match minute', key: 'minute' }
      ],
      3: [ // Own Goal
        { label: 'Player Name', value: '', placeholder: 'Who scored the own goal', key: 'player_name' },
        { label: 'Team', value: '', placeholder: 'Enter team name', key: 'team' },
        { label: 'Minute', value: '', placeholder: 'Time of Goal', key: 'minute' },
        { label: 'How It Happened', value: '', placeholder: 'deflection, misplaced clearance, header', key: 'how_happened' }
      ]
    },
    generateMessage: (eventData, eventSubtype, scoreData = null, teamsData = null) => {
      // Extract team names safely
      const homeTeam = teamsData?.home?.team_name || teamsData?.home?.name || 'Home Team';
      const awayTeam = teamsData?.away?.team_name || teamsData?.away?.name || 'Away Team';
      
      // Extract scores safely
      const homeScore = scoreData?.home ?? 0;
      const awayScore = scoreData?.away ?? 0;
      
      // Format score display
      const scoreDisplay = `${homeScore}-${awayScore}`;
      
      // Use the exact team name that user entered in the form
      const scoringTeam = eventData.team || 'The team';
  
      switch (eventSubtype) {
        case 'Regular Goal':
          return ` GOOOOAL! ${eventData.goal_scorer || 'the player'} scores with a shot after a great assist from ${eventData.assist_by || 'a teammate'}! ${scoringTeam} lead ${scoreDisplay} | ${eventData.minute || 0}'  Brilliant team play!`;
        
        case 'Penalty':
          return ` PENALTY GOAL! ${eventData.penalty_taker || 'the penalty taker'} steps up after a foul by ${eventData.foul_by || 'an opponent'} and buries it in the net! ${scoringTeam} lead ${scoreDisplay} | ${eventData.minute || 0}'  Clinical finish from the spot!`;
        
        case 'Free Kick':
          return `${eventData.minute || 0}' – GOAL!  ${eventData.goal_scorer || 'the player'} smashes it in after a brilliant free kick by ${eventData.free_kick_taker || 'a teammate'}! A stunning finish with the shot – pure class from the set-piece! ${scoringTeam} celebrate!`;
        
        case 'Own Goal':
          const opposingTeam = eventData.team || 'the team'; // Use whatever user entered
          return `${eventData.minute || 0}' – OWN GOAL!  ${eventData.player_name || 'the defender'} puts it into their own net while trying to deal with a ${eventData.how_happened || 'play'}! A nightmare moment for ${opposingTeam}!`;
        
        default:
          return ` GOAL ALERT! ${eventData.goal_scorer || 'A player'} finds the net! ${scoringTeam} ${scoreDisplay} | Game on! `;
      }
    }
  };
  
  export default GoalsTemplate;