import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import { Download, ArrowLeft, Pencil, Trash2, Plus } from 'lucide-react';

interface BrandContact {
  id: string;
  brand_name: string;
  brand_email: string | null;
  brand_website: string | null;
  brand_whatsapp: string | null;
  brand_instagram: string | null;
  brand_tiktok: string | null;
  brand_youtube: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

const BrandContactsAdmin = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isContentManager, setIsContentManager] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<BrandContact[]>([]);
  const [editingContact, setEditingContact] = useState<BrandContact | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    brand_name: '',
    brand_email: '',
    brand_website: '',
    brand_whatsapp: '',
    brand_instagram: '',
    brand_tiktok: '',
    brand_youtube: '',
    notes: '',
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          setTimeout(() => checkUserRole(session.user.id), 0);
        } else {
          setIsContentManager(false);
          setLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
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
        fetchContacts();
      }
    } catch (error) {
      console.error('Error checking user role:', error);
      setIsContentManager(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('brand_contacts')
        .select('*')
        .order('brand_name', { ascending: true });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Failed to fetch brand contacts:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch brand contacts',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      brand_name: '',
      brand_email: '',
      brand_website: '',
      brand_whatsapp: '',
      brand_instagram: '',
      brand_tiktok: '',
      brand_youtube: '',
      notes: '',
    });
    setEditingContact(null);
    setShowForm(false);
  };

  const handleEdit = (contact: BrandContact) => {
    setEditingContact(contact);
    setFormData({
      brand_name: contact.brand_name,
      brand_email: contact.brand_email || '',
      brand_website: contact.brand_website || '',
      brand_whatsapp: contact.brand_whatsapp || '',
      brand_instagram: contact.brand_instagram || '',
      brand_tiktok: contact.brand_tiktok || '',
      brand_youtube: contact.brand_youtube || '',
      notes: contact.notes || '',
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingContact) {
        const { error } = await (supabase as any)
          .from('brand_contacts')
          .update(formData)
          .eq('id', editingContact.id);

        if (error) throw error;
        toast({ title: 'Success', description: 'Brand contact updated successfully' });
      } else {
        const { error } = await (supabase as any)
          .from('brand_contacts')
          .insert([formData]);

        if (error) throw error;
        toast({ title: 'Success', description: 'Brand contact added successfully' });
      }

      resetForm();
      fetchContacts();
    } catch (error) {
      console.error('Error saving brand contact:', error);
      toast({
        title: 'Error',
        description: 'Failed to save brand contact',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this brand contact?')) return;

    try {
      const { error } = await (supabase as any)
        .from('brand_contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Success', description: 'Brand contact deleted successfully' });
      fetchContacts();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete brand contact',
        variant: 'destructive',
      });
    }
  };

  const exportToCSV = () => {
    if (contacts.length === 0) {
      toast({
        title: 'No Data',
        description: 'No brand contacts to export',
        variant: 'destructive',
      });
      return;
    }

    const headers = [
      'Brand Name',
      'Email',
      'Website',
      'WhatsApp',
      'Instagram',
      'TikTok',
      'YouTube',
      'Notes',
      'Created At',
    ];

    const csvRows = [
      headers.join(','),
      ...contacts.map(contact => [
        `"${(contact.brand_name || '').replace(/"/g, '""')}"`,
        `"${(contact.brand_email || '').replace(/"/g, '""')}"`,
        `"${(contact.brand_website || '').replace(/"/g, '""')}"`,
        `"${(contact.brand_whatsapp || '').replace(/"/g, '""')}"`,
        `"${(contact.brand_instagram || '').replace(/"/g, '""')}"`,
        `"${(contact.brand_tiktok || '').replace(/"/g, '""')}"`,
        `"${(contact.brand_youtube || '').replace(/"/g, '""')}"`,
        `"${(contact.notes || '').replace(/"/g, '""')}"`,
        `"${new Date(contact.created_at).toLocaleDateString()}"`,
      ].join(','))
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `brand-contacts-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({ title: 'Success', description: `Exported ${contacts.length} brand contacts to CSV` });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user || !isContentManager) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              You need admin or editor privileges to access brand contacts.
            </p>
            <Link to="/admin">
              <Button>Go to Admin</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Admin
              </Button>
            </Link>
            <h1 className="text-4xl font-bold">Brand Contacts</h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={exportToCSV} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Brand
            </Button>
          </div>
        </div>

        <p className="text-muted-foreground mb-6">
          Private contact information for brand partnerships and outreach. Total: {contacts.length} brands
        </p>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingContact ? 'Edit Brand Contact' : 'Add New Brand Contact'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brand_name">Brand Name *</Label>
                    <Input
                      id="brand_name"
                      value={formData.brand_name}
                      onChange={(e) => setFormData({ ...formData, brand_name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand_email">Email</Label>
                    <Input
                      id="brand_email"
                      type="email"
                      value={formData.brand_email}
                      onChange={(e) => setFormData({ ...formData, brand_email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand_website">Website</Label>
                    <Input
                      id="brand_website"
                      type="url"
                      value={formData.brand_website}
                      onChange={(e) => setFormData({ ...formData, brand_website: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand_whatsapp">WhatsApp</Label>
                    <Input
                      id="brand_whatsapp"
                      value={formData.brand_whatsapp}
                      onChange={(e) => setFormData({ ...formData, brand_whatsapp: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand_instagram">Instagram</Label>
                    <Input
                      id="brand_instagram"
                      value={formData.brand_instagram}
                      onChange={(e) => setFormData({ ...formData, brand_instagram: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand_tiktok">TikTok</Label>
                    <Input
                      id="brand_tiktok"
                      value={formData.brand_tiktok}
                      onChange={(e) => setFormData({ ...formData, brand_tiktok: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand_youtube">YouTube</Label>
                    <Input
                      id="brand_youtube"
                      value={formData.brand_youtube}
                      onChange={(e) => setFormData({ ...formData, brand_youtube: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Internal notes about this brand..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={loading}>
                    {editingContact ? 'Update' : 'Add'} Brand
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {contacts.map((contact) => (
            <Card key={contact.id}>
              <CardContent className="py-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{contact.brand_name}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-sm text-muted-foreground">
                      {contact.brand_email && (
                        <div>
                          <span className="font-medium">Email:</span>{' '}
                          <a href={`mailto:${contact.brand_email}`} className="text-primary hover:underline">
                            {contact.brand_email}
                          </a>
                        </div>
                      )}
                      {contact.brand_website && (
                        <div>
                          <span className="font-medium">Website:</span>{' '}
                          <a href={contact.brand_website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Link
                          </a>
                        </div>
                      )}
                      {contact.brand_whatsapp && (
                        <div>
                          <span className="font-medium">WhatsApp:</span> {contact.brand_whatsapp}
                        </div>
                      )}
                      {contact.brand_instagram && (
                        <div>
                          <span className="font-medium">IG:</span> {contact.brand_instagram}
                        </div>
                      )}
                      {contact.brand_tiktok && (
                        <div>
                          <span className="font-medium">TikTok:</span> {contact.brand_tiktok}
                        </div>
                      )}
                      {contact.brand_youtube && (
                        <div>
                          <span className="font-medium">YouTube:</span> {contact.brand_youtube}
                        </div>
                      )}
                    </div>
                    {contact.notes && (
                      <p className="text-sm text-muted-foreground mt-2 italic">"{contact.notes}"</p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(contact)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(contact.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {contacts.length === 0 && (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No brand contacts yet. Add your first brand!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandContactsAdmin;
