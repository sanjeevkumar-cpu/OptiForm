
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, ChartBar, Star, Shield, Users, Zap, ArrowRight, CheckCircle, Menu } from 'lucide-react';

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">OptiForm</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
              <Link to="/feedback">
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                  Give Feedback
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <div className="flex flex-col space-y-3">
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors py-2">Features</a>
                <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors py-2">How it Works</a>
                <Link to="/feedback" className="pt-2">
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 w-full">
                    Give Feedback
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Powered by AI Analytics
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
            Transform Customer
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 block">
              Feedback into Growth
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
            Collect, analyze, and act on customer feedback with our intelligent platform. 
            Turn every voice into valuable insights that drive your business forward.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4">
            <Link to="/feedback" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                Start Collecting Feedback
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start text-gray-600 mb-2 text-sm sm:text-base">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" />
                <span>Free to use • No setup required</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start text-gray-600 text-sm sm:text-base">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" />
                <span>Real-time analytics • Smart insights</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600 text-sm sm:text-base">Feedback Collected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600 text-sm sm:text-base">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600 text-sm sm:text-base">Real-time Monitoring</div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <section id="features" className="container mx-auto px-4 py-16 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
            Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Succeed</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Our comprehensive suite of tools helps you understand your customers better than ever before.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-white hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <CardTitle className="text-xl sm:text-2xl text-gray-800">Smart Collection</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Beautiful, mobile-friendly forms that make it easy for customers to share their thoughts. 
                QR codes for instant access anywhere.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-white hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                <ChartBar className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <CardTitle className="text-xl sm:text-2xl text-gray-800">AI Analytics</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Advanced sentiment analysis and trend detection. Beautiful dashboards that turn 
                data into actionable insights instantly.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-white hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <CardTitle className="text-xl sm:text-2xl text-gray-800">Smart Protection</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Automatic spam detection and content filtering ensures you only receive 
                genuine, valuable feedback from real customers.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="bg-gradient-to-r from-blue-600 to-green-600 py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">How It Works</h2>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
              Get started in three simple steps and start collecting valuable feedback immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Collect Feedback</h3>
              <p className="text-blue-100 text-sm sm:text-base">
                Share your feedback form with customers via QR codes, links, or embed it on your website.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Analyze Insights</h3>
              <p className="text-blue-100 text-sm sm:text-base">
                Our AI automatically categorizes feedback, detects sentiment, and identifies key trends.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Take Action</h3>
              <p className="text-blue-100 text-sm sm:text-base">
                Use the insights to improve your products, services, and customer experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 sm:py-20">
        <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-blue-200 p-6 sm:p-8 lg:p-12">
          <div className="text-center max-w-3xl mx-auto">
            <Users className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-blue-600" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
              Ready to Transform Your Customer Experience?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
              Join thousands of businesses already using our platform to collect, analyze, and act on customer feedback.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/feedback" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-xl w-full sm:w-auto"
                >
                  Start Free Today
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">OptiForm</span>
            </div>
            <p className="text-gray-400 mb-6 text-sm sm:text-base">
              Empowering businesses with intelligent feedback solutions.
            </p>
            <div className="flex justify-center space-x-6 sm:space-x-8 mb-4 text-sm sm:text-base">
              <Link to="/feedback" className="text-gray-400 hover:text-white transition-colors">
                Give Feedback
              </Link>
              <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
                How it Works
              </a>
            </div>
            {/* Discreet admin access */}
            <div className="border-t border-gray-800 pt-4 mt-6">
              <Link 
                to="/admin/login" 
                className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
              >
                Admin Access
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
