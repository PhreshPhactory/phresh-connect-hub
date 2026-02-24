import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Loader2, ArrowLeft, ArrowRight, Send, Users, Mail, RefreshCw, Eye, Edit3, Check, TestTube, Filter, Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

interface PressContact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  publications: string | null;
  categories: string[] | null;
  topics: string[] | null;
  priority: string | null;
  title: string | null;
  phone: string | null;
  linkedin: string | null;
  linkedin_connected: boolean | null;
  twitter: string | null;
  location_string: string | null;
  contact_notes: string | null;
  last_contacted_at: string | null;
}

interface ResendTemplate {
  id: string;
  name: string;
  created_at: string;
}

const STEPS = [
  { label: 'Select Contacts', icon: Users },
  { label: 'Choose Template', icon: Mail },
  { label: 'Preview & Edit', icon: Edit3 },
  { label: 'Send', icon: Send },
];

export default function NewsletterAdmin() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [step, setStep] = useState(0);

  // Step 1: Contacts
  const [contacts, setContacts] = useState<PressContact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<PressContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [linkedinFilter, setLinkedinFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showSendList, setShowSendList] = useState(false);

  // Step 2: Templates
  const [templates, setTemplates] = useState<ResendTemplate[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');

  // Step 3: Preview & Edit
  const [templateHtml, setTemplateHtml] = useState('');
  const [htmlLoading, setHtmlLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Step 4: Send
  const [broadcastSubject, setBroadcastSubject] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);

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
  }, [searchQuery, priorityFilter, categoryFilter, topicFilter, linkedinFilter, contacts]);

  const fetchContacts = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('press_contacts')
        .select('*')
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

  const fetchTemplateHtml = async (templateId: string) => {
    setHtmlLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('list-resend-templates', {
        body: { templateId },
      });
      if (error) throw error;
      const html = data?.html_content || data?.html || '<p>No HTML content found in this template.</p>';
      setTemplateHtml(html);
    } catch (error) {
      console.error('Error fetching template HTML:', error);
      toast({ title: 'Error', description: 'Failed to load template content.', variant: 'destructive' });
      setTemplateHtml('<p>Failed to load template.</p>');
    } finally {
      setHtmlLoading(false);
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
          c.publications?.toLowerCase().includes(q) ||
          c.title?.toLowerCase().includes(q) ||
          c.location_string?.toLowerCase().includes(q) ||
          c.categories?.some(cat => cat.toLowerCase().includes(q)) ||
          c.topics?.some(t => t.toLowerCase().includes(q))
      );
    }
    if (priorityFilter !== 'all') filtered = filtered.filter((c) => c.priority === priorityFilter);
    if (categoryFilter !== 'all') filtered = filtered.filter((c) => c.categories?.includes(categoryFilter));
    if (topicFilter !== 'all') filtered = filtered.filter((c) => c.topics?.includes(topicFilter));
    if (linkedinFilter !== 'all') {
      if (linkedinFilter === 'connected') filtered = filtered.filter((c) => c.linkedin_connected === true);
      else if (linkedinFilter === 'not_connected') filtered = filtered.filter((c) => !c.linkedin_connected);
    }
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

  const getRecipients = () => {
    const targetContacts = selectedIds.size > 0
      ? contacts.filter((c) => selectedIds.has(c.id))
      : [];
    return targetContacts.map((c) => c.email);
  };

  const sendTestEmail = async () => {
    if (!broadcastSubject.trim()) {
      toast({ title: 'Missing subject', description: 'Please enter a subject line.', variant: 'destructive' });
      return;
    }
    setIsSendingTest(true);
    try {
      const { error } = await supabase.functions.invoke('send-newsletter', {
        body: { to: [user?.email], subject: `[TEST] ${broadcastSubject}`, html: templateHtml },
      });
      if (error) throw error;
      toast({ title: '✅ Test sent!', description: `Test email sent to ${user?.email}` });
    } catch (err: any) {
      toast({ title: 'Test send failed', description: err.message || 'Unknown error', variant: 'destructive' });
    } finally {
      setIsSendingTest(false);
    }
  };

  const sendBroadcast = async () => {
    if (!broadcastSubject.trim()) {
      toast({ title: 'Missing subject', description: 'Please enter a subject line.', variant: 'destructive' });
      return;
    }
    const recipients = getRecipients();
    if (recipients.length === 0) {
      toast({ title: 'No contacts', description: 'Go back to step 1 and select contacts.', variant: 'destructive' });
      return;
    }
    if (!confirm(`Send "${broadcastSubject}" to ${recipients.length} contact${recipients.length !== 1 ? 's' : ''}?`)) return;

    setIsSending(true);
    try {
      const { error } = await supabase.functions.invoke('send-newsletter', {
        body: { to: recipients, subject: broadcastSubject, html: templateHtml },
      });
      if (error) throw error;
      toast({ title: '✅ Newsletter sent!', description: `Delivered to ${recipients.length} contacts.` });
    } catch (err: any) {
      toast({ title: 'Send failed', description: err.message || 'Unknown error', variant: 'destructive' });
    } finally {
      setIsSending(false);
    }
  };

  const goToStep = (nextStep: number) => {
    // Validation before advancing
    if (nextStep > 0 && selectedIds.size === 0) {
      toast({ title: 'Select contacts', description: 'Please select at least one contact before continuing.', variant: 'destructive' });
      return;
    }
    if (nextStep > 1 && !selectedTemplateId) {
      toast({ title: 'Select a template', description: 'Please choose a template before continuing.', variant: 'destructive' });
      return;
    }
    if (nextStep === 2 && templateHtml === '') {
      fetchTemplateHtml(selectedTemplateId);
    }
    setStep(nextStep);
  };

  const uniquePriorities = Array.from(new Set(contacts.map((c) => c.priority).filter(Boolean))) as string[];
  const uniqueCategories = Array.from(new Set(contacts.flatMap((c) => c.categories || []).filter(Boolean))) as string[];
  const uniqueTopics = Array.from(new Set(contacts.flatMap((c) => c.topics || []).filter(Boolean))) as string[];
  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
        </div>

        {/* Step indicator */}
        <div className="border-b bg-card/50 px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === step;
              const isDone = i < step;
              return (
                <button
                  key={i}
                  onClick={() => i < step && goToStep(i)}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-primary' : isDone ? 'text-primary/70 cursor-pointer hover:text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                    isActive ? 'border-primary bg-primary text-primary-foreground' : isDone ? 'border-primary bg-primary/10 text-primary' : 'border-muted-foreground/30'
                  }`}>
                    {isDone ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className="hidden sm:inline">{s.label}</span>
                  {i < STEPS.length - 1 && <div className="hidden sm:block w-8 lg:w-16 h-px bg-border ml-2" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6">
          {/* STEP 1: Select Contacts */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Select Contacts ({contacts.length} total)</h2>
                <span className="text-sm text-muted-foreground font-medium">
                  {selectedIds.size} selected
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search name, email, publication, title, location, category, topic..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {selectedIds.size > 0 && (
                    <Button variant="ghost" size="sm" onClick={() => setSelectedIds(new Set())}>
                      Clear ({selectedIds.size})
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      {uniquePriorities.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {uniqueCategories.sort().map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={topicFilter} onValueChange={setTopicFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Topics</SelectItem>
                      {uniqueTopics.sort().map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={linkedinFilter} onValueChange={setLinkedinFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="LinkedIn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All LinkedIn</SelectItem>
                      <SelectItem value="connected">Connected</SelectItem>
                      <SelectItem value="not_connected">Not Connected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="sm" onClick={() => { setPriorityFilter('all'); setCategoryFilter('all'); setTopicFilter('all'); setLinkedinFilter('all'); setSearchQuery(''); }}>
                    <Filter className="w-3 h-3 mr-1" /> Reset
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Total', value: contacts.length },
                  { label: 'Filtered', value: filteredContacts.length },
                  { label: 'Selected', value: selectedIds.size },
                ].map(({ label, value }) => (
                  <Card key={label}>
                    <CardContent className="py-3 px-4">
                      <div className="text-xl font-bold">{value.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="border rounded-lg overflow-hidden max-h-[500px] overflow-y-auto">
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
                      <TableHead>Title</TableHead>
                      <TableHead>Publication</TableHead>
                      <TableHead>Categories</TableHead>
                      <TableHead>Topics</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>LinkedIn</TableHead>
                      <TableHead>Priority</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
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
                          <TableCell className="font-medium whitespace-nowrap">{contact.first_name} {contact.last_name}</TableCell>
                          <TableCell className="text-xs">{contact.email}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{contact.title || '—'}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{contact.publications || '—'}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {contact.categories?.map((cat) => (
                                <span key={cat} className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-accent text-accent-foreground">{cat}</span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {contact.topics?.map((t) => (
                                <span key={t} className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-secondary text-secondary-foreground">{t}</span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{contact.location_string || '—'}</TableCell>
                          <TableCell>
                            {contact.linkedin_connected ? (
                              <span className="text-[10px] font-medium text-primary">Connected</span>
                            ) : contact.linkedin ? (
                              <span className="text-[10px] text-muted-foreground">Has profile</span>
                            ) : '—'}
                          </TableCell>
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

              <div className="flex justify-end pt-4">
                <Button onClick={() => goToStep(1)} disabled={selectedIds.size === 0}>
                  Next: Choose Template <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Template */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Choose a Template</h2>
                <Button variant="outline" size="sm" onClick={fetchTemplates} disabled={templatesLoading}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${templatesLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>

              {templatesLoading ? (
                <div className="flex items-center gap-2 text-muted-foreground text-sm py-8">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading templates from Resend…
                </div>
              ) : templates.length === 0 ? (
                <p className="text-sm text-muted-foreground py-8">
                  No templates found. Create one at{' '}
                  <a href="https://resend.com/templates" target="_blank" rel="noopener" className="underline text-primary">resend.com/templates</a>.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {templates.map((tpl) => (
                    <Card
                      key={tpl.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${selectedTemplateId === tpl.id ? 'ring-2 ring-primary bg-primary/5' : ''}`}
                      onClick={() => {
                        setSelectedTemplateId(tpl.id);
                        setTemplateHtml(''); // reset so it re-fetches on next step
                      }}
                    >
                      <CardContent className="py-4 px-5">
                        <div className="font-medium text-sm">{tpl.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(tpl.created_at).toLocaleDateString()}
                        </div>
                        {selectedTemplateId === tpl.id && (
                          <div className="mt-2">
                            <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                              <Check className="w-3 h-3" /> Selected
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(0)}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button onClick={() => goToStep(2)} disabled={!selectedTemplateId}>
                  Next: Preview & Edit <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Preview & Edit */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {isEditing ? 'Edit Template HTML' : 'Preview Template'}
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant={isEditing ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? <><Eye className="w-4 h-4 mr-2" /> Preview</> : <><Edit3 className="w-4 h-4 mr-2" /> Edit HTML</>}
                  </Button>
                </div>
              </div>

              {htmlLoading ? (
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm py-16">
                  <Loader2 className="w-5 h-5 animate-spin" /> Loading template content…
                </div>
              ) : isEditing ? (
                <Textarea
                  value={templateHtml}
                  onChange={(e) => setTemplateHtml(e.target.value)}
                  className="font-mono text-xs min-h-[500px]"
                  placeholder="Paste or edit HTML here..."
                />
              ) : (
                <div className="border rounded-lg overflow-hidden bg-white">
                  <iframe
                    srcDoc={templateHtml}
                    className="w-full min-h-[600px] border-0"
                    title="Email Preview"
                    sandbox="allow-same-origin"
                  />
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button onClick={() => goToStep(3)}>
                  Next: Send <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: Send */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Review & Send</h2>

              {/* Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="py-4 px-5">
                    <div className="text-sm text-muted-foreground">Recipients</div>
                    <div className="text-2xl font-bold">{selectedIds.size}</div>
                    <p className="text-xs text-muted-foreground mt-1">press contacts</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="py-4 px-5">
                    <div className="text-sm text-muted-foreground">Template</div>
                    <div className="text-base font-semibold mt-1">{selectedTemplate?.name || '—'}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="py-4 px-5">
                    <div className="text-sm text-muted-foreground">Status</div>
                    <div className="text-base font-semibold mt-1 text-primary">Ready to send</div>
                  </CardContent>
                </Card>
              </div>

              {/* Subject */}
              <div>
                <Label htmlFor="subject" className="text-sm font-medium mb-2 block">Subject Line</Label>
                <Input
                  id="subject"
                  placeholder="Your email subject line..."
                  value={broadcastSubject}
                  onChange={(e) => setBroadcastSubject(e.target.value)}
                  className="text-base"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={sendTestEmail}
                  disabled={isSendingTest || !broadcastSubject.trim()}
                >
                  {isSendingTest
                    ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending test...</>
                    : <><TestTube className="w-4 h-4 mr-2" /> Send Test to {user?.email}</>}
                </Button>
                <Button
                  onClick={sendBroadcast}
                  disabled={isSending || !broadcastSubject.trim() || selectedIds.size === 0}
                  className="bg-primary"
                >
                  {isSending
                    ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                    : <><Send className="w-4 h-4 mr-2" /> Send to {selectedIds.size} contacts</>}
                </Button>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <Button variant="outline" onClick={() => setStep(2)}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Preview
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
