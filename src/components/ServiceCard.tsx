
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  isAnimated?: boolean;
  className?: string;
  testimonial?: string;
  testimonialAuthor?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  link,
  isAnimated = true,
  className = '',
  testimonial,
  testimonialAuthor,
}) => {
  return (
    <div 
      className={`bg-white p-12 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-strategic-gold/20 group card-hover hover:border-strategic-gold/40 text-center ${
        isAnimated ? 'animate-on-scroll' : ''
      } ${className}`}
    >
      <div className="text-global-teal mb-8 group-hover:scale-110 group-hover:text-strategic-gold transition-all duration-300 p-4 bg-global-teal/10 rounded-full w-fit mx-auto">{icon}</div>
      <h3 className="text-2xl font-heading font-bold mb-6 group-hover:text-global-teal transition-colors duration-300 text-black text-center text-[24px] leading-[32px] sm:text-2xl sm:leading-8">
        {title}
      </h3>
      <p className="text-jet-gray mb-10 leading-relaxed transition-colors duration-300 group-hover:text-jet-gray/80 font-medium text-lg">{description}</p>
      
      {testimonial && (
        <div className="mb-8 p-4 bg-muted rounded-lg italic text-base transition-all duration-300 group-hover:bg-muted/80">
          "{testimonial}"
          {testimonialAuthor && <div className="mt-2 font-medium not-italic text-base">{testimonialAuthor}</div>}
        </div>
      )}
      
      <Button 
        asChild 
        className="mt-auto bg-global-teal hover:bg-strategic-gold text-white px-8 py-3 font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
      >
        <Link to={link}>Learn More</Link>
      </Button>
    </div>
  );
};

export default ServiceCard;
