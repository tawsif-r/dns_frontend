const TimeEventsTemplate = {
    quickSelect: [
      { icon: '⏱️', label: 'Half Time' },
      { icon: '🏁', label: 'Full Time' },
      { icon: '⚡', label: 'Kick Off' }
    ],
    eventDetails: {
      0: [ // Half Time
        { label: 'Half', value: '', placeholder: 'Which half ending', key: 'half' },
        { label: 'Score', value: '', placeholder: 'Score at half time', key: 'score' },
        { label: 'Added Time', value: '', placeholder: 'Added time played', key: 'added_time' },
        { label: 'Key Events', value: '', placeholder: 'Summary of half', key: 'key_events' }
      ],
      1: [ // Full Time
        { label: 'Final Score', value: '', placeholder: 'Final match score', key: 'final_score' },
        { label: 'Match Duration', value: '', placeholder: 'Total match time', key: 'match_duration' },
        { label: 'Winner', value: '', placeholder: 'Winning team', key: 'winner' },
        { label: 'Man of Match', value: '', placeholder: 'Best player', key: 'man_of_match' }
      ],
      2: [ // Kick Off
        { label: 'Event Type', value: '', placeholder: 'Start/Restart/Second Half', key: 'event_type' },
        { label: 'Kicking Off', value: '', placeholder: 'Team kicking off', key: 'kicking_off' },
        { label: 'Venue', value: '', placeholder: 'Match venue', key: 'venue' },
        { label: 'Attendance', value: '', placeholder: 'Stadium attendance', key: 'attendance' }
      ]
    },
    generateMessage: (eventData, eventSubtype) => {
      switch (eventSubtype) {
        case 'Half Time':
          return ` HALF TIME WHISTLE! ${eventData.score || 'Arsenal 1-1 Chelsea'} at the break! ${eventData.key_events || 'Pulsating 45 minutes'} - ${eventData.stats_summary ? `${eventData.stats_summary} | ` : ''}${eventData.added_time || '3 minutes'} of added time played. ${eventData.half_analysis || 'All to play for in the second half!'} `;
        
        case 'Full Time':
          return ` FINAL WHISTLE! ${eventData.final_score || 'Arsenal 2-1 Chelsea'} - ${eventData.winner || 'Arsenal'} secure victory after ${eventData.match_duration || '94 minutes'} of ${eventData.match_description || 'thrilling football'}! ${eventData.man_of_match ? ` ${eventData.man_of_match} takes Man of the Match honors!` : ''} ${eventData.significance ? `${eventData.significance}` : 'What a game!'} `;
        
        case 'Kick Off':
          return ` ${eventData.event_type || 'WE\'RE UNDERWAY'}! ${eventData.kicking_off || 'Arsenal'} get the match started at ${eventData.venue || 'Emirates Stadium'}! ${eventData.attendance ? `${eventData.attendance} passionate fans` : 'Packed stadium'} ready for ${eventData.match_importance || 'footballing excellence'}! ${eventData.weather ? `Perfect ${eventData.weather} conditions!` : 'Game on!'} `;
        
        default:
          return ` TIME UPDATE! Important match timing information - stay tuned! `;
      }
    }
  };
  
  export default TimeEventsTemplate;