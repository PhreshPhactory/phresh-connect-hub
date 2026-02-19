import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, Search, Loader2, ArrowLeft, Send, Users, ChevronDown, ChevronUp } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';

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
  const emailEditorRef = useRef<EditorRef>(null);

  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [subscribersOpen, setSubscribersOpen] = useState(false);

  const [broadcastSubject, setBroadcastSubject] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [editorReady, setEditorReady] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth');
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) fetchSubscribers();
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
      toast({ title: 'Error', description: 'Failed to load newsletter subscribers.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const filterSubscribers = () => {
    let filtered = [...subscribers];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) => s.email.toLowerCase().includes(q) || s.name?.toLowerCase().includes(q) || s.source.toLowerCase().includes(q)
      );
    }
    if (sourceFilter !== 'all') filtered = filtered.filter((s) => s.source === sourceFilter);
    setFilteredSubscribers(filtered);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredSubscribers.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filteredSubscribers.map((s) => s.id)));
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedIds(next);
  };

  const exportToCSV = () => {
    const data = selectedIds.size > 0 ? filteredSubscribers.filter((s) => selectedIds.has(s.id)) : filteredSubscribers;
    const csv = [
      ['Email', 'Name', 'Source', 'Subscribed At'].join(','),
      ...data.map((s) => [`"${s.email}"`, `"${s.name || ''}"`, `"${s.source}"`, `"${new Date(s.created_at).toLocaleString()}"`].join(',')),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    toast({ title: 'Export Complete', description: `Exported ${data.length} subscribers.` });
  };

  const onEditorReady: EmailEditorProps['onReady'] = useCallback(() => {
    setEditorReady(true);
  }, []);

  const sendBroadcast = async () => {
    if (!broadcastSubject.trim()) {
      toast({ title: 'Missing subject', description: 'Please enter a subject line.', variant: 'destructive' });
      return;
    }

    if (!emailEditorRef.current) {
      toast({ title: 'Editor not ready', description: 'Please wait for the editor to load.', variant: 'destructive' });
      return;
    }

    // Export HTML from Unlayer editor
    emailEditorRef.current.editor?.exportHtml(async (data) => {
      const { html } = data;

      const targetSubscribers = selectedIds.size > 0
        ? subscribers.filter((s) => selectedIds.has(s.id))
        : subscribers;
      const recipients = targetSubscribers.map((s) => s.email);

      if (recipients.length === 0) {
        toast({ title: 'No subscribers', description: 'There are no subscribers to send to.', variant: 'destructive' });
        return;
      }

      if (!confirm(`Send this newsletter to ${recipients.length} ${selectedIds.size > 0 ? 'selected' : ''} subscriber${recipients.length !== 1 ? 's' : ''}?`)) return;

      setIsSending(true);
      try {
        const { error } = await supabase.functions.invoke('send-newsletter', {
          body: { to: recipients, subject: broadcastSubject, html },
        });
        if (error) throw error;
        toast({ title: '✅ Newsletter sent!', description: `Delivered to ${recipients.length} subscribers.` });
      } catch (err: any) {
        toast({ title: 'Send failed', description: err.message || 'Unknown error', variant: 'destructive' });
      } finally {
        setIsSending(false);
      }
    });
  };

  const uniqueSources = Array.from(new Set(subscribers.map((s) => s.source)));

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <SEOHead title="Newsletter Studio | Phresh Phactory" description="Design and send newsletters" />

      <div className="min-h-screen bg-background">
        {/* Top bar */}
        <div className="border-b bg-card px-6 py-4 flex items-center gap-4 sticky top-0 z-20">
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin')}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Admin
          </Button>
          <div className="h-5 w-px bg-border" />
          <h1 className="text-lg font-semibold flex-1">Newsletter Studio</h1>

          {/* Subject */}
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <Label htmlFor="subject" className="text-sm whitespace-nowrap text-muted-foreground">Subject:</Label>
            <Input
              id="subject"
              placeholder="Your email subject line..."
              value={broadcastSubject}
              onChange={(e) => setBroadcastSubject(e.target.value)}
              className="h-9"
            />
          </div>

          {/* Recipient info */}
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {selectedIds.size > 0
              ? `${selectedIds.size} selected`
              : `${subscribers.length} subscribers`}
          </span>

          <Button
            onClick={sendBroadcast}
            disabled={isSending || !editorReady}
            size="sm"
          >
            {isSending
              ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
              : <><Send className="w-4 h-4 mr-2" />
                  {selectedIds.size > 0 ? `Send to ${selectedIds.size} Selected` : 'Send to All'}
                </>}
          </Button>
        </div>

        {/* Unlayer Editor — full height */}
        <div className="relative" style={{ height: 'calc(100vh - 65px)' }}>
          {!editorReady && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-10 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-muted-foreground text-sm">Loading email editor…</p>
            </div>
          )}
          <EmailEditor
            ref={emailEditorRef}
            onReady={onEditorReady}
            minHeight="100%"
            options={{
              displayMode: 'email',
              fonts: {
                showDefaultFonts: true,
              },
              appearance: {
                theme: 'modern_light',
                panels: {
                  tools: {
                    dock: 'left',
                  },
                },
              },
              features: {
                preview: true,
                imageEditor: true,
                undoRedo: true,
              },
            }}
          />
        </div>

        {/* Subscribers collapsible panel */}
        <div className="border-t bg-card">
          <button
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors text-left"
            onClick={() => setSubscribersOpen(!subscribersOpen)}
          >
            <div className="flex items-center gap-2 font-semibold">
              <Users className="w-5 h-5" />
              Subscribers ({subscribers.length})
              {selectedIds.size > 0 && (
                <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                  {selectedIds.size} selected
                </span>
              )}
            </div>
            {subscribersOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>

          {subscribersOpen && (
            <div className="px-6 pb-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                Select specific subscribers to target, or leave all unchecked to send to everyone.
              </p>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
                    {uniqueSources.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={exportToCSV} disabled={filteredSubscribers.length === 0} className="shrink-0">
                  <Download className="w-4 h-4 mr-2" />
                  {selectedIds.size > 0 ? `Export ${selectedIds.size}` : 'Export CSV'}
                </Button>
                {selectedIds.size > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => setSelectedIds(new Set())}>
                    Clear selection
                  </Button>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Total Subscribers', value: subscribers.length },
                  { label: 'Filtered Results', value: filteredSubscribers.length },
                  { label: 'Selected', value: selectedIds.size },
                ].map(({ label, value }) => (
                  <Card key={label}>
                    <CardContent className="pt-4 pb-4">
                      <div className="text-2xl font-bold">{value}</div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Table */}
              <div className="border rounded-lg overflow-hidden max-h-80 overflow-y-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-card z-10">
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
                        <TableRow
                          key={subscriber.id}
                          className={selectedIds.has(subscriber.id) ? 'bg-primary/5' : ''}
                          onClick={() => toggleSelect(subscriber.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              checked={selectedIds.has(subscriber.id)}
                              onCheckedChange={() => toggleSelect(subscriber.id)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{subscriber.email}</TableCell>
                          <TableCell>{subscriber.name || 'N/A'}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              {subscriber.source}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {new Date(subscriber.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
