
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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

interface FeedbackChartProps {
  feedbacks: FeedbackData[];
}

export const FeedbackChart: React.FC<FeedbackChartProps> = ({ feedbacks }) => {
  // Prepare rating distribution data
  const ratingData = [1, 2, 3, 4, 5].map(rating => ({
    rating: `${rating} Star${rating !== 1 ? 's' : ''}`,
    count: feedbacks.filter(f => f.rating === rating).length
  }));

  // Prepare sentiment data
  const sentimentData = [
    { name: 'Positive', value: feedbacks.filter(f => f.sentiment === 'positive').length, color: '#10B981' },
    { name: 'Neutral', value: feedbacks.filter(f => f.sentiment === 'neutral').length, color: '#F59E0B' },
    { name: 'Negative', value: feedbacks.filter(f => f.sentiment === 'negative').length, color: '#EF4444' }
  ];

  // Prepare spam data
  const spamData = [
    { name: 'Valid', value: feedbacks.filter(f => !f.is_spam).length, color: '#10B981' },
    { name: 'Spam', value: feedbacks.filter(f => f.is_spam).length, color: '#EF4444' }
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Rating Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Rating Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ratingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="rating" 
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sentiment Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Sentiment Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={sentimentData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {sentimentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 flex justify-center gap-4">
          {sentimentData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Spam vs Valid */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Content Quality</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={spamData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {spamData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 flex justify-center gap-4">
          {spamData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
