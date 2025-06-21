const SpecialTemplate = {
    quickSelect: [
      { icon: '🧤', label: 'Great Save' },
      { icon: '🏠', label: 'Near Miss' },
      { icon: '🏥', label: 'Injury' },
      { icon: '🎯', label: 'Milestone' }
    ],
    eventDetails: {
      0: [ // Great Save
        { label: 'Goalkeeper', value: '', placeholder: 'Enter goalkeeper name', key: 'goalkeeper' },
        { label: 'Save Type', value: '', placeholder: 'Type of save', key: 'save_type' },
        { label: 'Shot Origin', value: '', placeholder: 'Where shot came from', key: 'shot_origin' },
        { label: 'Difficulty', value: '', placeholder: 'Easy/Good/Brilliant/World Class', key: 'difficulty' }
      ],
      1: [ // Near Miss
        { label: 'Player Name', value: '', placeholder: 'Enter player name', key: 'player_name' },
        { label: 'Attempt Type', value: '', placeholder: 'Header/Shot/Volley', key: 'attempt_type' },
        { label: 'How Close', value: '', placeholder: 'How close to goal', key: 'how_close' },
        { label: 'Quality', value: '', placeholder: 'Describe the chance', key: 'quality' }
      ],
      2: [ // Injury
        { label: 'Player Name', value: '', placeholder: 'Enter player name', key: 'player_name' },
        { label: 'Injury Type', value: '', placeholder: 'Type of injury', key: 'injury_type' },
        { label: 'Severity', value: '', placeholder: 'Minor/Serious/Unknown', key: 'severity' },
        { label: 'Play Status', value: '', placeholder: 'Substituted/Continuing', key: 'play_status' }
      ],
      3: [ // Milestone
        { label: 'Player Name', value: '', placeholder: 'Enter player name', key: 'player_name' },
        { label: 'Milestone Type', value: '', placeholder: 'Type of milestone', key: 'milestone_type' },
        { label: 'Achievement', value: '', placeholder: 'Describe achievement', key: 'achievement' },
        { label: 'Significance', value: '', placeholder: 'Why its important', key: 'significance' }
      ]
    },
    generateMessage: (eventData, eventSubtype) => {
      switch (eventSubtype) {
        case 'Great Save':
          return ` ${eventData.difficulty || 'WORLD-CLASS'} SAVE! ${eventData.goalkeeper || 'The keeper'} pulls off a ${eventData.save_type || 'spectacular stop'} from ${eventData.shot_origin || 'point-blank range'}! ${eventData.save_description ? `${eventData.save_description} - ` : ''}${eventData.shooter ? `Denied ${eventData.shooter}!` : 'Brilliant reflexes!'} ${eventData.importance ? `${eventData.importance}` : 'Match-saving moment!'} `;
        
        case 'Near Miss':
          return ` OH SO CLOSE! ${eventData.player_name || 'Player'} with a ${eventData.attempt_type || 'thunderous effort'} that goes ${eventData.how_close || 'agonizingly wide'}! ${eventData.buildup ? `${eventData.buildup} - ` : ''}${eventData.quality || 'Breathtaking chance'} ${eventData.reaction ? `- ${eventData.reaction}!` : 'goes begging!'} Hearts in mouths! `;
        
        case 'Injury':
          return ` INJURY CONCERN! ${eventData.player_name || 'Player'} has picked up ${eventData.injury_type || 'a knock'} ${eventData.how_occurred ? `after ${eventData.how_occurred}` : 'in the action'}! ${eventData.severity || 'Being assessed by medical staff'} - ${eventData.play_status || 'trying to continue'}. ${eventData.team_impact ? `Could affect ${eventData.team}'s plans!` : 'Hoping it\'s nothing serious!'} `;
        
        case 'Milestone':
          return ` HISTORIC MOMENT! ${eventData.player_name || 'Player'} achieves ${eventData.milestone_type || 'a special milestone'} - ${eventData.achievement || 'remarkable achievement'}! ${eventData.significance || 'A moment to remember'} ${eventData.career_context ? `in their ${eventData.career_context}!` : 'in their career!'} ${eventData.celebration ? `${eventData.celebration}` : 'Richly deserved!'} `;
        
        default:
          return ` SPECIAL MOMENT! Something extraordinary is happening on the pitch - football magic in the making! `;
      }
    }
  };
  
  export default SpecialTemplate;