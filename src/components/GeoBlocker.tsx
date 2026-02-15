import { useEffect, useState, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const GeoBlocker = ({ children }: { children: ReactNode }) => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkGeoLocation();
  }, []);

  const checkGeoLocation = async () => {
    try {
      // Using ipapi.co free tier (1000 requests per day)
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      console.log('Visitor location:', data.country_code);
      
      // Block visitors from China (CN)
      if (data.country_code === 'CN') {
        setIsBlocked(true);
      }
    } catch (error) {
      console.error('Error checking geo-location:', error);
      // On error, allow access (fail open)
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (isBlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl">Service Unavailable</CardTitle>
            <CardDescription>
              We're sorry, but our services are not available in your region at this time.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            <p>
              This restriction is due to business and compliance requirements. 
              If you believe this is an error, please contact support.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default GeoBlocker;
