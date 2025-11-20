
import React, { useEffect, useState } from 'react';
import TextChatWidget from './TextChatWidget';

const ChatWidget = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showTextChat, setShowTextChat] = useState(false);

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
      setHasError(true);
      setShowTextChat(true);
    };
    
    document.head.appendChild(script);

    // Handle widget errors
    const handleError = (event: ErrorEvent) => {
      if (event.message?.includes('device') || event.message?.includes('microphone')) {
        console.warn('Microphone access issue detected, switching to text chat');
        setHasError(true);
        setShowTextChat(true);
      }
    };

    window.addEventListener('error', handleError);

    // Check for microphone after a delay
    const checkMicrophone = setTimeout(() => {
      if (!hasError && scriptLoaded) {
        navigator.mediaDevices?.getUserMedia({ audio: true })
          .catch(() => {
            console.warn('Microphone not available, switching to text chat');
            setShowTextChat(true);
          });
      }
    }, 2000);

    return () => {
      window.removeEventListener('error', handleError);
      clearTimeout(checkMicrophone);
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [hasError, scriptLoaded]);

  // Show text chat if there's an error or on desktop without microphone
  if (showTextChat || hasError) {
    return <TextChatWidget />;
  }

  // Don't render voice widget if script hasn't loaded
  if (!scriptLoaded) {
    return null;
  }

  return (
    <>
      <div 
        dangerouslySetInnerHTML={{
          __html: '<elevenlabs-convai agent-id="agent_01jxy7gz7wfxds1znm58xbvsg2"></elevenlabs-convai>'
        }}
      />
      {/* Always provide text chat as backup */}
      <TextChatWidget />
    </>
  );
};

export default ChatWidget;
