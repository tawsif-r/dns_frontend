const VARTemplate = {
    quickSelect: [
      { icon: '📹', label: 'Goal Check' },
      { icon: '🟨', label: 'Card Review' },
      { icon: '🚨', label: 'Offside Check' }
    ],
    eventDetails: {
      0: [ // Goal Check
        { label: 'Goal Scorer', value: '', placeholder: 'Who scored', key: 'goal_scorer' },
        { label: 'Check Reason', value: '', placeholder: 'Reason for VAR check', key: 'check_reason' },
        { label: 'Original Decision', value: '', placeholder: 'Referee original decision', key: 'original_decision' },
        { label: 'Final Decision', value: '', placeholder: 'VAR final decision', key: 'final_decision' }
      ],
      1: [ // Card Review
        { label: 'Player Name', value: '', placeholder: 'Player being reviewed', key: 'player_name' },
        { label: 'Team', value: '', placeholder: 'Enter team name', key: 'team' },
        { label: 'Original Decision', value: '', placeholder: 'Original card given', key: 'original_decision' },
        { label: 'Final Decision', value: '', placeholder: 'VAR decision', key: 'final_decision' }
      ],
      2: [ // Offside Check
        { label: 'Player Name', value: '', placeholder: 'Player checked for offside', key: 'player_name' },
        { label: 'Situation', value: '', placeholder: 'Type of play', key: 'situation' },
        { label: 'Check Duration', value: '', placeholder: 'How long VAR took', key: 'check_duration' },
        { label: 'Final Decision', value: '', placeholder: 'VAR decision', key: 'final_decision' }
      ]
    },
    generateMessage: (eventData, eventSubtype) => {
      switch (eventSubtype) {
        case 'Goal Check':
          return `VAR DRAMA! ${eventData.goal_scorer || 'Player'}'s goal under the microscope for ${eventData.check_reason || 'possible offside'}! Nail-biting wait - ${eventData.final_decision || 'GOAL STANDS'}! Justice prevails!`;
        
        case 'Card Review':
          return `VAR CARD CHECK! ${eventData.player_name || 'Player'} (${eventData.team || 'Team'})'s challenge being scrutinized! ${eventData.final_decision || 'RED CARD CONFIRMED'}! Technology doesn't lie!`;
        
        case 'Offside Check':
          return `OFFSIDE ALERT! ${eventData.player_name || 'Player'} flagged in ${eventData.situation || 'goal-scoring'} move! Millimeters matter - ${eventData.final_decision || 'ONSIDE'}! Correct call!`;
        
        default:
          return `VAR IN ACTION! Video technology reviewing the incident - modern football at work!`;
      }
    }
  };
  
  export default VARTemplate;