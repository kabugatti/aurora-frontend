import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherSignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    walletAddress: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Teacher Signup - Earn Crypto Teaching Languages
        </h1>
        
        <div className="bg-gray-800 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Start Earning Crypto Today
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                required
              />
              <input
                type="text"
                name="walletAddress"
                placeholder="Wallet Address"
                value={formData.walletAddress}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xl py-4 px-8 rounded-lg transition-colors"
            >
              Start Earning Crypto Today
            </button>
            
            <p className="text-gray-400 text-sm text-center">
              🚀 Get started in 5 minutes • No upfront costs • Instant crypto payments
            </p>
          </form>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-6">Why Choose AURORA?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-3">💰 Instant Crypto Payments</h4>
              <p className="text-gray-400">Get paid in Scrolls cryptocurrency after each class</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-3">🌍 Global Students</h4>
              <p className="text-gray-400">Access students worldwide through our platform</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-3">⚡ Zero Fees</h4>
              <p className="text-gray-400">No banking fees or international transfer costs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSignupPage; 