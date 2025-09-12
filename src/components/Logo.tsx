
import React from 'react';

interface LogoProps {
  className?: string;
  textColor?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-10 w-auto', textColor = '#000000' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img src="/lovable-uploads/40b50a20-2f72-4fb8-b1d0-9e78f6d71dfa.png" alt="Phresh Phactory Logo" />
    </div>
  );
};

export default Logo;
