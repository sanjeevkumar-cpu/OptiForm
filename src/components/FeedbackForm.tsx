
import React, { useState } from 'react';
import { StarRating } from './StarRating';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface FeedbackFormProps {
  onSubmitSuccess: () => void;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmitSuccess }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const checkRateLimit = async (email: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('created_at')
        .eq('email', email)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error checking rate limit:', error);
        return true; // Allow submission if we can't check
      }

      if (!data || data.length === 0) return true;

      const lastSubmissionTime = new Date(data[0].created_at).getTime();
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - lastSubmissionTime;
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      return timeDifference >= twentyFourHours;
    } catch (error) {
      console.error('Error checking rate limit:', error);
      return true; // Allow submission if there's an error
    }
  };

  const determineSentiment = (rating: number): string => {
    if (rating >= 4) return 'positive';
    if (rating === 3) return 'neutral';
    return 'negative';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    if (!feedback.trim()) {
      toast.error('Please provide your feedback');
      return;
    }

    if (!email.trim()) {
      toast.error('Email is required');
      return;
    }

    // Check rate limiting
    const canSubmit = await checkRateLimit(email);
    if (!canSubmit) {
      toast.error('You can only submit feedback once every 24 hours. Please try again later.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Submitting feedback to Supabase...', {
        rating,
        text: feedback,
        email,
        phone: phone || null,
        sentiment: determineSentiment(rating),
        is_spam: false
      });

      const { data, error } = await supabase
        .from('feedback')
        .insert([
          {
            rating,
            text: feedback,
            email: email,
            phone: phone || null,
            date: new Date().toISOString(),
            sentiment: determineSentiment(rating),
            is_spam: false
          }
        ])
        .select();

      if (error) {
        console.error('Error submitting feedback:', error);
        toast.error('Failed to submit feedback. Please try again.');
        return;
      }

      console.log('Feedback submitted successfully:', data);
      toast.success('Thank you for your feedback!');
      onSubmitSuccess();
      
      // Redirect to home page after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold">Share Your Feedback</CardTitle>
        <p className="text-blue-100">Help us improve our service</p>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <Label className="text-lg font-semibold mb-3 block">How would you rate your experience?</Label>
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>

          <div>
            <Label htmlFor="feedback" className="text-base font-medium">
              Tell us more about your experience
            </Label>
            <Textarea
              id="feedback"
              placeholder="Share your thoughts, suggestions, or concerns..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mt-2 min-h-[120px] resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="text-base font-medium">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Required for rate limiting - one feedback per 24 hours
              </p>
            </div>
            <div>
              <Label htmlFor="phone" className="text-base font-medium">
                Phone (Optional)
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 text-lg transition-all duration-200 transform hover:scale-105"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
