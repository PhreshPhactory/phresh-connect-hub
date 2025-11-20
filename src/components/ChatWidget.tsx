
import React, { useEffect, useState } from 'react';

const ChatWidget = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Check if script already exists
    const existingScript = document.querySelector('script[src*="elevenlabs"]');
    if (existingScript) {
      setScriptLoaded(true);
      return;
    }
    
    // Load the ElevenLabs script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    
    script.onload = () => {
      setScriptLoaded(true);
    };
    
    script.onerror = () => {
      console.error('Failed to load ElevenLabs widget');
      setScriptLoaded(false);
    };
    
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  if (!scriptLoaded) {
    return null;
  }

  return (
    <div 
      dangerouslySetInnerHTML={{
        __html: '<elevenlabs-convai agent-id="agent_01jxy7gz7wfxds1znm58xbvsg2"></elevenlabs-convai>'
      }}
    />
  );
};

export default ChatWidget;
