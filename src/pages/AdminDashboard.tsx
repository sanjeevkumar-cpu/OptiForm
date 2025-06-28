import React, { useState, useEffect } from 'react';
import { FeedbackChart } from '@/components/FeedbackChart';
import { FeedbackTable } from '@/components/FeedbackTable';
import { AdminPasswordChange } from '@/components/AdminPasswordChange';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Settings } from 'lucide-react';

interface FeedbackData {
  id: string;
  rating: number;
  text: string;
  email?: string;
  phone?: string;
  date: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  is_spam: boolean;
}

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    loadFeedbacks();
  }, [navigate]);

  const loadFeedbacks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Loading real user feedbacks from Supabase...');
      
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Error loading feedbacks:', error);
        setError(`Failed to load feedbacks: ${error.message}`);
        toast.error('Failed to load feedbacks');
        return;
      }

      if (!data) {
        console.log('No data returned from Supabase');
        setFeedbacks([]);
        return;
      }

      console.log(`Loaded ${data.length} real user feedbacks from database`);

      const formattedFeedbacks = data.map(feedback => ({
        id: feedback.id,
        rating: feedback.rating,
        text: feedback.text,
        email: feedback.email,
        phone: feedback.phone,
        date: feedback.date,
        sentiment: feedback.sentiment as 'positive' | 'negative' | 'neutral',
        is_spam: feedback.is_spam
      }));

      console.log('Formatted feedbacks:', formattedFeedbacks);
      setFeedbacks(formattedFeedbacks);
    } catch (error) {
      console.error('Error loading feedbacks:', error);
      setError(`Failed to load feedbacks: ${error}`);
      toast.error('Failed to load feedbacks');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleDeleteSpam = async (id: string) => {
    try {
      const { error } = await supabase
        .from('feedback')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting feedback:', error);
        toast.error('Failed to delete feedback');
        return;
      }

      setFeedbacks(feedbacks.filter(f => f.id !== id));
      toast.success('Feedback deleted successfully');
    } catch (error) {
      console.error('Error deleting feedback:', error);
      toast.error('Failed to delete feedback');
    }
  };

  const stats = {
    total: feedbacks.length,
    positive: feedbacks.filter(f => f.sentiment === 'positive').length,
    negative: feedbacks.filter(f => f.sentiment === 'negative').length,
    spam: feedbacks.filter(f => f.is_spam).length,
    avgRating: feedbacks.length > 0 ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1) : '0'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error Loading Dashboard</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={loadFeedbacks} className="bg-blue-600 hover:bg-blue-700">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (showPasswordChange) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <AdminPasswordChange onCancel={() => setShowPasswordChange(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-white shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600">Manage your feedback and analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => setShowPasswordChange(true)}
                variant="outline"
                className="border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                <Settings className="w-4 h-4 mr-2" />
                Change Password
              </Button>
              <Button 
                onClick={() => navigate('/feedback')}
                variant="outline"
                className="border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                View Feedback Form
              </Button>
              <Button 
                onClick={handleLogout} 
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {feedbacks.length === 0 && (
          <Card className="mb-8 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">No Real User Feedback Yet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-4">
                Your feedback system is now properly connected! Users can submit feedback through the form, and it will appear here in real-time.
              </p>
              <div className="flex gap-4">
                <Button 
                  onClick={() => navigate('/feedback')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Submit Your First Feedback
                </Button>
                <Button 
                  onClick={loadFeedbacks}
                  variant="outline"
                  className="border-blue-600 text-blue-700 hover:bg-blue-50"
                >
                  Refresh Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Positive</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.positive}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-700">Negative</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{stats.negative}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Spam Detected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{stats.spam}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Avg Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{stats.avgRating}/5</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button 
              onClick={() => navigate('/feedback')}
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              📝 Submit Feedback
            </Button>
            <Button 
              onClick={loadFeedbacks}
              variant="secondary"
              className="bg-white text-green-600 hover:bg-green-50"
            >
              🔄 Refresh Data
            </Button>
            <Button 
              onClick={() => window.open('https://supabase.com/dashboard/project/twrmxjarcpsfdojwpfhn/editor', '_blank')}
              variant="secondary"
              className="bg-white text-purple-600 hover:bg-purple-50"
            >
              📊 View Database
            </Button>
          </CardContent>
        </Card>

        {feedbacks.length > 0 && (
          <div className="mb-8">
            <FeedbackChart feedbacks={feedbacks} />
          </div>
        )}

        <FeedbackTable feedbacks={feedbacks} onDeleteSpam={handleDeleteSpam} />
      </main>
    </div>
  );
};

export default AdminDashboard;
