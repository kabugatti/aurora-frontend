import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DollarSign, 
  Globe, 
  Clock, 
  Shield, 
  TrendingUp, 
  Users, 
  CheckCircle,
  ArrowRight,
  Star,
  Zap
} from 'lucide-react';

const TeacherSignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nativeLanguage: '',
    teachingLanguages: [],
    experience: '',
    hourlyRate: '',
    availability: []
  });

  const [step, setStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    navigate('/teacher-dashboard');
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section - StoryBrand 2.0: The Problem */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-blue-900/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Join 2,000+ Teachers Earning Crypto
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Turn Your Language Skills Into
              <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Instant Crypto Income
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Stop trading time for traditional money. Get paid instantly in Scrolls cryptocurrency 
              while teaching languages from anywhere in the world. No more waiting for international transfers.
            </p>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400 mb-12">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full border-2 border-gray-900"></div>
                ))}
              </div>
              <span className="text-sm">2,000+ teachers joined this month</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-sm">4.9/5 rating from students</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-sm">$500+ average monthly earnings</span>
            </div>
          </div>
        </div>
      </section>

      {/* StoryBrand 2.0: The Solution */}
      <section className="py-20 px-6 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How AURORA Solves Your Teaching Problems
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We've identified the biggest pain points language teachers face and solved them with blockchain technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Problem 1: Payment Delays */}
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50">
              <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Payment Delays</h3>
              <p className="text-gray-400 mb-4">
                Waiting weeks for international bank transfers while your bills pile up
              </p>
              <div className="bg-green-500/20 p-4 rounded-xl">
                <p className="text-green-400 font-semibold">
                  ✅ Get paid instantly in Scrolls crypto after each class
                </p>
              </div>
            </div>

            {/* Problem 2: High Fees */}
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50">
              <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6">
                <DollarSign className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">High Banking Fees</h3>
              <p className="text-gray-400 mb-4">
                Losing 5-15% of your earnings to international transfer fees
              </p>
              <div className="bg-green-500/20 p-4 rounded-xl">
                <p className="text-green-400 font-semibold">
                  ✅ Zero transfer fees with blockchain payments
                </p>
              </div>
            </div>

            {/* Problem 3: Limited Reach */}
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50">
              <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Limited Student Reach</h3>
              <p className="text-gray-400 mb-4">
                Restricted to local students or expensive marketing campaigns
              </p>
              <div className="bg-green-500/20 p-4 rounded-xl">
                <p className="text-green-400 font-semibold">
                  ✅ Access global students through our AI-powered platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* StoryBrand 2.0: The Plan */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your Path to Crypto Teaching Success
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Follow our proven 3-step process to start earning crypto within 24 hours
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Create Your Profile</h3>
              <p className="text-gray-400">
                Set up your teacher profile in 5 minutes. Showcase your expertise and set your rates.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Get Matched</h3>
              <p className="text-gray-400">
                Our AI matches you with students based on language, schedule, and teaching style.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Earn Crypto</h3>
              <p className="text-gray-400">
                Teach classes and get paid instantly in Scrolls cryptocurrency. No waiting, no fees.
              </p>
            </div>
          </div>

          {/* Success Stories */}
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-8 rounded-2xl border border-green-500/20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Real Teachers, Real Results</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto mb-4"></div>
                <h4 className="font-bold text-white mb-2">Maria S.</h4>
                <p className="text-green-400 font-semibold">$800/month</p>
                <p className="text-gray-400 text-sm">Spanish Teacher</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto mb-4"></div>
                <h4 className="font-bold text-white mb-2">Ahmed K.</h4>
                <p className="text-green-400 font-semibold">$1,200/month</p>
                <p className="text-gray-400 text-sm">Arabic Teacher</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto mb-4"></div>
                <h4 className="font-bold text-white mb-2">Yuki T.</h4>
                <p className="text-green-400 font-semibold">$950/month</p>
                <p className="text-gray-400 text-sm">Japanese Teacher</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* StoryBrand 2.0: The Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Earning Crypto?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of teachers who've already transformed their language skills into a crypto income stream
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold text-xl py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3"
            >
              Start Earning Crypto Today
              <ArrowRight className="w-6 h-6" />
            </button>
            
            <p className="text-gray-400 text-sm mt-4">
              🚀 Get started in 5 minutes • No upfront costs • Instant crypto payments
            </p>
          </form>
        </div>
      </section>

      {/* Footer Benefits */}
      <section className="py-16 px-6 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Shield className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-white font-bold mb-2">Secure Payments</h3>
              <p className="text-gray-400 text-sm">Blockchain-secured transactions</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-white font-bold mb-2">Global Students</h3>
              <p className="text-gray-400 text-sm">Access students worldwide</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-white font-bold mb-2">Flexible Schedule</h3>
              <p className="text-gray-400 text-sm">Teach when you want</p>
            </div>
            <div className="flex flex-col items-center">
              <TrendingUp className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-white font-bold mb-2">Growing Income</h3>
              <p className="text-gray-400 text-sm">Scale your earnings</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeacherSignupPage; 