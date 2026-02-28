
import React from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from '@/components/OptimizedImage';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  excerpt,
  category,
  image,
  slug,
}) => {
  return (
    <article className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-border hover-lift animate-fade-in">
      <Link to={`/growthnotes/${slug}`} className="block">
        <div className="relative w-full h-[240px] overflow-hidden bg-muted/50">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
            loading="lazy"
            style={{ 
              width: '100%',
              height: '100%',
              minHeight: '240px',
              maxHeight: '240px',
              objectFit: 'cover',
              objectPosition: 'center center'
            }}
            onError={(e) => {
              const target = e.currentTarget;
              target.src = '/placeholder.svg';
              target.style.objectFit = 'contain';
              target.style.padding = '2rem';
            }}
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-center mb-3">
          <span className="inline-block bg-muted text-foreground text-base font-medium px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
        <Link to={`/growthnotes/${slug}`} className="hover:text-primary transition-colors">
          <h3 className="text-xl font-semibold mb-3 text-foreground font-serif">{title}</h3>
        </Link>
        <p className="text-muted-foreground mb-4 leading-relaxed">{excerpt}</p>
        <Link
          to={`/growthnotes/${slug}`}
          className="text-primary font-medium hover:text-primary/80 transition-colors inline-flex items-center group"
        >
          Read More
          <svg
            className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
