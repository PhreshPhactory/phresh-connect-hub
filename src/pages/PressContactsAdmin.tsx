import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, Search, Linkedin, Mail, ExternalLink, Trash2, Download } from "lucide-react";
import { format } from "date-fns";

interface PressContact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  linkedin: string | null;
  location_string: string | null;
  phone: string | null;
  publications: string | null;
  title: string | null;
  topics: string[] | null;
  categories: string[] | null;
  twitter: string | null;
  linkedin_connected: boolean;
  last_contacted_at: string | null;
  contact_notes: string | null;
  priority: string;
  created_at: string;
  updated_at: string;
}

export default function PressContactsAdmin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [linkedinFilter, setLinkedinFilter] = useState<string>("all");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStats, setUploadStats] = useState<{ added: number; skipped: number } | null>(null);
  
  const queryClient = useQueryClient();

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ["press-contacts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("press_contacts")
        .select("*")
        .order("last_name", { ascending: true })
        .limit(100000);
      
      if (error) throw error;
      return data as PressContact[];
    },
  });

  const updateContactMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<PressContact> }) => {
      const { error } = await supabase
        .from("press_contacts")
        .update(updates)
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["press-contacts"] });
      toast.success("Contact updated");
    },
    onError: (error) => {
      toast.error("Failed to update contact: " + error.message);
    },
  });

  const deleteContactMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("press_contacts")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["press-contacts"] });
      toast.success("Contact deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete contact: " + error.message);
    },
  });

  const parseCSV = (text: string): Record<string, string>[] => {
    const lines = text.trim().split("\n");
    if (lines.length < 2) return [];
    
    const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/"/g, ""));
    const rows: Record<string, string>[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values: string[] = [];
      let current = "";
      let inQuotes = false;
      
      for (const char of lines[i]) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          values.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      values.push(current.trim());
      
      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || "";
      });
      rows.push(row);
    }
    
    return rows;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadStats(null);
    let totalAdded = 0;
    let totalSkipped = 0;

    try {
      for (const file of Array.from(files)) {
        const text = await file.text();
        const rows = parseCSV(text);

        for (const row of rows) {
          // Map CSV columns to database fields
          const firstName = row["first name"] || row["firstname"] || row["first_name"] || "";
          const lastName = row["last name"] || row["lastname"] || row["last_name"] || "";
          const email = row["email"] || row["email address"] || "";
          
          if (!firstName || !lastName || !email) {
            totalSkipped++;
            continue;
          }

          // Parse topics - could be comma-separated or semicolon-separated
          const topicsRaw = row["topics"] || row["topic"] || "";
          const topics = topicsRaw 
            ? topicsRaw.split(/[;,]/).map(t => t.trim()).filter(Boolean)
            : null;

          const contact = {
            first_name: firstName,
            last_name: lastName,
            email: email.toLowerCase().trim(),
            linkedin: row["linkedin"] || row["linkedin url"] || null,
            location_string: row["location string"] || row["location"] || null,
            phone: row["phone"] || row["phone number"] || null,
            publications: row["publications"] || row["publication"] || null,
            title: row["title"] || row["job title"] || null,
            topics,
            twitter: row["twitter"] || row["twitter url"] || null,
          };

          const { error } = await supabase
            .from("press_contacts")
            .upsert(contact, { onConflict: "email" });

          if (error) {
            console.error("Error inserting contact:", error);
            totalSkipped++;
          } else {
            totalAdded++;
          }
        }
      }

      setUploadStats({ added: totalAdded, skipped: totalSkipped });
      queryClient.invalidateQueries({ queryKey: ["press-contacts"] });
      toast.success(`Imported ${totalAdded} contacts (${totalSkipped} skipped)`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to process CSV files");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = 
      contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.publications?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.topics?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesPriority = priorityFilter === "all" || contact.priority === priorityFilter;
    const matchesLinkedin = 
      linkedinFilter === "all" || 
      (linkedinFilter === "connected" && contact.linkedin_connected) ||
      (linkedinFilter === "not-connected" && !contact.linkedin_connected);

    return matchesSearch && matchesPriority && matchesLinkedin;
  });

  const exportToCSV = () => {
    const headers = ['First Name', 'Last Name', 'Email', 'Title', 'Publications', 'Topics', 'LinkedIn', 'Location', 'Phone', 'Priority', 'LinkedIn Connected', 'Last Contacted'];
    const rows = filteredContacts.map((contact) => [
      contact.first_name,
      contact.last_name,
      contact.email,
      contact.title || '',
      contact.publications || '',
      contact.topics?.join('; ') || '',
      contact.linkedin || '',
      contact.location_string || '',
      contact.phone || '',
      contact.priority,
      contact.linkedin_connected ? 'Yes' : 'No',
      contact.last_contacted_at ? format(new Date(contact.last_contacted_at), 'yyyy-MM-dd') : '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `press-contacts-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Exported ${filteredContacts.length} contacts to CSV`);
  };

  const markAsContacted = (id: string) => {
    updateContactMutation.mutate({
      id,
      updates: { last_contacted_at: new Date().toISOString() },
    });
  };

  const toggleLinkedinConnected = (id: string, current: boolean) => {
    updateContactMutation.mutate({
      id,
      updates: { linkedin_connected: !current },
    });
  };

  const updatePriority = (id: string, priority: string) => {
    updateContactMutation.mutate({ id, updates: { priority } });
  };

  return (
    <div className="container py-8 max-w-7xl">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Press Contacts</h1>
              <p className="text-muted-foreground">
                Manage your media contacts for e-catalog distribution
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={exportToCSV}
                  disabled={filteredContacts.length === 0}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV ({filteredContacts.length})
                </Button>
                <Label
                  htmlFor="csv-upload"
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  {isUploading ? "Uploading..." : "Import CSV"}
                </Label>
              </div>
              <Input
                id="csv-upload"
                type="file"
                accept=".csv"
                multiple
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
              <p className="text-xs text-muted-foreground">
                Export filtered results or import up to 40 CSVs at a time
              </p>
            </div>
          </div>

          {uploadStats && (
            <Card className="bg-muted/50">
              <CardContent className="py-3">
                <p className="text-sm">
                  Last import: <strong>{uploadStats.added}</strong> contacts added, 
                  <strong> {uploadStats.skipped}</strong> skipped (duplicates or invalid)
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, email, publication, or topic..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={linkedinFilter} onValueChange={setLinkedinFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="LinkedIn Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Contacts</SelectItem>
                    <SelectItem value="connected">Connected</SelectItem>
                    <SelectItem value="not-connected">Not Connected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-8 text-center text-muted-foreground">
                  Loading contacts...
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  {contacts.length === 0 
                    ? "No contacts yet. Import a CSV to get started."
                    : "No contacts match your filters."}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Publication</TableHead>
                        <TableHead>Topics</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>LinkedIn</TableHead>
                        <TableHead>Last Contacted</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContacts.map((contact) => (
                        <TableRow key={contact.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">
                                {contact.first_name} {contact.last_name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {contact.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {contact.email}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{contact.publications || "—"}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                              {contact.topics?.slice(0, 3).map((topic, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {topic}
                                </Badge>
                              ))}
                              {contact.topics && contact.topics.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{contact.topics.length - 3}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={contact.priority}
                              onValueChange={(val) => updatePriority(contact.id, val)}
                            >
                              <SelectTrigger className="w-[100px] h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Checkbox
                                checked={contact.linkedin_connected}
                                onCheckedChange={() => 
                                  toggleLinkedinConnected(contact.id, contact.linkedin_connected)
                                }
                              />
                              {contact.linkedin && (
                                <a
                                  href={contact.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-muted-foreground hover:text-primary"
                                >
                                  <Linkedin className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {contact.last_contacted_at ? (
                              <span className="text-sm">
                                {format(new Date(contact.last_contacted_at), "MMM d, yyyy")}
                              </span>
                            ) : (
                              <span className="text-muted-foreground text-sm">Never</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => markAsContacted(contact.id)}
                              >
                                <Mail className="h-4 w-4 mr-1" />
                                Contacted
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-destructive hover:text-destructive"
                                onClick={() => deleteContactMutation.mutate(contact.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

        <div className="text-sm text-muted-foreground">
          Showing {filteredContacts.length} of {contacts.length} contacts
        </div>
      </div>
    </div>
  );
}
