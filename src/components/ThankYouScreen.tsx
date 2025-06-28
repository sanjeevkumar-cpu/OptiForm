
import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface ThankYouScreenProps {
  onReset: () => void;
}

export const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ onReset }) => {
  const [countdown, setCountdown] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoHomeNow = () => {
    navigate('/');
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardContent className="p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-20 h-20 mx-auto text-green-500 animate-pulse" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h2>
        <p className="text-lg text-gray-600 mb-4">
          Your feedback has been submitted successfully. We appreciate you taking the time to help us improve.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Redirecting to home page in {countdown} seconds...
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={handleGoHomeNow}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
          >
            Go to Home Now
          </Button>
          <Button 
            onClick={onReset}
            variant="outline"
            className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
          >
            Submit Another Feedback
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
