
import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PricingFeature {
  text: string;
}

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  isPopular?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  description,
  features,
  isPopular = false,
  buttonText = 'Book Now',
  buttonLink = '/contact',
}) => {
  return (
    <div className={`
      rounded-lg border bg-card shadow-sm transition-all duration-300
      ${isPopular 
        ? 'border-primary relative animate-scale-in' 
        : 'border-border animate-on-scroll hover-lift'}
    `}>
      {isPopular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-primary text-primary-foreground text-base font-medium px-3 py-1 rounded-full">
            Recommended
          </span>
        </div>
      )}
      <div className="p-6">
        <h3 className="font-medium text-2xl">{title}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-3xl font-bold">{price}</span>
          <span className="ml-1 text-muted-foreground">{period}</span>
        </div>
        <p className="mt-4 text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col gap-4 p-6 pt-0">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 pt-0">
        <Button 
          asChild 
          className="w-full" 
          variant={isPopular ? "default" : "outline"}
        >
          <Link to={buttonLink}>{buttonText}</Link>
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
