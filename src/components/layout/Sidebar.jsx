// import {
//   BarChart2,
//   Book,
//   BookOpen,
//   ChevronDown,
//   ChevronRight,
//   FileText,
//   Gamepad,
//   GraduationCap,
//   Headphones,
//   Home,
//   MessageCircle,
//   MessageSquare,
//   Users,
// } from "lucide-react";
// import { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import Logo from "../../assets/S-icon-Photoroom.png";

// const Sidebar = ({ isOpen, onClose, headerHeight }) => {
//   const [currentPage, setCurrentPage] = useState("home");
//   const [level, setLevel] = useState("Choose Your Level");
//   const [isLearningExpanded, setIsLearningExpanded] = useState(false);

//   const navigate = useNavigate();

//   const handleNavClick = (page) => {
//     setCurrentPage(page);
//     navigate(`/${page}`);
//   };

//   const categories = [
//     { icon: <Book className="w-5 h-5" />, label: "Grammar" },
//     { icon: <GraduationCap className="w-5 h-5" />, label: "Vocabulary" },
//     { icon: <MessageCircle className="w-5 h-5" />, label: "Speaking" },
//     { icon: <Headphones className="w-5 h-5" />, label: "Listening" },
//     { icon: <FileText className="w-5 h-5" />, label: "Reading" },
//     { icon: <Gamepad className="w-5 h-5" />, label: "Games" },
//   ];

//   const topNavItems = [
//     {
//       icon: <BarChart2 className="w-5 h-5" />,
//       label: "Analytics",
//       page: "analytics",
//     },
//     { icon: <Users className="w-5 h-5" />, label: "Community", page: "people" },
//   ];

//   return (
//     <div
//       className={`fixed left-0 z-50 transform ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       } transition-transform bg-white w-64 min-h-screen flex flex-col h-full shadow-lg border-r border-gray-200 pc-sidebar`}
//       style={{ top: headerHeight }}
//     >
//       <div className="p-4 flex flex-col h-full">
//         {/* Logo Section */}
//         <div className="flex items-center justify-center mb-6">
//           <img src={Logo} alt="Logo" className="w-12 h-auto" />
//         </div>
//         <nav className="flex flex-col gap-2 flex-1">
//           {/* Home Button */}

//           <NavLink to="/">
//             <button
//               onClick={() => handleNavClick("/")}
//               className={`flex items-center gap-3 hover:text-blue-600 px-3 py-2 w-full text-left rounded-lg hover:transparent hover:border-blue-600 bg-blue-500  ${
//                 currentPage === "/" ? "bg-transparent  " : "bg-blue-600 "
//               }`}
//             >
//               <Home
//                 className={`w-5 h-5    ${
//                   currentPage === "/" ? "text-blue-800  " : "text-gray-200  "
//                 }`}
//               />
//               <span
//                 className={`text-sm font-medium text-gray-100  ${
//                   currentPage === "/" ? "text-blue-800  " : "text-gray-200  "
//                 }`}
//               >
//                 Home
//               </span>
//             </button>
//           </NavLink>

//           {/* Learning Content Accordion */}
//           <div className="mb-2">
//             <button
//               onClick={() => setIsLearningExpanded(!isLearningExpanded)}
//               className="flex items-center justify-between w-full px-3 py-2 bg-blue-600 text-gray-100 hover:bg-gray-100 hover:text-blue-600 rounded-lg transition-colors "
//             >
//               <div className="flex items-center gap-3">
//                 <BookOpen className="w-5 h-5" />
//                 <span className="text-sm font-medium ">Learning content</span>
//               </div>
//               {isLearningExpanded ? (
//                 <ChevronDown className="w-4 h-4 text-gray-500" />
//               ) : (
//                 <ChevronRight className="w-4 h-4 text-gray-500" />
//               )}
//             </button>

