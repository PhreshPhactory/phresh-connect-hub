
import React from 'react';
import { Check } from 'lucide-react';

interface OutcomeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefit?: string;
}

const OutcomeCard: React.FC<OutcomeCardProps> = ({ icon, title, description, benefit }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 sm:p-10 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 group animate-on-scroll h-full border-2 border-strategic-gold/10 hover:border-strategic-gold/30">
      <div className="text-global-teal mb-8 p-6 bg-global-teal/10 rounded-full group-hover:bg-strategic-gold/20 group-hover:text-strategic-gold transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-heading font-bold mb-4 group-hover:text-global-teal transition-colors duration-300 text-black">{title}</h3>
      <p className="text-jet-gray leading-relaxed mb-6 font-medium">{description}</p>
      {benefit && (
        <div className="mt-auto">
          <span className="inline-flex items-center text-base font-bold text-white bg-strategic-gold px-4 py-2 rounded-full shadow-lg">
            <Check className="w-5 h-5 mr-2" />
            {benefit}
          </span>
        </div>
      )}
    </div>
  );
};

export default OutcomeCard;
