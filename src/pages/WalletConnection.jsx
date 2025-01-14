import React from 'react';
import { Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import starklaImage from '../assets/starkla.jpg';

const WalletConnection = () => {
  const navigate = useNavigate();

  const connectWallet = () => {
    // Simulating wallet connection: Redirect directly to the Learning Content page
    // Commented out the actual wallet connection logic for now
    /*
    setIsConnecting(true);
    try {
      // Check if Starknet is available in the browser
      if (!window.starknet) {
        alert('Please install a Starknet wallet extension');
        return;
      }

      // Request wallet connection
      await window.starknet.enable();

      // Get the connected account
      const account = await window.starknet.account;

      if (account) {
        onWalletConnect(true);
        navigate('/learning-content'); // Redirect to Learning Content after successful connection
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
    */

    // For now, redirect to the Learning Content page without connecting the wallet
    navigate('/learning-content');
  };

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 p-8">
        {/* Left Content */}
        <div className="w-full md:w-2/3 space-y-6">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white">STARKLA</h1>
          </div>
          
          <p className="text-blue-100 text-lg max-w-md">
            Welcome to STARKLA - your AI-powered English learning companion. Click the button below to start your personalized learning journey.
          </p>
          
          <button 
            onClick={connectWallet}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
          >
            Connect Wallet
          </button>
        </div>

        {/* Right Content - Circular Image */}
        <div className="relative w-full md:w-1/2 flex justify-center items-center">
          {/* Background circles */}
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full opacity-20"></div>
          <div className="absolute w-80 h-80 bg-blue-400 rounded-full opacity-20"></div>
          
          {/* Main image circle */}
          <div className="relative w-64 h-64 rounded-full overflow-hidden bg-blue-700 flex items-center justify-center">
            <img
              src={starklaImage}
              alt="AI Assistant"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Decorative dots */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-blue-200 rounded-full"></div>
              ))}
            </div>
          </div>
          
          {/* Additional decorative elements */}
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-500 rounded-lg opacity-10 transform rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnection;
