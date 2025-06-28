
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { StarRating } from './StarRating';
import { Trash2, Search, Filter, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';

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

interface FeedbackTableProps {
  feedbacks: FeedbackData[];
  onDeleteSpam: (id: string) => void;
}

export const FeedbackTable: React.FC<FeedbackTableProps> = ({ feedbacks, onDeleteSpam }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSentiment, setFilterSentiment] = useState<string>('all');

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = feedback.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (feedback.email && feedback.email.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterSentiment === 'all' || feedback.sentiment === filterSentiment;
    return matchesSearch && matchesFilter;
  });

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800 border-green-200';
      case 'negative': return 'bg-red-100 text-red-800 border-red-200';
      case 'neutral': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDelete = (id: string) => {
    onDeleteSpam(id);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-xl font-semibold text-gray-800">Feedback Management</h3>
          </div>
          <Badge variant="outline" className="text-sm">
            {filteredFeedbacks.length} of {feedbacks.length} records
          </Badge>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search feedback or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterSentiment}
            onChange={(e) => setFilterSentiment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="all">All Sentiments</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-700">Date</TableHead>
              <TableHead className="font-semibold text-gray-700">Rating</TableHead>
              <TableHead className="font-semibold text-gray-700">Feedback</TableHead>
              <TableHead className="font-semibold text-gray-700">Contact</TableHead>
              <TableHead className="font-semibold text-gray-700">Sentiment</TableHead>
              <TableHead className="font-semibold text-gray-700">Status</TableHead>
              <TableHead className="font-semibold text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFeedbacks.map((feedback) => (
              <TableRow 
                key={feedback.id} 
                className={`hover:bg-gray-50 transition-colors ${feedback.is_spam ? 'bg-red-50 border-l-4 border-red-400' : ''}`}
              >
                <TableCell className="text-sm text-gray-600 font-medium">
                  {new Date(feedback.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <StarRating rating={feedback.rating} onRatingChange={() => {}} readonly />
                    <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">
                      {feedback.rating}/5
                    </span>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs">
                  <p className="text-sm line-clamp-3" title={feedback.text}>
                    {feedback.text}
                  </p>
                </TableCell>
                <TableCell className="text-sm">
                  <div className="space-y-1">
                    {feedback.email && (
                      <div className="flex items-center gap-1 text-blue-600">
                        <Mail className="w-3 h-3" />
                        <span className="truncate max-w-[150px]">{feedback.email}</span>
                      </div>
                    )}
                    {feedback.phone && (
                      <div className="flex items-center gap-1 text-green-600">
                        <Phone className="w-3 h-3" />
                        <span>{feedback.phone}</span>
                      </div>
                    )}
                    {!feedback.email && !feedback.phone && (
                      <span className="text-gray-400 text-xs">No contact info</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`${getSentimentColor(feedback.sentiment)} font-medium`}>
                    {feedback.sentiment.charAt(0).toUpperCase() + feedback.sentiment.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={feedback.is_spam ? 'destructive' : 'default'}
                    className={feedback.is_spam ? 'bg-red-100 text-red-800 border-red-200' : 'bg-green-100 text-green-800 border-green-200'}
                  >
                    {feedback.is_spam ? 'Spam' : 'Valid'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {feedback.is_spam && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(feedback.id)}
                      className="flex items-center gap-1 bg-red-500 hover:bg-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredFeedbacks.length === 0 && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback found</h3>
          <p className="text-gray-500">
            {searchTerm || filterSentiment !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'No feedback has been submitted yet.'
            }
          </p>
        </div>
      )}
    </div>
  );
};
