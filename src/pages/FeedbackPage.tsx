
import React, { useState } from 'react';
import { FeedbackForm } from '@/components/FeedbackForm';
import { ThankYouScreen } from '@/components/ThankYouScreen';
import { MessageSquare, ArrowLeft, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FeedbackPage = () => {
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmitSuccess = () => {
    setShowThankYou(true);
  };

  const handleReset = () => {
    setShowThankYou(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-16">
        {!showThankYou && (
          <div className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
            
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
  We’d Love to Hear <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 inline">Your Thoughts</span>
</h3>

            
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8 px-2">
              Your feedback helps us improve and deliver better experiences. 
              
            </p>

            
          </div>
        )}

        <div className="flex justify-center">
          {showThankYou ? (
            <ThankYouScreen onReset={handleReset} />
          ) : (
            <div className="w-full max-w-2xl">
              <FeedbackForm onSubmitSuccess={handleSubmitSuccess} />
            </div>
          )}
        </div>

        {!showThankYou && (
          <div className="text-center mt-8 sm:mt-12 max-w-2xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Why Your Feedback Matters</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span>Helps us understand your needs better</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span>Drives product and service improvements</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span>Ensures we meet your expectations</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span>Creates better experiences for everyone</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                Your information is secure and will only be used to improve our services.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
