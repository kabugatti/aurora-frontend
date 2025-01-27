
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  BarChart2,
  Users,
  Settings, 
  MessageSquare,
  FileText,
  Headphones,
  MessageCircle,
  GraduationCap,
  Book,
  ChevronDown,
  ChevronRight,
  Gamepad,
  ShieldQuestion
} from "lucide-react"

const Sidebar = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [level, setLevel] = useState("Choose Your Level");
  const [isLearningExpanded, setIsLearningExpanded] = useState(false);

  const navigate=useNavigate()

  const handleNavClick = (page) => {
    setCurrentPage(page);
    navigate(`/${page}`)
  };

  const categories = [
    { icon: <Book className="w-5 h-5" />, label: "Grammar" },
    { icon: <GraduationCap className="w-5 h-5" />, label: "Vocabulary" },
    { icon: <MessageCircle className="w-5 h-5" />, label: "Speaking" },
    { icon: <Headphones className="w-5 h-5" />, label: "Listening" },
    { icon: <FileText className="w-5 h-5" />, label: "Reading" },
    { icon: <Gamepad className="w-5 h-5" />, label: "Games" },
  ];

  const topNavItems = [
    { icon: <BarChart2 className="w-5 h-5" />, label: 'Analytics', page: 'analytics' },
    { icon: <Users className="w-5 h-5" />, label: 'Community', page: 'people' },
    {icon:  <ShieldQuestion className="w-5 h-5"/>, label:"Questions", page:"practiceSystem"}
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="p-4 flex flex-col h-full">
        {/* Profile Section */}
        <div className="flex items-center gap-3 mb-8 p-2">
          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                stroke="#71717A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <h2 className="font-medium text-sm text-gray-900">Diego Duarte</h2>
            <p className="text-sm text-gray-500">Student</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {/* Learning Content Accordion */}
          <div className="mb-2">
            <button
              onClick={() => setIsLearningExpanded(!isLearningExpanded)}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">
                  Learning content
                </span>
              </div>
              {isLearningExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
            </button>

            {/* Expandable Content */}
            {isLearningExpanded && (
              <div className="mt-2 ml-2">
                {/* Level Selection */}
                <div className="px-3 mb-4">
                  <h2 className="text-xs font-semibold mb-2 text-gray-600">
                    LEVEL
                  </h2>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full bg-white text-gray-900 p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>Choose Your Level</option>
                    <option>A1</option>
                    <option>A2</option>
                    <option>B1</option>
                    <option>B2</option>
                    <option>C1</option>
                    <option>C2</option>
                  </select>
                </div>

                {/* Categories */}
                <div className="px-3">
                  <h2 className="text-xs font-semibold mb-2 text-gray-600">
                    CATEGORIES
                  </h2>
                  <div className="flex flex-col gap-1">
                    {categories.map((item, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          handleNavClick(`category-${item.label.toLowerCase()}`)
                        }
                        className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors hover:bg-gray-50"
                      >
                        <span className="text-gray-600">{item.icon}</span>
                        <span className="text-sm text-gray-700">
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Other Navigation Items */}
          {topNavItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(item.page)}
              className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors ${
                currentPage === item.page ? "bg-gray-50" : "hover:bg-gray-50"
              }`}
            >
              <span className="text-gray-600">{item.icon}</span>
              <span className="text-sm font-medium text-gray-700">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-3">
          <button
            onClick={() => handleNavClick("starkla")}
            className="flex items-center gap-3 px-4 py-2.5 w-full text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm font-medium">Talk with Starkla</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
