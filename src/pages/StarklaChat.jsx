import React from 'react';
import { Mic, ChevronLeft, ChevronRight, LightbulbIcon } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import starklaImage from '../assets/starkla.jpg';

const StarklaChat = () => {
  return (
    <MainLayout>
      <div className="flex flex-col bg-white w-full">
        {/* Header */}
        <div className="w-full px-6 py-2 flex items-center border-b border-gray-100">
          {/* Left: Profile Section */}
          <div className="flex items-center gap-4">
            <div className="w-64 h-64 rounded-full overflow-hidden">
              <img 
                src={starklaImage} 
                alt="Starkla Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">STARKLA</h1>
              <h2 className="text-sm text-gray-600">Software Architecture lesson - Chapter 1</h2>
            </div>
          </div>

          {/* Right: Unit Navigation */}
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-gray-600 text-sm">Current unit: 1</span>
            <div className="flex gap-1">
              <button 
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Previous unit"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Next unit"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area - Removed min-height and flex-1 */}
        <div className="px-6 py-4 w-full">
          {/* Chat content will go here */}
        </div>

        {/* Bottom Controls */}
        <div className="w-full border-t border-gray-100 px-6 py-4">
          <div className="flex gap-4 items-center w-full">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <LightbulbIcon className="w-5 h-5" />
              <span>Start learning</span>
            </button>

            <div className="flex-1 relative w-full">
              <input
                type="text"
                placeholder="Write something related to the topic"
                className="w-full px-4 py-2 bg-gray-100 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
              />
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                aria-label="Voice Input"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StarklaChat;
