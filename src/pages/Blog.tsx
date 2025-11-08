import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '@/components/BlogCard';
import NewsletterForm from '@/components/NewsletterForm';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEOHead';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  feature_image: string | null;
  created_at: string;
  slug: string;
}

const Blog = () => {
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState('All Topics');
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Simple filter function
  const getFilteredPosts = () => {
    if (activeFilter === 'All Topics') {
      return allPosts;
    }
    return allPosts.filter(post => post.category === activeFilter);
  };

  const filteredPosts = getFilteredPosts();
  const categories = ['All Topics', 'Leadership', 'Strategy'];

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .neq('category', 'Product Spotlight')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAllPosts(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to load blog posts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterClick = (category: string) => {
    console.log('Filter clicked:', category);
    setActiveFilter(category);
  };

  console.log('Current filter:', activeFilter);
  console.log('Total posts:', allPosts.length);
  console.log('Filtered posts:', filteredPosts.length);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Blog | Insights on Business Transformation & Leadership"
        description="Explore the Phresh Phactory blog for expert insights on business transformation, leadership, talent management, and industry trends shaping the future."
        keywords="Business Transformation Blog, Leadership Insights, Talent Management, Industry Analysis, Expert Articles"
        canonicalUrl="https://phreshphactory.co/blog"
      />
      {/* Hero Section */}
      <section className="bg-background py-15 md:py-15">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Strategic Insights Hub</h1>
            <p className="text-xl mb-8 text-muted-foreground">
              Thought leadership on transformation, global talent excellence, and building high-performance systems.
            </p>
          </div>
        </div>
      </section>
      
      {/* Blog Section */}
      <section className="py-15 bg-muted">
        <div className="container-custom">
          {/* Filter Buttons */}
          <div className="mb-12 animate-fade-in">
            <div className="flex justify-center">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeFilter === category ? "default" : "outline"}
                    onClick={() => handleFilterClick(category)}
                    className="text-sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Loading blog posts...</p>
              </div>
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <BlogCard
                  key={`${post.id}-${activeFilter}`}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  category={post.category}
                  image={post.feature_image || '/placeholder.svg'}
                  slug={post.slug}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground mb-4">No blog posts found for "{activeFilter}" category.</p>
                <Button onClick={() => handleFilterClick('All Topics')}>Show All Posts</Button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <NewsletterForm 
        title="Join leaders getting strategic insights"
        subtitle="Weekly strategies on transformation, global talent, and high-performance systems."
        benefits={[
          "Strategic frameworks",
          "Global talent insights", 
          "Transformation guides",
          "Leadership principles"
        ]}
        className="bg-white py-15"
        dark={false}
      />
    </div>
  );
};

export default Blog;