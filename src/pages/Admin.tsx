import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RichTextEditor } from '@/components/RichTextEditor';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';

interface Product {
  item_name: string;
  link: string;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  slug: string;
  feature_image: string | null;
  video_url: string | null;
  shopping_link: string | null;
  brand_name: string | null;
  products: Product[];
  published: boolean;
  created_at: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isContentManager, setIsContentManager] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    video_url: '',
    shopping_link: '',
    brand_name: '',
    products: [] as Product[],
    published: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const categories = [
    'Technology',
    'Business',
    'Design',
    'Marketing',
    'Leadership',
    'Innovation',
    'Strategy',
    'Product Spotlight',
  ];

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Check user role after setting session
          setTimeout(() => {
            checkUserRole(session.user.id);
          }, 0);
        } else {
          setIsContentManager(false);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkUserRole(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUserRole = async (userId: string) => {
    try {
      const { data, error } = await (supabase as any)
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .in('role', ['admin', 'editor']);

      if (error) throw error;
      
      const hasContentManagerRole = data && data.length > 0;
      setIsContentManager(hasContentManagerRole);
      
      if (hasContentManagerRole) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error checking user role:', error);
      setIsContentManager(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    console.log('🔍 Starting fetchPosts...');
    try {
      console.log('📡 Making database query...');
      const { data, error } = await (supabase as any)
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('📊 Database response:', { data, error });
      if (error) {
        console.error('❌ Database error:', error);
        throw error;
      }
      console.log('✅ Posts fetched successfully:', data?.length || 0, 'posts');
      setPosts(data || []);
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch blog posts',
        variant: 'destructive',
      });
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Starting form submission...');
    console.log('📝 Form data:', formData);
    setLoading(true);

    try {
      let imageUrl = editingPost?.feature_image || null;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
        if (!imageUrl) {
          throw new Error('Failed to upload image');
        }
      }

      const slug = generateSlug(formData.title);
      const postData = {
        ...formData,
        slug,
        feature_image: imageUrl,
      };
      
      console.log('📤 Preparing to save post data:', postData);

      if (editingPost) {
        console.log('✏️ Updating existing post...');
        const { error } = await (supabase as any)
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);

        if (error) {
          console.error('❌ Update error:', error);
          throw error;
        }
        console.log('✅ Post updated successfully');
        toast({
          title: 'Success',
          description: 'Blog post updated successfully',
        });
      } else {
        console.log('➕ Creating new post...');
        const { error } = await (supabase as any)
          .from('blog_posts')
          .insert([postData]);

        if (error) {
          console.error('❌ Create error:', error);
          throw error;
        }
        console.log('✅ Post created successfully');
        toast({
          title: 'Success',
          description: 'Blog post created successfully',
        });
      }

      console.log('🔄 Refreshing posts list...');
      resetForm();
      fetchPosts();
    } catch (error) {
      console.error('💥 Form submission error:', error);
      console.error('Error saving post:', error);
      toast({
        title: 'Error',
        description: 'Failed to save blog post',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: '',
      video_url: '',
      shopping_link: '',
      brand_name: '',
      products: [],
      published: false,
    });
    setImageFile(null);
    setEditingPost(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      category: post.category,
      video_url: post.video_url || '',
      shopping_link: post.shopping_link || '',
      brand_name: post.brand_name || '',
      products: post.products || [],
      published: post.published,
    });
  };

  const addProduct = () => {
    if (formData.products.length < 6) {
      setFormData({
        ...formData,
        products: [...formData.products, { item_name: '', link: '' }]
      });
    }
  };

  const removeProduct = (index: number) => {
    setFormData({
      ...formData,
      products: formData.products.filter((_, i) => i !== index)
    });
  };

  const updateProduct = (index: number, field: keyof Product, value: string) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setFormData({ ...formData, products: updatedProducts });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await (supabase as any)
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: 'Success',
        description: 'Blog post deleted successfully',
      });
      fetchPosts();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete blog post',
        variant: 'destructive',
      });
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Not signed in
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Admin Access Required</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                signIn(
                  formData.get('email') as string,
                  formData.get('password') as string
                );
              }} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
              <div className="mt-4 text-center">
                <Link 
                  to="/" 
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  ← Back to Home
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Signed in but not authorized
  if (!isContentManager) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                You don't have permission to access the blog admin. You need admin or editor privileges.
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Signed in as: {user.email}
              </p>
              <div className="flex gap-2 justify-center">
                <Button onClick={signOut} variant="outline">
                  Sign Out
                </Button>
                <Link to="/">
                  <Button variant="default">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Authorized admin/editor interface
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Blog Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Signed in as: {user.email}
            </span>
            <Button onClick={signOut} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card>
            <CardHeader>
              <CardTitle>
                {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Input
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="image">Feature Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setImageFile(e.target.files?.[0] || null)
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="video_url">YouTube Video URL (optional)</Label>
                  <Input
                    id="video_url"
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={formData.video_url}
                    onChange={(e) =>
                      setFormData({ ...formData, video_url: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="shopping_link">Shopping Link (optional)</Label>
                  <Input
                    id="shopping_link"
                    type="url"
                    placeholder="https://example.com/shop/product"
                    value={formData.shopping_link}
                    onChange={(e) =>
                      setFormData({ ...formData, shopping_link: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="brand_name">Brand Name (for Shop button)</Label>
                  <Input
                    id="brand_name"
                    type="text"
                    placeholder="e.g., BigUp Street Greets"
                    value={formData.brand_name}
                    onChange={(e) =>
                      setFormData({ ...formData, brand_name: e.target.value })
                    }
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    This will appear as "Shop [Brand Name] Now" on the Buy Black page
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Products (up to 6)</Label>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={addProduct}
                      disabled={formData.products.length >= 6}
                    >
                      + Add Product
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {formData.products.map((product, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Product {index + 1}</span>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => removeProduct(index)}
                          >
                            Remove
                          </Button>
                        </div>
                        <div>
                          <Label htmlFor={`item-${index}`}>Item Name</Label>
                          <Input
                            id={`item-${index}`}
                            value={product.item_name}
                            onChange={(e) => updateProduct(index, 'item_name', e.target.value)}
                            placeholder="e.g., Greeting Cards Set"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`link-${index}`}>Product Link</Label>
                          <Input
                            id={`link-${index}`}
                            type="url"
                            value={product.link}
                            onChange={(e) => updateProduct(index, 'link', e.target.value)}
                            placeholder="https://example.com/product"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <RichTextEditor
                    content={formData.content}
                    onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                    placeholder="Write your blog post content here..."
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, published: checked })
                    }
                  />
                  <Label htmlFor="published">Published</Label>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={loading}>
                    {loading
                      ? 'Saving...'
                      : editingPost
                      ? 'Update Post'
                      : 'Create Post'}
                  </Button>
                  {editingPost && (
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Posts List */}
          <Card>
            <CardHeader>
              <CardTitle>Existing Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Total posts: {posts.length}
                </p>
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="border border-border rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{post.title}</h3>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(post)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(post.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Category: {post.category}</span>
                      <span>
                        Status: {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;