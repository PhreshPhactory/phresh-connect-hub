import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, Search, Loader2, ArrowLeft } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string | null;
  source: string;
  created_at: string;
}

export default function NewsletterAdmin() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchSubscribers();
    }
  }, [user]);

  useEffect(() => {
    filterSubscribers();
  }, [searchQuery, sourceFilter, subscribers]);

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100000);

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      toast({
        title: 'Error',
        description: 'Failed to load newsletter subscribers.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterSubscribers = () => {
    let filtered = [...subscribers];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (sub) =>
          sub.email.toLowerCase().includes(query) ||
          sub.name?.toLowerCase().includes(query) ||
          sub.source.toLowerCase().includes(query)
      );
    }

    // Apply source filter
    if (sourceFilter !== 'all') {
      filtered = filtered.filter((sub) => sub.source === sourceFilter);
    }

    setFilteredSubscribers(filtered);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredSubscribers.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredSubscribers.map((sub) => sub.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const getExportData = () => {
    if (selectedIds.size > 0) {
      return filteredSubscribers.filter((sub) => selectedIds.has(sub.id));
    }
    return filteredSubscribers;
  };

  const exportToCSV = () => {
    const dataToExport = getExportData();
    const headers = ['Email', 'Name', 'Source', 'Subscribed At'];
    const rows = dataToExport.map((sub) => [
      sub.email,
      sub.name || '',
      sub.source,
      new Date(sub.created_at).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: 'Export Complete',
      description: `Exported ${dataToExport.length} subscribers to CSV.`,
    });
  };

  const uniqueSources = Array.from(new Set(subscribers.map((sub) => sub.source)));

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Newsletter Subscribers Admin | Phresh Phactory"
        description="Manage newsletter subscribers"
      />

      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/admin')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Newsletter Subscribers</CardTitle>
              <CardDescription>
                Manage and export your newsletter subscriber list
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Filters and Export */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by email, name, or source..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Filter by source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    {uniqueSources.map((source) => (
                      <SelectItem key={source} value={source}>
                        {source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  onClick={exportToCSV}
                  disabled={filteredSubscribers.length === 0}
                  className="w-full sm:w-auto"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {selectedIds.size > 0 ? `Export ${selectedIds.size} Selected` : 'Export CSV'}
                </Button>
              </div>

              {/* Selection info */}
              {selectedIds.size > 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{selectedIds.size} of {filteredSubscribers.length} selected</span>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedIds(new Set())}>
                    Clear selection
                  </Button>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">{subscribers.length}</div>
                    <p className="text-sm text-muted-foreground">Total Subscribers</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">{filteredSubscribers.length}</div>
                    <p className="text-sm text-muted-foreground">Filtered Results</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">{uniqueSources.length}</div>
                    <p className="text-sm text-muted-foreground">Unique Sources</p>
                  </CardContent>
                </Card>
              </div>

              {/* Table */}
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={filteredSubscribers.length > 0 && selectedIds.size === filteredSubscribers.length}
                            onCheckedChange={toggleSelectAll}
                          />
                        </TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Subscribed At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubscribers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            No subscribers found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredSubscribers.map((subscriber) => (
                          <TableRow key={subscriber.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedIds.has(subscriber.id)}
                                onCheckedChange={() => toggleSelect(subscriber.id)}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{subscriber.email}</TableCell>
                            <TableCell>{subscriber.name || 'N/A'}</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                {subscriber.source}
                              </span>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {new Date(subscriber.created_at).toLocaleDateString()} {new Date(subscriber.created_at).toLocaleTimeString()}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}