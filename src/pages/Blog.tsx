import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SEOHead from '@/components/SEOHead';
import { Calendar, ArrowRight, User } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      title: 'The Future of Fractional Leadership in 2024',
      excerpt: 'How fractional executives are reshaping the C-suite and driving business transformation across industries.',
      author: 'Kiera Thompson',
      date: '2024-03-15',
      category: 'Leadership',
      readTime: '5 min read',
      slug: 'future-fractional-leadership-2024'
    },
    {
      title: 'Building High-Performance Global Teams',
      excerpt: 'Essential strategies for managing distributed teams and maximizing productivity across time zones.',
      author: 'Marcus Chen',
      date: '2024-03-10',
      category: 'Global Talent',
      readTime: '7 min read',
      slug: 'building-global-teams'
    },
    {
      title: 'Legacy System Transformation: A Complete Guide',
      excerpt: 'Step-by-step approach to modernizing legacy systems without disrupting business operations.',
      author: 'Sarah Rodriguez',
      date: '2024-03-05',
      category: 'Transformation',
      readTime: '10 min read',
      slug: 'legacy-system-transformation-guide'
    },
    {
      title: 'Scalable Systems Architecture for Growing Businesses',
      excerpt: 'Design principles and best practices for building systems that scale with your business growth.',
      author: 'David Kim',
      date: '2024-02-28',
      category: 'Systems Design',
      readTime: '8 min read',
      slug: 'scalable-systems-architecture'
    },
    {
      title: 'Remote Work Culture: Beyond Geography',
      excerpt: 'Creating strong company culture in distributed teams and maintaining team cohesion.',
      author: 'Lisa Park',
      date: '2024-02-20',
      category: 'Culture',
      readTime: '6 min read',
      slug: 'remote-work-culture'
    },
    {
      title: 'ROI of Business Transformation Initiatives',
      excerpt: 'Measuring and maximizing the return on investment from your transformation projects.',
      author: 'Michael Brown',
      date: '2024-02-15',
      category: 'Strategy',
      readTime: '9 min read',
      slug: 'roi-business-transformation'
    }
  ];

  const categories = ['All', 'Leadership', 'Global Talent', 'Transformation', 'Systems Design', 'Culture', 'Strategy'];

  return (
    <>
      <SEOHead
        title="Blog | Phresh Phactory Business Transformation Insights"
        description="Read the latest insights on business transformation, fractional leadership, global talent, and systems design from Phresh Phactory experts."
        keywords="business transformation blog, fractional leadership insights, global talent articles, systems design tips, transformation strategies"
      />

      <div className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Transformation Insights
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert insights, strategies, and best practices for business transformation, 
              leadership development, and scaling operations in the modern economy.
            </p>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category, index) => (
              <Badge 
                key={index}
                variant={index === 0 ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 ${
                  index === 0 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'hover:bg-muted'
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Featured Post */}
          <Card className="mb-12 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-primary to-tertiary"></div>
              <CardContent className="md:w-2/3 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Badge className="bg-tertiary text-tertiary-foreground">Featured</Badge>
                  <Badge variant="outline">{blogPosts[0].category}</Badge>
                </div>
                <h2 className="text-3xl font-bold mb-4">{blogPosts[0].title}</h2>
                <p className="text-muted-foreground mb-6 text-lg">{blogPosts[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {blogPosts[0].author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(blogPosts[0].date).toLocaleDateString()}
                    </div>
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                  <Link 
                    to={`/blog/${blogPosts[0].slug}`}
                    className="inline-flex items-center text-primary hover:text-tertiary transition-colors font-medium"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </div>
          </Card>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-muted to-muted/50"></div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary hover:text-tertiary transition-colors font-medium mt-4"
                  >
                    Read Article
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center mt-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Stay Updated with Latest Insights
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Get weekly insights on business transformation, leadership strategies, and industry trends delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg text-primary flex-1"
              />
              <button className="btn-tertiary px-6 py-3 rounded-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;