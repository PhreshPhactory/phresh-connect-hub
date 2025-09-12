
import React from 'react';

interface TestimonialCardProps {
  quote: string;
  highlightQuote?: string;
  author: string;
  role: string;
  company: string;
  image?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  highlightQuote,
  author,
  role,
  company,
  image,
}) => {
  // Helper function to format role and company display
  const formatRoleCompany = () => {
    const hasRole = role && role.trim() !== '';
    const hasCompany = company && company.trim() !== '';
    
    if (hasRole && hasCompany) {
      return `${role}, ${company}`;
    } else if (hasRole) {
      return role;
    } else if (hasCompany) {
      return company;
    }
    return '';
  };

  const roleCompanyText = formatRoleCompany();

  return (
    <div className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 p-10 mx-4 h-auto flex flex-col border-2 border-strategic-gold/10 hover:border-strategic-gold/30 group">
      <div className="mb-8">
        <svg className="w-12 h-12 text-strategic-gold mb-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
        </svg>
      </div>

      {highlightQuote && (
        <div className="mb-4">
          <h4 className="text-xl font-bold text-primary">{highlightQuote}</h4>
        </div>
      )}
      
      <blockquote className="text-xl text-jet-gray leading-relaxed font-medium mb-8 quote-text">
        "{quote}"
      </blockquote>
      
      <div className="flex items-center mt-auto">
        {image && (
          <div className="mr-4">
            <img
              src={image}
              alt={author}
              className="w-14 h-14 rounded-full object-cover border-2 border-strategic-gold/30"
            />
          </div>
        )}
        <div>
          <div className="font-heading font-bold text-black text-lg">{author}</div>
          {roleCompanyText && (
            <div className="text-base text-jet-gray font-medium">
              {roleCompanyText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
