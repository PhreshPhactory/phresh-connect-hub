
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
        <div className="flex items-center gap-4">
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
          <a
            href="https://www.linkedin.com/newsletters/phresh-phactory-growth-notes-7320251645966061568/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center text-sm"
            title="Read on LinkedIn"
          >
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
