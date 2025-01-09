import React from 'react';
import { BookOpen, BarChart2, Users } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: <BookOpen className="w-5 h-5" />, label: 'Learning content' },
    { icon: <BarChart2 className="w-5 h-5" />, label: 'Analytics' },
    { icon: <Users className="w-5 h-5" />, label: 'People' }
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          <div>
            <h2 className="font-semibold">Diego Duarte</h2>
            <p className="text-sm text-gray-500">Student</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item, index) => (
            <button
              key={index}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm w-full text-left text-gray-700 hover:bg-gray-50"
              onClick={() => console.log(`Clicked ${item.label}`)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;