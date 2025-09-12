
import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
}

const TypingText: React.FC<TypingTextProps> = ({
  text,
  speed = 50,
  delay = 0,
  className = '',
  showCursor = true
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let typingInterval: NodeJS.Timeout;
    
    const timer = setTimeout(() => {
      setIsTyping(true);
      let i = 0;
      typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (typingInterval) {
        clearInterval(typingInterval);
      }
    };
  }, [text, speed, delay]);

  return (
    <div className={`relative z-10 ${className} ${isTyping && showCursor ? 'typing-text' : ''}`}>
      {displayText}
      {!isTyping && showCursor && <span className="animate-pulse">|</span>}
    </div>
  );
};

export default TypingText;
