import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, ExternalLink, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VideoReelSubmission {
  id: string;
  product_name: string;
  product_description: string;
  product_url: string;
  brand_name: string;
  brand_email: string;
  image_urls: string[];
  payment_status: string;
  stripe_session_id: string | null;
  created_at: string;
}

const VideoReelAdmin = () => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<VideoReelSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    checkUserRole();
    fetchSubmissions();
  }, []);

  const checkUserRole = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);
      
      if (roles && roles.length > 0) {
        const hasAccess = roles.some(r => r.role === 'admin' || r.role === 'editor');
        setUserRole(hasAccess ? 'admin' : null);
      }
    }
    setLoading(false);
  };

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from('video_reel_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load submissions.',
        variant: 'destructive',
      });
    } else {
      setSubmissions(data || []);
    }
  };

  const updatePaymentStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('video_reel_submissions')
      .update({ payment_status: status })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update status.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Status updated',
        description: `Submission marked as ${status}.`,
      });
      fetchSubmissions();
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    const { error } = await supabase
      .from('video_reel_submissions')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete submission.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Deleted',
        description: 'Submission removed.',
      });
      fetchSubmissions();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'completed': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!userRole) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container-custom">
          <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You must be logged in with admin or editor privileges.</p>
          <Button asChild className="mt-4">
            <Link to="/auth">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container-custom max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Admin
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Video Reel Submissions</h1>
          </div>
          <Badge variant="secondary">{submissions.length} submissions</Badge>
        </div>

        {submissions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No submissions yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <Card key={submission.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{submission.product_name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {submission.brand_name} • {submission.brand_email}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(submission.payment_status)}>
                        {submission.payment_status}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteSubmission(submission.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{submission.product_description}</p>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Product URL:</span>
                    <a 
                      href={submission.product_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-teal hover:underline flex items-center gap-1"
                    >
                      {submission.product_url}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {submission.image_urls && submission.image_urls.length > 0 && (
                    <div>
                      <span className="text-sm font-medium block mb-2">Product Images:</span>
                      <div className="flex gap-2 flex-wrap">
                        {submission.image_urls.map((url, index) => (
                          <a 
                            key={index} 
                            href={url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <img 
                              src={url} 
                              alt={`Product ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg border border-border hover:border-teal transition-colors"
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      Submitted: {new Date(submission.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex-1" />
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updatePaymentStatus(submission.id, 'paid')}
                      disabled={submission.payment_status === 'paid'}
                    >
                      Mark Paid
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => updatePaymentStatus(submission.id, 'completed')}
                      disabled={submission.payment_status === 'completed'}
                    >
                      Mark Completed
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoReelAdmin;
