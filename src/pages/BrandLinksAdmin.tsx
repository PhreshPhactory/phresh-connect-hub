import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Trash2, Plus, Save, ArrowUp, ArrowDown } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';

interface BrandLink {
  id: string;
  name: string;
  url: string;
  display_order: number;
  is_featured: boolean;
}

const BrandLinksAdmin = () => {
  const [links, setLinks] = useState<BrandLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }
    setIsAuthenticated(true);
    fetchLinks();
  };

  const fetchLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('brand_links')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setLinks(data || []);
    } catch (error) {
      console.error('Error fetching links:', error);
      toast.error('Failed to load brand links');
    } finally {
      setLoading(false);
    }
  };

  const addNewLink = () => {
    const maxOrder = links.length > 0 ? Math.max(...links.map(l => l.display_order)) : 0;
    setLinks([...links, {
      id: `new-${Date.now()}`,
      name: '',
      url: '',
      display_order: maxOrder + 1,
      is_featured: true
    }]);
  };

  const updateLink = (id: string, field: keyof BrandLink, value: any) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const toggleFeatured = async (link: BrandLink) => {
    const newValue = !link.is_featured;
    updateLink(link.id, 'is_featured', newValue);

    if (link.id.startsWith('new-')) {
      return; // Don't save unsaved links
    }

    try {
      const { error } = await supabase
        .from('brand_links')
        .update({ is_featured: newValue })
        .eq('id', link.id);

      if (error) throw error;
      toast.success(newValue ? 'Marked as featured' : 'Removed from featured');
    } catch (error) {
      console.error('Error updating featured status:', error);
      toast.error('Failed to update featured status');
      // Revert on error
      updateLink(link.id, 'is_featured', !newValue);
    }
  };

  const saveLink = async (link: BrandLink) => {
    try {
      if (link.id.startsWith('new-')) {
        const { data, error } = await supabase
          .from('brand_links')
          .insert({
            name: link.name,
            url: link.url,
            display_order: link.display_order,
            is_featured: link.is_featured
          })
          .select()
          .single();

        if (error) throw error;
        
        setLinks(links.map(l => l.id === link.id ? data : l));
        toast.success('Brand link added');
      } else {
        const { error } = await supabase
          .from('brand_links')
          .update({
            name: link.name,
            url: link.url,
            display_order: link.display_order,
            is_featured: link.is_featured
          })
          .eq('id', link.id);

        if (error) throw error;
        toast.success('Brand link updated');
      }
    } catch (error) {
      console.error('Error saving link:', error);
      toast.error('Failed to save brand link');
    }
  };

  const deleteLink = async (id: string) => {
    if (!confirm('Are you sure you want to delete this brand link?')) return;

    try {
      if (id.startsWith('new-')) {
        setLinks(links.filter(l => l.id !== id));
        return;
      }

      const { error } = await supabase
        .from('brand_links')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setLinks(links.filter(l => l.id !== id));
      toast.success('Brand link deleted');
    } catch (error) {
      console.error('Error deleting link:', error);
      toast.error('Failed to delete brand link');
    }
  };

  const moveLink = async (index: number, direction: 'up' | 'down') => {
    const newLinks = [...links];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newLinks.length) return;

    [newLinks[index], newLinks[targetIndex]] = [newLinks[targetIndex], newLinks[index]];
    
    newLinks.forEach((link, idx) => {
      link.display_order = idx + 1;
    });

    setLinks(newLinks);

    try {
      const updates = newLinks.filter(link => !link.id.startsWith('new-')).map(link => ({
        id: link.id,
        display_order: link.display_order
      }));

      for (const update of updates) {
        await supabase
          .from('brand_links')
          .update({ display_order: update.display_order })
          .eq('id', update.id);
      }
      
      toast.success('Order updated');
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order');
    }
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl mx-auto">
        {/* Admin Navigation */}
        <div className="flex gap-2 mb-8">
          <Button variant="outline" asChild>
            <Link to="/admin">Blog Posts</Link>
          </Button>
          <Button variant="default" asChild>
            <Link to="/admin/brand-links">Brand Links</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Manage Brand Links</CardTitle>
            <p className="text-muted-foreground">Add and manage the brand links shown on the shop page</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button onClick={addNewLink} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add New Brand Link
            </Button>

            {links.map((link, index) => (
              <Card key={link.id} className="border-2">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveLink(index, 'up')}
                        disabled={index === 0}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveLink(index, 'down')}
                        disabled={index === links.length - 1}
                      >
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label>Featured</Label>
                      <Switch
                        checked={link.is_featured}
                        onCheckedChange={() => toggleFeatured(link)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Brand Name</Label>
                    <Input
                      value={link.name}
                      onChange={(e) => updateLink(link.id, 'name', e.target.value)}
                      placeholder="e.g., No Guilt Bakes"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>URL</Label>
                    <Input
                      value={link.url}
                      onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => saveLink(link)}
                      className="flex-1"
                      disabled={!link.name || !link.url}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      onClick={() => deleteLink(link.id)}
                      variant="destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrandLinksAdmin;
