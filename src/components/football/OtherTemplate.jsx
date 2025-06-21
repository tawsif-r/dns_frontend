const OtherTemplate = {
    // No quickSelect for Other tab since it's just a summary
    quickSelect: null,
    eventDetails: null,
    generateMessage: (eventData) => {
      return eventData.summary || '📝 Other event summary';
    }
  };
  
  export default OtherTemplate;