import React from 'react';
import { Mail, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface SocialShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ url, title, className = '' }) => {
  const browserOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://phreshphactory.com';
  const browserPath = typeof window !== 'undefined' ? window.location.pathname : '';

  let pathFromProp = '';
  if (!browserPath && url) {
    try {
      pathFromProp = new URL(url).pathname;
    } catch {
      pathFromProp = '';
    }
  }

  const preferredPath = browserPath || pathFromProp || '/';
  const normalizedPath = preferredPath === '/' ? '/cultureandcommerce' : preferredPath;
  const shareUrl = `${browserOrigin}${normalizedPath}`;

  const shareMessage = `I think you'll find this interesting — Culture & Commerce celebrates modern Afro-descendant created brands while spotlighting the next wave of visionaries you need to know. Check it out: ${shareUrl}`;
  const encodedMessage = encodeURIComponent(shareMessage);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedEmailSubject = encodeURIComponent(title);

  const shareLinks = {
    email: `mailto:?subject=${encodedEmailSubject}&body=${encodedMessage}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      toast.success('Share message copied to clipboard!');
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Copy Link */}
      <button onClick={handleCopyLink} className="p-2 rounded-full border border-current/20 hover:border-primary hover:text-primary transition-colors" aria-label="Copy share message">
        <Copy className="w-4 h-4" />
      </button>
      {/* Email */}
      <a href={shareLinks.email} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-current/20 hover:border-primary hover:text-primary transition-colors" aria-label="Share via email">
        <Mail className="w-4 h-4" />
      </a>
      {/* LinkedIn */}
      <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-current/20 hover:border-primary hover:text-primary transition-colors" aria-label="Share on LinkedIn">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      {/* Facebook */}
      <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-current/20 hover:border-primary hover:text-primary transition-colors" aria-label="Share on Facebook">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      </a>
    </div>
  );
};

export default SocialShareButtons;
