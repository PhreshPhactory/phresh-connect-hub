import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { RichTextEditor } from '@/components/RichTextEditor';
import { Pencil, Trash2, Eye, Plus, ArrowLeft } from 'lucide-react';

interface Edition {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  cover_image: string | null;
  content: string;
  published: boolean;
  published_at: string | null;
  featured_creator: string | null;
  created_at: string;
  updated_at: string;
}

const NewsletterEditionAdmin = () => {
  const { toast } = useToast();
  const { user, loading: authLoading, isContentManager, signOut } = useAuth();
  const [editions, setEditions] = useState<Edition[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Edition | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    cover_image: '',
    content: '',
    featured_creator: '',
    published: false,
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);

  useEffect(() => {
    if (user && isContentManager()) {
      fetchEditions();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchEditions = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('newsletter_editions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEditions(data || []);
    } catch (error) {
      console.error('Error fetching editions:', error);
      toast({ title: 'Error', description: 'Failed to fetch editions', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-').trim();

  const uploadCover = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `newsletter-covers/${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage.from('blog-images').upload(fileName, file);
      if (error) throw error;
      const { data } = supabase.storage.from('blog-images').getPublicUrl(fileName);
      return data.publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let coverUrl = editing?.cover_image || formData.cover_image || null;

      if (coverFile) {
        coverUrl = await uploadCover(coverFile);
        if (!coverUrl) throw new Error('Failed to upload cover image');
      }

      const slug = generateSlug(formData.title);
      const editionData = {
        title: formData.title,
        subtitle: formData.subtitle || null,
        slug,
        cover_image: coverUrl,
        content: formData.content,
        featured_creator: formData.featured_creator || null,
        published: formData.published,
        published_at: formData.published ? new Date().toISOString() : null,
      };

      if (editing) {
        const { error } = await (supabase as any)
          .from('newsletter_editions')
          .update(editionData)
          .eq('id', editing.id);
        if (error) throw error;
        toast({ title: 'Updated', description: 'Edition updated successfully' });
      } else {
        const { error } = await (supabase as any)
          .from('newsletter_editions')
          .insert([editionData]);
        if (error) throw error;
        toast({ title: 'Created', description: 'Edition created successfully' });
      }

      resetForm();
      fetchEditions();
    } catch (error: any) {
      console.error('Save error:', error);
      toast({ title: 'Error', description: error.message || 'Failed to save edition', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', subtitle: '', cover_image: '', content: '', featured_creator: '', published: false });
    setCoverFile(null);
    setEditing(null);
  };

  const handleEdit = (edition: Edition) => {
    setEditing(edition);
    setFormData({
      title: edition.title,
      subtitle: edition.subtitle || '',
      cover_image: edition.cover_image || '',
      content: edition.content,
      featured_creator: edition.featured_creator || '',
      published: edition.published,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this edition?')) return;
    try {
      const { error } = await (supabase as any).from('newsletter_editions').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Deleted', description: 'Edition deleted' });
      fetchEditions();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete edition', variant: 'destructive' });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader><CardTitle className="text-center">Admin Access Required</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center mb-4">Please <Link to="/auth" className="text-primary underline">sign in</Link> to manage newsletter editions.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isContentManager()) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader><CardTitle>Access Denied</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">You need admin or editor privileges.</p>
            <Button onClick={signOut} variant="outline">Sign Out</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-bold">Newsletter Editions</h1>
          </div>
          <Link to="/newsletter" target="_blank">
            <Button variant="outline" size="sm"><Eye className="w-4 h-4 mr-2" /> View Public Page</Button>
          </Link>
        </div>

        {/* Form */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {editing ? <Pencil className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {editing ? 'Edit Edition' : 'Create New Edition'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Club 7 Menswear"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="featured_creator">Featured Creator</Label>
                  <Input
                    id="featured_creator"
                    value={formData.featured_creator}
                    onChange={(e) => setFormData({ ...formData, featured_creator: e.target.value })}
                    placeholder="e.g. Alex Gede ♥ Club Seven Menswear"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Short description for the card"
                />
              </div>

              <div>
                <Label htmlFor="cover">Cover Image (9:16 portrait recommended)</Label>
                <Input
                  id="cover"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                />
                {(editing?.cover_image || formData.cover_image) && !coverFile && (
                  <p className="text-sm text-muted-foreground mt-1">Current cover set. Upload new to replace.</p>
                )}
              </div>

              <div>
                <Label>Content (HTML) *</Label>
                <RichTextEditor
                  content={formData.content}
                  onChange={(val) => setFormData({ ...formData, content: val })}
                />
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
                <Label>Published (visible on /newsletter and shareable)</Label>
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={loading}>
                  {editing ? 'Update Edition' : 'Create Edition'}
                </Button>
                {editing && (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Editions List */}
        <h2 className="text-xl font-semibold mb-4">All Editions ({editions.length})</h2>
        <div className="space-y-3">
          {editions.map((edition) => (
            <Card key={edition.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  {edition.cover_image && (
                    <img src={edition.cover_image} alt="" className="w-12 h-20 object-cover rounded" />
                  )}
                  <div>
                    <h3 className="font-semibold">{edition.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      /newsletter/{edition.slug}
                      {edition.published ? (
                        <span className="ml-2 text-teal font-medium">● Published</span>
                      ) : (
                        <span className="ml-2 text-tertiary font-medium">● Draft</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/newsletter/${edition.slug}`} target="_blank">
                    <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(edition)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(edition.id)} className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {editions.length === 0 && (
            <p className="text-muted-foreground text-center py-8">No editions yet. Create your first one above!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterEditionAdmin;
