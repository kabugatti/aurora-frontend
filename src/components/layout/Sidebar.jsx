import React, { useState } from 'react'; 
import { BookOpen, BarChart2, Users, Settings, Folder, Award, MessageSquare } from 'lucide-react';

const Sidebar = () => {
  const [clickedButton, setClickedButton] = useState(null); 

  const handleButtonClick = (label) => { 
    setClickedButton(label);
    console.log(`Clicked ${label}`);
  };

  const topNavItems = [
    { 
      icon: <BookOpen className="w-5 h-5" />, 
      label: 'Learning content',
      subItems: [
        { icon: <Folder className="w-5 h-5" />, label: 'Categories' },
        { icon: <Award className="w-5 h-5" />, label: 'Certifications Obtained' }
      ]
    },
    { icon: <BarChart2 className="w-5 h-5" />, label: 'Analytics' },
    { icon: <Users className="w-5 h-5" />, label: 'People' }
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="p-4 flex flex-col h-full">
        {/* Profile Section */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z" stroke="#71717A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h2 className="font-medium text-sm text-gray-900">Diego Duarte</h2>
            <p className="text-sm text-gray-500">Student</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {topNavItems.map((item, index) => (
            <div key={index} className="flex flex-col gap-1">
              <button
                className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors ${
                  clickedButton === item.label
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-blue-50"
                }`} 
                onClick={() => handleButtonClick(item.label)} 
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
              {item.subItems && (
                <div>
                  {item.subItems.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors ml-2 ${
                        clickedButton === subItem.label
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-blue-50"
                      }`} 
                      onClick={() => handleButtonClick(subItem.label)} 
                    >
                      {subItem.icon}
                      <span className="text-sm font-medium">{subItem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-auto space-y-3">
          {/* Talk with Starkla Button */}
          <button
            className="flex items-center gap-3 px-4 py-2.5 w-full text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm"
            onClick={() => console.log('Opening Starkla chat')}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm font-medium">Talk with Starkla</span>
          </button>

          {/* Settings Button */}
          <button
            className="flex items-center gap-3 px-3 py-2 w-full text-left text-gray-600 hover:bg-blue-50 rounded-lg transition-colors"
            onClick={() => console.log('Clicked Settings')}
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
