import React, { useState } from 'react';
import { Bell, Search, Menu, Settings } from 'lucide-react';
import ConnectWalletButton from '../ui/ConnectWalletButton';
import { useWallet } from '../../context/WalletContext';
import { truncateAddress } from '../../utils/helpers';

const Header = ({ onMenuClick }) => {
  const { address } = useWallet();
  const [currentPage, setCurrentPage] = useState('home');
  const [activeTooltip, setActiveTooltip] = useState(null);

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <header className="h-16 border-b border-gray-200 bg-white px-4 sm:px-6 flex items-center justify-between">
      {/* Mobile Menu Button */}
      <button
        className="p-2 text-gray-600 hover:text-gray-800 rounded-lg mr-4"
        onClick={onMenuClick}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Search Section */}
      <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Navigation Section */}
      <div className="flex items-center space-x-4 relative">
        {address && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Connected as:</span>
            <span className="font-medium">{truncateAddress(address)}</span>
          </div>
        )}

        {/* Notification Button */}
        <div
          className="relative"
          onMouseEnter={() => setActiveTooltip('notifications')}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          <button
            className="relative p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 ml-4 sm:ml-6"
            onClick={() => console.log('Notifications clicked')}
          >
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full"></span>
          </button>
          {activeTooltip === 'notifications' && (
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white text-xs px-2 py-2 rounded-md">
              Notifications
            </div>
          )}
        </div>

        {/* Settings Button */}
        <div
          className="relative"
          onMouseEnter={() => setActiveTooltip('settings')}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          <button
            onClick={() => handleNavClick('settings')}
            className="flex items-center gap-2 px-3 py-2 text-left rounded-lg transition-colors hover:bg-gray-50"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          {activeTooltip === 'settings' && (
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white text-xs px-2 py-2 rounded-md">
              Settings
            </div>
          )}
        </div>

        <ConnectWalletButton />
      </div>
    </header>
  );
};

export default Header;