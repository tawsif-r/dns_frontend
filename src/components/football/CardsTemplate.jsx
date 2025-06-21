const CardsTemplate = {
    quickSelect: [
      { icon: '🟨', label: 'Yellow Card' },
      { icon: '🟥', label: 'Red Card' },
      { icon: '🟨🟨', label: 'Second Yellow' },
      { icon: '⚡', label: 'VAR Card' }
    ],
    eventDetails: {
      0: [ // Yellow Card
        { label: 'Player Name', value: '', placeholder: 'Enter player name', key: 'player_name' },
        { label: 'Team', value: '', placeholder: 'Enter team name', key: 'team' },
        { label: 'Reason', value: '', placeholder: 'Reason for card', key: 'reason' },
        { label: 'Minute', value: '', placeholder: 'Match minute', key: 'minute' }
      ],
      1: [ // Red Card
        { label: 'Player Name', value: '', placeholder: 'Enter player name', key: 'player_name' },
        { label: 'Team', value: '', placeholder: 'Enter team name', key: 'team' },
        { label: 'Reason', value: '', placeholder: 'Reason for red card', key: 'reason' },
        { label: 'Minute', value: '', placeholder: 'Match minute', key: 'minute' }
      ],
      2: [ // Second Yellow
        { label: 'Player Name', value: '', placeholder: 'Enter player name', key: 'player_name' },
        { label: 'Team', value: '', placeholder: 'Enter team name', key: 'team' },
        { label: 'Minute', value: '', placeholder: 'Time', key: 'first_reason' },
        { label: 'Second Card Reason', value: '', placeholder: 'Second yellow reason', key: 'second_reason' }
      ],
      3: [ // VAR Card
        { label: 'Player Name', value: '', placeholder: 'Enter player name', key: 'player_name' },
        { label: 'Team', value: '', placeholder: 'Enter team name', key: 'team' },
        { label: 'Original Decision', value: '', placeholder: 'Referee original decision', key: 'original_decision' },
        { label: 'VAR Decision', value: '', placeholder: 'VAR final decision', key: 'var_decision' }
      ]
    },
    generateMessage: (eventData, eventSubtype) => {
      // Use the exact team name that user entered in the form
      const teamName = eventData.team || 'the team';
      
      switch (eventSubtype) {
        case 'Yellow Card':
          return ` BOOKING! ${eventData.player_name || 'The player'} (${teamName}) goes into the referee's book for ${eventData.reason || 'a foul'}! Walking a tightrope now! | ${eventData.minute || 0}' `;
        
        case 'Red Card':
          return ` SENT OFF! ${eventData.player_name || 'The player'} (${teamName}) sees red for ${eventData.reason || 'serious foul play'}! ${teamName} down to 10 men! Game-changer! | ${eventData.minute || 0}' `;
        
        case 'Second Yellow':
          return `DOUBLE TROUBLE! ${eventData.player_name || 'The player'} (${teamName}) picks up a second yellow for ${eventData.second_reason || 'another foul'} and is OFF! ${eventData.first_reason ? `First yellow was for ${eventData.first_reason} - ` : ''}Costly mistake! ${teamName} in trouble! `;
        
        case 'VAR Card':
          return ` VAR INTERVENTION! After video review, ${eventData.player_name || 'the player'} (${teamName}) receives ${eventData.var_decision || 'a card'}! ${eventData.original_decision ? `Originally ${eventData.original_decision} - ` : ''}Technology gets it right! Justice served! `;
        
        default:
          return ` CARD ALERT! ${eventData.player_name || 'The player'} (${teamName}) in trouble with the referee! Discipline needed! `;
      }
    }
  };
  
  export default CardsTemplate;