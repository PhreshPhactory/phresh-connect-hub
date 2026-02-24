import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Loader2, ArrowLeft, Send, Users, Mail, RefreshCw } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

interface PressContact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  publications: string | null;
  categories: string[] | null;
  priority: string | null;
}

interface ResendTemplate {
  id: string;
  name: string;
  created_at: string;
}

export default function NewsletterAdmin() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [contacts, setContacts] = useState<PressContact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<PressContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const [templates, setTemplates] = useState<ResendTemplate[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');

  const [broadcastSubject, setBroadcastSubject] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth');
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchContacts();
      fetchTemplates();
    }
  }, [user]);

  useEffect(() => {
    filterContacts();
  }, [searchQuery, priorityFilter, contacts]);

  const fetchContacts = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('press_contacts')
        .select('id, first_name, last_name, email, publications, categories, priority')
        .order('last_name', { ascending: true })
        .limit(100000);
      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast({ title: 'Error', description: 'Failed to load press contacts.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTemplates = async () => {
    setTemplatesLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('list-resend-templates');
      if (error) throw error;
      setTemplates(data?.data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({ title: 'Error', description: 'Failed to load Resend templates.', variant: 'destructive' });
    } finally {
      setTemplatesLoading(false);
    }
  };

  const filterContacts = () => {
    let filtered = [...contacts];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.email.toLowerCase().includes(q) ||
          c.first_name.toLowerCase().includes(q) ||
          c.last_name.toLowerCase().includes(q) ||
          c.publications?.toLowerCase().includes(q)
      );
    }
    if (priorityFilter !== 'all') filtered = filtered.filter((c) => c.priority === priorityFilter);
    setFilteredContacts(filtered);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredContacts.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filteredContacts.map((c) => c.id)));
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedIds(next);
  };

  const sendBroadcast = async () => {
    if (!broadcastSubject.trim()) {
      toast({ title: 'Missing subject', description: 'Please enter a subject line.', variant: 'destructive' });
      return;
    }
    if (!selectedTemplateId) {
      toast({ title: 'No template selected', description: 'Please select a Resend template.', variant: 'destructive' });
      return;
    }

    const targetContacts = selectedIds.size > 0
      ? contacts.filter((c) => selectedIds.has(c.id))
      : filteredContacts;
    const recipients = targetContacts.map((c) => c.email);

    if (recipients.length === 0) {
      toast({ title: 'No contacts', description: 'There are no contacts to send to.', variant: 'destructive' });
      return;
    }

    if (!confirm(`Send "${broadcastSubject}" to ${recipients.length} contact${recipients.length !== 1 ? 's' : ''}?`)) return;

    setIsSending(true);
    try {
      const { error } = await supabase.functions.invoke('send-newsletter', {
        body: { to: recipients, subject: broadcastSubject, template_id: selectedTemplateId },
      });
      if (error) throw error;
      toast({ title: '✅ Newsletter sent!', description: `Delivered to ${recipients.length} contacts.` });
    } catch (err: any) {
      toast({ title: 'Send failed', description: err.message || 'Unknown error', variant: 'destructive' });
    } finally {
      setIsSending(false);
    }
  };

  const uniquePriorities = Array.from(new Set(contacts.map((c) => c.priority).filter(Boolean))) as string[];

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  return (
    <>
      <SEOHead title="Newsletter Studio | Phresh Phactory" description="Send newsletters to press contacts" />

      <div className="min-h-screen bg-background">
        {/* Top bar */}
        <div className="border-b bg-card px-6 py-3 flex items-center gap-4 sticky top-0 z-20">
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin')}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Admin
          </Button>
          <div className="h-5 w-px bg-border" />
          <h1 className="text-base font-semibold">Newsletter Studio</h1>
          <span className="ml-auto text-sm text-muted-foreground whitespace-nowrap">
            {selectedIds.size > 0 ? `${selectedIds.size} selected` : `${contacts.length} contacts`}
          </span>
        </div>

        <div className="max-w-6xl mx-auto p-6 space-y-8">
          {/* Step 1: Template Selection */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Mail className="w-5 h-5" /> 1. Select a Template
              </h2>
              <Button variant="outline" size="sm" onClick={fetchTemplates} disabled={templatesLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${templatesLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            {templatesLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading templates from Resend…
              </div>
            ) : templates.length === 0 ? (
              <p className="text-sm text-muted-foreground">No templates found. Create one at <a href="https://resend.com/templates" target="_blank" rel="noopener" className="underline text-primary">resend.com/templates</a>.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {templates.map((tpl) => (
                  <Card
                    key={tpl.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${selectedTemplateId === tpl.id ? 'ring-2 ring-primary bg-primary/5' : ''}`}
                    onClick={() => setSelectedTemplateId(tpl.id)}
                  >
                    <CardContent className="py-4 px-5">
                      <div className="font-medium text-sm">{tpl.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(tpl.created_at).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* Step 2: Subject + Send */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Send className="w-5 h-5" /> 2. Subject & Send
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Label htmlFor="subject" className="text-sm text-muted-foreground mb-1 block">Subject Line</Label>
                <Input
                  id="subject"
                  placeholder="Your email subject line..."
                  value={broadcastSubject}
                  onChange={(e) => setBroadcastSubject(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={sendBroadcast} disabled={isSending || !selectedTemplateId}>
                  {isSending
                    ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                    : <><Send className="w-4 h-4 mr-2" />{selectedIds.size > 0 ? `Send to ${selectedIds.size}` : `Send to ${filteredContacts.length}`}</>}
                </Button>
              </div>
            </div>
            {selectedTemplate && (
              <p className="text-sm text-muted-foreground">Template: <span className="font-medium text-foreground">{selectedTemplate.name}</span></p>
            )}
          </section>

          {/* Step 3: Press Contacts */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5" /> 3. Select Contacts ({contacts.length})
            </h2>
            <p className="text-sm text-muted-foreground">
              Check specific contacts to target, or leave unchecked to send to all shown.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or publication..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  {uniquePriorities.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
              {selectedIds.size > 0 && (
                <Button variant="ghost" size="sm" onClick={() => setSelectedIds(new Set())}>
                  Clear Selection
                </Button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Total', value: contacts.length },
                { label: 'Filtered', value: filteredContacts.length },
                { label: 'Selected', value: selectedIds.size },
              ].map(({ label, value }) => (
                <Card key={label}>
                  <CardContent className="py-3 px-4">
                    <div className="text-xl font-bold">{value}</div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="border rounded-lg overflow-hidden max-h-96 overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-card z-10">
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={filteredContacts.length > 0 && selectedIds.size === filteredContacts.length}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Publication</TableHead>
                    <TableHead>Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No contacts found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredContacts.map((contact) => (
                      <TableRow
                        key={contact.id}
                        className={`cursor-pointer ${selectedIds.has(contact.id) ? 'bg-primary/5' : ''}`}
                        onClick={() => toggleSelect(contact.id)}
                      >
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={selectedIds.has(contact.id)}
                            onCheckedChange={() => toggleSelect(contact.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{contact.first_name} {contact.last_name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell className="text-muted-foreground">{contact.publications || '—'}</TableCell>
                        <TableCell>
                          {contact.priority && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              {contact.priority}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
