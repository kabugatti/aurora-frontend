import React from 'react';
import { Wallet } from 'lucide-react';

const ConnectWalletButton = ({ onClick }) => {
  return (
    <button
      className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black border border-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      onClick={onClick}
    >
      <Wallet className="h-5 w-5" />
      <span>Connect Wallet</span> 
    </button>
  );
};

export default ConnectWalletButton;