//             {/* Expandable Content */}
//             {isLearningExpanded && (
//               <div className="mt-2 ml-2">
//                 {/* Level Selection */}
//                 {/* <div className="px-3 mb-4">
//                   <h2 className="text-xs font-semibold mb-2 text-gray-600">
//                     LEVEL
//                   </h2>
//                   <select
//                     value={level}
//                     onChange={(e) => setLevel(e.target.value)}
//                     className="w-full bg-white text-gray-900 p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option>Choose Your Level</option>
//                     <option>A1</option>
//                     <option>A2</option>
//                     <option>B1</option>
//                     <option>B2</option>
//                     <option>C1</option>
//                     <option>C2</option>
//                   </select>
//                 </div> */}

//                 {/* Categories */}
//                 <div className="px-3">
//                   <h2 className="text-xs font-semibold mb-2 text-gray-600">
//                     CATEGORIES
//                   </h2>
//                   <div className="flex flex-col gap-1">
//                     {categories.map((item, index) => (
//                       <NavLink key={index} to={item.label.toLowerCase()}>
//                         <button
//                           onClick={() =>
//                             handleNavClick(
//                               `category-${item.label.toLowerCase()}`
//                             )
//                           }
//                           className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg bg-blue-600 text-gray-100 hover:bg-gray-100 hover:text-blue-600 transition-colors "
//                         >
//                           <span className="">{item.icon}</span>
//                           <span className="text-sm ">{item.label}</span>
//                         </button>
//                       </NavLink>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Other Navigation Items */}
//           {topNavItems.map((item, index) => (
//             <NavLink key={index} to={item.page}>
//               <button
//                 onClick={() => handleNavClick(item.page)}
//                 className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors active:bg-gray-100 active:text-blue-600  bg-blue-600 text-gray-100 hover:bg-gray-100 hover:text-blue-600 ${
//                   currentPage === item.page && "bg-gray-50 text-blue-600"
//                 }`}
//               >
//                 <span className="">{item.icon}</span>
//                 <span className="text-sm font-medium ">{item.label}</span>
//               </button>
//             </NavLink>
//           ))}
//         </nav>

//         <div className="py-16 space-y-3 flex flex-col">
//           <NavLink to="aurora-chat">
//             <button
//               onClick={() => handleNavClick("aurora-chat")}
//               className="flex items-center gap-3 px-4 py-2.5 w-full text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
//             >
//               <MessageSquare className="w-5 h-5" />
//               <span className="text-sm font-medium">Talk with Aurora</span>
//             </button>
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


















