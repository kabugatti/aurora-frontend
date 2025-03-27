import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronRight,
  ChevronDown,
  Home,
  BarChart2,
  Headphones,
  Menu,
  BookOpen,
  FileText,
  BookmarkIcon,
  MessageSquare,
  Users,
  BookPlus,
} from "lucide-react";
import Logo from "../../assets/S-icon-Photoroom.png";

export default function Sidebar({ isOpen, onClose }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [currentPage, setCurrentPage] = useState("home");

  const toggleExpand = (item) => {
    setExpandedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div
      className={`w-64 bg-gray-900 text-gray-300 flex flex-col h-screen fixed top-0 left-0 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } z-50`}
    >
      {/* Header with logo and close button */}
      <div className="flex justify-between items-center p-3 border-b border-gray-800">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-12 h-auto" />
        </div>
      </div>

      <nav className="flex flex-col gap-2 flex-1 p-3">
        {/* Home Button */}
        <NavLink to="/">
          <button
            onClick={() => handleNavClick("/")}
            className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors ${
              currentPage === "/" ? "bg-blue-600 text-white" : "hover:bg-gray-800"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-sm font-medium">Home</span>
          </button>
        </NavLink>

        {/* Resources - with dropdown */}
        <div className="relative">
          <div
            className={`flex items-center justify-between p-3 hover:bg-gray-800 cursor-pointer rounded-lg ${
              expandedItems.resources ? "bg-gray-800" : ""
            }`}
            onClick={() => toggleExpand("resources")}
          >
            <div className="flex items-center gap-3">
              <BookmarkIcon size={18} />
              <span>Resources</span>
            </div>
            {expandedItems.resources ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </div>
          {expandedItems.resources && (
            <div className="bg-gray-900 pl-9 py-1">
              <NavLink to="/video-zone" className="block py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">
                Video zone
              </NavLink>
              <NavLink to="/audio-zone" className="block py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">
                Audio zone
              </NavLink>
              <NavLink to="/magazine-zone" className="block py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">
                Magazine zone
              </NavLink>
              <NavLink to="/story-zone" className="block py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">
                Story zone
              </NavLink>
              <NavLink to="/audio-series" className="block py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">
                Audio series
              </NavLink>
              <NavLink to="/video-series" className="block py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">
                Video series
              </NavLink>
              <NavLink to="/apps" className="block py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">
                Apps
              </NavLink>
            </div>
          )}
        </div>

        {/* Grammar */}
        <NavLink to="/grammar">
          <div className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer rounded-lg">
            <BookOpen size={18} />
            <span>Grammar</span>
          </div>
        </NavLink>

        {/* Vocabulary - with dropdown */}
        <div className="relative">
          <div
            className={`flex items-center justify-between p-3 hover:bg-gray-800 cursor-pointer rounded-lg ${
              expandedItems.vocabulary ? "bg-gray-800" : ""
            }`}
            onClick={() => toggleExpand("vocabulary")}
          >
            <div className="flex items-center gap-3">
              <FileText size={18} />
              <span>Vocabulary</span>
            </div>
            {expandedItems.vocabulary ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </div>
          {expandedItems.vocabulary && (
            <div className="bg-gray-900 pl-9 py-1">
              <NavLink to="/vocabulary/a1-a2" className="block py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">
                A1-A2 vocabulary
              </NavLink>
              <NavLink to="/vocabulary/b1-b2" className="block py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">
                B1-B2 vocabulary
              </NavLink>
              <NavLink to="/vocabulary/games" className="block py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">
                Vocabulary games
              </NavLink>
            </div>
          )}
        </div>

        {/* English Levels - with dropdown */}
        <div className="relative">
          <div
            className={`flex items-center justify-between p-3 hover:bg-gray-800 cursor-pointer rounded-lg ${
              expandedItems.levels ? "bg-gray-800" : ""
            }`}
            onClick={() => toggleExpand("levels")}
          >
            <div className="flex items-center gap-3">
              <Headphones size={18} />
              <span>English Levels</span>
            </div>
            {expandedItems.levels ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </div>
          {expandedItems.levels && (
            <div className="bg-gray-900 pl-9 py-1">
              <NavLink to="/level-test" className="block py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">
                Online English level test
              </NavLink>
              <NavLink to="/understand-level" className="block py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">
                Understand your English level
              </NavLink>
              <NavLink to="/improve-level" className="block py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">
                Improve your English level
              </NavLink>
              <NavLink to="/level-resources" className="block py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">
                Find resources for your level
              </NavLink>
            </div>
          )}
        </div>

        {/* Question Creator Button */}
        <NavLink to="/question-creator">
          <div className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer rounded-lg">
            <BookPlus size={18} />
            <span>Create Questions</span>
          </div>
        </NavLink>

        {/* Games */}
        <NavLink to="/games">
          <div className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer rounded-lg">
            <Menu size={18} />
            <span>Games</span>
          </div>
        </NavLink>

        {/* Analytics */}
        <NavLink to="/analytics">
          <div className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer rounded-lg">
            <BarChart2 size={18} />
            <span>Analytics</span>
          </div>
        </NavLink>

        {/* Community */}
        <NavLink to="/community">
          <div className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer rounded-lg">
            <Users size={18} />
            <span>Community</span>
          </div>
        </NavLink>
      </nav>

      {/* Talk with Aurora button */}
      <div className="mt-auto mb-4 px-3">
        <NavLink to="/aurora-chat">
          <button className="w-full bg-blue-900 bg-opacity-40 text-blue-400 py-2 px-4 rounded flex items-center justify-center gap-2 hover:bg-blue-900 hover:bg-opacity-60 transition-colors">
            <MessageSquare size={18} />
            <span>Talk with Aurora</span>
          </button>
        </NavLink>
      </div>
    </div>
  );
}
