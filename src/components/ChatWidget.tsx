
import React, { useEffect } from 'react';

const ChatWidget = () => {
  useEffect(() => {
    // Only run on client side
    if (typeof document === 'undefined') return;
    
    // Load the ElevenLabs script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div 
      dangerouslySetInnerHTML={{
        __html: '<elevenlabs-convai agent-id="agent_01jxy7gz7wfxds1znm58xbvsg2"></elevenlabs-convai>'
      }}
    />
  );
};

export default ChatWidget;
