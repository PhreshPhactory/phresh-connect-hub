import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, Search, Loader2, ArrowLeft, Send, Code, Eye, Users } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string | null;
  source: string;
  created_at: string;
}

const DEFAULT_HTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body { margin: 0; font-family: Georgia, serif; background: #f4f4f4; }
    .wrapper { max-width: 600px; margin: 0 auto; background: #fff; }
    .header { background: #1a1a1a; padding: 32px 40px; text-align: center; }
    .header h1 { color: #d4a853; margin: 0; font-size: 28px; letter-spacing: 2px; }
    .header p { color: #999; margin: 8px 0 0; font-size: 14px; }
    .body { padding: 40px; }
    .body h2 { color: #1a1a1a; font-size: 22px; margin-top: 0; }
    .body p { color: #444; line-height: 1.7; }
    .cta { text-align: center; margin: 32px 0; }
    .cta a { background: #d4a853; color: #fff; padding: 14px 32px; text-decoration: none; border-radius: 4px; font-weight: bold; }
    .footer { background: #f9f9f9; padding: 24px 40px; text-align: center; border-top: 1px solid #eee; }
    .footer p { color: #999; font-size: 12px; margin: 0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Culture &amp; Commerce</h1>
      <p>Phresh Phactory &bull; Weekly Edition</p>
    </div>
    <div class="body">
      <h2>Hello, Community 👋</h2>
      <p>Welcome to this week's edition of Culture &amp; Commerce. Here's what we've been curating for you...</p>
      <p>Add your newsletter body here. You can use full HTML to style it however you'd like.</p>
      <div class="cta">
        <a href="https://phreshphactory.com">Shop Now →</a>
      </div>
    </div>
    <div class="footer">
      <p>Phresh Phactory Inc &bull; phreshphactory.com</p>
      <p style="margin-top:8px;">You received this because you subscribed. <a href="#" style="color:#999;">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>`;

export default function NewsletterAdmin() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Broadcast state
  const [broadcastSubject, setBroadcastSubject] = useState('');
  const [htmlCode, setHtmlCode] = useState(DEFAULT_HTML);
  const [isSending, setIsSending] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) fetchSubscribers();
  }, [user]);

  useEffect(() => {
    filterSubscribers();
  }, [searchQuery, sourceFilter, subscribers]);

  // Update iframe preview whenever html changes or tab switches to preview
  useEffect(() => {
    if (activeTab === 'preview' && iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(htmlCode);
        doc.close();
      }
    }
  }, [activeTab, htmlCode]);

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

  const sendBroadcast = async () => {
    if (!broadcastSubject.trim()) {
      toast({ title: 'Missing subject', description: 'Please enter a subject line.', variant: 'destructive' });
      return;
    }
    if (!htmlCode.trim()) {
      toast({ title: 'Empty newsletter', description: 'Please add some content.', variant: 'destructive' });
      return;
    }
    const recipients = subscribers.map((s) => s.email);
    if (recipients.length === 0) {
      toast({ title: 'No subscribers', description: 'There are no subscribers to send to.', variant: 'destructive' });
      return;
    }
    if (!confirm(`Send this newsletter to ${recipients.length} subscribers?`)) return;

    setIsSending(true);
    try {
      const { error } = await supabase.functions.invoke('send-newsletter', {
        body: { to: recipients, subject: broadcastSubject, html: htmlCode },
      });
      if (error) throw error;
      toast({ title: '✅ Newsletter sent!', description: `Delivered to ${recipients.length} subscribers.` });
    } catch (err: any) {
      toast({ title: 'Send failed', description: err.message || 'Unknown error', variant: 'destructive' });
    } finally {
      setIsSending(false);
    }
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
      <SEOHead title="Newsletter Admin | Phresh Phactory" description="Send and manage newsletters" />

      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <Button variant="ghost" onClick={() => navigate('/admin')} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Admin
          </Button>

          <h1 className="text-3xl font-bold mb-2">Newsletter Studio</h1>
          <p className="text-muted-foreground mb-8">Compose, preview, and broadcast your newsletter</p>

          {/* Composer */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <Label htmlFor="subject" className="text-base font-semibold">Subject Line</Label>
                  <Input
                    id="subject"
                    placeholder="e.g. This Week in Culture & Commerce 🖤"
                    value={broadcastSubject}
                    onChange={(e) => setBroadcastSubject(e.target.value)}
                    className="mt-1 text-base"
                  />
                </div>
                <Button
                  onClick={sendBroadcast}
                  disabled={isSending}
                  size="lg"
                  className="shrink-0"
                >
                  {isSending
                    ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                    : <><Send className="w-4 h-4 mr-2" /> Send to {subscribers.length} Subscribers</>}
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'code' | 'preview')}>
                <div className="border-b px-6">
                  <TabsList className="h-10 bg-transparent border-0 p-0 gap-0">
                    <TabsTrigger
                      value="code"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4"
                    >
                      <Code className="w-4 h-4 mr-2" /> HTML Code
                    </TabsTrigger>
                    <TabsTrigger
                      value="preview"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4"
                    >
                      <Eye className="w-4 h-4 mr-2" /> Preview
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="code" className="m-0">
                  <textarea
                    value={htmlCode}
                    onChange={(e) => setHtmlCode(e.target.value)}
                    spellCheck={false}
                    className="w-full h-[600px] font-mono text-sm p-6 bg-[#1e1e1e] text-[#d4d4d4] resize-none outline-none border-0 focus:ring-0"
                    placeholder="Paste or write your newsletter HTML here..."
                  />
                </TabsContent>

                <TabsContent value="preview" className="m-0">
                  <div className="bg-muted/30 p-4">
                    <div className="flex items-center justify-center gap-2 mb-4 text-sm text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      Live preview — exactly how your email will look
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg mx-auto" style={{ maxWidth: 640 }}>
                      <iframe
                        ref={iframeRef}
                        title="Newsletter Preview"
                        sandbox="allow-same-origin"
                        className="w-full border-0"
                        style={{ height: 600 }}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Subscribers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" /> Subscribers ({subscribers.length})
              </CardTitle>
              <CardDescription>View, filter, and export your list</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
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
                <Button onClick={exportToCSV} disabled={filteredSubscribers.length === 0} className="w-full sm:w-auto">
                  <Download className="w-4 h-4 mr-2" />
                  {selectedIds.size > 0 ? `Export ${selectedIds.size} Selected` : 'Export CSV'}
                </Button>
              </div>

              {selectedIds.size > 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{selectedIds.size} of {filteredSubscribers.length} selected</span>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedIds(new Set())}>Clear</Button>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Total Subscribers', value: subscribers.length },
                  { label: 'Filtered Results', value: filteredSubscribers.length },
                  { label: 'Unique Sources', value: uniqueSources.length },
                ].map(({ label, value }) => (
                  <Card key={label}>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{value}</div>
                      <p className="text-sm text-muted-foreground">{label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

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
                              {new Date(subscriber.created_at).toLocaleDateString()}{' '}
                              {new Date(subscriber.created_at).toLocaleTimeString()}
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