import { useState } from 'react';
import { ChevronRight, ChevronDown, Home, BarChart2, Headphones, Menu, BookOpen, FileText, BookmarkIcon, Layout, X } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (item) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  return (
    <div className={`w-64 bg-gray-900 text-gray-300 flex flex-col h-screen fixed top-0 left-0 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}>
      {/* Header with profile and close button */}
      <div className="flex justify-between items-center p-3">
        {/* Profile image */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-700 rounded overflow-hidden">
            <img 
              src="/api/placeholder/32/32" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* Close button */}
        <button onClick={onClose} className="text-gray-300 hover:text-gray-100">
          <X size={24} />
        </button>
      </div>
      
      {/* Scrollable Content Container */}
      <div className="overflow-y-auto flex-grow"> {/* Added: overflow-y-auto and flex-grow */}
        {/* Home button */}
        <div className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer">
          <Home size={18} />
          <span className="font-medium">Home</span>
        </div>

        {/* Main Navigation section */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mt-4 mb-2 px-3">MAIN NAVIGATION</p>

          {/* Courses - with dropdown */}
          <div className="relative">
            <div
              className={`flex items-center justify-between p-3 hover:bg-gray-800 cursor-pointer rounded ${expandedItems.courses ? 'bg-gray-800' : ''}`}
              onClick={() => toggleExpand('courses')}
            >
              <div className="flex items-center gap-3">
                <Layout size={18} />
                <span>Courses</span>
              </div>
              {expandedItems.courses ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </div>
            {expandedItems.courses && (
              <div className="bg-gray-900 pl-9 py-1">
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">Live classes</div>
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">IELTS preparation</div>
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">Personal tutoring</div>
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">Self-study courses</div>
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">Learning-style quiz</div>
              </div>
            )}
          </div>

          {/* Practice */}
          <div className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer">
            <FileText size={18} />
            <span>Practice</span>
          </div>

          {/* Resources - with dropdown */}
          <div className="relative">
            <div
              className={`flex items-center justify-between p-3 hover:bg-gray-800 cursor-pointer ${expandedItems.resources ? 'bg-gray-800' : ''}`}
              onClick={() => toggleExpand('resources')}
            >
              <div className="flex items-center gap-3">
                <BookmarkIcon size={18} />
                <span>Resources</span>
              </div>
              {expandedItems.resources ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </div>
            {expandedItems.resources && (
              <div className="bg-gray-900 pl-9 py-1">
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">Video zone</div>
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">Audio zone</div>
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">Magazine zone</div>
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">Story zone</div>
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">Audio series</div>
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">Video series</div>
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">Apps</div>
              </div>
            )}
          </div>

          {/* Community */}
          <div className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer">
            <Menu size={18} />
            <span>Community</span>
          </div>
        </div>

        {/* Categories section */}
        <div className='bg-gray-900'>
          <p className="text-xs text-gray-500 mb-2 px-3">CATEGORIES</p>

          {/* Skills - with dropdown */}
          <div className="relative">
            <div
              className={`flex items-center justify-between p-3 hover:bg-gray-800 cursor-pointer ${expandedItems.skills ? 'bg-gray-800' : ''}`}
              onClick={() => toggleExpand('skills')}
            >
              <div className="flex items-center gap-3">
                <FileText size={18} />
                <span>Skills</span>
              </div>
              {expandedItems.skills ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </div>
            {expandedItems.skills && (
              <div className="bg-gray-900 pl-9 py-1">
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">Listening</div>
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">Reading</div>
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">Writing</div>
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">Speaking</div>
              </div>
            )}
          </div>

          {/* Grammar */}
          <div className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer">
            <BookOpen size={18} />
            <span>Grammar</span>
          </div>

          {/* Vocabulary - with dropdown */}
          <div className="relative">
            <div
              className={`flex items-center justify-between p-3 hover:bg-gray-800 cursor-pointer ${expandedItems.vocabulary ? 'bg-gray-800' : ''}`}
              onClick={() => toggleExpand('vocabulary')}
            >
              <div className="flex items-center gap-3">
                <FileText size={18} />
                <span>Vocabulary</span>
              </div>
              {expandedItems.vocabulary ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </div>
            {expandedItems.vocabulary && (
              <div className="bg-gray-900 pl-9 py-1">
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">A1-A2 vocabulary</div>
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">B1-B2 vocabulary</div>
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">Vocabulary games</div>
              </div>
            )}
          </div>

          {/* English Levels - with dropdown */}
          <div className="relative">
            <div
              className={`flex items-center justify-between p-3 hover:bg-gray-800 cursor-pointer ${expandedItems.levels ? 'bg-gray-800' : ''}`}
              onClick={() => toggleExpand('levels')}
            >
              <div className="flex items-center gap-3">
                <Headphones size={18} />
                <span>English Levels</span>
              </div>
              {expandedItems.levels ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </div>
            {expandedItems.levels && (
              <div className="bg-gray-900 pl-9 py-1">
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">Online English level test</div>
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">Understand your English level</div>
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">Improve your English level</div>
                <div className="py-2 text-blue-400 hover:bg-gray-800 cursor-pointer">Find resources for your level</div>
              </div>
            )}
          </div>

          {/* Games */}
          <div className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer">
            <Menu size={18} />
            <span>Games</span>
          </div>

          {/* Analytics */}
          <div className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer">
            <BarChart2 size={18} />
            <span>Analytics</span>
          </div>
        </div>
      </div>
      {/* Talk with Aurora button */}
      <div className="mt-auto mb-4 px-3">
        <button className="w-full bg-blue-900 bg-opacity-40 text-blue-400 py-2 px-4 rounded flex items-center justify-center gap-2 hover:bg-blue-900 hover:bg-opacity-60 transition-colors">
          <div className="w-4 h-4 rounded-full bg-blue-400 flex items-center justify-center">
            <div className="w-1 h-1 bg-blue-900 rounded-full"></div>
          </div>
          <span>Talk with Aurora</span>
        </button>
      </div>
    </div>
  );
}