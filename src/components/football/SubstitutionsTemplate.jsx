const SubstitutionsTemplate = {
    quickSelect: [
      { icon: '🔄', label: 'Regular Sub' },
      { icon: '🏥', label: 'Injury Sub' },
      { icon: '🎯', label: 'Tactical Sub' },
    ],
    eventDetails: {
      0: [ // Regular Sub
        { label: 'Player Off', value: '', placeholder: 'Player coming off', key: 'player_off' },
        { label: 'Player On', value: '', placeholder: 'Player coming on', key: 'player_on' },
        { label: 'Team', value: '', placeholder: 'Enter team name', key: 'team' },
        { label: 'Minute', value: '', placeholder: 'Match minute', key: 'minute' }
      ],
      1: [ // Injury Sub
        { label: 'Player Off', value: '', placeholder: 'Injured player', key: 'player_off' },
        { label: 'Player On', value: '', placeholder: 'Replacement player', key: 'player_on' },
        { label: 'Injury Type', value: '', placeholder: 'Type of injury', key: 'injury_type' },
        { label: 'Minute', value: '', placeholder: 'Match minute', key: 'minute' }
      ],
      2: [ // Tactical Sub
        { label: 'Player Off', value: '', placeholder: 'Player coming off', key: 'player_off' },
        { label: 'Player On', value: '', placeholder: 'Player coming on', key: 'player_on' },
        { label: 'Tactical Reason', value: '', placeholder: 'Reason for change', key: 'tactical_reason' },
        { label: 'Minute', value: '', placeholder: 'Match minute', key: 'minute' }
      ],
    },
    generateMessage: (eventData, eventSubtype) => {
      switch (eventSubtype) {
        case 'Regular Sub':
          return ` TACTICAL SWITCH! ${eventData.player_off || 'Player'} makes way for ${eventData.player_on || 'Player'} (${eventData.team || 'Team'})! Fresh legs entering the fray! | ${eventData.minute || '75'}'`;
        
        case 'Injury Sub':
          return ` FORCED CHANGE! ${eventData.player_off || 'Player'} can't continue with ${eventData.injury_type || 'an injury'} - ${eventData.player_on || 'Player'} called into action! Hope it's not serious! | ${eventData.minute || '34'}' `;
        
        case 'Tactical Sub':
          return ` MASTERCLASS MOVE! ${eventData.coach || 'The manager'} brings on ${eventData.player_on || 'Player'} for ${eventData.player_off || 'Player'}! ${eventData.tactical_reason || 'Tactical masterstroke'} - could be game-changing! | ${eventData.minute || '82'}' `;
        
        default:
          return ` PERSONNEL CHANGE! Manager making moves - fresh blood on the pitch! Strategy in motion! `;
      }
    }
  };
  
  export default SubstitutionsTemplate;